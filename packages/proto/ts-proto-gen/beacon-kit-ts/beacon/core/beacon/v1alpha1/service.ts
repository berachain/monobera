/* eslint-disable */
import Long from "long";
import _m0 from "protobufjs/minimal";
import { Empty } from "../../../google/protobuf/empty";
import { Validator } from "./types";

export const protobufPackage = "core.beacon.v1alpha1";

/** ValidatorByPubkeyRequest represents the request for fetching a validator by public key. */
export interface ValidatorByPubkeyRequest {
  /** The public key of the validator. */
  pubkey: string;
}

/** ValidatorByPubkeyResponse represents the response containing the requested validator. */
export interface ValidatorByPubkeyResponse {
  /** The validator information. */
  validator?: Validator | undefined;
}

/** TotalValidatorsRequest represents the request for fetching the total number of validators. */
export interface TotalValidatorsRequest {
}

/** TotalValidatorsResponse represents the response containing the total number of validators. */
export interface TotalValidatorsResponse {
  /** The total number of validators. */
  total: number;
}

/** ValidatorsResponse encapsulates a list of Validator objects. */
export interface ValidatorsResponse {
  /** validators is a repeated field containing multiple Validator objects. */
  validators: Validator[];
}

function createBaseValidatorByPubkeyRequest(): ValidatorByPubkeyRequest {
  return { pubkey: "" };
}

