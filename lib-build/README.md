# ngex-dialog

This is a modal dialog service library for applications with Angular versions 8 - 11. The libray was generated with [Angular CLI](https://github.com/angular/angular-cli) version 11.

## Installation

Run `npm install ngex-dialog` to add the library into your project directory.

## Demo Application

The source code can be downloaded from the [github repository](https://github.com/shenweiliu/ngex-dialog).

## Details and Use Cases

To see how to use the dialog in details, please go check out the article [An Angular Modal Dialog with Advanced Functionality and Easy-use Features](https://www.codeproject.com/Articles/1179258/An-Angular-Modal-Dialog-with-Advanced-Functionalit).

The sample application directly uses the TypeScript code of the NgExDialog modules and components, not the library as downloaded here, but the use cases and workflow are the same. 

## Notes on Styles

The dialog depends on the bootstrap css library. The dialog supports the *bootstrap.css* versions 3.3.7 to 4.3.1. You can add the `bootstrap` into your package.json file, for example `"bootstrap": "4.3.1"`, and then update the `node_modules`. 

The *ex-dialog.css* file containing all base style settings for the dialog is not included in the installed library. You may need to have it under the *app-bootstrap.css{verion}/src/assets/css* folder from the [github repository](https://github.com/shenweiliu/ngex-dialog). The icon images for the basic-type dialogs can also be downloaded there.
