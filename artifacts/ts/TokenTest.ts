/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import {
  web3,
  Address,
  Contract,
  ContractState,
  node,
  binToHex,
  TestContractResult,
  Asset,
  HexString,
  ContractFactory,
  contractIdFromAddress,
  ONE_ALPH,
  groupOfAddress,
  fromApiVals,
  subscribeToEvents,
  SubscribeOptions,
  Subscription,
  EventSubscription,
  randomTxId,
  CallContractParams,
  CallContractResult,
  TestContractParams,
  ContractEvent,
  subscribeEventsFromContract,
  testMethod,
  decodeContractCreatedEvent,
  decodeContractDestroyedEvent,
  ContractCreatedEvent,
  ContractDestroyedEvent,
} from "@alephium/web3";
import { default as TokenTestContractJson } from "../token_test.ral.json";

export namespace TokenTestTypes {
  export type Fields = {
    symbol: HexString;
    name: HexString;
    decimals: bigint;
    totalSupply: bigint;
  };

  export type State = ContractState<Fields>;
}

class Factory extends ContractFactory<
  TokenTestInstance,
  TokenTestTypes.Fields
> {
  at(address: string): TokenTestInstance {
    return new TokenTestInstance(address);
  }

  async testGetSymbolMethod(
    params: Omit<TestContractParams<TokenTestTypes.Fields, never>, "testArgs">
  ): Promise<TestContractResult<HexString>> {
    return testMethod(this, "getSymbol", params);
  }

  async testGetNameMethod(
    params: Omit<TestContractParams<TokenTestTypes.Fields, never>, "testArgs">
  ): Promise<TestContractResult<HexString>> {
    return testMethod(this, "getName", params);
  }

  async testGetDecimalsMethod(
    params: Omit<TestContractParams<TokenTestTypes.Fields, never>, "testArgs">
  ): Promise<TestContractResult<bigint>> {
    return testMethod(this, "getDecimals", params);
  }

  async testGetTotalSupplyMethod(
    params: Omit<TestContractParams<TokenTestTypes.Fields, never>, "testArgs">
  ): Promise<TestContractResult<bigint>> {
    return testMethod(this, "getTotalSupply", params);
  }
}

export const TokenTest = new Factory(
  Contract.fromJson(
    TokenTestContractJson,
    "",
    "d9c9fab84f779f2e90ca9e9b1fafd6d9c9dc0f8b84256169e20961f9c917bab8"
  )
);

export class TokenTestInstance {
  readonly address: Address;
  readonly contractId: string;
  readonly groupIndex: number;

  constructor(address: Address) {
    this.address = address;
    this.contractId = binToHex(contractIdFromAddress(address));
    this.groupIndex = groupOfAddress(address);
  }

  async fetchState(): Promise<TokenTestTypes.State> {
    const contractState = await web3
      .getCurrentNodeProvider()
      .contracts.getContractsAddressState(this.address, {
        group: this.groupIndex,
      });
    const state = TokenTest.contract.fromApiContractState(contractState);
    return {
      ...state,
      fields: state.fields as TokenTestTypes.Fields,
    };
  }

  subscribeContractCreatedEvent(
    options: SubscribeOptions<ContractCreatedEvent>,
    fromCount?: number
  ): EventSubscription {
    return subscribeEventsFromContract(
      options,
      this.address,
      -1,
      (event) => {
        return {
          ...decodeContractCreatedEvent(event),
          contractAddress: this.address,
        };
      },
      fromCount
    );
  }

  subscribeContractDestroyedEvent(
    options: SubscribeOptions<ContractDestroyedEvent>,
    fromCount?: number
  ): EventSubscription {
    return subscribeEventsFromContract(
      options,
      this.address,
      -2,
      (event) => {
        return {
          ...decodeContractDestroyedEvent(event),
          contractAddress: this.address,
        };
      },
      fromCount
    );
  }

