const fs = require('fs-extra');
const path = require('path');

function copyTemplate(cwd) {
    const templateDir = path.join(__dirname, '../template');

    fs.readdir(templateDir, (err, files) => {
        if (err) throw err;

        files.forEach(file => {
            const src = path.join(templateDir, file);
            let dest = `${cwd}/${file}`;

            if (file === 'src') {
                dest = `${cwd}/src`;
            } else if (file === '__tsconfig.json') {
                dest = `${cwd}/${file.replace('__', '')}`;
            } else if (file.includes('__')) {
                dest = `${cwd}/${file.replace('__', '.')}`;
            }

            fs.copy(src, dest, err => {
                if (err) throw err;
            });
        });
    });
}

module.exports = copyTemplate;
