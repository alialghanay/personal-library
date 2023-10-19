const Schema = require('./schema.js');

async function schemafind(project){
    try {
        const data = await Schema.find(project).exec();
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
        console.log(err.message);
        return err.message;
    }
}
async function schemaUpdate(item) {
    let id;
    if(item['id']) id = {"_id": item['id']};
    delete item['id'];
    try {
        let newItem = {
            $push: {comments:item.comment},
            $inc:{commentcount:1}
        }

        const data = await Schema.findOneAndUpdate(id, newItem, {new: true});
        if(data === null) return {"error":'could not update', ...id};
        else return {"result":"successfully updated", ...id};
    } catch(err) {
        return err.message;
    }
}

async function schemaDelete(item) {
    try {
        const data = await Schema.deleteMany(item).exec();
        if(data.deletedCount === 0) return {"error":'could not delete any!!!'};
        else if(data.deletedCount === 1) return {"result": "successfully deleted"};
        else return {"result": "complete delete successful"};
    } catch(err) {
        return err.message;
    }
}

module.exports = {
    schemafind,
    schemaCreate,
    schemaUpdate,
    schemaDelete
}