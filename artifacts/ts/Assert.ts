/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import {
  web3,
  SignerProvider,
  Address,
  DeployContractParams,
  DeployContractResult,
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
} from "@alephium/web3";
import { default as AssertContractJson } from "../test/assert.ral.json";

export namespace Assert {
  export type State = Omit<ContractState<any>, "fields">;

  export type ContractCreatedEvent = {
    contractAddress: string;
    blockHash: string;
    txId: string;
    eventIndex: number;
    name: string;
    fields: { address: HexString };
  };

  export type ContractDestroyedEvent = {
    contractAddress: string;
    blockHash: string;
    txId: string;
    eventIndex: number;
    name: string;
    fields: { address: HexString };
  };

  export class Factory extends ContractFactory<AssertInstance, undefined> {
    constructor(contract: Contract) {
      super(contract);
    }

    async deploy(
      signer: SignerProvider,
      deployParams: DeployContractParams<undefined>
    ): Promise<DeployContractResult<AssertInstance>> {
      const signerParams = await contract.txParamsForDeployment(
        signer,
        deployParams
      );
      const result = await signer.signAndSubmitDeployContractTx(signerParams);
      return {
        instance: this.at(result.contractAddress),
        groupIndex: result.fromGroup,
        contractId: result.contractId,
        contractAddress: result.contractAddress,
        unsignedTx: result.unsignedTx,
        txId: result.txId,
        signature: result.signature,
        gasAmount: result.gasAmount,
        gasPrice: result.gasPrice,
      };
    }

    at(address: string): AssertInstance {
      return new AssertInstance(address);
    }
  }

  // This is used for testing contract functions
  export function stateForTest(
    asset?: Asset,
    address?: string
  ): ContractState<{}> {
    const newAsset = {
      alphAmount: asset?.alphAmount ?? ONE_ALPH,
      tokens: asset?.tokens,
    };
    return Assert.contract.toState({}, newAsset, address);
  }

  export async function testTestMethod(
    params?: Omit<TestContractParams<{}, {}>, "testArgs" | "initialFields">
  ): Promise<Omit<TestContractResult, "returns">> {
    const txId = params?.txId ?? randomTxId();
    const apiParams = Assert.contract.toApiTestContractParams("test", {
      ...params,
      txId: txId,
      testArgs: {},
      initialFields: {},
    });
    const apiResult = await web3
      .getCurrentNodeProvider()
      .contracts.postContractsTestContract(apiParams);
    const testResult = await Assert.contract.fromApiTestContractResult(
      0,
      apiResult,
      txId
    );

    return {
      ...testResult,
    };
  }

  export const contract = Contract.fromJson(AssertContractJson);
  export const factory = new Factory(contract);
}

export class AssertInstance {
  readonly address: Address;
  readonly contractId: string;
  readonly groupIndex: number;

  constructor(address: Address) {
    this.address = address;
    this.contractId = binToHex(contractIdFromAddress(address));
    this.groupIndex = groupOfAddress(address);
  }

  async fetchState(): Promise<Assert.State> {
    const contractState = await web3
      .getCurrentNodeProvider()
      .contracts.getContractsAddressState(this.address, {
        group: this.groupIndex,
      });
    const state = Assert.contract.fromApiContractState(contractState);
    return {
      ...state,
    };
  }

  private decodeContractCreatedEvent(
    event: node.ContractEvent
  ): Assert.ContractCreatedEvent {
    if (event.eventIndex !== -1) {
      throw new Error(
        "Invalid event index: " + event.eventIndex + ", expected: -1"
      );
    }
    const fields = fromApiVals(event.fields, ["address"], ["Address"]);
    return {
      contractAddress: this.address,
      blockHash: event.blockHash,
      txId: event.txId,
      eventIndex: event.eventIndex,
      name: "ContractCreated",
      fields: { address: fields["address"] as HexString },
    };
  }

  subscribeContractCreatedEvent(
    options: SubscribeOptions<Assert.ContractCreatedEvent>,
    fromCount?: number
  ): EventSubscription {
    const messageCallback = (event: node.ContractEvent): Promise<void> => {
      if (event.eventIndex !== -1) {
        return Promise.resolve();
      }
      return options.messageCallback(this.decodeContractCreatedEvent(event));
    };

    const errorCallback = (
      err: any,
      subscription: Subscription<node.ContractEvent>
    ): Promise<void> => {
      return options.errorCallback(
        err,
        subscription as unknown as Subscription<Assert.ContractCreatedEvent>
      );
    };
    const opt: SubscribeOptions<node.ContractEvent> = {
      pollingInterval: options.pollingInterval,
      messageCallback: messageCallback,
      errorCallback: errorCallback,
    };
    return subscribeToEvents(opt, this.address, fromCount);
  }

  private decodeContractDestroyedEvent(
    event: node.ContractEvent
  ): Assert.ContractDestroyedEvent {
    if (event.eventIndex !== -2) {
      throw new Error(
        "Invalid event index: " + event.eventIndex + ", expected: -2"
      );
    }
    const fields = fromApiVals(event.fields, ["address"], ["Address"]);
    return {
      contractAddress: this.address,
      blockHash: event.blockHash,
      txId: event.txId,
      eventIndex: event.eventIndex,
      name: "ContractDestroyed",
      fields: { address: fields["address"] as HexString },
    };
  }

  subscribeContractDestroyedEvent(
    options: SubscribeOptions<Assert.ContractDestroyedEvent>,
    fromCount?: number
  ): EventSubscription {
    const messageCallback = (event: node.ContractEvent): Promise<void> => {
      if (event.eventIndex !== -2) {
        return Promise.resolve();
      }
      return options.messageCallback(this.decodeContractDestroyedEvent(event));
    };

    const errorCallback = (
      err: any,
      subscription: Subscription<node.ContractEvent>
    ): Promise<void> => {
      return options.errorCallback(
        err,
        subscription as unknown as Subscription<Assert.ContractDestroyedEvent>
      );
    };
    const opt: SubscribeOptions<node.ContractEvent> = {
      pollingInterval: options.pollingInterval,
      messageCallback: messageCallback,
      errorCallback: errorCallback,
    };
    return subscribeToEvents(opt, this.address, fromCount);
  }

  subscribeEvents(
    options: SubscribeOptions<
      Assert.ContractCreatedEvent | Assert.ContractDestroyedEvent
    >,
    fromCount?: number
  ): EventSubscription {
    const messageCallback = (event: node.ContractEvent): Promise<void> => {
      switch (event.eventIndex) {
        case -1: {
          return options.messageCallback(
            this.decodeContractCreatedEvent(event)
          );
        }

        case -2: {
          return options.messageCallback(
            this.decodeContractDestroyedEvent(event)
          );
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
          Assert.ContractCreatedEvent | Assert.ContractDestroyedEvent
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
}
