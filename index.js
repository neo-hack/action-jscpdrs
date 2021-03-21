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
    const renderItem = (item) => {
      return [
        `[${item.duplication_a.source_id}](${item.duplication_a.source_id})`,
        '```ts\n' + item.duplication_a.fragement + '\n```',
        `[${item.duplication_a.source_id}](${item.duplication_b.source_id})`,
        '```ts\n' + item.duplication_b.fragement + '\n```'
      ].join('\n')
    }
    // create issue
    content = JSON.parse(content)
    detected = content.map(item => {
      return renderItem(item)
    }).join('\n')
    const context = github.context;
    await octokit.issues.create({
      ...context.repo,
      title: 'Found copied',
      body: `${detected}`
    });
  } catch (error) {
    core.setFailed(error.message);
  }
}

run();
