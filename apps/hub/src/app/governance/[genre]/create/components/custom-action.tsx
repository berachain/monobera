import { truncateHash, usePrevious } from "@bera/berajs";
import { Dropdown } from "@bera/shared-ui";
import { cn } from "@bera/ui";
import { Input, InputWithLabel } from "@bera/ui/input";
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

          const cd = [...(prev.calldata || [])];

          cd[idx] = event.target.value;

          return {
            ...prev,
            calldata: cd,
          };
        });
      },
    [abiItems],
  );

  useEffect(() => {
    try {
      if (action.functionSignature) {
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
      <InputWithLabel
        type="text"
        variant="black"
        label="Enter Target"
        error={errors.target}
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

      <TextArea
        label="Enter ABI"
        variant="black"
        error={errors.ABI}
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
      <div
        className={cn(
          "flex flex-col gap-2",
          contractSelectors.length || "opacity-30 pointer-events-none",
        )}
      >
        <div
          className={cn(
            "text-sm font-semibold leading-tight",
            !contractSelectors.length
              ? "text-foreground cursor-not-allowed pointer-events-none"
              : "",
          )}
        >
          <label>Select Contract Method</label>
        </div>
        <Dropdown
          sortby={false}
          disabled={!contractSelectors.length}
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
          <InputWithLabel
            label={`Enter ${input.name}`}
            error={errors.calldata?.[i]}
            id={`proposal-calldata--${idx}-${i}-${input.name}`}
            placeholder={input.type}
            value={action.calldata?.[i]}
            onChange={handleUpdateCallData(i)}
          />
        );
      })}
    </>
  );
}
