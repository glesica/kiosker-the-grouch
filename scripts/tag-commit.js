const cp = require('child_process');
const fs = require('fs');

const packagePath = 'package.json';
const packageJson = JSON.parse(fs.readFileSync(packagePath));
const version = packageJson['version'];

// Ensure the version hasn't been tagged before

const tags = cp.execSync('git tag -l');
if (tags.indexOf(version) > -1) {
    console.error('version has already been tagged, skipping');
    process.exit();
}

// Tag the version

const output = cp.execSync('git tag ' + version);
console.log(output);