export const ValidatorByPubkeyRequest = {
  encode(message: ValidatorByPubkeyRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.pubkey !== "") {
      writer.uint32(10).string(message.pubkey);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ValidatorByPubkeyRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseValidatorByPubkeyRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.pubkey = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): ValidatorByPubkeyRequest {
    return { pubkey: isSet(object.pubkey) ? String(object.pubkey) : "" };
  },

  toJSON(message: ValidatorByPubkeyRequest): unknown {
    const obj: any = {};
    if (message.pubkey !== "") {
      obj.pubkey = message.pubkey;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<ValidatorByPubkeyRequest>, I>>(base?: I): ValidatorByPubkeyRequest {
    return ValidatorByPubkeyRequest.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<ValidatorByPubkeyRequest>, I>>(object: I): ValidatorByPubkeyRequest {
    const message = createBaseValidatorByPubkeyRequest();
    message.pubkey = object.pubkey ?? "";
    return message;
  },
};

function createBaseValidatorByPubkeyResponse(): ValidatorByPubkeyResponse {
  return { validator: undefined };
}

export const ValidatorByPubkeyResponse = {
  encode(message: ValidatorByPubkeyResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.validator !== undefined) {
      Validator.encode(message.validator, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ValidatorByPubkeyResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseValidatorByPubkeyResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.validator = Validator.decode(reader, reader.uint32());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): ValidatorByPubkeyResponse {
    return { validator: isSet(object.validator) ? Validator.fromJSON(object.validator) : undefined };
  },

  toJSON(message: ValidatorByPubkeyResponse): unknown {
    const obj: any = {};
    if (message.validator !== undefined) {
      obj.validator = Validator.toJSON(message.validator);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<ValidatorByPubkeyResponse>, I>>(base?: I): ValidatorByPubkeyResponse {
    return ValidatorByPubkeyResponse.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<ValidatorByPubkeyResponse>, I>>(object: I): ValidatorByPubkeyResponse {
    const message = createBaseValidatorByPubkeyResponse();
    message.validator = (object.validator !== undefined && object.validator !== null)
      ? Validator.fromPartial(object.validator)
      : undefined;
    return message;
  },
};

function createBaseTotalValidatorsRequest(): TotalValidatorsRequest {
  return {};
}

export const TotalValidatorsRequest = {
  encode(_: TotalValidatorsRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): TotalValidatorsRequest {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseTotalValidatorsRequest();
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

  fromJSON(_: any): TotalValidatorsRequest {
    return {};
  },

  toJSON(_: TotalValidatorsRequest): unknown {
    const obj: any = {};
    return obj;
  },

  create<I extends Exact<DeepPartial<TotalValidatorsRequest>, I>>(base?: I): TotalValidatorsRequest {
    return TotalValidatorsRequest.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<TotalValidatorsRequest>, I>>(_: I): TotalValidatorsRequest {
    const message = createBaseTotalValidatorsRequest();
    return message;
  },
};

function createBaseTotalValidatorsResponse(): TotalValidatorsResponse {
  return { total: 0 };
}

export const TotalValidatorsResponse = {
  encode(message: TotalValidatorsResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.total !== 0) {
      writer.uint32(8).uint32(message.total);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): TotalValidatorsResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseTotalValidatorsResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 8) {
            break;
          }

          message.total = reader.uint32();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): TotalValidatorsResponse {
    return { total: isSet(object.total) ? Number(object.total) : 0 };
  },

  toJSON(message: TotalValidatorsResponse): unknown {
    const obj: any = {};
    if (message.total !== 0) {
      obj.total = Math.round(message.total);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<TotalValidatorsResponse>, I>>(base?: I): TotalValidatorsResponse {
    return TotalValidatorsResponse.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<TotalValidatorsResponse>, I>>(object: I): TotalValidatorsResponse {
    const message = createBaseTotalValidatorsResponse();
    message.total = object.total ?? 0;
    return message;
  },
};

function createBaseValidatorsResponse(): ValidatorsResponse {
  return { validators: [] };
}

export const ValidatorsResponse = {
  encode(message: ValidatorsResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    for (const v of message.validators) {
      Validator.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ValidatorsResponse {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseValidatorsResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.validators.push(Validator.decode(reader, reader.uint32()));
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): ValidatorsResponse {
    return {
      validators: Array.isArray(object?.validators) ? object.validators.map((e: any) => Validator.fromJSON(e)) : [],
    };
  },

  toJSON(message: ValidatorsResponse): unknown {
    const obj: any = {};
    if (message.validators?.length) {
      obj.validators = message.validators.map((e) => Validator.toJSON(e));
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<ValidatorsResponse>, I>>(base?: I): ValidatorsResponse {
    return ValidatorsResponse.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<ValidatorsResponse>, I>>(object: I): ValidatorsResponse {
    const message = createBaseValidatorsResponse();
    message.validators = object.validators?.map((e) => Validator.fromPartial(e)) || [];
    return message;
  },
};

/**
 * Validator is response type for the Query/Params RPC method.
 * APIService defines the gRPC service for interacting with Validators.
 */
export interface APIService {
  /** Validator retrieves a validator by their public key. */
  Validator(request: ValidatorByPubkeyRequest): Promise<ValidatorByPubkeyResponse>;
  /** Validators retrieves a list of validators. */
  Validators(request: Empty): Promise<ValidatorsResponse>;
  /** TotalValidators returns the total number of validators. */
  TotalValidators(request: TotalValidatorsRequest): Promise<TotalValidatorsResponse>;
}

export const APIServiceServiceName = "core.beacon.v1alpha1.APIService";
export class APIServiceClientImpl implements APIService {
  private readonly rpc: Rpc;
  private readonly service: string;
  constructor(rpc: Rpc, opts?: { service?: string }) {
    this.service = opts?.service || APIServiceServiceName;
    this.rpc = rpc;
    this.Validator = this.Validator.bind(this);
    this.Validators = this.Validators.bind(this);
    this.TotalValidators = this.TotalValidators.bind(this);
  }
  Validator(request: ValidatorByPubkeyRequest): Promise<ValidatorByPubkeyResponse> {
    const data = ValidatorByPubkeyRequest.encode(request).finish();
    const promise = this.rpc.request(this.service, "Validator", data);
    return promise.then((data) => ValidatorByPubkeyResponse.decode(_m0.Reader.create(data)));
  }

  Validators(request: Empty): Promise<ValidatorsResponse> {
    const data = Empty.encode(request).finish();
    const promise = this.rpc.request(this.service, "Validators", data);
    return promise.then((data) => ValidatorsResponse.decode(_m0.Reader.create(data)));
  }

  TotalValidators(request: TotalValidatorsRequest): Promise<TotalValidatorsResponse> {
    const data = TotalValidatorsRequest.encode(request).finish();
    const promise = this.rpc.request(this.service, "TotalValidators", data);
    return promise.then((data) => TotalValidatorsResponse.decode(_m0.Reader.create(data)));
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
