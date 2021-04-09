import CleanCSS from 'clean-css';
import { writeFile } from 'fs/promises';
import { PurgeCSS } from 'purgecss';

const result = await new PurgeCSS().purge({
    content: [
        './public/**/*.html',
        './src/**/*.tsx',
        './src/**/*.ts'
    ],
    css: ['./node_modules/bootstrap/dist/css/bootstrap.css']
});

const cleanCSS = new CleanCSS({ returnPromise: true });
const { styles } = await cleanCSS.minify(result[0].css);

writeFile('./public/styles.css', styles);