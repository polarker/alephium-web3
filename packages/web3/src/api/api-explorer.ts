/* eslint-disable */
/* tslint:disable */
/*
 * ---------------------------------------------------------------
 * ## THIS FILE WAS GENERATED VIA SWAGGER-TYPESCRIPT-API        ##
 * ##                                                           ##
 * ## AUTHOR: acacode                                           ##
 * ## SOURCE: https://github.com/acacode/swagger-typescript-api ##
 * ---------------------------------------------------------------
 */

export interface AddressBalance {
  /** @format uint256 */
  balance: string

  /** @format uint256 */
  lockedBalance: string
}

export interface AddressInfo {
  /** @format uint256 */
  balance: string

  /** @format uint256 */
  lockedBalance: string

  /** @format int32 */
  txNumber: number
}

export interface BadRequest {
  detail: string
}

export interface BlockEntryLite {
  /** @format block-hash */
  hash: string

  /** @format int64 */
  timestamp: number

  /** @format int32 */
  chainFrom: number

  /** @format int32 */
  chainTo: number

  /** @format int32 */
  height: number

  /** @format int32 */
  txNumber: number
  mainChain: boolean

  /** @format bigint */
  hashRate: string
}

export interface ConfirmedTransaction {
  /** @format 32-byte-hash */
  hash: string

  /** @format block-hash */
  blockHash: string

  /** @format int64 */
  timestamp: number
  inputs?: Input[]
  outputs?: Output[]

  /** @format int32 */
  gasAmount: number

  /** @format uint256 */
  gasPrice: string
  type: string
}

export interface ExplorerInfo {
  releaseVersion: string
  commit: string
}

export interface Hashrate {
  /** @format int64 */
  timestamp: number
  hashrate: number
  value: number
}

export interface Input {
  outputRef: OutputRef
  unlockScript?: string

  /** @format 32-byte-hash */
  txHashRef: string
  address: string

  /** @format uint256 */
  amount: string
}

export interface InternalServerError {
  detail: string
}

export interface ListBlocks {
  /** @format int32 */
  total: number
  blocks?: BlockEntryLite[]
}

export interface NotFound {
  detail: string
  resource: string
}

export interface Output {
  /** @format int32 */
  hint: number

  /** @format 32-byte-hash */
  key: string

  /** @format uint256 */
  amount: string
  address: string

  /** @format int64 */
  lockTime?: number

  /** @format 32-byte-hash */
  spent?: string
}

export interface OutputRef {
  /** @format int32 */
  hint: number

  /** @format 32-byte-hash */
  key: string
}

export interface PerChainCount {
  /** @format int32 */
  chainFrom: number

  /** @format int32 */
  chainTo: number

  /** @format int64 */
  count: number
}

export interface PerChainDuration {
  /** @format int32 */
  chainFrom: number

  /** @format int32 */
  chainTo: number

  /** @format int64 */
  duration: number

  /** @format int64 */
  value: number
}

export interface PerChainHeight {
  /** @format int32 */
  chainFrom: number

  /** @format int32 */
  chainTo: number

  /** @format int64 */
  height: number

  /** @format int64 */
  value: number
}

export interface PerChainTimedCount {
  /** @format int64 */
  timestamp: number
  totalCountPerChain?: PerChainCount[]
}

export interface ServiceUnavailable {
  detail: string
}

export interface TimedCount {
  /** @format int64 */
  timestamp: number

  /** @format int64 */
  totalCountAllChains: number
}

export interface TokenSupply {
  /** @format int64 */
  timestamp: number

  /** @format uint256 */
  total: string

  /** @format uint256 */
  circulating: string

  /** @format uint256 */
  reserved: string

  /** @format uint256 */
  locked: string

  /** @format uint256 */
  maximum: string
}

export interface Transaction {
  /** @format 32-byte-hash */
  hash: string

  /** @format block-hash */
  blockHash: string

  /** @format int64 */
  timestamp: number
  inputs?: Input[]
  outputs?: Output[]

  /** @format int32 */
  gasAmount: number

  /** @format uint256 */
  gasPrice: string
}

