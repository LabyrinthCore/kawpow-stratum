KAWPoW-Stratum
=====================

KAWPoW Standalone implementation for using in a pool or solo mining.

This project has been developed and tested on [Node v18.12](https://nodejs.org/) and [Ubuntu 20.04](http://releases.ubuntu.com/20.04/)

## Install ##

__NVM (Ubuntu)__
```bash
# Optional: uninstall current version
sudo apt-get remove node
sudo apt-get remove nodejs

# Install version 10.x
curl https://raw.githubusercontent.com/creationix/nvm/master/install.sh | bash
source ~/.bashrc
nvm install 18
nvm use 18
```

__Dependencies__
```bash
# build essentials required to compile kawpow-hasher
sudo apt-get install build-essentials

__Download from Github__
```bash
git clone https://github.com/LabyrinthCore/kawpow-stratum

# install
cd kawpow-stratum
npm install
```

## Usage ##
The stratum can be used as a module in a pool:
```javascript
const Stratum = require('kawpow-stratum').Stratum;

class MyStratum extends Stratum {
    /* Override */
    canAuthorizeWorker(client, callback) {
        // implement your own logic
        if (client.minerAddress === 'bad') {
            // do not authorize worker
            callback(null/*error*/, false/*isAuthorized*/);
        }
        else {
            // authorize worker
            callback(null/*error*/, true/*isAuthorized*/);
        }
    }
}

const stratum = new MyStratum({
    coinbaseAddress: 'XyAY3TE3K29nrzQ2oo8JXyVPyGF3f7tq6P', // Only legacy addresses are supported for now
    blockBrand: 'Labyrinth solo miner',
    host: "0.0.0.0",
    port: {
        number: 3010,
        diff: 24 // Generally one share per 20-30 seconds is considered great. A good formula to start is hashrate in MHs*1.5
    },
    rpc: {
        host: '127.0.0.1',
        port: 4571,
        user: 'rpcuser',
        password: 'rpcpassword'
    },
    jobUpdateInterval: 55,
    blockPollIntervalMs: 250
});

stratum.on(Stratum.EVENT_SHARE_SUBMITTED, ev => {
    console.log(ev.share);    
});

stratum.init();
```

### Start Script ###
There is a start script (`start.js`) included which contains a ready
configuration fir mining.You will need to open and modify the config inside before
running it.
```
> node start.js
```
