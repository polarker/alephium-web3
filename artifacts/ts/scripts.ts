/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import {
  ExecuteScriptParams,
  ExecuteScriptResult,
  Script,
  SignerProvider,
  HexString,
} from "@alephium/web3";
import { default as DestroyAddScriptJson } from "../add/destroy_add.ral.json";
import { default as GreeterMainScriptJson } from "../greeter_main.ral.json";
import { default as MainScriptJson } from "../main.ral.json";
import { default as MintNFTTestScriptJson } from "../nft/mint_nft_test.ral.json";

export namespace DestroyAdd {
  export async function execute(
    signer: SignerProvider,
    params: ExecuteScriptParams<{ add: HexString; caller: HexString }>
  ): Promise<ExecuteScriptResult> {
    const signerParams = await script.txParamsForExecution(signer, params);
    return await signer.signAndSubmitExecuteScriptTx(signerParams);
  }

  export const script = Script.fromJson(DestroyAddScriptJson);
}

export namespace GreeterMain {
  export async function execute(
    signer: SignerProvider,
    params: ExecuteScriptParams<{ greeterContractId: HexString }>
  ): Promise<ExecuteScriptResult> {
    const signerParams = await script.txParamsForExecution(signer, params);
    return await signer.signAndSubmitExecuteScriptTx(signerParams);
  }

  export const script = Script.fromJson(GreeterMainScriptJson);
}

export namespace Main {
  export async function execute(
    signer: SignerProvider,
    params: ExecuteScriptParams<{ addContractId: HexString }>
  ): Promise<ExecuteScriptResult> {
    const signerParams = await script.txParamsForExecution(signer, params);
    return await signer.signAndSubmitExecuteScriptTx(signerParams);
  }

  export const script = Script.fromJson(MainScriptJson);
}

export namespace MintNFTTest {
  export async function execute(
    signer: SignerProvider,
    params: ExecuteScriptParams<{
      nftCollectionContractId: HexString;
      uri: HexString;
    }>
  ): Promise<ExecuteScriptResult> {
    const signerParams = await script.txParamsForExecution(signer, params);
    return await signer.signAndSubmitExecuteScriptTx(signerParams);
  }

  export const script = Script.fromJson(MintNFTTestScriptJson);
}