export type TransactionLike = ConfirmedTransaction | UnconfirmedTransaction

export interface UInput {
  outputRef: OutputRef
  unlockScript?: string
}

export interface UOutput {
  /** @format uint256 */
  amount: string
  address: string

  /** @format int64 */
  lockTime?: number
}

export interface Unauthorized {
  detail: string
}

export interface UnconfirmedTransaction {
  /** @format 32-byte-hash */
  hash: string

  /** @format int32 */
  chainFrom: number

  /** @format int32 */
  chainTo: number
  inputs?: UInput[]
  outputs?: UOutput[]

  /** @format int32 */
  gasAmount: number

  /** @format uint256 */
  gasPrice: string
  type: string
}

import 'cross-fetch/polyfill'

function convertHttpResponse<T>(
  response: HttpResponse<T, { detail: string }> | HttpResponse<T, { detail: string }>
): T {
  if (response.error) {
    throw new Error(response.error.detail)
  } else {
    return response.data
  }
}

export type QueryParamsType = Record<string | number, any>
export type ResponseFormat = keyof Omit<Body, 'body' | 'bodyUsed'>

export interface FullRequestParams extends Omit<RequestInit, 'body'> {
  /** set parameter to `true` for call `securityWorker` for this request */
  secure?: boolean
  /** request path */
  path: string
  /** content type of request body */
  type?: ContentType
  /** query params */
  query?: QueryParamsType
  /** format of response (i.e. response.json() -> format: "json") */
  format?: ResponseFormat
  /** request body */
  body?: unknown
  /** base url */
  baseUrl?: string
  /** request cancellation token */
  cancelToken?: CancelToken
}

export type RequestParams = Omit<FullRequestParams, 'body' | 'method' | 'query' | 'path'>

export interface ApiConfig<SecurityDataType = unknown> {
  baseUrl?: string
  baseApiParams?: Omit<RequestParams, 'baseUrl' | 'cancelToken' | 'signal'>
  securityWorker?: (securityData: SecurityDataType | null) => Promise<RequestParams | void> | RequestParams | void
  customFetch?: typeof fetch
}

export interface HttpResponse<D extends unknown, E extends unknown = unknown> extends Response {
  data: D
  error: E
}

type CancelToken = Symbol | string | number

export enum ContentType {
  Json = 'application/json',
  FormData = 'multipart/form-data',
  UrlEncoded = 'application/x-www-form-urlencoded'
}

export class HttpClient<SecurityDataType = unknown> {
  public baseUrl: string = ''
  private securityData: SecurityDataType | null = null
  private securityWorker?: ApiConfig<SecurityDataType>['securityWorker']
  private abortControllers = new Map<CancelToken, AbortController>()
  private customFetch = (...fetchParams: Parameters<typeof fetch>) => fetch(...fetchParams)

  private baseApiParams: RequestParams = {
    credentials: 'same-origin',
    headers: {},
    redirect: 'follow',
    referrerPolicy: 'no-referrer'
  }

  constructor(apiConfig: ApiConfig<SecurityDataType> = {}) {
    Object.assign(this, apiConfig)
  }

  public setSecurityData = (data: SecurityDataType | null) => {
    this.securityData = data
  }

  private encodeQueryParam(key: string, value: any) {
    const encodedKey = encodeURIComponent(key)
    return `${encodedKey}=${encodeURIComponent(typeof value === 'number' ? value : `${value}`)}`
  }

  private addQueryParam(query: QueryParamsType, key: string) {
    return this.encodeQueryParam(key, query[key])
  }

  private addArrayQueryParam(query: QueryParamsType, key: string) {
    const value = query[key]
    return value.map((v: any) => this.encodeQueryParam(key, v)).join('&')
  }

  protected toQueryString(rawQuery?: QueryParamsType): string {
    const query = rawQuery || {}
    const keys = Object.keys(query).filter((key) => 'undefined' !== typeof query[key])
    return keys
      .map((key) => (Array.isArray(query[key]) ? this.addArrayQueryParam(query, key) : this.addQueryParam(query, key)))
      .join('&')
  }

