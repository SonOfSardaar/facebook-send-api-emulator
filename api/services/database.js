const low = require('lowdb')
const path=require("path")
const pathHelper=require("./pathHelper")
const FileSync = require('lowdb/adapters/FileSync')

const dbPath=path.resolve(__dirname,"../../database")
const dbFile=path.resolve(dbPath,"db.json")

pathHelper.createDirectoryIfMissing(dbPath)

const adapter = new FileSync(dbFile)
const db = low(adapter)

db.defaults({}).write()

class Database{
    saveData(field, value) {
        db.set(field,value).write();
    }

    getData(field) {
        return db.get(field).value();
    }
}

module.exports=new Database()
