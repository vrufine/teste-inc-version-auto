const path = require('path')
const fs = require('fs')

const { execSync } = require('child_process');

const incFile = fs
  .readFileSync(path.resolve(__dirname, 'increment'), { encoding: 'utf-8' })

const versionsToUpgrade = incFile
  .split('\n')
  .filter(vl => vl)
  .map(versionLine => {
    const params = versionLine.split('|')
    return {
      type: params[0],
      message: params[1]
    }
  })

console.log(JSON.stringify(versionsToUpgrade, null, 2))

;(async () => {
  for (let i = 0; i < versionsToUpgrade.length; i++) {
    const { message, type } = versionsToUpgrade[i];
    console.log('currentVersion =>', { message, type })
    execSync(`npm version ${type} -m "${message}"`)
    console.log('ok!!!\n')
  }
})()