  protected addQueryParams(rawQuery?: QueryParamsType): string {
    const queryString = this.toQueryString(rawQuery)
    return queryString ? `?${queryString}` : ''
  }

  private contentFormatters: Record<ContentType, (input: any) => any> = {
    [ContentType.Json]: (input: any) =>
      input !== null && (typeof input === 'object' || typeof input === 'string') ? JSON.stringify(input) : input,
    [ContentType.FormData]: (input: any) =>
      Object.keys(input || {}).reduce((formData, key) => {
        const property = input[key]
        formData.append(
          key,
          property instanceof Blob
            ? property
            : typeof property === 'object' && property !== null
            ? JSON.stringify(property)
            : `${property}`
        )
        return formData
      }, new FormData()),
    [ContentType.UrlEncoded]: (input: any) => this.toQueryString(input)
  }

  private mergeRequestParams(params1: RequestParams, params2?: RequestParams): RequestParams {
    return {
      ...this.baseApiParams,
      ...params1,
      ...(params2 || {}),
      headers: {
        ...(this.baseApiParams.headers || {}),
        ...(params1.headers || {}),
        ...((params2 && params2.headers) || {})
      }
    }
  }

  private createAbortSignal = (cancelToken: CancelToken): AbortSignal | undefined => {
    if (this.abortControllers.has(cancelToken)) {
      const abortController = this.abortControllers.get(cancelToken)
      if (abortController) {
        return abortController.signal
      }
      return void 0
    }

    const abortController = new AbortController()
    this.abortControllers.set(cancelToken, abortController)
    return abortController.signal
  }

  public abortRequest = (cancelToken: CancelToken) => {
    const abortController = this.abortControllers.get(cancelToken)

    if (abortController) {
      abortController.abort()
      this.abortControllers.delete(cancelToken)
    }
  }

  public request = async <T = any, E = any>({
    body,
    secure,
    path,
    type,
    query,
    format,
    baseUrl,
    cancelToken,
    ...params
  }: FullRequestParams): Promise<HttpResponse<T, E>> => {
    const secureParams =
      ((typeof secure === 'boolean' ? secure : this.baseApiParams.secure) &&
        this.securityWorker &&
        (await this.securityWorker(this.securityData))) ||
      {}
    const requestParams = this.mergeRequestParams(params, secureParams)
    const queryString = query && this.toQueryString(query)
    const payloadFormatter = this.contentFormatters[type || ContentType.Json]
    const responseFormat = format || requestParams.format

    return this.customFetch(`${baseUrl || this.baseUrl || ''}${path}${queryString ? `?${queryString}` : ''}`, {
      ...requestParams,
      headers: {
        ...(type && type !== ContentType.FormData ? { 'Content-Type': type } : {}),
        ...(requestParams.headers || {})
      },
      signal: cancelToken ? this.createAbortSignal(cancelToken) : void 0,
      body: typeof body === 'undefined' || body === null ? null : payloadFormatter(body)
    }).then(async (response) => {
      const r = response as HttpResponse<T, E>
      r.data = null as unknown as T
      r.error = null as unknown as E

      const data = !responseFormat
        ? r
        : await response[responseFormat]()
            .then((data) => {
              if (r.ok) {
                r.data = data
              } else {
                r.error = data
              }
              return r
            })
            .catch((e) => {
              r.error = e
              return r
            })

      if (cancelToken) {
        this.abortControllers.delete(cancelToken)
      }

      if (!response.ok) throw data
      return data
    })
  }
}

/**
 * @title Alephium Explorer API
 * @version 1.0
 */
