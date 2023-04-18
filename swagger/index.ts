import fs from 'fs';
import yaml from 'js-yaml';
import { join } from 'path';

type SwaggerDoc = {
    paths: Record<string, any>;
};

const files = [
    'welcome.yaml',
    'register.yaml',
    'createCard.yaml',
    'buyCard.yaml',
    'offers.yaml',
    'nfts.yaml'
];

const swaggerDir = join(__dirname, './');

const loadSwagger = (): SwaggerDoc => {
    const swaggerDocs: SwaggerDoc[] = files.map((file) => {
        const contents = fs.readFileSync(join(swaggerDir, file), 'utf-8');
        return yaml.load(contents) as SwaggerDoc;
    });

    const mergedSwagger = swaggerDocs.reduce((acc: SwaggerDoc, doc: SwaggerDoc) => {
        acc.paths = { ...acc.paths, ...doc.paths };
        return acc;
    }, { paths: {} });

    return mergedSwagger;
};

export default loadSwagger;
