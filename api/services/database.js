const low = require('lowdb')
const path=require("path")
const pathHelper=require("./pathHelper")
const FileSync = require('lowdb/adapters/FileSync')
const shortid = require("shortid");

const dbPath=path.resolve(__dirname,"../../db")
const dbFile=path.resolve(dbPath,"db.json")

pathHelper.createDirectoryIfMissing(dbPath)

const adapter = new FileSync(dbFile)
const db = low(adapter)

db.defaults({labels:[], userLabels:[]}).write()

class Database{
    saveData(field, value) {
        db.set(field,value).write();
    }

    getData(field) {
        return db.get(field).value();
    }

    getLabels(){
        return db.get("labels").value();
    }

    getLabel(id){
        return db.get("labels").find({id}).value();
    }

    removeLabel(id){
        db.get("labels").remove({id}).write();
        db.get("userLabels").remove({labelId:id}).write();
    }

    getUserLabels(userId){
        var labelIds = db.get("userLabels").filter({userId}).map("labelId").value();        
        return db.get("labels").filter(x=>labelIds.includes(x.id)).value();
    }

    addLabel(label){
        db.get("labels").remove({name:label.name}).write();
                
        label.id=shortid.generate();
        
        console.log("writing new label")
        console.log(label);

        db.get("labels").push(label).write();
        return label;
    }

    addUserLabel(userId, labelId){
        var userLabels = db.get("userLabels");
        userLabels.remove({labelId}).write();
        userLabels.push({userId,labelId}).write();
    }

    removeUserLabel(userId, labelId){
        var userLabels = db.get("userLabels");
        userLabels.remove({labelId}).write();
    }
}

module.exports=new Database()