export class Api<SecurityDataType extends unknown> extends HttpClient<SecurityDataType> {
  blocks = {
    /**
     * @description List blocks within time interval
     *
     * @tags Blocks
     * @name GetBlocks
     * @request GET:/blocks
     */
    getBlocks: (query?: { page?: number; limit?: number; reverse?: boolean }, params: RequestParams = {}) =>
      this.request<ListBlocks, BadRequest | Unauthorized | NotFound | InternalServerError | ServiceUnavailable>({
        path: `/blocks`,
        method: 'GET',
        query: query,
        format: 'json',
        ...params
      }).then(convertHttpResponse),

    /**
     * @description Get a block with hash
     *
     * @tags Blocks
     * @name GetBlocksBlockHash
     * @request GET:/blocks/{block-hash}
     */
    getBlocksBlockHash: (blockHash: string, params: RequestParams = {}) =>
      this.request<BlockEntryLite, BadRequest | Unauthorized | NotFound | InternalServerError | ServiceUnavailable>({
        path: `/blocks/${blockHash}`,
        method: 'GET',
        format: 'json',
        ...params
      }).then(convertHttpResponse),

    /**
     * @description Get block's transactions
     *
     * @tags Blocks
     * @name GetBlocksBlockHashTransactions
     * @request GET:/blocks/{block-hash}/transactions
     */
    getBlocksBlockHashTransactions: (
      blockHash: string,
      query?: { page?: number; limit?: number; reverse?: boolean },
      params: RequestParams = {}
    ) =>
      this.request<Transaction[], BadRequest | Unauthorized | NotFound | InternalServerError | ServiceUnavailable>({
        path: `/blocks/${blockHash}/transactions`,
        method: 'GET',
        query: query,
        format: 'json',
        ...params
      }).then(convertHttpResponse)
  }
  transactions = {
    /**
     * @description Get a transaction with hash
     *
     * @tags Transactions
     * @name GetTransactionsTransactionHash
     * @request GET:/transactions/{transaction-hash}
     */
    getTransactionsTransactionHash: (transactionHash: string, params: RequestParams = {}) =>
      this.request<TransactionLike, BadRequest | Unauthorized | NotFound | InternalServerError | ServiceUnavailable>({
        path: `/transactions/${transactionHash}`,
        method: 'GET',
        format: 'json',
        ...params
      }).then(convertHttpResponse)
  }
  addresses = {
    /**
     * @description Get address information
     *
     * @tags Addresses
     * @name GetAddressesAddress
     * @request GET:/addresses/{address}
     */
    getAddressesAddress: (address: string, params: RequestParams = {}) =>
      this.request<AddressInfo, BadRequest | Unauthorized | NotFound | InternalServerError | ServiceUnavailable>({
        path: `/addresses/${address}`,
        method: 'GET',
        format: 'json',
        ...params
      }).then(convertHttpResponse),

    /**
     * @description List transactions of a given address
     *
     * @tags Addresses
     * @name GetAddressesAddressTransactions
     * @request GET:/addresses/{address}/transactions
     */
    getAddressesAddressTransactions: (
      address: string,
      query?: { page?: number; limit?: number; reverse?: boolean },
      params: RequestParams = {}
    ) =>
      this.request<Transaction[], BadRequest | Unauthorized | NotFound | InternalServerError | ServiceUnavailable>({
        path: `/addresses/${address}/transactions`,
        method: 'GET',
        query: query,
        format: 'json',
        ...params
      }).then(convertHttpResponse),

    /**
     * @description Get total transactions of a given address
     *
     * @tags Addresses
     * @name GetAddressesAddressTotalTransactions
     * @request GET:/addresses/{address}/total-transactions
     */
    getAddressesAddressTotalTransactions: (address: string, params: RequestParams = {}) =>
      this.request<number, BadRequest | Unauthorized | NotFound | InternalServerError | ServiceUnavailable>({
        path: `/addresses/${address}/total-transactions`,
        method: 'GET',
        format: 'json',
        ...params
      }).then(convertHttpResponse),

    /**
     * @description Get address balance
     *
     * @tags Addresses
     * @name GetAddressesAddressBalance
     * @request GET:/addresses/{address}/balance
     */
    getAddressesAddressBalance: (address: string, params: RequestParams = {}) =>
      this.request<AddressBalance, BadRequest | Unauthorized | NotFound | InternalServerError | ServiceUnavailable>({
        path: `/addresses/${address}/balance`,
        method: 'GET',
        format: 'json',
        ...params
      }).then(convertHttpResponse)
  }
  infos = {
    /**
     * @description Get explorer informations
     *
     * @tags Infos
     * @name GetInfos
     * @request GET:/infos
     */
    getInfos: (params: RequestParams = {}) =>
      this.request<ExplorerInfo, BadRequest | Unauthorized | NotFound | InternalServerError | ServiceUnavailable>({
        path: `/infos`,
        method: 'GET',
        format: 'json',
        ...params
      }).then(convertHttpResponse),

    /**
     * @description List latest height for each chain
     *
     * @tags Infos
     * @name GetInfosHeights
     * @request GET:/infos/heights
     */
    getInfosHeights: (params: RequestParams = {}) =>
      this.request<PerChainHeight[], BadRequest | Unauthorized | NotFound | InternalServerError | ServiceUnavailable>({
        path: `/infos/heights`,
        method: 'GET',
        format: 'json',
        ...params
      }).then(convertHttpResponse),

    /**
     * @description Get token supply list
     *
     * @tags Infos
     * @name GetInfosSupply
     * @request GET:/infos/supply
     */
    getInfosSupply: (query?: { page?: number; limit?: number; reverse?: boolean }, params: RequestParams = {}) =>
      this.request<TokenSupply[], BadRequest | Unauthorized | NotFound | InternalServerError | ServiceUnavailable>({
        path: `/infos/supply`,
        method: 'GET',
        query: query,
        format: 'json',
        ...params
      }).then(convertHttpResponse),

    /**
     * @description Get the ALPH total supply
     *
     * @tags Infos
     * @name GetInfosSupplyTotalAlph
     * @request GET:/infos/supply/total-alph
     */
    getInfosSupplyTotalAlph: (params: RequestParams = {}) =>
      this.request<number, BadRequest | Unauthorized | NotFound | InternalServerError | ServiceUnavailable>({
        path: `/infos/supply/total-alph`,
        method: 'GET',
        ...params
      }).then(convertHttpResponse),

    /**
     * @description Get the ALPH circulating supply
     *
     * @tags Infos
     * @name GetInfosSupplyCirculatingAlph
     * @request GET:/infos/supply/circulating-alph
     */
    getInfosSupplyCirculatingAlph: (params: RequestParams = {}) =>
      this.request<number, BadRequest | Unauthorized | NotFound | InternalServerError | ServiceUnavailable>({
        path: `/infos/supply/circulating-alph`,
        method: 'GET',
        ...params
      }).then(convertHttpResponse),

    /**
     * @description Get the ALPH reserved supply
     *
     * @tags Infos
     * @name GetInfosSupplyReservedAlph
     * @request GET:/infos/supply/reserved-alph
     */
    getInfosSupplyReservedAlph: (params: RequestParams = {}) =>
      this.request<number, BadRequest | Unauthorized | NotFound | InternalServerError | ServiceUnavailable>({
        path: `/infos/supply/reserved-alph`,
        method: 'GET',
        ...params
      }).then(convertHttpResponse),

    /**
     * @description Get the ALPH locked supply
     *
     * @tags Infos
     * @name GetInfosSupplyLockedAlph
     * @request GET:/infos/supply/locked-alph
     */
    getInfosSupplyLockedAlph: (params: RequestParams = {}) =>
      this.request<number, BadRequest | Unauthorized | NotFound | InternalServerError | ServiceUnavailable>({
        path: `/infos/supply/locked-alph`,
        method: 'GET',
        ...params
      }).then(convertHttpResponse),

    /**
     * @description Get the total number of transactions
     *
     * @tags Infos
     * @name GetInfosTotalTransactions
     * @request GET:/infos/total-transactions
     */
    getInfosTotalTransactions: (params: RequestParams = {}) =>
      this.request<number, BadRequest | Unauthorized | NotFound | InternalServerError | ServiceUnavailable>({
        path: `/infos/total-transactions`,
        method: 'GET',
        ...params
      }).then(convertHttpResponse),

    /**
     * @description Get the average block time for each chain
     *
     * @tags Infos
     * @name GetInfosAverageBlockTimes
     * @request GET:/infos/average-block-times
     */
    getInfosAverageBlockTimes: (params: RequestParams = {}) =>
      this.request<PerChainDuration[], BadRequest | Unauthorized | NotFound | InternalServerError | ServiceUnavailable>(
        {
          path: `/infos/average-block-times`,
          method: 'GET',
          format: 'json',
          ...params
        }
      ).then(convertHttpResponse)
  }
  charts = {
    /**
     * @description `interval-type` query param: hourly, daily
     *
     * @tags Charts
     * @name GetChartsHashrates
     * @summary Get hashrate chart in H/s
     * @request GET:/charts/hashrates
     */
    getChartsHashrates: (
      query: { fromTs: number; toTs: number; 'interval-type': string },
      params: RequestParams = {}
    ) =>
      this.request<Hashrate[], BadRequest | Unauthorized | NotFound | InternalServerError | ServiceUnavailable>({
        path: `/charts/hashrates`,
        method: 'GET',
        query: query,
        format: 'json',
        ...params
      }).then(convertHttpResponse),

    /**
     * @description `interval-type` query param: hourly, daily
     *
     * @tags Charts
     * @name GetChartsTransactionsCount
     * @summary Get transaction count history
     * @request GET:/charts/transactions-count
     */
    getChartsTransactionsCount: (
      query: { fromTs: number; toTs: number; 'interval-type': string },
      params: RequestParams = {}
    ) =>
      this.request<TimedCount[], BadRequest | Unauthorized | NotFound | InternalServerError | ServiceUnavailable>({
        path: `/charts/transactions-count`,
        method: 'GET',
        query: query,
        format: 'json',
        ...params
      }).then(convertHttpResponse),

    /**
     * @description `interval-type` query param: hourly, daily
     *
     * @tags Charts
     * @name GetChartsTransactionsCountPerChain
     * @summary Get transaction count history per chain
     * @request GET:/charts/transactions-count-per-chain
     */
    getChartsTransactionsCountPerChain: (
      query: { fromTs: number; toTs: number; 'interval-type': string },
      params: RequestParams = {}
    ) =>
      this.request<
        PerChainTimedCount[],
        BadRequest | Unauthorized | NotFound | InternalServerError | ServiceUnavailable
      >({
        path: `/charts/transactions-count-per-chain`,
        method: 'GET',
        query: query,
        format: 'json',
        ...params
      }).then(convertHttpResponse)
  }
  utils = {
    /**
     * @description Perform a sanity check
     *
     * @tags Utils
     * @name PutUtilsSanityCheck
     * @request PUT:/utils/sanity-check
     */
    putUtilsSanityCheck: (params: RequestParams = {}) =>
      this.request<void, BadRequest | Unauthorized | NotFound | InternalServerError | ServiceUnavailable>({
        path: `/utils/sanity-check`,
        method: 'PUT',
        ...params
      }).then(convertHttpResponse),

    /**
     * @description Update global log level, accepted: TRACE, DEBUG, INFO, WARN, ERROR
     *
     * @tags Utils
     * @name PutUtilsUpdateGlobalLoglevel
     * @request PUT:/utils/update-global-loglevel
     */
    putUtilsUpdateGlobalLoglevel: (data: 'TRACE' | 'DEBUG' | 'INFO' | 'WARN' | 'ERROR', params: RequestParams = {}) =>
      this.request<void, BadRequest | Unauthorized | NotFound | InternalServerError | ServiceUnavailable>({
        path: `/utils/update-global-loglevel`,
        method: 'PUT',
        body: data,
        ...params
      }).then(convertHttpResponse),

    /**
     * @description Update logging file, only logback.xml is accepted
     *
     * @tags Utils
     * @name PutUtilsUpdateLogConfig
     * @request PUT:/utils/update-log-config
     */
    putUtilsUpdateLogConfig: (data: string, params: RequestParams = {}) =>
      this.request<void, BadRequest | Unauthorized | NotFound | InternalServerError | ServiceUnavailable>({
        path: `/utils/update-log-config`,
        method: 'PUT',
        body: data,
        ...params
      }).then(convertHttpResponse)
  }
}
