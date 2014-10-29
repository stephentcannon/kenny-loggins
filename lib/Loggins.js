Loggins = new Mongo.Collection("loggins");

Loggins.fields = ['_id', 'createdAt', 'app', 'clientOrServer', 'type', 'data'];

Loggins.validateDates = function(start_date, end_date){

	if(!moment(start_date).isValid()){
		throw 'Invalid start date.';
	}

	if(!moment(end_date).isValid()){
		throw 'Invalid end date.';
	}
};

Loggins.clientLogLevels;
Loggins.serverLogLevels;


Loggins.canLog = function(type, forceClient){
  if(Meteor.isClient || forceClient){
    if(Loggins.clientLogLevels.indexOf(type) != -1){
      return true;
    }
  } else {
    if(Loggins.serverLogLevels.indexOf(type) != -1){
      return true;
    }
  }
}



