'use strict';

const kawpow = require('@mintpond/hasher-kawpow');

module.exports = {
    diff1: 0x00000000ffff0000000000000000000000000000000000000000000000000000,
    multiplier: Math.pow(2, 8),
    epochLen: 7500,
    verify: (headerHashBuf, nonceBuf, blockHeight, mixHashBuf, hashOutBuf) => {
        return kawpow.verify(headerHashBuf, nonceBuf, blockHeight, mixHashBuf, hashOutBuf);
    }
};