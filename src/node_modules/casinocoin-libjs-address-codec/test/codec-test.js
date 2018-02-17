'use strict';

var assert = require('assert');
var api = require('../');

function toHex(bytes) {
    return new Buffer(bytes).toString('hex').toUpperCase();
}

function toBytes(hex) {
    return new Buffer(hex, 'hex').toJSON().data;
}

describe('casinocoin-libjs-address-codec', function() {
    function makeTest(type, base58, hex) {
        it('can translate between ' + hex + ' and ' + base58, function() {
            var actual = api['encode' + type](toBytes(hex));
            assert.equal(actual, base58);
        });
        it('can translate between ' + base58 + ' and ' + hex, function() {
            var buf = api['decode' + type](base58);
            assert.equal(toHex(buf), hex);
        });
    }

    makeTest('AccountID',
        'cMhWoNXXXBBemk7UuKS2mvZBk355Nbk2YA',
        'DC0CA30F015B7D671B18A66ACE0A53A21FB2D9E8');

    makeTest(
        'NodePublic',
        'n9MhDFfzn1y1yYHPBzHdzUbbU1p28c66QRicKafAXW37wXDboAFo',
        '034AE1D590C053FFDB4008F31039773DF5EDD6351083ABFD8411627FDAFFD0601E');

    makeTest('K256Seed',
        'saBLJeygVP4r3kTCpWBUfsZ16sZPk',
        'FA07384E851B5CE4A54D21EE4B699AE6');

    // don't test ed25519 for now
    /*
    makeTest('EdSeed',
        'snev2DR5RYkcQuSQwP2BVqEFvoQGC',
        'D465143E55F91CC1DC5B4C7F7A57CFB0');
    */
    it('can decode arbitray seeds', function() {
        // var decoded = api.decodeSeed('snev2DR5RYkcQuSQwP2BVqEFvoQGC');
        // console.log("Hex decoded: " + toHex(decoded.bytes));
        // assert.equal(toHex(decoded.bytes), 'D465143E55F91CC1DC5B4C7F7A57CFB0');
        // assert.equal(decoded.type, 'ed25519');

        var decoded2 = api.decodeSeed('sny17ZUyQRkcF9AnXm53S8vALuz5n');
        assert.equal(toHex(decoded2.bytes), 'EBD7AE87A608B6281E13D0645D0C0B7C');
        assert.equal(decoded2.type, 'secp256k1');
    });
    /*
    it('can pass a type as second arg to encodeSeed', function() {
        var edSeed = 'sEdTM1uX8pu2do5XvTnutH6HsouMaM2';
        var decoded = api.decodeSeed(edSeed);
        assert.equal(toHex(decoded.bytes), '4C3A1D213FBDFB14C7C28D609469B341');
        assert.equal(decoded.type, 'ed25519');
        assert.equal(api.encodeSeed(decoded.bytes, decoded.type), edSeed);
    });
    */
    it('isValidAddress - secp256k1 address valid', function() {
        assert(api.isValidAddress('cHfUJkpqFoDqFJmDyV8ztg5QfoyMbL29Ap'));
    });
    it('isValidAddress - ed25519 address valid', function() {
        assert(api.isValidAddress('cpcPqHu4TpXwF34LN5TGvB31QE5L3bNYWy'));
    });
    it('isValidAddress - invalid', function() {
        assert(!api.isValidAddress('cpacPqHu4TpXwF34LN5TGvB31QE5L3bNYWyasdf'));
    });
    it('isValidAddress - empty', function() {
        assert(!api.isValidAddress(''));
    });

});