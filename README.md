kenny-loggins
===============
a slightly stoopid silly logging tool for meteor

usage
======

````
var myKenny = new Kenny(appname, [loglevels]);

var myKenny = new Kenny('admin', ['success', 'info', 'warning', 'error', 'debug']);
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
myLogger.success(data);

myLogger.info(data);

myLogger.warning(data);

myLogger.error(data);

myLogger.debug(data);

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
