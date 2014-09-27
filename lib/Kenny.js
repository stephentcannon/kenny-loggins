Kenny = function(app, clientLogLevels, serverLogLevels){
  
  this.name = app;
  
  Loggins.clientLogLevels = clientLogLevels;

  Loggins.serverLogLevels = serverLogLevels;
  

  this.success = function(data){
    if(Loggins.canLog('success')){
      this.log(this.name, 'success', data);
    }
  };
  
  this.info = function(data){
    if(Loggins.canLog('info')){
      this.log(this.name, 'info', data);
    }
  };
  
  this.warning = function(data){
    if(Loggins.canLog('warning')){
      this.log(this.name, 'warning', data);
    }
  };
  
  this.error = function(data){
    if(Loggins.canLog('error')){
      this.log(this.name, 'error', data);
    }
  };
  
  this.debug = function(data){
    if(Loggins.canLog('debug')){
      this.log(this.name, 'debug', data);
    }
  };
  
  this.log = function(app, type, data){
  // below is support for client side logging as well as server side logging
    var doc = {
      app: app,
      type: type,
      data: data
    };
    if(Loggins.canLog(type)){
      var clientOrServer = 'server';
      if(Meteor.isClient){
       doc.clientOrServer = 'client';
      } else {
        var ts = new Date();
        doc.createdAt = ts;
        doc.clientOrServer = 'server';
      }
      Loggins.insert(doc);
    }
  };
};
