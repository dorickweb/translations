"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.startGitProcess = void 0;
const fs = require('fs');
const simple_git_1 = __importDefault(require("simple-git"));
function startGitProcess() {
    console.log('Handle git process');
    const git = (0, simple_git_1.default)();
    git.clone('https://github.com/dorickweb/crm-header.git');
    process.chdir('crm-header');
    // const filePath = './img/samurai.jpg'
    // const copy = 'crm-header/'
    // fs.copyFile(filePath, copy, (error: any) => {
    //   if (error) {
    //     throw error
    //   } else {
    //     console.log('File has been moved to another folder.')
    //   }
    // })
}
exports.startGitProcess = startGitProcess;
