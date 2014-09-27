Meteor.publish("loggins", function(options) {
  console.log('***********[loggins.js] **************');
  console.log('[loggins.js] options');
  console.log(options);
  console.log('[loggins.js] start_date: ');
  console.log( options.start_date );
  console.log('[loggins.js] new Date(start_date) works: ' + new Date(options.start_date) );
  console.log('[loggins.js] end_date: ' + options.end_date );
  console.log('[loggins.js] new Date(end_date) works: ' + new Date(options.end_date) );
  try{
  
    if(options.start_date && options.end_date){
      
      Loggins.validateDates(options.start_date, options.end_date);
      
      var query= {};
      
      query.createdAt = { $gte: new Date(options.start_date), $lte: new Date(options.end_date) };
    
      
      if(options.logSearchParams){
        if(options.logSearchParams.app){
          query.app = options.logSearchParams.app;
        }
        if(options.logSearchParams.clientOrServer){
          query.clientOrServer = options.logSearchParams.clientOrServer;
        }
        if(options.logSearchParams.type){
          query.type = options.logSearchParams.type;
        }
      }
      
      return Loggins.find(query);
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
  remove: function (userId, doc) { return false; }
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
  remove: function() {return true; }
  //fetch: []
});

Meteor.methods({
  purgeLoggins: function (params) {
    this.unblock();
    if(this.userId){
      if(Meteor.users.findOne({_id: this.userId}.admin)){
        Loggins.validateDates(params.start_date, params.end_date);
        Loggins.remove({
          created_td: { $gte: new Date(params.start_date), $lte: new Date(params.end_date) }
        }, function(error){
          if(error){
            throw error
          }
        });
      }
    }
  },
});