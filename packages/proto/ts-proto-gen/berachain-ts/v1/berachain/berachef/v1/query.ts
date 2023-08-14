/* eslint-disable */
import Long from "long";
import _m0 from "protobufjs/minimal";

import { CuttingBoard } from "./berachef";
import { Params } from "./params";

export const protobufPackage = "berachain.berachef.v1";

/** ActiveCuttingBoardRequest is the request type for the Query/ActiveCuttingBoard RPC method. */
export interface ActiveCuttingBoardRequest {
  /** cons_addr is the consensus address of the validator */
  consAddr: string;
}

/** ActiveCuttingBoardResponse is the response type for the Query/ActiveCuttingBoard RPC method. */
export interface ActiveCuttingBoardResponse {
  /** cutting_board is the cutting_board of the validator */
  cuttingBoard?: CuttingBoard;
}

/** QueuedCuttingBoardRequest is the request type for the Query/QueuedCuttingBoard RPC method. */
export interface QueuedCuttingBoardRequest {
  /** cons_addr is the consensus address of the validator */
  consAddr: string;
}

/** QueuedCuttingBoardResponse is the response type for the Query/QueuedCuttingBoard RPC method. */
export interface QueuedCuttingBoardResponse {
  /** cutting_board is the cutting_board for the request. */
  cuttingBoard?: CuttingBoard;
}

/** ParamsRequest is the request type for the Query/Params RPC method. */
export interface ParamsRequest {}

/** ParamsResponse is the response type for the Query/Params RPC method. */
export interface ParamsResponse {
  /** params defines the parameters of the module. */
  params?: Params;
}

function createBaseActiveCuttingBoardRequest(): ActiveCuttingBoardRequest {
  return { consAddr: "" };
}

