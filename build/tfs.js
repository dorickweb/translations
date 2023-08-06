"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.startGitProcess = void 0;
const fs = require('fs');
const simple_git_1 = __importDefault(require("simple-git"));
function startGitProcess() {
    return __awaiter(this, void 0, void 0, function* () {
        console.log('Handle git process');
        const git = (0, simple_git_1.default)();
        //await git.deleteLocalBranch('tfs-prs');
        yield git.clone('https://github.com/dorickweb/crm-header.git');
        // await git.clone('https://github.com/dorickweb/crm-interactions.git');
        const filePath = 'resources.en-US.json';
        yield fs.copyFile(filePath, 'crm-header/resources/resources.en-ES.json', (error) => {
            if (error) {
                throw error;
            }
            else {
                console.log('File has been moved to another folder.');
            }
        });
        // await fs.copyFile(filePath, 'crm-interactions/resources/resources.en-ES.json', (error: any) => {
        //     if (error) {
        //         throw error
        //     } else {
        //         console.log('File has been moved to another folder.')
        //     }
        // })
        process.chdir('crm-header');
        yield git.checkoutLocalBranch('tfs-prs-commit');
        yield git.add('crm-header/resources/resources.en-ES.json')
            .commit('Committing resource file')
            .push('https://github.com/dorickweb/crm-header.git', 'tfs-prs-commit');
        // await git.add('crm-interactions/resources/resources.en-ES.json')
        //     .commit('Committing resource file')
        //     .push('https://github.com/dorickweb/crm-interactions.git', 'tfs-prs');
    });
}
exports.startGitProcess = startGitProcess;
