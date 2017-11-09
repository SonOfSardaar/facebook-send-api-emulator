function Database(){
    const base=this;
    const db = require('diskdb');
    db.connect("./db", ["messengerProfile"]);
    
    this.savePersistantMenu=function(data){
        db.messengerProfile.remove({persistant_menu:{}});
        db.messengerProfile.save({persistent_menu:data});
    }

    this.getPersistentMenu= function(){
        var model= db.messengerProfile.findOne({persistant_menu:{}});
        return model;
    }
}

module.exports=new Database();