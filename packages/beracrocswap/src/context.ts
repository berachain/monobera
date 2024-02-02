import { Provider, JsonRpcProvider } from "@ethersproject/providers";
import { Contract, ethers, Signer } from "ethers";
import { ChainSpec, BERA_CHAIN } from "./constants";
import { CROC_ABI, QUERY_ABI, ERC20_ABI } from "./abis";
import { AddressZero } from "@ethersproject/constants";
import { IMPACT_ABI } from "./abis/impact";
import { ERC20_READ_ABI } from "./abis/erc20.read";

export interface CrocContext {
  provider: Provider;
  dex: Contract;
  query: Contract;
  slipQuery: Contract;
  erc20Read: Contract;
  erc20Write: Contract;
  chain: ChainSpec;
  senderAddr?: string
}

export type ChainIdentifier = number | string;
export type ConnectArg = Provider | Signer | ChainIdentifier;

export async function connectCroc(
  providerOrChainId: ConnectArg,
  signer?: Signer
): Promise<CrocContext> {
  const [provider, maybeSigner] = await buildProvider(providerOrChainId, signer);
  return setupProvider(provider, maybeSigner);
}

async function buildProvider(
  arg: ConnectArg,
  signer?: Signer
): Promise<[Provider, Signer | undefined]> {
  if (typeof arg === "number" || typeof arg == "string") {
    const context = BERA_CHAIN;
    return buildProvider(new JsonRpcProvider(context.nodeUrl), signer);
  } else if ("getNetwork" in arg) {
    return [arg, signer];
  } else {
    const chainId = await arg.getChainId();
    return buildProvider(chainId, signer);
  }
}

async function setupProvider(
  provider: Provider,
  signer?: Signer
): Promise<CrocContext> {
  const actor = determineActor(provider, signer);
  const cntx = inflateContracts(provider, actor);
  return await attachSenderAddr(cntx, actor)
}

async function attachSenderAddr (cntx: CrocContext, 
  actor: Provider | Signer): Promise<CrocContext> {
  if ('getAddress' in actor) {
    try {
      cntx.senderAddr = await actor.getAddress()
    } catch (e) { 
      console.log(e)
    }
  }
  return cntx
}

function determineActor(
  provider: Provider,
  signer?: Signer
): Signer | Provider {
  if (signer) {
    try {
      return signer.connect(provider)
    } catch {
      return signer
    }
  } else if ("getSigner" in provider) {
    try {
      const signer = (provider as ethers.providers.Web3Provider).getSigner();
      return signer
    } catch { 
      return provider 
    }
  } else {
    return provider;
  }
}

function inflateContracts(
  provider: Provider,
  actor: Provider | Signer,
  addr?: string
): CrocContext {
  const context = BERA_CHAIN;
  return {
    provider: provider,
    dex: new Contract(context.addrs.dex, CROC_ABI, actor),
    query: new Contract(context.addrs.query, QUERY_ABI, provider),
    slipQuery: new Contract(context.addrs.impact, IMPACT_ABI, provider),
    erc20Write: new Contract(AddressZero, ERC20_ABI, actor),
    erc20Read: new Contract(AddressZero, ERC20_READ_ABI, provider),
    chain: context,
    senderAddr: addr
  };
}
