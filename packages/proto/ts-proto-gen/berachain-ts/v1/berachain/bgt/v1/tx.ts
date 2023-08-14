/* eslint-disable */
import Long from "long";
import _m0 from "protobufjs/minimal";

import { Coin } from "../../../cosmos/base/v1beta1/coin";
import { Bribe } from "./bribe";
import { Params } from "./params";

export const protobufPackage = "berachain.bgt.v1";

/** CreateBribeRequest is a message type that contains a request to create a bribe */
export interface CreateBribeRequest {
  /** operator_addr is the address of the validator operator. */
  operatorAddr: string;
  /**
   * start_epoch is the Epoch in which this bribe starts paying out. If Epoch >
   * StartingEpoch Then all type Bribes are paid out in parallel.
   */
  startEpoch: Long;
  /**
   * num_block_proposals is the number of blocks at which when the consensus
   * address is the proposer and voters will be paid out from their active
   * bribes.
   */
  numBlockProposals: Long;
  /**
   * release_per_proposal is the total amount of coins that shall be released to
   * voters every time a block proposal is made from this validator.
   */
  releasePerProposal: Coin[];
}

/** CreateBribeResponse is a message type that contains a Bribe object */
export interface CreateBribeResponse {
  /** bribe is the bribe object */
  bribe?: Bribe;
}

/** RedeemBgtForBeraRequest is a message type that contains a request to redeem BGT for Bera */
export interface RedeemBgtForBeraRequest {
  /** account_address is the address of the account that is redeeming BGT for Bera */
  accountAddress: string;
  /** amount is the amount of BGT being redeemed */
  amount: string;
}

/** RedeemBgtForBeraResponse is a message type that contains a response to a BGT redemption request */
export interface RedeemBgtForBeraResponse {}

/** UpdateParamsRequest defines a Msg for updating the x/feemarket module parameters. */
export interface UpdateParamsRequest {
  /** authority is the address of the governance account. */
  authority: string;
  /**
   * params defines the x/feemarket parameters to update.
   * NOTE: All parameters must be supplied.
   */
  params?: Params;
}

/**
 * UpdateParamsResponse defines the response structure for executing a
 * UpdateParamsRequest message.
 */
export interface UpdateParamsResponse {}

function createBaseCreateBribeRequest(): CreateBribeRequest {
  return {
    operatorAddr: "",
    startEpoch: Long.ZERO,
    numBlockProposals: Long.UZERO,
    releasePerProposal: [],
  };
}

