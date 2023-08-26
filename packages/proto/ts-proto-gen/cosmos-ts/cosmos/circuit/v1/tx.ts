/* eslint-disable */
import Long from "long";
import _m0 from "protobufjs/minimal";

export const protobufPackage = "cosmos.circuit.v1";

/** MsgAuthorizeCircuitBreaker defines the Msg/AuthorizeCircuitBreaker request type. */
export interface MsgAuthorizeCircuitBreaker {
  /**
   * granter is the granter of the circuit breaker permissions and must have
   * LEVEL_SUPER_ADMIN.
   */
  granter: string;
  /** grantee is the account authorized with the provided permissions. */
  grantee: string;
  /**
   * permissions are the circuit breaker permissions that the grantee receives.
   * These will overwrite any existing permissions. LEVEL_NONE_UNSPECIFIED can
   * be specified to revoke all permissions.
   */
  permissions?: CircuitBreakerPermissions;
}

/** MsgAuthorizeCircuitBreaker defines the Msg/AuthorizeCircuitBreaker response type. */
export interface MsgAuthorizeCircuitBreakerResponse {}

/**
 * CircuitBreakerPermissions are the permissions that an account has to trip
 * or reset the circuit breaker.
 */
export interface CircuitBreakerPermissions {
  /** level is the level of permissions granted to this account. */
  level: CircuitBreakerPermissions_Level;
  /**
   * limit_type_urls is used with LEVEL_SOME_MSGS to limit the lists of Msg type
   * URLs that the account can pause. It is an error to use limit_type_urls with
   * a level other than LEVEL_SOME_MSGS.
   */
  limitTypeUrls: string[];
}

/** Level is the permission level. */
export enum CircuitBreakerPermissions_Level {
  /**
   * LEVEL_NONE_UNSPECIFIED - LEVEL_NONE_UNSPECIFIED indicates that the account will have no circuit
   * breaker permissions.
   */
  LEVEL_NONE_UNSPECIFIED = 0,
  /**
   * LEVEL_SOME_MSGS - LEVEL_SOME_MSGS indicates that the account will have permission to
   * trip or reset the circuit breaker for some Msg type URLs. If this level
   * is chosen, a non-empty list of Msg type URLs must be provided in
   * limit_type_urls.
   */
  LEVEL_SOME_MSGS = 1,
  /**
   * LEVEL_ALL_MSGS - LEVEL_ALL_MSGS indicates that the account can trip or reset the circuit
   * breaker for Msg's of all type URLs.
   */
  LEVEL_ALL_MSGS = 2,
  /**
   * LEVEL_SUPER_ADMIN - LEVEL_SUPER_ADMIN indicates that the account can take all circuit breaker
   * actions and can grant permissions to other accounts.
   */
  LEVEL_SUPER_ADMIN = 3,
  UNRECOGNIZED = -1,
}

export function circuitBreakerPermissions_LevelFromJSON(
  object: any,
): CircuitBreakerPermissions_Level {
  switch (object) {
    case 0:
    case "LEVEL_NONE_UNSPECIFIED":
      return CircuitBreakerPermissions_Level.LEVEL_NONE_UNSPECIFIED;
    case 1:
    case "LEVEL_SOME_MSGS":
      return CircuitBreakerPermissions_Level.LEVEL_SOME_MSGS;
    case 2:
    case "LEVEL_ALL_MSGS":
      return CircuitBreakerPermissions_Level.LEVEL_ALL_MSGS;
    case 3:
    case "LEVEL_SUPER_ADMIN":
      return CircuitBreakerPermissions_Level.LEVEL_SUPER_ADMIN;
    case -1:
    case "UNRECOGNIZED":
    default:
      return CircuitBreakerPermissions_Level.UNRECOGNIZED;
  }
}