  subscribeEvents(
    options: SubscribeOptions<ContractCreatedEvent | ContractDestroyedEvent>,
    fromCount?: number
  ): EventSubscription {
    const messageCallback = (event: node.ContractEvent): Promise<void> => {
      switch (event.eventIndex) {
        case -1: {
          return options.messageCallback({
            ...decodeContractCreatedEvent(event),
            contractAddress: this.address,
          });
        }

        case -2: {
          return options.messageCallback({
            ...decodeContractDestroyedEvent(event),
            contractAddress: this.address,
          });
        }

        default:
          throw new Error("Invalid event index: " + event.eventIndex);
      }
    };
    const errorCallback = (
      err: any,
      subscription: Subscription<node.ContractEvent>
    ): Promise<void> => {
      return options.errorCallback(
        err,
        subscription as unknown as Subscription<
          ContractCreatedEvent | ContractDestroyedEvent
        >
      );
    };
    const opt: SubscribeOptions<node.ContractEvent> = {
      pollingInterval: options.pollingInterval,
      messageCallback: messageCallback,
      errorCallback: errorCallback,
    };
    return subscribeToEvents(opt, this.address, fromCount);
  }

  async callGetSymbolMethod(
    params?: Omit<CallContractParams<{}>, "args">
  ): Promise<Omit<CallContractResult, "returns"> & { returns: HexString }> {
    const txId = params?.txId ?? randomTxId();
    const callParams = TokenTest.contract.toApiCallContract(
      { ...params, txId: txId, args: {} },
      this.groupIndex,
      this.address,
      0
    );
    const result = await web3
      .getCurrentNodeProvider()
      .contracts.postContractsCallContract(callParams);
    const callResult = TokenTest.contract.fromApiCallContractResult(
      result,
      txId,
      0
    );
    return {
      ...callResult,
      returns: callResult.returns[0] as HexString,
    };
  }

  async callGetNameMethod(
    params?: Omit<CallContractParams<{}>, "args">
  ): Promise<Omit<CallContractResult, "returns"> & { returns: HexString }> {
    const txId = params?.txId ?? randomTxId();
    const callParams = TokenTest.contract.toApiCallContract(
      { ...params, txId: txId, args: {} },
      this.groupIndex,
      this.address,
      1
    );
    const result = await web3
      .getCurrentNodeProvider()
      .contracts.postContractsCallContract(callParams);
    const callResult = TokenTest.contract.fromApiCallContractResult(
      result,
      txId,
      1
    );
    return {
      ...callResult,
      returns: callResult.returns[0] as HexString,
    };
  }

  async callGetDecimalsMethod(
    params?: Omit<CallContractParams<{}>, "args">
  ): Promise<Omit<CallContractResult, "returns"> & { returns: bigint }> {
    const txId = params?.txId ?? randomTxId();
    const callParams = TokenTest.contract.toApiCallContract(
      { ...params, txId: txId, args: {} },
      this.groupIndex,
      this.address,
      2
    );
    const result = await web3
      .getCurrentNodeProvider()
      .contracts.postContractsCallContract(callParams);
    const callResult = TokenTest.contract.fromApiCallContractResult(
      result,
      txId,
      2
    );
    return {
      ...callResult,
      returns: callResult.returns[0] as bigint,
    };
  }

  async callGetTotalSupplyMethod(
    params?: Omit<CallContractParams<{}>, "args">
  ): Promise<Omit<CallContractResult, "returns"> & { returns: bigint }> {
    const txId = params?.txId ?? randomTxId();
    const callParams = TokenTest.contract.toApiCallContract(
      { ...params, txId: txId, args: {} },
      this.groupIndex,
      this.address,
      3
    );
    const result = await web3
      .getCurrentNodeProvider()
      .contracts.postContractsCallContract(callParams);
    const callResult = TokenTest.contract.fromApiCallContractResult(
      result,
      txId,
      3
    );
    return {
      ...callResult,
      returns: callResult.returns[0] as bigint,
    };
  }
}