export const CreateBribeRequest = {
  encode(
    message: CreateBribeRequest,
    writer: _m0.Writer = _m0.Writer.create(),
  ): _m0.Writer {
    if (message.operatorAddr !== "") {
      writer.uint32(10).string(message.operatorAddr);
    }
    if (!message.startEpoch.isZero()) {
      writer.uint32(16).int64(message.startEpoch);
    }
    if (!message.numBlockProposals.isZero()) {
      writer.uint32(24).uint64(message.numBlockProposals);
    }
    for (const v of message.releasePerProposal) {
      Coin.encode(v!, writer.uint32(34).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): CreateBribeRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseCreateBribeRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.operatorAddr = reader.string();
          break;
        case 2:
          message.startEpoch = reader.int64() as Long;
          break;
        case 3:
          message.numBlockProposals = reader.uint64() as Long;
          break;
        case 4:
          message.releasePerProposal.push(Coin.decode(reader, reader.uint32()));
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): CreateBribeRequest {
    return {
      operatorAddr: isSet(object.operatorAddr)
        ? String(object.operatorAddr)
        : "",
      startEpoch: isSet(object.startEpoch)
        ? Long.fromValue(object.startEpoch)
        : Long.ZERO,
      numBlockProposals: isSet(object.numBlockProposals)
        ? Long.fromValue(object.numBlockProposals)
        : Long.UZERO,
      releasePerProposal: Array.isArray(object?.releasePerProposal)
        ? object.releasePerProposal.map((e: any) => Coin.fromJSON(e))
        : [],
    };
  },

  toJSON(message: CreateBribeRequest): unknown {
    const obj: any = {};
    message.operatorAddr !== undefined &&
      (obj.operatorAddr = message.operatorAddr);
    message.startEpoch !== undefined &&
      (obj.startEpoch = (message.startEpoch || Long.ZERO).toString());
    message.numBlockProposals !== undefined &&
      (obj.numBlockProposals = (
        message.numBlockProposals || Long.UZERO
      ).toString());
    if (message.releasePerProposal) {
      obj.releasePerProposal = message.releasePerProposal.map((e) =>
        e ? Coin.toJSON(e) : undefined,
      );
    } else {
      obj.releasePerProposal = [];
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<CreateBribeRequest>, I>>(
    base?: I,
  ): CreateBribeRequest {
    return CreateBribeRequest.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<CreateBribeRequest>, I>>(
    object: I,
  ): CreateBribeRequest {
    const message = createBaseCreateBribeRequest();
    message.operatorAddr = object.operatorAddr ?? "";
    message.startEpoch =
      object.startEpoch !== undefined && object.startEpoch !== null
        ? Long.fromValue(object.startEpoch)
        : Long.ZERO;
    message.numBlockProposals =
      object.numBlockProposals !== undefined &&
      object.numBlockProposals !== null
        ? Long.fromValue(object.numBlockProposals)
        : Long.UZERO;
    message.releasePerProposal =
      object.releasePerProposal?.map((e) => Coin.fromPartial(e)) || [];
    return message;
  },
};

function createBaseCreateBribeResponse(): CreateBribeResponse {
  return { bribe: undefined };
}

export const CreateBribeResponse = {
  encode(
    message: CreateBribeResponse,
    writer: _m0.Writer = _m0.Writer.create(),
  ): _m0.Writer {
    if (message.bribe !== undefined) {
      Bribe.encode(message.bribe, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): CreateBribeResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseCreateBribeResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.bribe = Bribe.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): CreateBribeResponse {
    return {
      bribe: isSet(object.bribe) ? Bribe.fromJSON(object.bribe) : undefined,
    };
  },

  toJSON(message: CreateBribeResponse): unknown {
    const obj: any = {};
    message.bribe !== undefined &&
      (obj.bribe = message.bribe ? Bribe.toJSON(message.bribe) : undefined);
    return obj;
  },

  create<I extends Exact<DeepPartial<CreateBribeResponse>, I>>(
    base?: I,
  ): CreateBribeResponse {
    return CreateBribeResponse.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<CreateBribeResponse>, I>>(
    object: I,
  ): CreateBribeResponse {
    const message = createBaseCreateBribeResponse();
    message.bribe =
      object.bribe !== undefined && object.bribe !== null
        ? Bribe.fromPartial(object.bribe)
        : undefined;
    return message;
  },
};

function createBaseRedeemBgtForBeraRequest(): RedeemBgtForBeraRequest {
  return { accountAddress: "", amount: "" };
}

export const RedeemBgtForBeraRequest = {
  encode(
    message: RedeemBgtForBeraRequest,
    writer: _m0.Writer = _m0.Writer.create(),
  ): _m0.Writer {
    if (message.accountAddress !== "") {
      writer.uint32(10).string(message.accountAddress);
    }
    if (message.amount !== "") {
      writer.uint32(18).string(message.amount);
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number,
  ): RedeemBgtForBeraRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseRedeemBgtForBeraRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.accountAddress = reader.string();
          break;
        case 2:
          message.amount = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): RedeemBgtForBeraRequest {
    return {
      accountAddress: isSet(object.accountAddress)
        ? String(object.accountAddress)
        : "",
      amount: isSet(object.amount) ? String(object.amount) : "",
    };
  },

  toJSON(message: RedeemBgtForBeraRequest): unknown {
    const obj: any = {};
    message.accountAddress !== undefined &&
      (obj.accountAddress = message.accountAddress);
    message.amount !== undefined && (obj.amount = message.amount);
    return obj;
  },

  create<I extends Exact<DeepPartial<RedeemBgtForBeraRequest>, I>>(
    base?: I,
  ): RedeemBgtForBeraRequest {
    return RedeemBgtForBeraRequest.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<RedeemBgtForBeraRequest>, I>>(
    object: I,
  ): RedeemBgtForBeraRequest {
    const message = createBaseRedeemBgtForBeraRequest();
    message.accountAddress = object.accountAddress ?? "";
    message.amount = object.amount ?? "";
    return message;
  },
};

function createBaseRedeemBgtForBeraResponse(): RedeemBgtForBeraResponse {
  return {};
}

export const RedeemBgtForBeraResponse = {
  encode(
    _: RedeemBgtForBeraResponse,
    writer: _m0.Writer = _m0.Writer.create(),
  ): _m0.Writer {
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number,
  ): RedeemBgtForBeraResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseRedeemBgtForBeraResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(_: any): RedeemBgtForBeraResponse {
    return {};
  },

  toJSON(_: RedeemBgtForBeraResponse): unknown {
    const obj: any = {};
    return obj;
  },

  create<I extends Exact<DeepPartial<RedeemBgtForBeraResponse>, I>>(
    base?: I,
  ): RedeemBgtForBeraResponse {
    return RedeemBgtForBeraResponse.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<RedeemBgtForBeraResponse>, I>>(
    _: I,
  ): RedeemBgtForBeraResponse {
    const message = createBaseRedeemBgtForBeraResponse();
    return message;
  },
};

function createBaseUpdateParamsRequest(): UpdateParamsRequest {
  return { authority: "", params: undefined };
}

export const UpdateParamsRequest = {
  encode(
    message: UpdateParamsRequest,
    writer: _m0.Writer = _m0.Writer.create(),
  ): _m0.Writer {
    if (message.authority !== "") {
      writer.uint32(10).string(message.authority);
    }
    if (message.params !== undefined) {
      Params.encode(message.params, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): UpdateParamsRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseUpdateParamsRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.authority = reader.string();
          break;
        case 2:
          message.params = Params.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): UpdateParamsRequest {
    return {
      authority: isSet(object.authority) ? String(object.authority) : "",
      params: isSet(object.params) ? Params.fromJSON(object.params) : undefined,
    };
  },

  toJSON(message: UpdateParamsRequest): unknown {
    const obj: any = {};
    message.authority !== undefined && (obj.authority = message.authority);
    message.params !== undefined &&
      (obj.params = message.params ? Params.toJSON(message.params) : undefined);
    return obj;
  },

  create<I extends Exact<DeepPartial<UpdateParamsRequest>, I>>(
    base?: I,
  ): UpdateParamsRequest {
    return UpdateParamsRequest.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<UpdateParamsRequest>, I>>(
    object: I,
  ): UpdateParamsRequest {
    const message = createBaseUpdateParamsRequest();
    message.authority = object.authority ?? "";
    message.params =
      object.params !== undefined && object.params !== null
        ? Params.fromPartial(object.params)
        : undefined;
    return message;
  },
};

function createBaseUpdateParamsResponse(): UpdateParamsResponse {
  return {};
}

export const UpdateParamsResponse = {
  encode(
    _: UpdateParamsResponse,
    writer: _m0.Writer = _m0.Writer.create(),
  ): _m0.Writer {
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number,
  ): UpdateParamsResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseUpdateParamsResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(_: any): UpdateParamsResponse {
    return {};
  },

  toJSON(_: UpdateParamsResponse): unknown {
    const obj: any = {};
    return obj;
  },

  create<I extends Exact<DeepPartial<UpdateParamsResponse>, I>>(
    base?: I,
  ): UpdateParamsResponse {
    return UpdateParamsResponse.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<UpdateParamsResponse>, I>>(
    _: I,
  ): UpdateParamsResponse {
    const message = createBaseUpdateParamsResponse();
    return message;
  },
};

/** Msg defines the bgt Msg service. */
export interface MsgService {
  /** CreateBribe defines a method for creating a bribe. */
  CreateBribe(request: CreateBribeRequest): Promise<CreateBribeResponse>;
  /** RedeemBgtForBera defines a method for redeeming BGT for Bera */
  RedeemBgtForBera(
    request: RedeemBgtForBeraRequest,
  ): Promise<RedeemBgtForBeraResponse>;
  /** UpdatesParams defines a method for updating the module params. */
  UpdateParams(request: UpdateParamsRequest): Promise<UpdateParamsResponse>;
}

export class MsgServiceClientImpl implements MsgService {
  private readonly rpc: Rpc;
  private readonly service: string;
  constructor(rpc: Rpc, opts?: { service?: string }) {
    this.service = opts?.service || "berachain.bgt.v1.MsgService";
    this.rpc = rpc;
    this.CreateBribe = this.CreateBribe.bind(this);
    this.RedeemBgtForBera = this.RedeemBgtForBera.bind(this);
    this.UpdateParams = this.UpdateParams.bind(this);
  }
  CreateBribe(request: CreateBribeRequest): Promise<CreateBribeResponse> {
    const data = CreateBribeRequest.encode(request).finish();
    const promise = this.rpc.request(this.service, "CreateBribe", data);
    return promise.then((data) =>
      CreateBribeResponse.decode(new _m0.Reader(data)),
    );
  }

  RedeemBgtForBera(
    request: RedeemBgtForBeraRequest,
  ): Promise<RedeemBgtForBeraResponse> {
    const data = RedeemBgtForBeraRequest.encode(request).finish();
    const promise = this.rpc.request(this.service, "RedeemBgtForBera", data);
    return promise.then((data) =>
      RedeemBgtForBeraResponse.decode(new _m0.Reader(data)),
    );
  }

  UpdateParams(request: UpdateParamsRequest): Promise<UpdateParamsResponse> {
    const data = UpdateParamsRequest.encode(request).finish();
    const promise = this.rpc.request(this.service, "UpdateParams", data);
    return promise.then((data) =>
      UpdateParamsResponse.decode(new _m0.Reader(data)),
    );
  }
}

interface Rpc {
  request(
    service: string,
    method: string,
    data: Uint8Array,
  ): Promise<Uint8Array>;
}

type Builtin =
  | Date
  | Function
  | Uint8Array
  | string
  | number
  | boolean
  | undefined;

export type DeepPartial<T> = T extends Builtin
  ? T
  : T extends Long
  ? string | number | Long
  : T extends Array<infer U>
  ? Array<DeepPartial<U>>
  : T extends ReadonlyArray<infer U>
  ? ReadonlyArray<DeepPartial<U>>
  : T extends {}
  ? { [K in keyof T]?: DeepPartial<T[K]> }
  : Partial<T>;

type KeysOfUnion<T> = T extends T ? keyof T : never;
export type Exact<P, I extends P> = P extends Builtin
  ? P
  : P & { [K in keyof P]: Exact<P[K], I[K]> } & {
      [K in Exclude<keyof I, KeysOfUnion<P>>]: never;
    };

if (_m0.util.Long !== Long) {
  _m0.util.Long = Long as any;
  _m0.configure();
}

function isSet(value: any): boolean {
  return value !== null && value !== undefined;
}
