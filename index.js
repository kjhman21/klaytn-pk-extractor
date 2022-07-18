const fs = require('fs')
const Caver = require('caver-js')

async function loadPassword() {
    var read = require('read')

    return new Promise((resolve, reject)=> {
        read({ prompt: 'Password: ', silent: true }, function(er, password) {
            if(er) {
                reject(er)
                return
            }
            resolve(password)
        })

    })

}

async function loadKeystore(filepath) {
    const keystore = fs.readFileSync(filepath, 'utf8')
    const password = await loadPassword()
    return new Caver().wallet.keyring.decrypt(keystore, password)
}

async function main() {
    if(process.argv[2] === undefined) {
        console.log(`Usage: node ${process.argv[1]} <filepath>`)
        return;
    }
    const keystore = await loadKeystore(process.argv[2])
    console.log(keystore)
}

main()