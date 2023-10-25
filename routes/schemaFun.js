const Schema = require('./schema.js');

async function schemafindById(project){
    try{
        const data = await Schema.findById(project).exec();
        if(data === null || data === undefined) throw new Error("no book exists");
        return data;
    }catch(err){
        return err.message;
    }
}

async function schemafind(project){
    try {
        const data = await Schema.find(project).exec();
        if(data.length === 0) throw new Error("no book exists");
        return data;
    } catch(err){
        return err.message;
    }
}

async function schemaCreate(create){
    try {
        let title = create.title;
        if(title === null || title === undefined || title.length === 0) throw new Error("missing required field title");
        const data = await Schema.create({
            title: title
        });
        let objCreated = {_id: data._id, title: data.title};
        return objCreated;
    } catch(err){
        return err.message;
    }
}
async function schemaUpdate(item) {
    let id;
    if(item['id']) id = {"_id": item['id']};
    delete item['id'];
    try {
        if(item.comment === null || item.comment===undefined || item.comment.length===0) throw Error("missing required field comment");
        let newItem = {
            $push: {comments:item.comment},
            $inc:{commentcount:1}
        }

        const data = await Schema.findOneAndUpdate(id, newItem, {new: true});
        if(data === null || data === undefined) throw new Error("no book exists");
        else return data;
    } catch(err) {
        return err.message;
    }
}

async function schemaDelete(item) {
    try {
        const data = await Schema.deleteMany(item).exec();
        if(data.deletedCount === 0) return 'no book exists';
        else if(data.deletedCount === 1) return "successfully deleted";
        else return "complete delete successful";
    } catch(err) {
        return err.message;
    }
}

module.exports = {
    schemafindById,
    schemafind,
    schemaCreate,
    schemaUpdate,
    schemaDelete
}