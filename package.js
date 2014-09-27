Package.describe({
  summary: "a slightly stoopid silly logging tool for meteor"
});

Package.on_use(function (api) {
  
  api.add_files([
    'lib/Loggins.js',
    'lib/Kenny.js',
    ],
  ['client', 'server']);
  
  api.add_files('server/loggins.js', 'server');
    
  api.export('Loggins', ['client', 'server']);
  
  api.export('Kenny', ['client', 'server']);
  
});
