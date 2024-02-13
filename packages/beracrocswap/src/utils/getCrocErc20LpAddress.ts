// import { crocDexAddress } from "@bera/config";
import { crocDexAddress } from "@bera/config";
import { ethers } from "ethers";
import { keccak256 } from "ethers/lib/utils";

export const CREATION_CODE =
  "0x60c06040527355684e2ca2bace0adc512c1aff880b15b8ea72146080523480156200002957600080fd5b506040518060400160405280601881526020017f426572612043726f63204c5020455243323020546f6b656e00000000000000008152506040518060400160405280600b81526020016a4c502d4265726143726f6360a81b815250816000908162000095919062000156565b506001620000a4828262000156565b50503360a0525062000222565b634e487b7160e01b600052604160045260246000fd5b600181811c90821680620000dc57607f821691505b602082108103620000fd57634e487b7160e01b600052602260045260246000fd5b50919050565b601f8211156200015157600081815260208120601f850160051c810160208610156200012c5750805b601f850160051c820191505b818110156200014d5782815560010162000138565b5050505b505050565b81516001600160401b03811115620001725762000172620000b1565b6200018a81620001838454620000c7565b8462000103565b602080601f831160018114620001c25760008415620001a95750858301515b600019600386901b1c1916600185901b1785556200014d565b600085815260208120601f198616915b82811015620001f357888601518255948401946001909101908401620001d2565b5085821015620002125787850151600019600388901b60f8161c191681555b5050505050600190811b01905550565b60805160a0516115766200024f600039600081816102e50152610678015260006107e801526115766000f3fe608060405234801561001057600080fd5b506004361061014d5760003560e01c806370a08231116100c3578063b1dd61b61161007c578063b1dd61b6146102d7578063c45a0155146102e0578063c55dae6314610307578063d505accf1461031a578063dd62ed3e1461032d578063e85f3fb01461035657600080fd5b806370a08231146102545780637ecebe001461027a57806395340703146102a057806395d89b41146102b35780639b503daf146102bb578063a9059cbb146102c457600080fd5b806318160ddd1161011557806318160ddd146101dc578063217a4b70146101ec578063234ff1431461021757806323b872dd1461022a578063313ce5671461023d5780633644e5151461024c57600080fd5b806306fdde03146101525780630781d10114610170578063095ea7b3146101915780630f382c0e146101b45780631794bb3c146101c7575b600080fd5b61015a610393565b6040516101679190611044565b60405180910390f35b61018361017e366004611093565b610425565b604051908152602001610167565b6101a461019f3660046110ae565b610502565b6040519015158152602001610167565b6101a46101c23660046110ea565b610556565b6101da6101d5366004611176565b610617565b005b6805345cdf77eb68f44c54610183565b6008546101ff906001600160a01b031681565b6040516001600160a01b039091168152602001610167565b6101836102253660046111b2565b610711565b6101a4610238366004611176565b61092d565b60405160128152602001610167565b610183610962565b610183610262366004611093565b6387a211a2600c908152600091909152602090205490565b610183610288366004611093565b6338377508600c908152600091909152602090205490565b6101a46102ae3660046110ea565b6109df565b61015a610a8e565b61018360065481565b6101a46102d23660046110ae565b610a9d565b61018360095481565b6101ff7f000000000000000000000000000000000000000000000000000000000000000081565b6007546101ff906001600160a01b031681565b6101da6103283660046111ee565b610ad0565b61018361033b366004611261565b602052637f5e9f20600c908152600091909152603490205490565b6101da610364366004611093565b33600090815260056020526040902080546001600160a01b0319166001600160a01b0392909216919091179055565b6060600080546103a290611294565b80601f01602080910402602001604051908101604052809291908181526020018280546103ce90611294565b801561041b5780601f106103f05761010080835404028352916020019161041b565b820191906000526020600020905b8154815290600101906020018083116103fe57829003601f168201915b5050505050905090565b6000806104396805345cdf77eb68f44c5490565b90508060000361044c5750600092915050565b60008082610462670de0b6b3a7640000836112e4565b61046c91906112fb565b600454610479919061131d565b6387a211a2600c9081526000878152602091829020546001600160a01b0389168252600290925260409020600101549192509080670de0b6b3a76400006104c084866112e4565b6104ca91906112fb565b6001600160a01b0389166000908152600260205260409020546104ed919061131d565b6104f79190611330565b979650505050505050565b600082602052637f5e9f20600c5233600052816034600c205581600052602c5160601c337f8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b92560206000a35060015b92915050565b6000600654861461059b5760405162461bcd60e51b815260206004820152600a60248201526915dc9bdb99c81c1bdbdb60b21b60448201526064015b60405180910390fd5b8460020b60001480156105b157508360020b6000145b6105f75760405162461bcd60e51b8152602060048201526017602482015276139bdb8b50995c9850dc9bd8c813140811195c1bdcda5d604a1b6044820152606401610592565b61060a87846001600160801b0316610c59565b5060019695505050505050565b826001600160a01b0316826001600160a01b03161161066d5760405162461bcd60e51b815260206004820152601260248201527124b73b30b634b2102a37b5b2b7102830b4b960711b6044820152606401610592565b336001600160a01b037f000000000000000000000000000000000000000000000000000000000000000016146106c95760405162461bcd60e51b81526020600482015260016024820152604160f81b6044820152606401610592565b600780546001600160a01b038086166001600160a01b03199283161790925560088054928516929091169190911790556009819055610709838383610c7b565b600655505050565b600061071b610ce1565b61072782600080610d34565b336001600160a01b038316148061075757506001600160a01b038281166000908152600560205260409020541633145b6107925760405162461bcd60e51b815260206004820152600c60248201526b1d5b985d5d1a1bdc9a5e995960a21b6044820152606401610592565b6001600160a01b0382811660009081526002602052604080822080548881189881119890980288188089039091558151631bb8fb2160e11b815230600482015287851660248201526044810182905291519097937f00000000000000000000000000000000000000000000000000000000000000001691633771f6429160648083019286929190829003018183875af1158015610833573d6000803e3d6000fd5b505050506040513d6000823e601f3d908101601f1916820160405261085b91908101906113b3565b905080516001146108ae5760405162461bcd60e51b815260206004820152601760248201527f746f6f206d616e7920636f696e732072657475726e65640000000000000000006044820152606401610592565b85816000815181106108c2576108c261150a565b6020026020010151600001511461091b5760405162461bcd60e51b815260206004820152601960248201527f776974686472617720616d6f756e7420696e636f7272656374000000000000006044820152606401610592565b610923610ce1565b5093949350505050565b6000610937610ce1565b61094384836000610d34565b61094f83836001610d34565b61095a848484610e1b565b949350505050565b60008061096d610393565b8051906020012090506040517f8b73c3c69bb8fe3d512ecc4cf759cc79239f7b179b0ffacaa9a75d522b39400f81528160208201527fc89efdaa54c0f20c7adf612882df0950f5a951637e0307cdcb4c672f298b8bc6604082015246606082015230608082015260a081209250505090565b60006006548614610a1f5760405162461bcd60e51b815260206004820152600a60248201526915dc9bdb99c81c1bdbdb60b21b6044820152606401610592565b8460020b6000148015610a3557508360020b6000145b610a7b5760405162461bcd60e51b8152602060048201526017602482015276139bdb8b50995c9850dc9bd8c813140811195c1bdcda5d604a1b6044820152606401610592565b61060a87846001600160801b0316610ec7565b6060600180546103a290611294565b6000610aa7610ce1565b610ab333836000610d34565b610abf83836001610d34565b610ac98383610ee5565b9392505050565b6000610ada610393565b80519060200120905084421115610af957631a15a3cc6000526004601cfd5b6040518860601b60601c98508760601b60601c975065383775081901600e52886000526020600c2080547f8b73c3c69bb8fe3d512ecc4cf759cc79239f7b179b0ffacaa9a75d522b39400f83528360208401527fc89efdaa54c0f20c7adf612882df0950f5a951637e0307cdcb4c672f298b8bc6604084015246606084015230608084015260a08320602e527f6e71edae12b1b97f4d1f60370fef10105fa2faae0126114a169c64845d6126c983528a60208401528960408401528860608401528060808401528760a084015260c08320604e526042602c206000528660ff1660205285604052846060526020806080600060015afa8b3d5114610c055763ddafbaef6000526004601cfd5b0190556303faf4f960a51b88176040526034602c2087905587897f8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b925602060608501a360405250506000606052505050505050565b610c61610ce1565b610c6d82826001610d34565b610c778282610f4e565b5050565b6000826001600160a01b0316846001600160a01b031610610c9b57600080fd5b604080516001600160a01b038087166020830152851691810191909152606081018390526080016040516020818303038152906040528051906020012090509392505050565b600060038190556805345cdf77eb68f44c5481908015610d2f5780610d0e670de0b6b3a7640000846112e4565b610d1891906112fb565b60046000828254610d29919061131d565b90915550505b505050565b6001600160a01b038316600090815260026020526040812090610d69856387a211a2600c908152600091909152602090205490565b6001830154600454919250908215801590610d845750600082115b15610dca5781670de0b6b3a7640000610d9d83866112e4565b610da791906112fb565b610db19190611330565b846000016000828254610dc4919061131d565b90915550505b600085610de057610ddb8785611330565b610dea565b610dea878561131d565b9050670de0b6b3a7640000610dff83836112e4565b610e0991906112fb565b85600101819055505050505050505050565b60008360601b33602052637f5e9f208117600c526034600c2080546001810115610e5b5780851115610e55576313be252b6000526004601cfd5b84810382555b50506387a211a28117600c526020600c20805480851115610e845763f4d678b86000526004601cfd5b84810382555050836000526020600c208381540181555082602052600c5160601c8160601c600080516020611521833981519152602080a3505060019392505050565b610ecf610ce1565b610edb82826000610d34565b610c778282610fbb565b60006387a211a2600c52336000526020600c20805480841115610f105763f4d678b86000526004601cfd5b83810382555050826000526020600c208281540181555081602052600c5160601c33600080516020611521833981519152602080a350600192915050565b6805345cdf77eb68f44c5481810181811015610f725763e5cfe9576000526004601cfd5b806805345cdf77eb68f44c5550506387a211a2600c52816000526020600c208181540181555080602052600c5160601c6000600080516020611521833981519152602080a35050565b6387a211a2600c52816000526020600c20805480831115610fe45763f4d678b86000526004601cfd5b82900390556805345cdf77eb68f44c8054829003905560008181526001600160a01b038316600080516020611521833981519152602083a35050565b60005b8381101561103b578181015183820152602001611023565b50506000910152565b6020815260008251806020840152611063816040850160208701611020565b601f01601f19169190910160400192915050565b80356001600160a01b038116811461108e57600080fd5b919050565b6000602082840312156110a557600080fd5b610ac982611077565b600080604083850312156110c157600080fd5b6110ca83611077565b946020939093013593505050565b8035600281900b811461108e57600080fd5b60008060008060008060c0878903121561110357600080fd5b61110c87611077565b955060208701359450611121604088016110d8565b935061112f606088016110d8565b925060808701356001600160801b038116811461114b57600080fd5b915060a087013567ffffffffffffffff8116811461116857600080fd5b809150509295509295509295565b60008060006060848603121561118b57600080fd5b61119484611077565b92506111a260208501611077565b9150604084013590509250925092565b6000806000606084860312156111c757600080fd5b833592506111d760208501611077565b91506111e560408501611077565b90509250925092565b600080600080600080600060e0888a03121561120957600080fd5b61121288611077565b965061122060208901611077565b95506040880135945060608801359350608088013560ff8116811461124457600080fd5b9699959850939692959460a0840135945060c09093013592915050565b6000806040838503121561127457600080fd5b61127d83611077565b915061128b60208401611077565b90509250929050565b600181811c908216806112a857607f821691505b6020821081036112c857634e487b7160e01b600052602260045260246000fd5b50919050565b634e487b7160e01b600052601160045260246000fd5b8082028115828204841417610550576105506112ce565b60008261131857634e487b7160e01b600052601260045260246000fd5b500490565b80820180821115610550576105506112ce565b81810381811115610550576105506112ce565b634e487b7160e01b600052604160045260246000fd5b6040805190810167ffffffffffffffff8111828210171561137c5761137c611343565b60405290565b604051601f8201601f1916810167ffffffffffffffff811182821017156113ab576113ab611343565b604052919050565b600060208083850312156113c657600080fd5b825167ffffffffffffffff808211156113de57600080fd5b818501915085601f8301126113f257600080fd5b81518181111561140457611404611343565b8060051b611413858201611382565b918252838101850191858101908984111561142d57600080fd5b86860192505b838310156114fd5782518581111561144b5760008081fd5b86016040601f19828d0381018213156114645760008081fd5b61146c611359565b8a840151815282840151898111156114845760008081fd5b8085019450508d603f85011261149a5760008081fd5b8a840151898111156114ae576114ae611343565b6114be8c84601f84011601611382565b92508083528e848287010111156114d55760008081fd5b6114e4818d8501868801611020565b50808b0191909152845250509186019190860190611433565b9998505050505050505050565b634e487b7160e01b600052603260045260246000fdfeddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3efa264697066735822122048bf4247fe40d5b41e3ce53fce0df00514a87a7d8065b2562739b1b69f81185364736f6c63430008130033";

export const getCrocErc20LpAddress = (
  base: string,
  quote: string,
) => {
  const salt = ethers.utils.keccak256(
    ethers.utils.solidityPack(["address", "address"], [base, quote]),
  );
  const creationCode = CREATION_CODE;
  const initCodeHash = keccak256(creationCode);
  const create2Address = ethers.utils.getCreate2Address(
    crocDexAddress,
    salt,
    initCodeHash,
  );
  console.log("create2Address", create2Address);
  return create2Address;
};
