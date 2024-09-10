import { truncateHash, usePrevious } from "@bera/berajs";
import { Input } from "@bera/ui/input";
import {
  ChangeEventHandler,
  Dispatch,
  SetStateAction,
  useCallback,
  useEffect,
  useState,
} from "react";
import { AbiFunction, isAddress, parseAbiItem } from "viem";
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
  const prevAbi = usePrevious(abiItems);

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
        setAbiItems(parseAbiItem(action.functionSignature) as AbiFunction);
        setErrors((e) => ({ ...e, functionSignature: false }));
      }
    } catch (error) {
      console.warn("error parsing abi", error);
      setErrors((e) => ({ ...e, functionSignature: "Invalid ABI" }));
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
          htmlFor={`proposal-message--${idx}`}
          className="text-sm font-semibold leading-tight"
        >
          Enter ABI
        </label>
        <Input
          id={`proposal-message--${idx}`}
          placeholder="function balanceOf(address owner) view returns (uint256)"
          value={action.functionSignature}
          onChange={(e) =>
            setAction((prev) => ({
              ...prev,
              functionSignature: e.target.value,
            }))
          }
        />
        {errors.functionSignature && (
          <div className="text-sm text-destructive-foreground">
            * {errors.functionSignature}
          </div>
        )}
      </div>
      <div className="flex flex-col gap-2">
        <label
          htmlFor={`proposal-message--${idx}`}
          className="text-sm font-semibold leading-tight"
        >
          Enter Function Signature
        </label>
        <Input
          id={`proposal-message--${idx}`}
          placeholder="function balanceOf(address owner) view returns (uint256)"
          value={action.functionSignature}
          onChange={(e) =>
            setAction((prev) => ({
              ...prev,
              functionSignature: e.target.value,
            }))
          }
        />
        {errors.functionSignature && (
          <div className="text-sm text-destructive-foreground">
            * {errors.functionSignature}
          </div>
        )}
      </div>
      {abiItems?.inputs.map((input, i) => {
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
