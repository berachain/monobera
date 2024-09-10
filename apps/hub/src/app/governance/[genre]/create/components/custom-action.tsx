import { truncateHash, usePrevious } from "@bera/berajs";
import { Dropdown } from "@bera/shared-ui";
import { Input } from "@bera/ui/input";
import { TextArea } from "@bera/ui/text-area";
import { formatAbiItem } from "abitype";
import {
  ChangeEventHandler,
  Dispatch,
  SetStateAction,
  useCallback,
  useEffect,
  useState,
} from "react";
import { Abi, AbiFunction, isAddress, parseAbiItem } from "viem";
import {
  CustomProposalActionErrors,
  ProposalAction,
  ProposalTypeEnum,
} from "~/app/governance/types";
export function CustomAction({
  idx,
  action,
  setAction,
  errors,
  setErrors,
}: {
  idx: number;
  action: ProposalAction & { type: ProposalTypeEnum.CUSTOM_PROPOSAL };
  errors: CustomProposalActionErrors;
  setAction: Dispatch<SetStateAction<ProposalAction>>;
  setErrors: Dispatch<SetStateAction<CustomProposalActionErrors>>;
}) {
  const [abiItems, setAbiItems] = useState<AbiFunction>();
  const [contractSelectors, setContractSelectors] = useState<AbiFunction[]>([]);
  const prevAbi = usePrevious(action.ABI);

  useEffect(() => {
    if (action.ABI && JSON.stringify(prevAbi) !== JSON.stringify(action.ABI)) {
      try {
        const parsedAbi = (JSON.parse(action.ABI) as Abi).filter(
          (a) =>
            a.type === "function" &&
            ["payable", "nonpayable"].includes(a.stateMutability),
        ) as AbiFunction[]; // parseAbi(JSON.parse(action.ABI));

        setContractSelectors(parsedAbi);
        setErrors((e) => ({ ...e, functionSignature: false }));
      } catch (error) {
        console.warn("error parsing abi", error);
        setErrors((e) => ({ ...e, ABI: "Invalid ABI" }));
      }
    }
  }, [action.ABI]);

  const handleUpdateCallData = useCallback(
    (idx: number): ChangeEventHandler<HTMLInputElement> =>
      (event) => {
        const supposedType = abiItems?.inputs[idx].type;
        switch (supposedType) {
          case "address":
            setErrors((e) => {
              const prev = e?.calldata || [];
              prev[idx] = isAddress(event.target.value, {
                strict: true,
              })
                ? false
                : "Invalid address";
              return {
                ...e,
                calldata: prev,
              };
            });

            break;
        }

        setAction((p) => {
          const prev = p as ProposalAction & {
            type: ProposalTypeEnum.CUSTOM_PROPOSAL;
          };

          prev as ProposalAction & { type: ProposalTypeEnum.CUSTOM_PROPOSAL };

          let cd = prev.calldata;

          if (!Array.isArray(cd) || cd.length === abiItems?.inputs.length) {
            cd = Array(abiItems?.inputs.length).fill("");
          }

          return {
            ...prev,
            calldata: cd.map((c, j) => (j === idx ? event.target.value : c)),
          };
        });
      },
    [abiItems],
  );

  useEffect(() => {
    try {
      if (action.functionSignature) {
        console.log("parsing abi", parseAbiItem(action.functionSignature));

        setAbiItems(parseAbiItem(action.functionSignature) as AbiFunction);
        setErrors((e) => ({ ...e, functionSignature: false }));
      }
    } catch (error) {
      console.warn("error parsing abi", error);
      setErrors((e) => ({
        ...e,
        functionSignature: "Invalid Function Signature",
      }));
    }
  }, [action.functionSignature]);

  return (
    <>
      <div className="flex flex-col gap-2">
        <label
          htmlFor={`proposal-target--${idx}`}
          className="text-sm font-semibold leading-tight"
        >
          Target Contract Address
        </label>
        <Input
          type="text"
          id={`proposal-target--${idx}`}
          placeholder={truncateHash("0x00000000000000")}
          value={action.target}
          onChange={(e: any) =>
            setAction((prev) => ({
              ...prev,
              target: e.target.value,
            }))
          }
        />
        {errors.target && (
          <div className="text-sm text-destructive-foreground">
            * {errors.target}
          </div>
        )}
      </div>
      <div className="flex flex-col gap-2">
        <label
          htmlFor={`proposal-abi--${idx}`}
          className="text-sm font-semibold leading-tight"
        >
          Enter ABI
        </label>
        <TextArea
          id={`proposal-abi--${idx}`}
          placeholder={JSON.stringify(
            [
              {
                type: "function",
                name: "myFunction",
                inputs: [],
                outputs: [],
                stateMutability: "nonpayable",
              },
            ],
            undefined,
            2,
          )}
          value={action.ABI}
          onChange={(e) => {
            setAction((prev) => ({
              ...prev,
              ABI: e.target.value,
            }));
          }}
        />
        {errors.ABI && (
          <div className="text-sm text-destructive-foreground">
            * {errors.ABI}
          </div>
        )}
      </div>
      <div className="flex flex-col gap-2">
        <div className="text-sm font-semibold leading-tight">
          <label>Select Contract Method</label>
        </div>
        <Dropdown
          sortby={false}
          placeholder="Select a contract method"
          className="!w-full !grow"
          triggerClassName="!w-full grow justify-between"
          contentClassname="!w-full !grow"
          selectionList={contractSelectors.map((c) => ({
            value: formatAbiItem(c),
            label: c.name,
          }))}
          selected={action.functionSignature || ""}
          onSelect={(v) =>
            setAction((a) => ({
              ...a,
              functionSignature: v as ProposalTypeEnum,
            }))
          }
        />
      </div>
      {abiItems?.inputs?.map((input, i) => {
        return (
          <div className="flex flex-col gap-2">
            <label
              htmlFor={`proposal-calldata--${idx}-${i}-${input.name}`}
              className="text-sm font-semibold leading-tight"
            >
              Enter {input.name}
            </label>
            <Input
              id={`proposal-calldata--${idx}-${i}-${input.name}`}
              placeholder={input.type}
              value={action.calldata?.[i]}
              onChange={handleUpdateCallData(i)}
            />

            {errors.calldata?.[i] && (
              <div className="text-sm text-destructive-foreground">
                * {errors.calldata?.[i]}
              </div>
            )}
          </div>
        );
      })}
    </>
  );
}