export function circuitBreakerPermissions_LevelToJSON(
  object: CircuitBreakerPermissions_Level,
): string {
  switch (object) {
    case CircuitBreakerPermissions_Level.LEVEL_NONE_UNSPECIFIED:
      return "LEVEL_NONE_UNSPECIFIED";
    case CircuitBreakerPermissions_Level.LEVEL_SOME_MSGS:
      return "LEVEL_SOME_MSGS";
    case CircuitBreakerPermissions_Level.LEVEL_ALL_MSGS:
      return "LEVEL_ALL_MSGS";
    case CircuitBreakerPermissions_Level.LEVEL_SUPER_ADMIN:
      return "LEVEL_SUPER_ADMIN";
    case CircuitBreakerPermissions_Level.UNRECOGNIZED:
    default:
      return "UNRECOGNIZED";
  }
}

/** MsgTripCircuitBreaker defines the Msg/TripCircuitBreaker request type. */
export interface MsgTripCircuitBreaker {
  /** authority is the account authorized to trip the circuit breaker. */
  authority: string;
  /**
   * msg_type_urls specifies a list of type URLs to immediately stop processing.
   * IF IT IS LEFT EMPTY, ALL MSG PROCESSING WILL STOP IMMEDIATELY.
   * This value is validated against the authority's permissions and if the
   * authority does not have permissions to trip the specified msg type URLs
   * (or all URLs), the operation will fail.
   */
  msgTypeUrls: string[];
}

/** MsgTripCircuitBreaker defines the Msg/TripCircuitBreaker response type. */
export interface MsgTripCircuitBreakerResponse {}

/** MsgResetCircuitBreaker defines the Msg/ResetCircuitBreaker request type. */
export interface MsgResetCircuitBreaker {
  /** authority is the account authorized to trip or reset the circuit breaker. */
  authority: string;
  /**
   * msg_type_urls specifies a list of Msg type URLs to resume processing. If
   * it is left empty all Msg processing for type URLs that the account is
   * authorized to trip will resume.
   */
  msgTypeUrls: string[];
}

/** MsgResetCircuitBreakerResponse defines the Msg/ResetCircuitBreaker response type. */
export interface MsgResetCircuitBreakerResponse {}

function createBaseMsgAuthorizeCircuitBreaker(): MsgAuthorizeCircuitBreaker {
  return { granter: "", grantee: "", permissions: undefined };
}

