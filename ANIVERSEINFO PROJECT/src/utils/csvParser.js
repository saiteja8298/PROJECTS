export const parseCSV = (text) => {
    const result = [];
    let row = [];
    let col = '';
    let inQuotes = false;

    // Normalize line endings
    const cleanText = text.replace(/\r\n/g, '\n').replace(/\r/g, '\n');

    let i = 0;
    // If there's a header, skip it or handle it. 
    // We'll assume the first line is header and we want to return objects if keys are provided, 
    // but for simplicity let's just return arrays first or try to detect headers.

    // Actually, let's just do a simple character walk
    while (i < cleanText.length) {
        const char = cleanText[i];
        const nextChar = cleanText[i + 1];

        if (char === '"') {
            if (inQuotes && nextChar === '"') {
                // Escaped quote
                col += '"';
                i++;
            } else {
                // Toggle quote
                inQuotes = !inQuotes;
            }
        } else if (char === ',' && !inQuotes) {
            // New column
            row.push(col);
            col = '';
        } else if (char === '\n' && !inQuotes) {
            // New row
            row.push(col);
            col = '';
            if (row.length > 0 && (row.length > 1 || row[0] !== '')) {
                result.push(row);
            }
            row = [];
        } else {
            col += char;
        }
        i++;
    }

    // Push last row if exists
    if (col || row.length > 0) {
        row.push(col);
        result.push(row);
    }

    // Convert to objects using header
    if (result.length > 1) {
        const headers = result[0].map(h => h.trim());
        const data = [];

        for (let j = 1; j < result.length; j++) {
            const values = result[j];
            if (values.length === headers.length) {
                const obj = {};
                headers.forEach((h, index) => {
                    obj[h] = values[index];
                });
                data.push(obj);
            }
        }
        return { data, headers };
    }

    return { data: [], headers: [] };
};
