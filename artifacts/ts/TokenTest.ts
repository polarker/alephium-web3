/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import {
  Address,
  Contract,
  ContractState,
  TestContractResult,
  HexString,
  ContractFactory,
  SubscribeOptions,
  EventSubscription,
  CallContractParams,
  CallContractResult,
  TestContractParams,
  ContractEvent,
  subscribeContractEvent,
  subscribeContractEvents,
  testMethod,
  callMethod,
  multicallMethods,
  fetchContractState,
  ContractInstance,
  getContractEventsCurrentCount,
} from "@alephium/web3";
import { default as TokenTestContractJson } from "../token_test.ral.json";

// Custom types for the contract
export namespace TokenTestTypes {
  export type Fields = {
    symbol: HexString;
    name: HexString;
    decimals: bigint;
    totalSupply: bigint;
  };

  export type State = ContractState<Fields>;

  export interface CallMethodTable {
    getSymbol: {
      params: Omit<CallContractParams<{}>, "args">;
      result: CallContractResult<HexString>;
    };
    getName: {
      params: Omit<CallContractParams<{}>, "args">;
      result: CallContractResult<HexString>;
    };
    getDecimals: {
      params: Omit<CallContractParams<{}>, "args">;
      result: CallContractResult<bigint>;
    };
    getTotalSupply: {
      params: Omit<CallContractParams<{}>, "args">;
      result: CallContractResult<bigint>;
    };
  }
  export type CallMethodParams<T extends keyof CallMethodTable> =
    CallMethodTable[T]["params"];
  export type CallMethodResult<T extends keyof CallMethodTable> =
    CallMethodTable[T]["result"];
  export type MultiCallParams = Partial<{
    [Name in keyof CallMethodTable]: CallMethodTable[Name]["params"];
  }>;
  export type MultiCallResults<T extends MultiCallParams> = {
    [MaybeName in keyof T]: MaybeName extends keyof CallMethodTable
      ? CallMethodTable[MaybeName]["result"]
      : undefined;
  };
}

class Factory extends ContractFactory<
  TokenTestInstance,
  TokenTestTypes.Fields
> {
  at(address: string): TokenTestInstance {
    return new TokenTestInstance(address);
  }

  tests = {
    getSymbol: async (
      params: Omit<TestContractParams<TokenTestTypes.Fields, never>, "testArgs">
    ): Promise<TestContractResult<HexString>> => {
      return testMethod(this, "getSymbol", params);
    },
    getName: async (
      params: Omit<TestContractParams<TokenTestTypes.Fields, never>, "testArgs">
    ): Promise<TestContractResult<HexString>> => {
      return testMethod(this, "getName", params);
    },
    getDecimals: async (
      params: Omit<TestContractParams<TokenTestTypes.Fields, never>, "testArgs">
    ): Promise<TestContractResult<bigint>> => {
      return testMethod(this, "getDecimals", params);
    },
    getTotalSupply: async (
      params: Omit<TestContractParams<TokenTestTypes.Fields, never>, "testArgs">
    ): Promise<TestContractResult<bigint>> => {
      return testMethod(this, "getTotalSupply", params);
    },
  };
}

// Use this object to test and deploy the contract
export const TokenTest = new Factory(
  Contract.fromJson(
    TokenTestContractJson,
    "",
    "a2800413eb2c5c23d48068db23df5f8eeaba04653e12c8ed59d589720d96dadd"
  )
);

// Use this class to interact with the blockchain
export class TokenTestInstance extends ContractInstance {
  constructor(address: Address) {
    super(address);
  }

  async fetchState(): Promise<TokenTestTypes.State> {
    return fetchContractState(TokenTest, this);
  }

  methods = {
    getSymbol: async (
      params?: TokenTestTypes.CallMethodParams<"getSymbol">
    ): Promise<TokenTestTypes.CallMethodResult<"getSymbol">> => {
      return callMethod(
        TokenTest,
        this,
        "getSymbol",
        params === undefined ? {} : params
      );
    },
    getName: async (
      params?: TokenTestTypes.CallMethodParams<"getName">
    ): Promise<TokenTestTypes.CallMethodResult<"getName">> => {
      return callMethod(
        TokenTest,
        this,
        "getName",
        params === undefined ? {} : params
      );
    },
    getDecimals: async (
      params?: TokenTestTypes.CallMethodParams<"getDecimals">
    ): Promise<TokenTestTypes.CallMethodResult<"getDecimals">> => {
      return callMethod(
        TokenTest,
        this,
        "getDecimals",
        params === undefined ? {} : params
      );
    },
    getTotalSupply: async (
      params?: TokenTestTypes.CallMethodParams<"getTotalSupply">
    ): Promise<TokenTestTypes.CallMethodResult<"getTotalSupply">> => {
      return callMethod(
        TokenTest,
        this,
        "getTotalSupply",
        params === undefined ? {} : params
      );
    },
  };

  async multicall<Calls extends TokenTestTypes.MultiCallParams>(
    calls: Calls
  ): Promise<TokenTestTypes.MultiCallResults<Calls>> {
    return (await multicallMethods(
      TokenTest,
      this,
      calls
    )) as TokenTestTypes.MultiCallResults<Calls>;
  }
}
