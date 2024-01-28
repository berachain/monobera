import { AddressZero } from "@ethersproject/constants";
import { JsonRpcProvider, Provider } from "@ethersproject/providers";
import { Contract, Signer } from "ethers";

import { CROC_ABI, ERC20_ABI, QUERY_ABI } from "./abis";
import { ERC20_READ_ABI } from "./abis/erc20.read";
import { IMPACT_ABI } from "./abis/impact";
import { CHAIN_SPECS, ChainSpec } from "./constants";

export interface CrocContext {
  provider: Provider;
  // contracts
  dex: Contract;
  query: Contract;
  // impact: Contract;
  // longpath?: Contract;
  // micropath?: Contract;
  // hotpath?: Contract;
  // coldpath?: Contract;
  // koliqpath?: Contract;
  // koflippath?: Contract;
  slipQuery: Contract;
  erc20Read: Contract;
  erc20Write: Contract;
  chain: ChainSpec;
  senderAddr?: string;
}

export type ChainIdentifier = number | string;
export type ConnectArg = Provider | Signer | ChainIdentifier;

export async function connectCroc(
  providerOrChainId: ConnectArg,
  signer?: Signer,
): Promise<CrocContext> {
  const [provider, maybeSigner] = await buildProvider(
    providerOrChainId,
    signer,
  );
  const connection = await setupProvider(provider, maybeSigner);
  return connection;
}

async function buildProvider(
  arg: ConnectArg,
  signer?: Signer,
): Promise<[Provider, Signer | undefined]> {
  if (typeof arg === "number" || typeof arg == "string") {
    const context = lookupChain(arg);
    return buildProvider(new JsonRpcProvider(context.nodeUrl), signer);
  } else if ("getNetwork" in arg) {
    console.log("buildProvider", arg, signer);
    return [arg, signer];
  } else {
    const chainId = await arg.getChainId();
    return buildProvider(chainId, signer);
  }
}

async function setupProvider(
  provider: Provider,
  signer?: Signer,
): Promise<CrocContext> {
  const actor: any = signer ?? provider;
  const chainId = await getChain(provider);
  const cntx = inflateContracts(
    chainId,
    provider,
    actor,
    actor?.account?.address ?? "0xe98a5C831A62533a62f23a3f97Fa4E178364b4B7",
  );
  return cntx;
}

// async function attachSenderAddr(
//   cntx: CrocContext,
//   actor: any,
// ): Promise<CrocContext> {
//   try {
//     cntx.senderAddr = actor.account.address;
//     console.log("senderAddr", cntx.senderAddr, actor);
//   } catch (e) {}
//   return cntx;
// }

// function determineActor(
//   provider: Provider,
//   signer?: Signer,
// ): Signer | Provider {
//   if (signer) {
//     try {
//       return signer.connect(provider);
//     } catch {
//       return signer;
//     }
//   } else if ("getSigner" in provider) {
//     try {
//       const signer = (provider as ethers.providers.Web3Provider).getSigner();
//       return signer;
//     } catch {
//       return provider;
//     }
//   } else {
//     return provider;
//   }
// }

async function getChain(provider: Provider): Promise<number> {
  if ("chainId" in provider) {
    return (provider as any).chainId as number;
  } else if ("getNetwork" in provider) {
    return provider.getNetwork().then((n) => n.chainId);
  } else {
    throw new Error("Invalid provider");
  }
}

function inflateContracts(
  chainId: number,
  provider: Provider,
  actor: Provider | Signer,
  addr?: string | undefined,
): CrocContext {
  const context = lookupChain(chainId);
  return {
    provider: provider,
    dex: new Contract(context.addrs.dex, CROC_ABI, actor),
    query: new Contract(context.addrs.query, QUERY_ABI, provider),
    // impact: new Contract(context.addrs.impact, QUERY_ABI, provider),
    // longpath: new Contract(context.addrs.longpath, QUERY_ABI, provider),
    // micropath: new Contract(context.addrs.micropath, QUERY_ABI, provider),
    // hotpath: new Contract(context.addrs.hotpath, QUERY_ABI, provider),
    // coldpath: new Contract(context.addrs.coldpath, QUERY_ABI, provider),
    // koliqpath: new Contract(context.addrs.koliqpath, QUERY_ABI, provider),
    // koflippath: new Contract(context.addrs.koflippath, QUERY_ABI, provider),
    slipQuery: new Contract(context.addrs.impact, IMPACT_ABI, provider),
    erc20Write: new Contract(AddressZero, ERC20_ABI, actor),
    erc20Read: new Contract(AddressZero, ERC20_READ_ABI, provider),
    chain: context,
    senderAddr: addr,
  };
}

export function lookupChain(chainId: number | string): ChainSpec {
  if (typeof chainId === "number") {
    return lookupChain("0x" + chainId.toString(16));
  } else {
    const context = CHAIN_SPECS[chainId.toLowerCase()];
    if (!context) {
      throw new Error("Unsupported chain ID: " + chainId);
    }
    return context;
  }
}
