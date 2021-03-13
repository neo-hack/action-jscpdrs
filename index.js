const core = require('@actions/core');
const wait = require('./wait');
const exec = require('@actions/exec')
const path = require('path');

// most @actions toolkit packages have async methods
async function run() {
  try {
    // exec.exec('npx jscpdrs-cli')
    const p = path.resolve('./jscpdrs-cli')
    exec(`${p}`)
    const ms = core.getInput('milliseconds');
    core.info(`Waiting ${ms} milliseconds ...`);

    core.debug((new Date()).toTimeString()); // debug is only output if you set the secret `ACTIONS_RUNNER_DEBUG` to true
    await wait(parseInt(ms));
    core.info((new Date()).toTimeString());

    core.setOutput('time', new Date().toTimeString());
  } catch (error) {
    core.setFailed(error.message);
  }
}

run();
