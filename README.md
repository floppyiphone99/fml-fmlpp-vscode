# FML/FML++ VS Code Extension

Full support for **FML** and **FML++** in Visual Studio Code.

---
***FML means Floppy Markup Language***

## Features

- Syntax highlighting with colors for FML/FML++ keywords
- Comment recognition (`BTW,` and `&`)
- Nesting support
- Array and structure support (FML++)
- Automatic conversion to **XML** at runtime
- FML!-style error messages (`FML! Error: ...`)
- Auto-generate XML on save
- Works with `.fml`, `.fmlsucks`, `.fmlpp`, `.fml++` files

---

## Installation

1. Download the `.vsix` file from this repository  
2. Open VS Code  
3. Press **Ctrl+Shift+P → Extensions: Install from VSIX**  
4. Select the downloaded `.vsix`  
5. Done! You can now open any FML/FML++ file and start coding.

---

## Usage

- Open a `.fml`, `.fmlsucks`, `.fmlpp`, or `.fml++` file  
- Press **Ctrl+Shift+P → FML: Convert to XML** to generate XML  
- Errors show as `FML! Error: ...`  
- Save the file → XML auto-generated alongside
***BTW, FML! errors means "fuck my life", coincidentally the acronym for Floppy Markup Language and Fuck My Life are the same lol.***
---

## File Associations

| Language | Extensions |
|----------|------------|
| FML      | `.fml`, `.fmlsucks` |
| FML++    | `.fmlpp`, `.fml++` |

---

## Example (FML++)
`BTW, this is a comment
& You can also do comments like this.
FMLVer is 1.0.0
FMLPPVer is 1.0.0
FML won't be updated, only FML++ does is true
Here's a nest:
~ one level
~~ two levels
~~~ three levels, you can go as high as you want
~ or you can do this, lemme show you
~ is this cool? is yes!
Here's an array:
~ how much people using FML/FML++? (1,2,3,4,5,6)
peace out? is yes`
MIT License  
Feel free to modify and distribute as you like.
