const glob = require('glob');
const path = require('path');
const fse = require('fs-extra');
const replace = require('replace-in-file');

const paths = {
  target: path.join(__dirname, '..', 'src', 'react-schema-form', 'extensions', '**', '*'),
  srcRoot: path.join(__dirname, '..', 'src', 'react-schema-form', '**', '*.js'),
};

const textTransform = (text) => {
  const snake_case = text
    .replace(/([A-Z][A-Z]+)/g, (whole, p1) => `_${p1.toLowerCase()}`)
    .replace(/([A-Z])/g, (whole, p1) => `_${p1.toLowerCase()}`)
    .replace(/-/g, '_').replace(/[_]{1,}/g, '_')
    .replace(/^_/, '');
  return {
    snake_case,
    SNAKE_CASE: snake_case.toUpperCase(),
    'kebab-case': snake_case.replace(/_/g, '-'),
    lowercase: snake_case.replace(/_/g, ''),
    camelCase: snake_case.replace(/_([a-z])/g, (whole, p1) => p1.toUpperCase()),
    PascalCase: snake_case.replace(/(^|_)([a-z])/g, (whole, p1, p2) => p2.toUpperCase()),
  };
};

glob.sync(paths.target)
  // .filter((src) => {
  .filter((src) => {
    const { name, ext } = path.parse(src);
    if (name.search(/^[A-Z]/) === -1) {
      return false;
    }
    if (name.search('pug.transpiled') !== -1) {
      return false;
    } 
    if (['.pug', '.js', '.scss'].indexOf(ext) === -1) {
      return false;
    } 
    return true;
    // console.log(filename);
  })
  .forEach((src) => {
    // const filename = src.split('/').pop();

    const {
      dir, name, ext, base, 
    } = path.parse(src);

    console.log(path.parse(src));

    // const dest = path.join(dir, `${textTransform(name)['kebab-case']}.component${ext}`);
    const newPureName = `${textTransform(name)['kebab-case']}.component`;
    const newName = `${newPureName}${ext}`;
    
    const dest = path.join(dir, newName);
    // console.log();
    // console.log(src);
    // console.log(dest);

    // console.log(`'s/${base}/${newName}/g'`);
    // console.log(paths.srcRoot);

    // exec(['sed', '-i', '-e', `'s/${base}/${newName}/g'`, paths.srcRoot].join(' '));

    // console.log(['sed', '-i', '-e', `'s/${base}/${newName}/g'`, paths.srcRoot].join(' '));

    if (ext === '.js') {
      replace.sync({
        files: paths.srcRoot,
        from: `import ${name} from './${name}'`,
        to: `import ${name} from './${newPureName}'`,
      });
    } else {
      replace.sync({
        files: paths.srcRoot,
        from: base,
        to: newName,
      });
    }

    fse.moveSync(src, dest);
    

    // sed -i -e 's/import/impt/g' **/*.js

    // console.log(info);
    
    // console.log(name, '  ==>  ', `${textTransform(name)['kebab-case']}.component${ext}`);
  });

