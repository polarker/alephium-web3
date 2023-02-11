/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import {
  web3,
  Contract as ContractArtifact,
  SignerProvider,
  Address,
  Token,
  toApiVals,
  ContractState,
  node,
  binToHex,
  TestContractResult,
  InputAsset,
  Asset,
  HexString,
  SignDeployContractTxResult,
  contractIdFromAddress,
  fromApiArray,
  ONE_ALPH,
  groupOfAddress,
} from "@alephium/web3";

export namespace TokenTest {
  export type Fields = {
    symbol: HexString;
    name: HexString;
    decimals: bigint;
    totalSupply: bigint;
  };

  export type State = Fields & Omit<ContractState, "fields">;

  export async function deploy(
    signer: SignerProvider,
    initFields: Fields,
    deployParams?: {
      initialAttoAlphAmount?: bigint;
      initialTokenAmounts?: Token[];
      issueTokenAmount?: bigint;
      gasAmount?: number;
      gasPrice?: bigint;
    }
  ): Promise<SignDeployContractTxResult & { instance: TokenTestInstance }> {
    const deployResult = await artifact.deploy(signer, {
      initialFields: initFields,
      initialAttoAlphAmount: deployParams?.initialAttoAlphAmount,
      initialTokenAmounts: deployParams?.initialTokenAmounts,
      issueTokenAmount: deployParams?.issueTokenAmount,
      gasAmount: deployParams?.gasAmount,
      gasPrice: deployParams?.gasPrice,
    });
    const instance = at(deployResult.contractAddress);
    return { instance: instance, ...deployResult };
  }

  export function at(address: string): TokenTestInstance {
    return new TokenTestInstance(address);
  }

  // This is used for testing contract functions
  export function stateForTest(
    symbol: HexString,
    name: HexString,
    decimals: bigint,
    totalSupply: bigint,
    asset?: Asset,
    address?: string
  ): ContractState {
    const newAsset = {
      alphAmount: asset?.alphAmount ?? ONE_ALPH,
      tokens: asset?.tokens,
    };
    return TokenTest.artifact.toState(
      {
        symbol: symbol,
        name: name,
        decimals: decimals,
        totalSupply: totalSupply,
      },
      newAsset,
      address
    );
  }

  export async function testGetSymbolMethod(
    initFields: Fields,
    testParams?: {
      group?: number;
      address?: string;
      initialAsset?: Asset;
      existingContracts?: ContractState[];
      inputAssets?: InputAsset[];
    }
  ): Promise<Omit<TestContractResult, "returns"> & { returns: [HexString] }> {
    const initialAsset = {
      alphAmount: testParams?.initialAsset?.alphAmount ?? ONE_ALPH,
      tokens: testParams?.initialAsset?.tokens,
    };
    const _testParams = {
      ...testParams,
      testMethodIndex: 0,
      testArgs: {},
      initialFields: initFields,
      initialAsset: initialAsset,
    };
    const testResult = await artifact.testPublicMethod(
      "getSymbol",
      _testParams
    );
    return { ...testResult, returns: testResult.returns as [HexString] };
  }

  export async function testGetNameMethod(
    initFields: Fields,
    testParams?: {
      group?: number;
      address?: string;
      initialAsset?: Asset;
      existingContracts?: ContractState[];
      inputAssets?: InputAsset[];
    }
  ): Promise<Omit<TestContractResult, "returns"> & { returns: [HexString] }> {
    const initialAsset = {
      alphAmount: testParams?.initialAsset?.alphAmount ?? ONE_ALPH,
      tokens: testParams?.initialAsset?.tokens,
    };
    const _testParams = {
      ...testParams,
      testMethodIndex: 1,
      testArgs: {},
      initialFields: initFields,
      initialAsset: initialAsset,
    };
    const testResult = await artifact.testPublicMethod("getName", _testParams);
    return { ...testResult, returns: testResult.returns as [HexString] };
  }

  export async function testGetDecimalsMethod(
    initFields: Fields,
    testParams?: {
      group?: number;
      address?: string;
      initialAsset?: Asset;
      existingContracts?: ContractState[];
      inputAssets?: InputAsset[];
    }
  ): Promise<Omit<TestContractResult, "returns"> & { returns: [bigint] }> {
    const initialAsset = {
      alphAmount: testParams?.initialAsset?.alphAmount ?? ONE_ALPH,
      tokens: testParams?.initialAsset?.tokens,
    };
    const _testParams = {
      ...testParams,
      testMethodIndex: 2,
      testArgs: {},
      initialFields: initFields,
      initialAsset: initialAsset,
    };
    const testResult = await artifact.testPublicMethod(
      "getDecimals",
      _testParams
    );
    return { ...testResult, returns: testResult.returns as [bigint] };
  }

  export async function testGetTotalSupplyMethod(
    initFields: Fields,
    testParams?: {
      group?: number;
      address?: string;
      initialAsset?: Asset;
      existingContracts?: ContractState[];
      inputAssets?: InputAsset[];
    }
  ): Promise<Omit<TestContractResult, "returns"> & { returns: [bigint] }> {
    const initialAsset = {
      alphAmount: testParams?.initialAsset?.alphAmount ?? ONE_ALPH,
      tokens: testParams?.initialAsset?.tokens,
    };
    const _testParams = {
      ...testParams,
      testMethodIndex: 3,
      testArgs: {},
      initialFields: initFields,
      initialAsset: initialAsset,
    };
    const testResult = await artifact.testPublicMethod(
      "getTotalSupply",
      _testParams
    );
    return { ...testResult, returns: testResult.returns as [bigint] };
  }

