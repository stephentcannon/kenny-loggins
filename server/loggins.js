Meteor.publish("loggins", function(options) {
  // console.log('***********[loggins.js] **************');
  // console.log('[loggins.js] options');
  // console.log(options);
  // console.log('[loggins.js] start_date: ');
  // console.log( options.start_date );
  // console.log('[loggins.js] new Date(start_date) works: ' + new Date(options.start_date) );
  // console.log('[loggins.js] end_date: ' + options.end_date );
  // console.log('[loggins.js] new Date(end_date) works: ' + new Date(options.end_date) );
  try{
    if(this.userId){
      if(Meteor.users.findOne({_id: this.userId}).admin){
        var query= {};
        
        if(options.start_date && options.end_date){
          
          Loggins.validateDates(options.start_date, options.end_date);
          
          query.createdAt = { $gte: new Date(options.start_date), $lte: new Date(options.end_date) };
          
        }
          
    
        if(options.searchParams){
          if(options.searchParams.app){
            query.app = options.searchParams.app;
          }
          if(options.searchParams.clientOrServer){
            query.clientOrServer = options.searchParams.clientOrServer;
          }
          if(options.searchParams.type){
            query.type = options.searchParams.type;
          }
        }
      
        return Loggins.find(query);
      }
    }
  }catch(error){
     //throw new Meteor.Error(600, 'Server error: ' + error);
     console.log(error);
     return null;
  }
});

Loggins.allow({
  insert: function (userId, doc) {
    if(Loggins.canLog(doc.type, true)){
      return true;
    }
  },
  update: function () { return false; },
  remove: function (userId, doc) {
    // console.log('Loggins.remove')
    // console.log(userId);
    if(userId){
      if(Meteor.users.findOne({_id: userId}).admin){
        return true;
      } else {
        return false;
      }
    } else {
      return false;
    }
    
  }
});

Loggins.deny({
  insert: function(userId, doc) {
    // console.log('Loggins.deny');
    // console.log(doc);
    // console.log("Loggins.canLog(doc.type, true): " + Loggins.canLog(doc.type, true) );
    if(Loggins.canLog(doc.type, true)){
      var ts = new Date();
      doc.createdAt = ts;
      _.each(doc, function(value, key, list){
        if(Loggins.fields.indexOf(key) == -1 ){
          delete doc[key];
        }
      });
      return false;
    }
  },
  update: function() {return true; },
  // remove: function(userId, doc) {
  // }
  //fetch: []
});

Meteor.methods({
  enterTheDangerZone: function (params) {
    this.unblock();
    if(this.userId){
      if(Meteor.users.findOne({_id: this.userId}).admin){
        Loggins.validateDates(params.start_date, params.end_date);
        Loggins.remove({
          createdAt: { $gte: new Date(params.start_date), $lte: new Date(params.end_date) }
        }, function(error){
          if(error){
            console.log(error);
            throw error;
          }
        });
      }
    }
  },
});