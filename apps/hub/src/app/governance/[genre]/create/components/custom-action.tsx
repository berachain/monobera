import { truncateHash, usePrevious } from "@bera/berajs";
import { Dropdown } from "@bera/shared-ui";
import { cn } from "@bera/ui";
import { FormError } from "@bera/ui/form-error";
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
  ProposalErrorCodes,
  ProposalTypeEnum,
} from "~/app/governance/types";
import { checkProposalField } from "~/hooks/useCreateProposal";
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
  const [value, setValue] = useState<string>();
  const [contractSelectors, setContractSelectors] = useState<AbiFunction[]>([]);
  const prevSig = usePrevious(action.functionSignature);

  useEffect(() => {
    // RESET CALL DATA WHEN FUNCTION SIGNATURE CHANGES
    if (prevSig && prevSig !== action.functionSignature) {
      setAction((a) => ({
        ...a,
        calldata: [],
      }));
      setErrors((e) => ({ ...e, calldata: [] }));
    }
  }, [action.functionSignature, prevSig]);

  useEffect(() => {
    // PARSE ABI
    if (action.ABI) {
      try {
        const parsedAbi = (JSON.parse(action.ABI) as Abi).filter(
          (a) =>
            a.type === "function" &&
            ["payable", "nonpayable"].includes(a.stateMutability),
        ) as AbiFunction[]; // parseAbi(JSON.parse(action.ABI));

        setContractSelectors(parsedAbi);
        setErrors((e) => ({ ...e, ABI: null }));
      } catch (error) {
        console.warn("error parsing abi", error);
        setErrors((e) => ({ ...e, ABI: ProposalErrorCodes.INVALID_ABI }));
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
              prev[idx] = checkProposalField("address", event.target.value);
              return {
                ...e,
                calldata: prev,
              };
            });

            break;
          default:
            try {
              setErrors((e) => {
                const prev = e?.calldata || [];
                prev[idx] = checkProposalField(
                  supposedType as any,
                  event.target.value,
                );
                return {
                  ...e,
                  calldata: prev,
                };
              });
            } catch (error) {}
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
        setErrors((e) => ({ ...e, functionSignature: null }));
      }
    } catch (error) {
      setErrors((e) => ({
        ...e,
        functionSignature: ProposalErrorCodes.INVALID_ADDRESS,
      }));
    }
  }, [action.functionSignature]);

  return (
    <>
      <InputWithLabel
        type="text"
        variant="black"
        label="Enter Target"
        error={
          errors.target === ProposalErrorCodes.REQUIRED
            ? "Target is required."
            : errors.target === ProposalErrorCodes.INVALID_ADDRESS
              ? "Invalid target address."
              : errors.target
        }
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
      <InputWithLabel
        type="text"
        variant="black"
        label="Value (in wei)"
        error={
          errors.value === ProposalErrorCodes.REQUIRED
            ? "Value is required."
            : errors.value === ProposalErrorCodes.INVALID_AMOUNT
              ? "Invalid value format."
              : errors.value
        }
        id={`proposal-value--${idx}`}
        placeholder={"0"}
        value={value}
        onChange={(e: any) => {
          setValue(e.target.value);
          try {
            setAction((prev) => ({
              ...prev,
              value: BigInt(e.target.value),
            }));
          } catch (error) {
            setErrors((e) => ({
              ...e,
              value: ProposalErrorCodes.INVALID_AMOUNT,
            }));
          }
        }}
      />

      <TextArea
        label="Enter ABI"
        variant="black"
        error={
          errors.ABI === ProposalErrorCodes.REQUIRED
            ? "ABI is required."
            : errors.ABI === ProposalErrorCodes.INVALID_ABI
              ? "Invalid ABI"
              : errors.ABI
        }
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
        <FormError>
          {errors.functionSignature === ProposalErrorCodes.REQUIRED
            ? "A Method Must Be chosen"
            : errors.functionSignature}
        </FormError>
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
