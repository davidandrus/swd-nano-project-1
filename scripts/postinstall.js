import fs from 'fs-extra';
import path from 'path';

const normalizePath = path.join(__dirname, '..', 'node_modules', 'normalize-css', 'normalize.css');

fs.mkdirs('static', (err) => {});
fs.copy(normalizePath, 'static/normalize.css');
