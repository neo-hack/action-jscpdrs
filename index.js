const core = require('@actions/core');
const exec = require('@actions/exec')
const github = require('@actions/github')
const fs = require('fs')
const path = require('path')

const token = core.getInput('repotoken')
const octokit = github.getOctokit(token);

async function run() {
  try {
    // jscpd detect
    const p = path.resolve('./jscpdrs-cli')
    await exec.exec(`${p} --output ${path.resolve('./', 'results.json')}`, [], {
      listeners: {
        stderr: (data) => {
          core.warning(data.toString('utf-8'))
        }
      }
    })
    let content = fs.readFileSync(`${path.resolve('./', 'results.json')}`).toString('utf8')
    // create issue
    content = '```json\n' + content + '\n```' 
    const context = github.context;
    await octokit.issues.create({
      ...context.repo,
      title: 'Found copied',
      body: `${content}`
    });
  } catch (error) {
    core.setFailed(error.message);
  }
}

run();
