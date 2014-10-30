Package.describe({
  summary: "a slightly stoopid silly logging tool for meteor",
  // Version number.
  version: "0.0.5",
  // Optional.  Default is package directory name.
  name: "steeve:kenny-loggins",
  // Optional github URL to your source repository.
  git: "https://github.com/stephentcannon/kenny-loggins.git"
});

Package.onUse(function (api) {
  api.versionsFrom('0.9.0');
  
  api.use('mongo@1.0.8');
  
  api.addFiles([
    'lib/Loggins.js',
    'lib/Kenny.js',
    ],
  ['client', 'server']);
  
  api.addFiles('server/loggins.js', 'server');
    
  api.export('Loggins', ['client', 'server']);
  
  api.export('Kenny', ['client', 'server']);
  
});