export const MsgAuthorizeCircuitBreaker = {
  encode(
    message: MsgAuthorizeCircuitBreaker,
    writer: _m0.Writer = _m0.Writer.create(),
  ): _m0.Writer {
    if (message.granter !== "") {
      writer.uint32(10).string(message.granter);
    }
    if (message.grantee !== "") {
      writer.uint32(18).string(message.grantee);
    }
    if (message.permissions !== undefined) {
      CircuitBreakerPermissions.encode(
        message.permissions,
        writer.uint32(26).fork(),
      ).ldelim();
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number,
  ): MsgAuthorizeCircuitBreaker {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgAuthorizeCircuitBreaker();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.granter = reader.string();
          break;
        case 2:
          message.grantee = reader.string();
          break;
        case 3:
          message.permissions = CircuitBreakerPermissions.decode(
            reader,
            reader.uint32(),
          );
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): MsgAuthorizeCircuitBreaker {
    return {
      granter: isSet(object.granter) ? String(object.granter) : "",
      grantee: isSet(object.grantee) ? String(object.grantee) : "",
      permissions: isSet(object.permissions)
        ? CircuitBreakerPermissions.fromJSON(object.permissions)
        : undefined,
    };
  },

  toJSON(message: MsgAuthorizeCircuitBreaker): unknown {
    const obj: any = {};
    message.granter !== undefined && (obj.granter = message.granter);
    message.grantee !== undefined && (obj.grantee = message.grantee);
    message.permissions !== undefined &&
      (obj.permissions = message.permissions
        ? CircuitBreakerPermissions.toJSON(message.permissions)
        : undefined);
    return obj;
  },

  create<I extends Exact<DeepPartial<MsgAuthorizeCircuitBreaker>, I>>(
    base?: I,
  ): MsgAuthorizeCircuitBreaker {
    return MsgAuthorizeCircuitBreaker.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<MsgAuthorizeCircuitBreaker>, I>>(
    object: I,
  ): MsgAuthorizeCircuitBreaker {
    const message = createBaseMsgAuthorizeCircuitBreaker();
    message.granter = object.granter ?? "";
    message.grantee = object.grantee ?? "";
    message.permissions =
      object.permissions !== undefined && object.permissions !== null
        ? CircuitBreakerPermissions.fromPartial(object.permissions)
        : undefined;
    return message;
  },
};

function createBaseMsgAuthorizeCircuitBreakerResponse(): MsgAuthorizeCircuitBreakerResponse {
  return {};
}

export const MsgAuthorizeCircuitBreakerResponse = {
  encode(
    _: MsgAuthorizeCircuitBreakerResponse,
    writer: _m0.Writer = _m0.Writer.create(),
  ): _m0.Writer {
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number,
  ): MsgAuthorizeCircuitBreakerResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgAuthorizeCircuitBreakerResponse();
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

  fromJSON(_: any): MsgAuthorizeCircuitBreakerResponse {
    return {};
  },

  toJSON(_: MsgAuthorizeCircuitBreakerResponse): unknown {
    const obj: any = {};
    return obj;
  },

  create<I extends Exact<DeepPartial<MsgAuthorizeCircuitBreakerResponse>, I>>(
    base?: I,
  ): MsgAuthorizeCircuitBreakerResponse {
    return MsgAuthorizeCircuitBreakerResponse.fromPartial(base ?? {});
  },

  fromPartial<
    I extends Exact<DeepPartial<MsgAuthorizeCircuitBreakerResponse>, I>,
  >(_: I): MsgAuthorizeCircuitBreakerResponse {
    const message = createBaseMsgAuthorizeCircuitBreakerResponse();
    return message;
  },
};

function createBaseCircuitBreakerPermissions(): CircuitBreakerPermissions {
  return { level: 0, limitTypeUrls: [] };
}

export const CircuitBreakerPermissions = {
  encode(
    message: CircuitBreakerPermissions,
    writer: _m0.Writer = _m0.Writer.create(),
  ): _m0.Writer {
    if (message.level !== 0) {
      writer.uint32(8).int32(message.level);
    }
    for (const v of message.limitTypeUrls) {
      writer.uint32(18).string(v!);
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number,
  ): CircuitBreakerPermissions {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseCircuitBreakerPermissions();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.level = reader.int32() as any;
          break;
        case 2:
          message.limitTypeUrls.push(reader.string());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): CircuitBreakerPermissions {
    return {
      level: isSet(object.level)
        ? circuitBreakerPermissions_LevelFromJSON(object.level)
        : 0,
      limitTypeUrls: Array.isArray(object?.limitTypeUrls)
        ? object.limitTypeUrls.map((e: any) => String(e))
        : [],
    };
  },

  toJSON(message: CircuitBreakerPermissions): unknown {
    const obj: any = {};
    message.level !== undefined &&
      (obj.level = circuitBreakerPermissions_LevelToJSON(message.level));
    if (message.limitTypeUrls) {
      obj.limitTypeUrls = message.limitTypeUrls.map((e) => e);
    } else {
      obj.limitTypeUrls = [];
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<CircuitBreakerPermissions>, I>>(
    base?: I,
  ): CircuitBreakerPermissions {
    return CircuitBreakerPermissions.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<CircuitBreakerPermissions>, I>>(
    object: I,
  ): CircuitBreakerPermissions {
    const message = createBaseCircuitBreakerPermissions();
    message.level = object.level ?? 0;
    message.limitTypeUrls = object.limitTypeUrls?.map((e) => e) || [];
    return message;
  },
};

function createBaseMsgTripCircuitBreaker(): MsgTripCircuitBreaker {
  return { authority: "", msgTypeUrls: [] };
}

export const MsgTripCircuitBreaker = {
  encode(
    message: MsgTripCircuitBreaker,
    writer: _m0.Writer = _m0.Writer.create(),
  ): _m0.Writer {
    if (message.authority !== "") {
      writer.uint32(10).string(message.authority);
    }
    for (const v of message.msgTypeUrls) {
      writer.uint32(18).string(v!);
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number,
  ): MsgTripCircuitBreaker {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgTripCircuitBreaker();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.authority = reader.string();
          break;
        case 2:
          message.msgTypeUrls.push(reader.string());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): MsgTripCircuitBreaker {
    return {
      authority: isSet(object.authority) ? String(object.authority) : "",
      msgTypeUrls: Array.isArray(object?.msgTypeUrls)
        ? object.msgTypeUrls.map((e: any) => String(e))
        : [],
    };
  },

  toJSON(message: MsgTripCircuitBreaker): unknown {
    const obj: any = {};
    message.authority !== undefined && (obj.authority = message.authority);
    if (message.msgTypeUrls) {
      obj.msgTypeUrls = message.msgTypeUrls.map((e) => e);
    } else {
      obj.msgTypeUrls = [];
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<MsgTripCircuitBreaker>, I>>(
    base?: I,
  ): MsgTripCircuitBreaker {
    return MsgTripCircuitBreaker.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<MsgTripCircuitBreaker>, I>>(
    object: I,
  ): MsgTripCircuitBreaker {
    const message = createBaseMsgTripCircuitBreaker();
    message.authority = object.authority ?? "";
    message.msgTypeUrls = object.msgTypeUrls?.map((e) => e) || [];
    return message;
  },
};

function createBaseMsgTripCircuitBreakerResponse(): MsgTripCircuitBreakerResponse {
  return {};
}

export const MsgTripCircuitBreakerResponse = {
  encode(
    _: MsgTripCircuitBreakerResponse,
    writer: _m0.Writer = _m0.Writer.create(),
  ): _m0.Writer {
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number,
  ): MsgTripCircuitBreakerResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgTripCircuitBreakerResponse();
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

  fromJSON(_: any): MsgTripCircuitBreakerResponse {
    return {};
  },

  toJSON(_: MsgTripCircuitBreakerResponse): unknown {
    const obj: any = {};
    return obj;
  },

  create<I extends Exact<DeepPartial<MsgTripCircuitBreakerResponse>, I>>(
    base?: I,
  ): MsgTripCircuitBreakerResponse {
    return MsgTripCircuitBreakerResponse.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<MsgTripCircuitBreakerResponse>, I>>(
    _: I,
  ): MsgTripCircuitBreakerResponse {
    const message = createBaseMsgTripCircuitBreakerResponse();
    return message;
  },
};

function createBaseMsgResetCircuitBreaker(): MsgResetCircuitBreaker {
  return { authority: "", msgTypeUrls: [] };
}

export const MsgResetCircuitBreaker = {
  encode(
    message: MsgResetCircuitBreaker,
    writer: _m0.Writer = _m0.Writer.create(),
  ): _m0.Writer {
    if (message.authority !== "") {
      writer.uint32(10).string(message.authority);
    }
    for (const v of message.msgTypeUrls) {
      writer.uint32(26).string(v!);
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number,
  ): MsgResetCircuitBreaker {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgResetCircuitBreaker();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.authority = reader.string();
          break;
        case 3:
          message.msgTypeUrls.push(reader.string());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): MsgResetCircuitBreaker {
    return {
      authority: isSet(object.authority) ? String(object.authority) : "",
      msgTypeUrls: Array.isArray(object?.msgTypeUrls)
        ? object.msgTypeUrls.map((e: any) => String(e))
        : [],
    };
  },

  toJSON(message: MsgResetCircuitBreaker): unknown {
    const obj: any = {};
    message.authority !== undefined && (obj.authority = message.authority);
    if (message.msgTypeUrls) {
      obj.msgTypeUrls = message.msgTypeUrls.map((e) => e);
    } else {
      obj.msgTypeUrls = [];
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<MsgResetCircuitBreaker>, I>>(
    base?: I,
  ): MsgResetCircuitBreaker {
    return MsgResetCircuitBreaker.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<MsgResetCircuitBreaker>, I>>(
    object: I,
  ): MsgResetCircuitBreaker {
    const message = createBaseMsgResetCircuitBreaker();
    message.authority = object.authority ?? "";
    message.msgTypeUrls = object.msgTypeUrls?.map((e) => e) || [];
    return message;
  },
};

function createBaseMsgResetCircuitBreakerResponse(): MsgResetCircuitBreakerResponse {
  return {};
}

export const MsgResetCircuitBreakerResponse = {
  encode(
    _: MsgResetCircuitBreakerResponse,
    writer: _m0.Writer = _m0.Writer.create(),
  ): _m0.Writer {
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number,
  ): MsgResetCircuitBreakerResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgResetCircuitBreakerResponse();
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

  fromJSON(_: any): MsgResetCircuitBreakerResponse {
    return {};
  },

  toJSON(_: MsgResetCircuitBreakerResponse): unknown {
    const obj: any = {};
    return obj;
  },

  create<I extends Exact<DeepPartial<MsgResetCircuitBreakerResponse>, I>>(
    base?: I,
  ): MsgResetCircuitBreakerResponse {
    return MsgResetCircuitBreakerResponse.fromPartial(base ?? {});
  },

  fromPartial<I extends Exact<DeepPartial<MsgResetCircuitBreakerResponse>, I>>(
    _: I,
  ): MsgResetCircuitBreakerResponse {
    const message = createBaseMsgResetCircuitBreakerResponse();
    return message;
  },
};

/** Msg defines the crisis Msg service. */
export interface Msg {
  /**
   * AuthorizeCircuitBreaker allows a super-admin to grant (or revoke) another
   * account's circuit breaker permissions.
   */
  AuthorizeCircuitBreaker(
    request: MsgAuthorizeCircuitBreaker,
  ): Promise<MsgAuthorizeCircuitBreakerResponse>;
  /** TripCircuitBreaker pauses processing of Msg's in the state machine. */
  TripCircuitBreaker(
    request: MsgTripCircuitBreaker,
  ): Promise<MsgTripCircuitBreakerResponse>;
  /**
   * ResetCircuitBreaker resumes processing of Msg's in the state machine that
   * have been been paused using TripCircuitBreaker.
   */
  ResetCircuitBreaker(
    request: MsgResetCircuitBreaker,
  ): Promise<MsgResetCircuitBreakerResponse>;
}

export class MsgClientImpl implements Msg {
  private readonly rpc: Rpc;
  private readonly service: string;
  constructor(rpc: Rpc, opts?: { service?: string }) {
    this.service = opts?.service || "cosmos.circuit.v1.Msg";
    this.rpc = rpc;
    this.AuthorizeCircuitBreaker = this.AuthorizeCircuitBreaker.bind(this);
    this.TripCircuitBreaker = this.TripCircuitBreaker.bind(this);
    this.ResetCircuitBreaker = this.ResetCircuitBreaker.bind(this);
  }
  AuthorizeCircuitBreaker(
    request: MsgAuthorizeCircuitBreaker,
  ): Promise<MsgAuthorizeCircuitBreakerResponse> {
    const data = MsgAuthorizeCircuitBreaker.encode(request).finish();
    const promise = this.rpc.request(
      this.service,
      "AuthorizeCircuitBreaker",
      data,
    );
    return promise.then((data) =>
      MsgAuthorizeCircuitBreakerResponse.decode(new _m0.Reader(data)),
    );
  }

  TripCircuitBreaker(
    request: MsgTripCircuitBreaker,
  ): Promise<MsgTripCircuitBreakerResponse> {
    const data = MsgTripCircuitBreaker.encode(request).finish();
    const promise = this.rpc.request(this.service, "TripCircuitBreaker", data);
    return promise.then((data) =>
      MsgTripCircuitBreakerResponse.decode(new _m0.Reader(data)),
    );
  }

  ResetCircuitBreaker(
    request: MsgResetCircuitBreaker,
  ): Promise<MsgResetCircuitBreakerResponse> {
    const data = MsgResetCircuitBreaker.encode(request).finish();
    const promise = this.rpc.request(this.service, "ResetCircuitBreaker", data);
    return promise.then((data) =>
      MsgResetCircuitBreakerResponse.decode(new _m0.Reader(data)),
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
