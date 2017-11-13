const path=require("path");

function Database() {
    const base = this;
    const jsonFile=require("jsonfile");
    
    var data={};
    var dataFile=path.join(__dirname,"../db/data.json");
    try{
        data=jsonFile.readFileSync(dataFile);
    }catch(error){
        console.log(error);
    }

    this.saveData = function (field, value) {
        data[field]=value;
        jsonFile.writeFile(dataFile, data,{spaces:2},error=>{
            const message=error|| (field + " saved");
            console.log(message);
        });
    }

    this.getData = function (field) {
        return data[field];
    }
}

module.exports = new Database();