kenny-loggins
===============
a slightly stoopid silly logging tool for meteor

step into the danger zone...if you dare!  LANA!

usage
======

````
var myKenny = new Kenny(appname, [loglevels]);

var myKenny = new Kenny('admin', ['success', 'info', 'warning', 'error', 'debug']);
````

server side populate the log with crap data
============================================
```
Meteor.setInterval(function(){
  console.log('testing server logging');
  //try{
    serverKenny.success('attempting success');
    serverKenny.info('attempting info');
    serverKenny.warning('attempting warning');
    serverKenny.error('attempting error');
    serverKenny.debug('attempting debug');
  // }catch(error){
  //   console.log('ERROR in scheduled tasks.');
  //   console.log(error);
  // }
}, 5000); //60000
```

client side populate the log with crap data
============================================

````
  Meteor.setInterval(function(){
    console.log('testing logging');
    //try{
      clientKenny.success('attempting success');
      clientKenny.info('attempting info');
      clientKenny.warning('attempting warning');
      clientKenny.error('attempting error');
      clientKenny.debug('attempting debug');
    // }catch(error){
    //   console.log('ERROR in scheduled tasks.');
    //   console.log(error);
    // }
  }, 5000); //60000
````

examples using a settings.json file
===================================

````
{
  "public": {
    "clientLogLevels": ["success", "info", "warning", "error", "debug"]
  },
  "serverLogLevels": ["success", "info", "warning", "error", "debug"]
}
````

client instance
===============

````
clientKenny = new Kenny('acp', Meteor.settings.public.clientLogLevels);
````

server instance
================

````
serverKenny = new Kenny('acp', Meteor.settings.public.clientLogLevels, Meteor.settings.serverLogLevels);
````

logging messages
=================

````
myKenny.success(data);

myKenny.info(data);

myKenny.warning(data);

myKenny.error(data);

myKenny.debug(data);

````

enterTheDangerZone
===========
this will purge Kenny of his Loggins!

WARNING, you are in the DANGER ZONE!

````
enterTheDangerZone({start_date: Date(), end_date: Date()});

````

* Requires User.admin = true
* User.admin = true can also delete from Loggins from Kenny on the client by _id

subscriptions
==============

````
Meteor.subscribe('loggins', {start_date: Date(), end_date:Date(), logSearchParams: {app: String, clientOrServer: [client, server], type: ["success", "info", "warning", "error", "debug"]}});
````
* Requires User.admin = true