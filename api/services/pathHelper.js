const low = require('lowdb')
var fs = require('fs');

module.exports={
    createDirectoryIfMissing:function(dir){   
        if (!fs.existsSync(dir)){
            fs.mkdirSync(dir)
        }
    },

    createFileIfMissing:function(file,content){   
        if (!fs.existsSync(file)){
            fs.writeFileSync(file,content,'utf8')
        }
    }
}