export const ActiveCuttingBoardRequest = {
  encode(
    message: ActiveCuttingBoardRequest,
    writer: _m0.Writer = _m0.Writer.create(),
  ): _m0.Writer {
    if (message.consAddr !== "") {
      writer.uint32(10).string(message.consAddr);
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number,
  ): ActiveCuttingBoardRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseActiveCuttingBoardRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.consAddr = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): ActiveCuttingBoardRequest {
    return { consAddr: isSet(object.consAddr) ? String(object.consAddr) : "" };
  },

  toJSON(message: ActiveCuttingBoardRequest): unknown {
    const obj: any = {};
    message.consAddr !== undefined && (obj.consAddr = message.consAddr);
    return obj;
  },

  create<I extends Exact<DeepPartial<ActiveCuttingBoardRequest>, I>>(
    base?: I,
  ): ActiveCuttingBoardRequest {
    return ActiveCuttingBoardRequest.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<ActiveCuttingBoardRequest>, I>>(
    object: I,
  ): ActiveCuttingBoardRequest {
    const message = createBaseActiveCuttingBoardRequest();
    message.consAddr = object.consAddr ?? "";
    return message;
  },
};

function createBaseActiveCuttingBoardResponse(): ActiveCuttingBoardResponse {
  return { cuttingBoard: undefined };
}

export const ActiveCuttingBoardResponse = {
  encode(
    message: ActiveCuttingBoardResponse,
    writer: _m0.Writer = _m0.Writer.create(),
  ): _m0.Writer {
    if (message.cuttingBoard !== undefined) {
      CuttingBoard.encode(
        message.cuttingBoard,
        writer.uint32(10).fork(),
      ).ldelim();
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number,
  ): ActiveCuttingBoardResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseActiveCuttingBoardResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.cuttingBoard = CuttingBoard.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): ActiveCuttingBoardResponse {
    return {
      cuttingBoard: isSet(object.cuttingBoard)
        ? CuttingBoard.fromJSON(object.cuttingBoard)
        : undefined,
    };
  },

  toJSON(message: ActiveCuttingBoardResponse): unknown {
    const obj: any = {};
    message.cuttingBoard !== undefined &&
      (obj.cuttingBoard = message.cuttingBoard
        ? CuttingBoard.toJSON(message.cuttingBoard)
        : undefined);
    return obj;
  },

  create<I extends Exact<DeepPartial<ActiveCuttingBoardResponse>, I>>(
    base?: I,
  ): ActiveCuttingBoardResponse {
    return ActiveCuttingBoardResponse.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<ActiveCuttingBoardResponse>, I>>(
    object: I,
  ): ActiveCuttingBoardResponse {
    const message = createBaseActiveCuttingBoardResponse();
    message.cuttingBoard =
      object.cuttingBoard !== undefined && object.cuttingBoard !== null
        ? CuttingBoard.fromPartial(object.cuttingBoard)
        : undefined;
    return message;
  },
};

function createBaseQueuedCuttingBoardRequest(): QueuedCuttingBoardRequest {
  return { consAddr: "" };
}

export const QueuedCuttingBoardRequest = {
  encode(
    message: QueuedCuttingBoardRequest,
    writer: _m0.Writer = _m0.Writer.create(),
  ): _m0.Writer {
    if (message.consAddr !== "") {
      writer.uint32(10).string(message.consAddr);
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number,
  ): QueuedCuttingBoardRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueuedCuttingBoardRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.consAddr = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): QueuedCuttingBoardRequest {
    return { consAddr: isSet(object.consAddr) ? String(object.consAddr) : "" };
  },

  toJSON(message: QueuedCuttingBoardRequest): unknown {
    const obj: any = {};
    message.consAddr !== undefined && (obj.consAddr = message.consAddr);
    return obj;
  },

  create<I extends Exact<DeepPartial<QueuedCuttingBoardRequest>, I>>(
    base?: I,
  ): QueuedCuttingBoardRequest {
    return QueuedCuttingBoardRequest.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<QueuedCuttingBoardRequest>, I>>(
    object: I,
  ): QueuedCuttingBoardRequest {
    const message = createBaseQueuedCuttingBoardRequest();
    message.consAddr = object.consAddr ?? "";
    return message;
  },
};

function createBaseQueuedCuttingBoardResponse(): QueuedCuttingBoardResponse {
  return { cuttingBoard: undefined };
}

export const QueuedCuttingBoardResponse = {
  encode(
    message: QueuedCuttingBoardResponse,
    writer: _m0.Writer = _m0.Writer.create(),
  ): _m0.Writer {
    if (message.cuttingBoard !== undefined) {
      CuttingBoard.encode(
        message.cuttingBoard,
        writer.uint32(10).fork(),
      ).ldelim();
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number,
  ): QueuedCuttingBoardResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseQueuedCuttingBoardResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.cuttingBoard = CuttingBoard.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): QueuedCuttingBoardResponse {
    return {
      cuttingBoard: isSet(object.cuttingBoard)
        ? CuttingBoard.fromJSON(object.cuttingBoard)
        : undefined,
    };
  },

  toJSON(message: QueuedCuttingBoardResponse): unknown {
    const obj: any = {};
    message.cuttingBoard !== undefined &&
      (obj.cuttingBoard = message.cuttingBoard
        ? CuttingBoard.toJSON(message.cuttingBoard)
        : undefined);
    return obj;
  },

  create<I extends Exact<DeepPartial<QueuedCuttingBoardResponse>, I>>(
    base?: I,
  ): QueuedCuttingBoardResponse {
    return QueuedCuttingBoardResponse.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<QueuedCuttingBoardResponse>, I>>(
    object: I,
  ): QueuedCuttingBoardResponse {
    const message = createBaseQueuedCuttingBoardResponse();
    message.cuttingBoard =
      object.cuttingBoard !== undefined && object.cuttingBoard !== null
        ? CuttingBoard.fromPartial(object.cuttingBoard)
        : undefined;
    return message;
  },
};

function createBaseParamsRequest(): ParamsRequest {
  return {};
}

export const ParamsRequest = {
  encode(
    _: ParamsRequest,
    writer: _m0.Writer = _m0.Writer.create(),
  ): _m0.Writer {
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ParamsRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseParamsRequest();
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

  fromJSON(_: any): ParamsRequest {
    return {};
  },

  toJSON(_: ParamsRequest): unknown {
    const obj: any = {};
    return obj;
  },

  create<I extends Exact<DeepPartial<ParamsRequest>, I>>(
    base?: I,
  ): ParamsRequest {
    return ParamsRequest.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<ParamsRequest>, I>>(
    _: I,
  ): ParamsRequest {
    const message = createBaseParamsRequest();
    return message;
  },
};

function createBaseParamsResponse(): ParamsResponse {
  return { params: undefined };
}

export const ParamsResponse = {
  encode(
    message: ParamsResponse,
    writer: _m0.Writer = _m0.Writer.create(),
  ): _m0.Writer {
    if (message.params !== undefined) {
      Params.encode(message.params, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ParamsResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseParamsResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.params = Params.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): ParamsResponse {
    return {
      params: isSet(object.params) ? Params.fromJSON(object.params) : undefined,
    };
  },

  toJSON(message: ParamsResponse): unknown {
    const obj: any = {};
    message.params !== undefined &&
      (obj.params = message.params ? Params.toJSON(message.params) : undefined);
    return obj;
  },

  create<I extends Exact<DeepPartial<ParamsResponse>, I>>(
    base?: I,
  ): ParamsResponse {
    return ParamsResponse.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<ParamsResponse>, I>>(
    object: I,
  ): ParamsResponse {
    const message = createBaseParamsResponse();
    message.params =
      object.params !== undefined && object.params !== null
        ? Params.fromPartial(object.params)
        : undefined;
    return message;
  },
};

/** Query defines the gRPC querier service for distribution module. */
export interface QueryService {
  /** Params queries params of the distribution module. */
  Params(request: ParamsRequest): Promise<ParamsResponse>;
  /** EpochInfos provide running epochInfos */
  ActiveCuttingBoard(
    request: ActiveCuttingBoardRequest,
  ): Promise<ActiveCuttingBoardResponse>;
  /** CurrentEpoch provide current epoch of specified identifier */
  QueuedCuttingBoard(
    request: QueuedCuttingBoardRequest,
  ): Promise<QueuedCuttingBoardResponse>;
}

export class QueryServiceClientImpl implements QueryService {
  private readonly rpc: Rpc;
  private readonly service: string;
  constructor(rpc: Rpc, opts?: { service?: string }) {
    this.service = opts?.service || "berachain.berachef.v1.QueryService";
    this.rpc = rpc;
    this.Params = this.Params.bind(this);
    this.ActiveCuttingBoard = this.ActiveCuttingBoard.bind(this);
    this.QueuedCuttingBoard = this.QueuedCuttingBoard.bind(this);
  }
  Params(request: ParamsRequest): Promise<ParamsResponse> {
    const data = ParamsRequest.encode(request).finish();
    const promise = this.rpc.request(this.service, "Params", data);
    return promise.then((data) => ParamsResponse.decode(new _m0.Reader(data)));
  }

  ActiveCuttingBoard(
    request: ActiveCuttingBoardRequest,
  ): Promise<ActiveCuttingBoardResponse> {
    const data = ActiveCuttingBoardRequest.encode(request).finish();
    const promise = this.rpc.request(this.service, "ActiveCuttingBoard", data);
    return promise.then((data) =>
      ActiveCuttingBoardResponse.decode(new _m0.Reader(data)),
    );
  }

  QueuedCuttingBoard(
    request: QueuedCuttingBoardRequest,
  ): Promise<QueuedCuttingBoardResponse> {
    const data = QueuedCuttingBoardRequest.encode(request).finish();
    const promise = this.rpc.request(this.service, "QueuedCuttingBoard", data);
    return promise.then((data) =>
      QueuedCuttingBoardResponse.decode(new _m0.Reader(data)),
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
