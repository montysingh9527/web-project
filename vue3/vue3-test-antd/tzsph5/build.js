const AdmZip = require('adm-zip')
const { execSync } = require('child_process')
const fs = require('fs')
const path = require('path')
const os = require('os')

const zip = new AdmZip()

const execSyncStdio = command => execSync(command, { stdio: [ 0, 1, 2 ] })


const release = async() => {

    console.log('开始项目打包')
    execSyncStdio('yarn build')

    console.log('项目打包完成')
    const buildPath = path.join(__dirname, 'dist')
    zip.addLocalFolder(buildPath)
    zip.writeZip('./dist/911111.zip')
    console.log('项目压缩zip')

    console.log('发布成功')
}

release()
