/*
Copyright 2018 - 2022 The Alephium Authors
This file is part of the alephium project.

The library is free software: you can redistribute it and/or modify
it under the terms of the GNU Lesser General Public License as published by
the Free Software Foundation, either version 3 of the License, or
(at your option) any later version.

The library is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
GNU Lesser General Public License for more details.

You should have received a copy of the GNU Lesser General Public License
along with the library. If not, see <http://www.gnu.org/licenses/>.
*/

import EC from 'elliptic'
import assert from 'assert'

import * as utils from './utils'

describe('utils', function () {
  it('should throw an error when decoding invalid signature', () => {
    const ec = new EC.ec('secp256k1')
    const signature = 'signature-with-wrong-length'

    expect(() => utils.signatureDecode(ec, signature)).toThrowError('Invalid signature length')
  })

  it('should compress signature', () => {
    const vectors = [
      [
        'Satoshi Nakamoto',
        '0000000000000000000000000000000000000000000000000000000000000001',
        '934b1ea10a4b3c1757e2b0c017d0b6143ce3c9a7e6a4a49860d7a6ab210ee3d82442ce9d2b916064108014783e923ec36b49743e2ffa1c4496f01a512aafd9e5'
      ],
      [
        'Everything should be made as simple as possible, but not simpler.',
        '0000000000000000000000000000000000000000000000000000000000000001',
        '33a69cd2065432a30f3d1ce4eb0d59b8ab58c74f27c41a7fdb5696ad4e6108c96f807982866f785d3f6418d24163ddae117b7db4d5fdf0071de069fa54342262'
      ],
      [
        'All those moments will be lost in time, like tears in rain. Time to die...',
        '0000000000000000000000000000000000000000000000000000000000000001',
        '8600dbd41e348fe5c9465ab92d23e3db8b98b873beecd930736488696438cb6b547fe64427496db33bf66019dacbf0039c04199abb0122918601db38a72cfc21'
      ],
      [
        'Satoshi Nakamoto',
        'fffffffffffffffffffffffffffffffebaaedce6af48a03bbfd25e8cd0364140',
        'fd567d121db66e382991534ada77a6bd3106f0a1098c231e47993447cd6af2d06b39cd0eb1bc8603e159ef5c20a5c8ad685a45b06ce9bebed3f153d10d93bed5'
      ],
      [
        'Alan Turing',
        'f8b8af8ce3c7cca5e300d33939540c10d45ce001b8f252bfbc57ba0342904181',
        '7063ae83e7f62bbb171798131b4a0564b956930092b33b07b395615d9ec7e15c58dfcc1e00a35e1572f366ffe34ba0fc47db1e7189759b9fb233c5b05ab388ea'
      ],
      [
        "There is a computer disease that anybody who works with computers knows about. It's a very serious disease and it interferes completely with the work. The trouble with computers is that you 'play' with them!",
        'e91671c46231f833a6406ccbea0e3e392c76c167bac1cb013f6f1013980455c2',
        'b552edd27580141f3b2a5463048cb7cd3e047b97c9f98076c32dbdf85a68718b279fa72dd19bfae05577e06c7c0c1900c371fcd5893f7e1d56a37d30174671f6'
      ]
    ]

    const ec = new EC.ec('secp256k1')

    vectors.forEach((vector) => {
      const privateKey = vector[1]
      const signatureExpected = vector[2]
      const keyPair = ec.keyFromPrivate(privateKey)

      const message = vector[0]
      const sha256 = ec.hash().update(message).digest()
      const signature = utils.signatureEncode(keyPair.sign(sha256))
      assert.deepStrictEqual(signature, signatureExpected)
    })
  })

  it('should calculate the group of addresses', () => {
    expect(utils.groupOfAddress('15EM5rGtt7dPRZScE4Z9oL2EDfj84JnoSgq3NNgdcGFyu')).toBe(0),
      expect(utils.groupOfAddress('1D59jXR9NpD9ZQqZTRVcVbKVh6ko5TUMt89WvkA8P9P7w')).toBe(1),
      expect(utils.groupOfAddress('14tAT3nm7UqVP7gZ35icSdT3AEffv1kaUUMbWQK5PFygr')).toBe(2),
      expect(utils.groupOfAddress('12F5aVQoQ7cNrgsVN2YPciwYvwmtJp4ohLa2x4R5KgLbG')).toBe(3),
      expect(
        utils.groupOfAddress(
          '2jW1n2icPtc55Cdm8TF9FjGH681cWthsaZW3gaUFekFZepJoeyY3ZbY7y5SCtAjyCjLL24c4L2Vnfv3KDdAypCddfAY'
        )
      ).toBe(0),
      expect(
        utils.groupOfAddress(
          '2jXboVD9p66wrAHkPHx2AQocAzYXUWeppmRT3PuVT3ccxX9u8puTnwLeQ2VbTd4sNkgSEgk1cLbyVGLFshGweJCk1Mr'
        )
      ).toBe(1),
      expect(
        utils.groupOfAddress(
          '2je1yvQHpg8bKCDmvr1koELSNbty5DHrHYRkXomiRNvP5VcsZTK3WisBco2sCtCULM2YbxRxPd7QwhdP2hz9PEQwB1S'
        )
      ).toBe(2),
      expect(
        utils.groupOfAddress(
          '2jWukVCejM4Zifz9LvMG4dfR6SEecHLX8VqbswhGwnu61d28B861UhLu3ZmTHu4N14m1kk9rbxreBYzcxta1WPawKzG'
        )
      ).toBe(3),
      expect(utils.groupOfAddress('eBrjfQNeyUCuxE4zpbfMZcbS3PuvbMJDQBCyk4HRHtX4')).toBe(0),
      expect(utils.groupOfAddress('euWxyF55nGTxavL6mgGeMrFdvSRzHor8AmhgPXm8Lm9D')).toBe(1),
      expect(utils.groupOfAddress('n2pYTzmA27tkp7UNFPhMJpjz3jr5vgessxqJ7kwomBMF')).toBe(2),
      expect(utils.groupOfAddress('tLf6hDfrUugmxZhKxGoZMpAUBt3NcZ2hrTspTCmZ6JdQ')).toBe(3)
  })

  it('should extract token id from addresses', () => {
    expect(utils.binToHex(utils.tokenIdFromAddress('wCTeteGBeSEC54GpkS8jWBzYiYNTBUuTW3WzxGd9yExT'))).toBe(
      '25469eb0d0d0a55deea832924547b7b166c70a3554fe321e81886d3c18f19d64'
    ),
      expect(utils.binToHex(utils.tokenIdFromAddress('xrY8dxgVm38QCQXhiUFcivFutLFUNMoo8qu8vYf7wJps'))).toBe(
        '3de370f893cb1383c828c0eb22c89aceb13fa56ddced1848db27ce7fa419c80c'
      ),
      expect(() => utils.tokenIdFromAddress('eBrjfQNeyUCuxE4zpbfMZcbS3PuvbMJDQBCyk4HRHtX4')).toThrow(
        'Invalid contract address type: 2'
      ),
      expect(() => utils.tokenIdFromAddress('..')).toThrow('Non-base58 character')
  })

  it('should compute public key from private key', () => {
    expect(utils.publicKeyFromPrivateKey('91411e484289ec7e8b3058697f53f9b26fa7305158b4ef1a81adfbabcf090e45')).toBe(
      '030f9f042a9410969f1886f85fa20f6e43176ae23fc5e64db15b3767c84c5db2dc'
    )
  })

  it('should compute address from public key', () => {
    expect(utils.publicKeyFromPrivateKey('91411e484289ec7e8b3058697f53f9b26fa7305158b4ef1a81adfbabcf090e45')).toBe(
      '030f9f042a9410969f1886f85fa20f6e43176ae23fc5e64db15b3767c84c5db2dc'
    )
    expect(utils.addressFromPublicKey('030f9f042a9410969f1886f85fa20f6e43176ae23fc5e64db15b3767c84c5db2dc')).toBe(
      '1ACCkgFfmTif46T3qK12znuWjb5Bk9jXpqaeWt2DXx8oc'
    )
  })

  it('should convert between contract id and address', () => {
    expect(utils.addressFromContractId('1f6b937b935d7fac894fb22ffe2b974cae9c8c166501372f1b9155144e0ff4ae')).toBe(
      'vobthYg1e9tPKhmF96rpkv3akCj7vhvgPpsP4qwZqDw3'
    )
    expect(utils.binToHex(utils.contractIdFromAddress('vobthYg1e9tPKhmF96rpkv3akCj7vhvgPpsP4qwZqDw3'))).toBe(
      '1f6b937b935d7fac894fb22ffe2b974cae9c8c166501372f1b9155144e0ff4ae'
    )
  })

  it('should compute id of the sub contract', () => {
    expect(
      utils.subContractId(
        '0a38bc48fbb4300f1e305b201cd6129372d867122efb814d871d18c0bfe43b56',
        '4f51cd1f0af97cf5ec9c7a3397eaeea549d55a93c216e54f2ab4a8cf29f6f865'
      )
    ).toBe('0e28f15ca290002c31d691aa008aa56ac12356b0380efb6c88fff929b6a268a9')
  })

  it('should convert from string to hex and back', () => {
    expect(utils.stringToHex('Hello Alephium!')).toBe('48656c6c6f20416c65706869756d21')
    expect(utils.hexToString('48656c6c6f20416c65706869756d21')).toBe('Hello Alephium!')
  })
})
