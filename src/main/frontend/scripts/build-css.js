const CleanCSS = require('clean-css');
const { writeFile } = require('fs/promises');
const { PurgeCSS } = require('purgecss');

(async () => {
    const result = await new PurgeCSS().purge({
        content: [
            './src/**/*.tsx',
            './src/**/*.ts'
        ],
        css: ['./node_modules/bootstrap/dist/css/bootstrap.css']
    });

    const cleanCSS = new CleanCSS({ returnPromise: true });
    const { styles } = await cleanCSS.minify(result[0].css);

    writeFile('./public/styles.css', styles);
})();
