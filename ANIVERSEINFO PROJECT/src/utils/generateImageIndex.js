const fs = require('fs');
const path = require('path');

const datasetDir = path.join(__dirname, '../../public/Dataset');
const outputFile = path.join(__dirname, '../../public/local-images.json');

try {
    const items = fs.readdirSync(datasetDir, { withFileTypes: true });
    const directories = items
        .filter(item => item.isDirectory())
        .map(item => item.name);

    fs.writeFileSync(outputFile, JSON.stringify(directories, null, 2));
    console.log(`Successfully generated index with ${directories.length} entries.`);
} catch (error) {
    console.error('Error generating image index:', error);
}
