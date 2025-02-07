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

import {
  web3,
  Project,
  stringToHex,
  subContractId,
  binToHex,
  encodeU256,
  ONE_ALPH,
  addressFromContractId
} from '@alephium/web3'
import { testNodeWallet } from '@alephium/web3-test'
import { NodeWallet } from '@alephium/web3-wallet'
import { NFTTest } from '../artifacts/ts/NFTTest'
import { NFTCollectionTest, NFTCollectionTestInstance } from '../artifacts/ts/NFTCollectionTest'
import { MintNFTTest } from '../artifacts/ts/scripts'

describe('nft collection', function () {
  let signer: NodeWallet

  beforeAll(async () => {
    web3.setCurrentNodeProvider('http://127.0.0.1:22973', undefined, fetch)
    signer = await testNodeWallet()
    await Project.build({ errorOnWarnings: false })
  })

  it('should mint nft', async () => {
    const nftUri = stringToHex('https://cryptopunks.app/cryptopunks/details/1')
    const nftTest = (await NFTTest.deploy(signer, { initialFields: { uri: nftUri } })).instance
    expect((await nftTest.methods.getTokenUri()).returns).toEqual(nftUri)

    const collectionUri = stringToHex('https://cryptopunks.app/cryptopunks')
    const nftCollectionTest = (
      await NFTCollectionTest.deploy(signer, {
        initialFields: {
          nftTemplateId: nftTest.contractId,
          collectionUri: collectionUri,
          totalSupply: 0n
        }
      })
    ).instance

    expect((await nftCollectionTest.methods.getCollectionUri()).returns).toEqual(collectionUri)
    expect((await nftCollectionTest.methods.totalSupply()).returns).toEqual(0n)

    for (let i = 0n; i < 10n; i++) {
      await mintAndVerify(nftCollectionTest, nftUri, i)
    }
  }, 10000)

  async function mintAndVerify(nftCollectionTest: NFTCollectionTestInstance, nftUri: string, tokenIndex: bigint) {
    await expect(nftCollectionTest.methods.nftByIndex({ args: { index: tokenIndex } })).rejects.toThrow(Error)
    await MintNFTTest.execute(signer, {
      initialFields: {
        nftCollectionContractId: nftCollectionTest.contractId,
        uri: nftUri
      },
      attoAlphAmount: 2n * ONE_ALPH
    })
    const nftContractId = subContractId(nftCollectionTest.contractId, binToHex(encodeU256(tokenIndex)), 0)
    expect((await nftCollectionTest.methods.nftByIndex({ args: { index: tokenIndex } })).returns).toEqual(nftContractId)

    const nftInstance = NFTTest.at(addressFromContractId(nftContractId))
    const nftFields = (await nftInstance.fetchState()).fields
    expect(nftFields.uri).toEqual(nftUri)

    const stdInterfaceId = await web3.getCurrentNodeProvider().guessStdInterfaceId(nftInstance.contractId)
    expect(stdInterfaceId).toEqual('0003')
  }
})
