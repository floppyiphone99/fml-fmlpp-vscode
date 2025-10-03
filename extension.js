const vscode = require('vscode');

function activate(context) {
    let disposable = vscode.commands.registerCommand('fml.convertToXML', () => {
        const editor = vscode.window.activeTextEditor;
        if (!editor) {
            vscode.window.showErrorMessage('No FML/FML++ file open!');
            return;
        }

        const text = editor.document.getText();
        try {
            const xml = parseFMLtoXML(text);
            vscode.workspace.openTextDocument({content: xml, language: 'xml'})
                .then(doc => vscode.window.showTextDocument(doc));
        } catch (err) {
            vscode.window.showErrorMessage(`FML! Error: ${err}`);
        }
    });

    context.subscriptions.push(disposable);

    // Auto-convert on save
    vscode.workspace.onDidSaveTextDocument(doc => {
        if (doc.languageId === 'fml' || doc.languageId === 'fmlpp') {
            try {
                const xml = parseFMLtoXML(doc.getText());
                const xmlUri = doc.uri.with({ path: doc.uri.path + '.xml' });
                vscode.workspace.fs.writeFile(xmlUri, Buffer.from(xml, 'utf8'));
            } catch (err) {
                vscode.window.showErrorMessage(`FML! Error: ${err}`);
            }
        }
    });
}

function parseFMLtoXML(text) {
    const lines = text.split('\n');
    let xml = '<root>\n';
    const stack = [];

    lines.forEach((line, index) => {
        line = line.trim();
        if (!line || line.startsWith('BTW,') || line.startsWith('&')) return;

        // Nest start
        if (line.endsWith(':')) {
            const tag = line.slice(0, -1).trim();
            xml += '  '.repeat(stack.length + 1) + `<${tag}>\n`;
            stack.push(tag);
        }
        // Key-value
        else if (line.includes(' is ')) {
            const [key, value] = line.split(' is ').map(s => s.trim());
            xml += '  '.repeat(stack.length + 1) + `<${key}>${value}</${key}>\n`;
        }
        // FML++ nested items
        else if (line.startsWith('~')) {
            xml += '  '.repeat(stack.length + 1) + `<item>${line.replace(/~/g,'').trim()}</item>\n`;
        }
        else if (line.startsWith('(') && line.endsWith(')')) {
            // Array for FML++
            const items = line.slice(1, -1).split(',').map(i => i.trim());
            xml += '  '.repeat(stack.length + 1) + `<array>\n`;
            items.forEach(i => {
                xml += '  '.repeat(stack.length + 2) + `<item>${i}</item>\n`;
            });
            xml += '  '.repeat(stack.length + 1) + `</array>\n`;
        }
        else if (line.startsWith('{') && line.endsWith('}')) {
            // Inline structure
            xml += '  '.repeat(stack.length + 1) + `<structure>${line.slice(1,-1).trim()}</structure>\n`;
        }
        else {
            throw `Invalid syntax on line ${index + 1}`;
        }
    });

    while (stack.length) {
        const tag = stack.pop();
        xml += '  '.repeat(stack.length + 1) + `</${tag}>\n`;
    }

    xml += '</root>';
    return xml;
}

function deactivate() {}

module.exports = { activate, deactivate };
