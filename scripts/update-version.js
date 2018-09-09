const fs = require('fs');

// Update the manifest version to match the pubspec version

const packagePath = 'package.json';
const manifestPath = 'dist/manifest.json';

const packageJson = JSON.parse(fs.readFileSync(packagePath));
const manifestJson = JSON.parse(fs.readFileSync(manifestPath));

const version = packageJson['version'];
manifestJson['version'] = version;

fs.writeFileSync(manifestPath, JSON.stringify(manifestJson, null, 2) + '\n');