  export const artifact = ContractArtifact.fromJson(
    JSON.parse(`{
  "version": "v1.7.0",
  "name": "TokenTest",
  "bytecode": "040409121b4024010000000102ce0002010000000102ce0102010000000102ce0202010000000102ce0302",
  "codeHash": "d9c9fab84f779f2e90ca9e9b1fafd6d9c9dc0f8b84256169e20961f9c917bab8",
  "fieldsSig": {
    "names": [
      "symbol",
      "name",
      "decimals",
      "totalSupply"
    ],
    "types": [
      "ByteVec",
      "ByteVec",
      "U256",
      "U256"
    ],
    "isMutable": [
      false,
      false,
      false,
      false
    ]
  },
  "eventsSig": [],
  "functions": [
    {
      "name": "getSymbol",
      "usePreapprovedAssets": false,
      "useAssetsInContract": false,
      "isPublic": true,
      "paramNames": [],
      "paramTypes": [],
      "paramIsMutable": [],
      "returnTypes": [
        "ByteVec"
      ]
    },
    {
      "name": "getName",
      "usePreapprovedAssets": false,
      "useAssetsInContract": false,
      "isPublic": true,
      "paramNames": [],
      "paramTypes": [],
      "paramIsMutable": [],
      "returnTypes": [
        "ByteVec"
      ]
    },
    {
      "name": "getDecimals",
      "usePreapprovedAssets": false,
      "useAssetsInContract": false,
      "isPublic": true,
      "paramNames": [],
      "paramTypes": [],
      "paramIsMutable": [],
      "returnTypes": [
        "U256"
      ]
    },
    {
      "name": "getTotalSupply",
      "usePreapprovedAssets": false,
      "useAssetsInContract": false,
      "isPublic": true,
      "paramNames": [],
      "paramTypes": [],
      "paramIsMutable": [],
      "returnTypes": [
        "U256"
      ]
    }
  ]
}`)
  );
}

export class TokenTestInstance {
  readonly address: Address;
  readonly contractId: string;
  readonly groupIndex: number;

  constructor(address: Address) {
    this.address = address;
    this.contractId = binToHex(contractIdFromAddress(address));
    this.groupIndex = groupOfAddress(address);
  }

  async fetchState(): Promise<TokenTest.State> {
    const state = await TokenTest.artifact.fetchState(
      this.address,
      this.groupIndex
    );
    return {
      ...state,
      symbol: state.fields["symbol"] as HexString,
      name: state.fields["name"] as HexString,
      decimals: state.fields["decimals"] as bigint,
      totalSupply: state.fields["totalSupply"] as bigint,
    };
  }

  async callGetSymbolMethod(callParams?: {
    worldStateBlockHash?: string;
    txId?: string;
    existingContracts?: string[];
    inputAssets?: node.TestInputAsset[];
  }): Promise<HexString> {
    const callResult = await web3
      .getCurrentNodeProvider()
      .contracts.postContractsCallContract({
        group: this.groupIndex,
        worldStateBlockHash: callParams?.worldStateBlockHash,
        txId: callParams?.txId,
        address: this.address,
        methodIndex: 0,
        args: [],
        existingContracts: callParams?.existingContracts,
        inputAssets: callParams?.inputAssets,
      });
    return fromApiArray(callResult.returns, ["ByteVec"])[0] as HexString;
  }

  async callGetNameMethod(callParams?: {
    worldStateBlockHash?: string;
    txId?: string;
    existingContracts?: string[];
    inputAssets?: node.TestInputAsset[];
  }): Promise<HexString> {
    const callResult = await web3
      .getCurrentNodeProvider()
      .contracts.postContractsCallContract({
        group: this.groupIndex,
        worldStateBlockHash: callParams?.worldStateBlockHash,
        txId: callParams?.txId,
        address: this.address,
        methodIndex: 1,
        args: [],
        existingContracts: callParams?.existingContracts,
        inputAssets: callParams?.inputAssets,
      });
    return fromApiArray(callResult.returns, ["ByteVec"])[0] as HexString;
  }

  async callGetDecimalsMethod(callParams?: {
    worldStateBlockHash?: string;
    txId?: string;
    existingContracts?: string[];
    inputAssets?: node.TestInputAsset[];
  }): Promise<bigint> {
    const callResult = await web3
      .getCurrentNodeProvider()
      .contracts.postContractsCallContract({
        group: this.groupIndex,
        worldStateBlockHash: callParams?.worldStateBlockHash,
        txId: callParams?.txId,
        address: this.address,
        methodIndex: 2,
        args: [],
        existingContracts: callParams?.existingContracts,
        inputAssets: callParams?.inputAssets,
      });
    return fromApiArray(callResult.returns, ["U256"])[0] as bigint;
  }

  async callGetTotalSupplyMethod(callParams?: {
    worldStateBlockHash?: string;
    txId?: string;
    existingContracts?: string[];
    inputAssets?: node.TestInputAsset[];
  }): Promise<bigint> {
    const callResult = await web3
      .getCurrentNodeProvider()
      .contracts.postContractsCallContract({
        group: this.groupIndex,
        worldStateBlockHash: callParams?.worldStateBlockHash,
        txId: callParams?.txId,
        address: this.address,
        methodIndex: 3,
        args: [],
        existingContracts: callParams?.existingContracts,
        inputAssets: callParams?.inputAssets,
      });
    return fromApiArray(callResult.returns, ["U256"])[0] as bigint;
  }
}
