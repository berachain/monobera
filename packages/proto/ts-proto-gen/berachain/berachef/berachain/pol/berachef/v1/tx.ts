/* eslint-disable */
import Long from "long";
import _m0 from "protobufjs/minimal";
import { Weight } from "./berachef";
import {
  UpdateFriendsOfTheChefRequest,
  UpdateFriendsOfTheChefResponse,
  UpdateParamsRequest,
  UpdateParamsResponse,
} from "./governance";

export const protobufPackage = "berachain.pol.berachef.v1";

/**
 * QueueNewCuttingBoardRequest defines the request structure for executing a
 * QueueNewCuttingBoard message.
 */
export interface QueueNewCuttingBoardRequest {
  /** The operator address of the validator. */
  operatorAddress: string;
  /** The weights of the cutting board. */
  weights: Weight[];
  /** The epoch this cutting board begins at. */
  startEpoch: Long;
}

/**
 * QueueNewCuttingBoardResponse defines the response structure for executing a
 * QueueNewCuttingBoardRequest message.
 */
export interface QueueNewCuttingBoardResponse {
}

function createBaseQueueNewCuttingBoardRequest(): QueueNewCuttingBoardRequest {
  return { operatorAddress: "", weights: [], startEpoch: Long.ZERO };
}

export const QueueNewCuttingBoardRequest = {
  encode(message: QueueNewCuttingBoardRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.operatorAddress !== "") {
      writer.uint32(10).string(message.operatorAddress);
    }
    for (const v of message.weights) {
      Weight.encode(v!, writer.uint32(18).fork()).ldelim();
    }
    if (!message.startEpoch.isZero()) {
      writer.uint32(24).int64(message.startEpoch);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): QueueNewCuttingBoardRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueueNewCuttingBoardRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.operatorAddress = reader.string();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.weights.push(Weight.decode(reader, reader.uint32()));
          continue;
        case 3:
          if (tag !== 24) {
            break;
          }

          message.startEpoch = reader.int64() as Long;
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): QueueNewCuttingBoardRequest {
    return {
      operatorAddress: isSet(object.operatorAddress) ? String(object.operatorAddress) : "",
      weights: Array.isArray(object?.weights) ? object.weights.map((e: any) => Weight.fromJSON(e)) : [],
      startEpoch: isSet(object.startEpoch) ? Long.fromValue(object.startEpoch) : Long.ZERO,
    };
  },

  toJSON(message: QueueNewCuttingBoardRequest): unknown {
    const obj: any = {};
    if (message.operatorAddress !== "") {
      obj.operatorAddress = message.operatorAddress;
    }
    if (message.weights?.length) {
      obj.weights = message.weights.map((e) => Weight.toJSON(e));
    }
    if (!message.startEpoch.isZero()) {
      obj.startEpoch = (message.startEpoch || Long.ZERO).toString();
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<QueueNewCuttingBoardRequest>, I>>(base?: I): QueueNewCuttingBoardRequest {
    return QueueNewCuttingBoardRequest.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<QueueNewCuttingBoardRequest>, I>>(object: I): QueueNewCuttingBoardRequest {
    const message = createBaseQueueNewCuttingBoardRequest();
    message.operatorAddress = object.operatorAddress ?? "";
    message.weights = object.weights?.map((e) => Weight.fromPartial(e)) || [];
    message.startEpoch = (object.startEpoch !== undefined && object.startEpoch !== null)
      ? Long.fromValue(object.startEpoch)
      : Long.ZERO;
    return message;
  },
};

function createBaseQueueNewCuttingBoardResponse(): QueueNewCuttingBoardResponse {
  return {};
}

export const QueueNewCuttingBoardResponse = {
  encode(_: QueueNewCuttingBoardResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): QueueNewCuttingBoardResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueueNewCuttingBoardResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(_: any): QueueNewCuttingBoardResponse {
    return {};
  },

  toJSON(_: QueueNewCuttingBoardResponse): unknown {
    const obj: any = {};
    return obj;
  },

  create<I extends Exact<DeepPartial<QueueNewCuttingBoardResponse>, I>>(base?: I): QueueNewCuttingBoardResponse {
    return QueueNewCuttingBoardResponse.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<QueueNewCuttingBoardResponse>, I>>(_: I): QueueNewCuttingBoardResponse {
    const message = createBaseQueueNewCuttingBoardResponse();
    return message;
  },
};

/** Msg defines the Msg service. */
export interface MsgService {
  /**
   * QueueNewCuttingBoard a defines a method for a validator operator to queue
   * up a new cutting board for their validator.
   */
  QueueNewCuttingBoard(request: QueueNewCuttingBoardRequest): Promise<QueueNewCuttingBoardResponse>;
  /** UpdateFriendsOfTheChef defines a method for updating the friends of the chef. */
  UpdateFriendsOfTheChef(request: UpdateFriendsOfTheChefRequest): Promise<UpdateFriendsOfTheChefResponse>;
  /** UpdateParams defines a method for updating the module parameters. */
  UpdateParams(request: UpdateParamsRequest): Promise<UpdateParamsResponse>;
}

export const MsgServiceServiceName = "berachain.pol.berachef.v1.MsgService";
export class MsgServiceClientImpl implements MsgService {
  private readonly rpc: Rpc;
  private readonly service: string;
  constructor(rpc: Rpc, opts?: { service?: string }) {
    this.service = opts?.service || MsgServiceServiceName;
    this.rpc = rpc;
    this.QueueNewCuttingBoard = this.QueueNewCuttingBoard.bind(this);
    this.UpdateFriendsOfTheChef = this.UpdateFriendsOfTheChef.bind(this);
    this.UpdateParams = this.UpdateParams.bind(this);
  }
  QueueNewCuttingBoard(request: QueueNewCuttingBoardRequest): Promise<QueueNewCuttingBoardResponse> {
    const data = QueueNewCuttingBoardRequest.encode(request).finish();
    const promise = this.rpc.request(this.service, "QueueNewCuttingBoard", data);
    return promise.then((data) => QueueNewCuttingBoardResponse.decode(_m0.Reader.create(data)));
  }

  UpdateFriendsOfTheChef(request: UpdateFriendsOfTheChefRequest): Promise<UpdateFriendsOfTheChefResponse> {
    const data = UpdateFriendsOfTheChefRequest.encode(request).finish();
    const promise = this.rpc.request(this.service, "UpdateFriendsOfTheChef", data);
    return promise.then((data) => UpdateFriendsOfTheChefResponse.decode(_m0.Reader.create(data)));
  }

  UpdateParams(request: UpdateParamsRequest): Promise<UpdateParamsResponse> {
    const data = UpdateParamsRequest.encode(request).finish();
    const promise = this.rpc.request(this.service, "UpdateParams", data);
    return promise.then((data) => UpdateParamsResponse.decode(_m0.Reader.create(data)));
  }
}

interface Rpc {
  request(service: string, method: string, data: Uint8Array): Promise<Uint8Array>;
}

type Builtin = Date | Function | Uint8Array | string | number | boolean | undefined;

export type DeepPartial<T> = T extends Builtin ? T
  : T extends Long ? string | number | Long : T extends Array<infer U> ? Array<DeepPartial<U>>
  : T extends ReadonlyArray<infer U> ? ReadonlyArray<DeepPartial<U>>
  : T extends {} ? { [K in keyof T]?: DeepPartial<T[K]> }
  : Partial<T>;

type KeysOfUnion<T> = T extends T ? keyof T : never;
export type Exact<P, I extends P> = P extends Builtin ? P
  : P & { [K in keyof P]: Exact<P[K], I[K]> } & { [K in Exclude<keyof I, KeysOfUnion<P>>]: never };

if (_m0.util.Long !== Long) {
  _m0.util.Long = Long as any;
  _m0.configure();
}

function isSet(value: any): boolean {
  return value !== null && value !== undefined;
}
