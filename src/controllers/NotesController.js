const  knex  = require("../database/knex");

class NotesController {
    async create(request, response) {
        const {title, description, tags, links} = request.body;
        const { user_id } = request.params;

            //cadastrando notas
        const note_id  = await knex("notes"). insert({
            title, 
            description,
            user_id
        });


        const linksInsert = links.map(link =>{
            return{ 
                note_id,
                url: link
            }
        });

            //cadastrando os links
        await knex("links").insert(linksInsert);

 
       
        const tagsInsert = tags.map(name =>{
            return{
                note_id,
                name,
                user_id
            }
        });
            //inserindo as tags
        await knex("tags").insert(tagsInsert);

        response.json();
    }

    async show (request, response){
        const { id } = request.params;
        const note = await knex("notes").where({ id }).first(); //mostra uma  nota especifica(first - uma)
        const tags = await knex("tags").where({ note_id: id }).orderBy("name"); //mostra as tags organizada pelo nome(orderby) buscando o id da nota com o NOTE_ID da tag
        const links = await knex("links").where({ note_id: id }).orderBy("create_at"); //mostra as tags organizada pelo nome(orderby)


        return response.json(
            ...note,
            tags,
            links,
        );
    }

    async delete (request, response){
        const { id } = request.params;

        await knex("notes").where({ id }).delete();

        return response.json;
    }

    async index (request, response){
        const { user_id, title, tags } = request.query;

        let notes;

        if(tags){
            const filterTags = tags.split(",").map(tag => tag.trim());

            notes = await knex("tags")
            .select([
                "notes.id", 
                "notes.title",
                "notes.user_id",
            ])
            .where("notes.user_id", user_id)
            .whereLike("notes.title", `%${title}%`)
            .whereIn("name", filterTags)
            .innerJoin("notes", "notes.id",  "tags.note_id")
            .orderBy("notes.title")

        }else{
         notes = await knex("notes")
        .where({ user_id })
        .whereLike( "title", `%${title}%`)
        .orderBy("title");

    }
    return response.json(notes);
    }

}

module.exports = NotesController;