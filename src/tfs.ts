const fs = require('fs');

import simpleGit from 'simple-git';

export async function startGitProcess(): Promise<void> {
    console.log('Handle git process');
    const git = simpleGit();

    await git.clone('https://github.com/dorickweb/crm-header.git');
    await git.clone('https://github.com/dorickweb/crm-interactions.git');

    const filePath = 'resources.en-US.json';
    
    await fs.copyFile(filePath, 'crm-header/resources/resources.en-ES.json', (error: any) => {
      if (error) {
        throw error
      } else {
        console.log('File has been moved to another folder.')
      }
    })

    await fs.copyFile(filePath, 'crm-interactions/resources/resources.en-ES.json', (error: any) => {
        if (error) {
            throw error
        } else {
            console.log('File has been moved to another folder.')
        }
    })

    await git.checkoutLocalBranch('tfs-prs');

    await git.add('crm-header/resources/resources.en-ES.json')
        .commit('Committing resource file')
        .push('https://github.com/dorickweb/crm-header.git', 'tfs-prs');
        
    await git.add('crm-interactions/resources/resources.en-ES.json')
        .commit('Committing resource file')
        .push('https://github.com/dorickweb/crm-interactions.git', 'tfs-prs');
}


