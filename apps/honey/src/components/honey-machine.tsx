"use client";

import { useEffect, useReducer, useState } from "react";
import Image from "next/image";
import { TransactionExecutionError } from "@bera/berajs";
import { ConnectButton, useTxn } from "@bera/shared-ui";
import { cn } from "@bera/ui";
import {
  EventType,
  Fit,
  Layout,
  useRive,
  useStateMachineInput,
} from "@rive-app/react-canvas";
import { motion } from "framer-motion";
import { erc20ABI } from "wagmi";

import { ERC20_HONEY_ABI } from "~/hooks/abi";
import { usePsm } from "~/hooks/usePsm";
import { HoneyTokenInput } from "./honey-token-input";

interface State {
  currentState: "approval" | "minting" | "redeeming" | "idle";
  isLoading: boolean;
  error: string | null;
}

type Action =
  | {
      type: "SET_STATE";
      payload: "approval" | "minting" | "redeeming" | "idle";
    }
  | { type: "SET_LOADING"; payload: boolean }
  | { type: "SET_ERROR"; payload: string };

const initialState: State = {
  currentState: "idle",
  isLoading: false,
  error: null,
};

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case "SET_STATE":
      return {
        ...state,
        currentState: action.payload,
        isLoading: false,
        error: null,
      };
    case "SET_LOADING":
      return {
        ...state,
        isLoading: action.payload,
        error: null,
      };
    case "SET_ERROR":
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };
    default:
      return state;
  }
}

export function HoneyMachine() {
  const STATE_MACHINE_NAME = "honeyMachineSquare";
  const [state, dispatch] = useReducer(reducer, initialState);
  console.log("reducer state", state);
  const { RiveComponent, rive } = useRive({
    src: "/honeyMachineSquare.riv",
    stateMachines: STATE_MACHINE_NAME,
    artboard: "honeyMachineSquare",
    autoplay: false,
    layout: new Layout({ fit: Fit.Cover }),
  });

  const rejectAction = useStateMachineInput(rive, STATE_MACHINE_NAME, "reject");

  const txnSubmitAction = useStateMachineInput(
    rive,
    STATE_MACHINE_NAME,
    "txnSubmitted",
  );
  const mintTxnSuccess = useStateMachineInput(
    rive,
    STATE_MACHINE_NAME,
    "mintTxnSuccess",
  );
  const redeemTxnSuccess = useStateMachineInput(
    rive,
    STATE_MACHINE_NAME,
    "redeemTxnSuccess",
  );
  const txnFail = useStateMachineInput(rive, STATE_MACHINE_NAME, "txnFail");

  const {
    payload,
    isConnected,
    setSelectedFrom,
    allowance,
    selectedFrom,
    selectedTo,
    setSelectedTo,
    fromAmount,
    setFromAmount,
    toAmount,
    setToAmount,
    isMint,
    fromBalance,
    toBalance,
    fee,
    fee2,
    ModalPortal,
  } = usePsm();

  // console.log(
  //   payload[2],
  //   fromAmount,
  //   toAmount,
  //   fromBalance.formattedBalance,
  //   toBalance.formattedBalance,
  // );

  const { write } = useTxn({
    message: isMint ? "Mint Honey" : "Redeem Honey",
    onError: (e: Error) => {
      // console.log("did this even catch anything??", e);
      // when user rejects the transaction, we need to reset the state machine
      // if (e instanceof TransactionExecutionError) {
      //   console.log("user rejected, catched!!!!", e.message);
      // } else {
      //   console.log("other error, catched!!!!", e.message);
      // }
      // rejection should be triggered when transaction fails(after metamask popup)
      rejectAction?.fire();
      // rejection should be triggered when user reject or input amount 0( before metamask popup)
      txnFail?.fire();
      //but this works so i am ok w it :ppp
    },
    onSuccess: () => {
      if (isMint) {
        mintTxnSuccess?.fire();
      } else {
        redeemTxnSuccess?.fire();
      }
    },
    onLoading: () => {
      txnSubmitAction?.fire();
    },
    onSubmission: () => {
      txnSubmitAction?.fire();
    },
  });

  const [rotate, setRotate] = useState(0);

  const isConnectedState = useStateMachineInput(
    rive,
    STATE_MACHINE_NAME,
    "connectWallet",
  );

  useEffect(() => {
    if (rive) {
      rive.play();
    }
  }, [rive]);

  useEffect(() => {
    if (rive) {
      console.log("trigger rive effect", rive);
      rive.on(EventType.StateChange, (event: any) => {
        console.log("rive state change", event.type, event.data);
        if (event.data[0] === "wallet") {
          console.log("wallet event", payload);
          if (
            allowance?.formattedAllowance === "0" ||
            Number(allowance?.formattedAllowance) < fromAmount
          ) {
            dispatch({ type: "SET_STATE", payload: "approval" });
          } else {
            if (isMint) {
              console.log("mint", payload);
              dispatch({ type: "SET_STATE", payload: "minting" });
            } else {
              console.log("burn", payload);
              dispatch({ type: "SET_STATE", payload: "redeeming" });
            }
          }
        } else {
          console.log(
            "event change but not wallet: !!",
            event.data[0],
            "!!",
            state,
          );
          if (event.data[0] === "machineIdle") {
            dispatch({ type: "SET_STATE", payload: "idle" });
          }
        }
      });
    }
  }, [payload, rive]);

  const performApproval = () => {
    try {
      dispatch({ type: "SET_LOADING", payload: true });
      write({
        address: selectedFrom?.address as `0x${string}`,
        abi: erc20ABI as unknown as (typeof erc20ABI)[],
        functionName: "approve",
        params: [
          process.env.NEXT_PUBLIC_ERC20_HONEY_ADDRESS as string,
          1000000n,
        ],
      });
      dispatch({ type: "SET_STATE", payload: "minting" });
    } catch (error: any) {
      dispatch({ type: "SET_STATE", payload: "idle" });
      dispatch({ type: "SET_ERROR", payload: error.message });
    }
  };

  const performMinting = () => {
    try {
      dispatch({ type: "SET_LOADING", payload: true });
      if (Number(payload[2] > 0)) {
        write({
          address: process.env.NEXT_PUBLIC_ERC20_HONEY_ADDRESS as `0x{string}`,
          abi: ERC20_HONEY_ABI,
          functionName: "mint",
          params: payload,
        });
      } else {
        rejectAction?.fire();
      }
    } catch (error: any) {
      dispatch({ type: "SET_STATE", payload: "idle" });
      dispatch({ type: "SET_ERROR", payload: error.message });
    }
  };

  const performRedeeming = () => {
    try {
      dispatch({ type: "SET_LOADING", payload: true });
      if (Number(payload[2] > 0)) {
        write({
          address: process.env.NEXT_PUBLIC_ERC20_HONEY_ADDRESS as `0x{string}`,
          abi: ERC20_HONEY_ABI,
          functionName: "redeem",
          params: payload,
        });
      } else {
        rejectAction?.fire();
      }
    } catch (error: any) {
      dispatch({ type: "SET_STATE", payload: "idle" });
      dispatch({ type: "SET_ERROR", payload: error.message });
    }
  };

  useEffect(() => {
    if (isConnected) {
      if (isConnectedState) {
        isConnectedState.value = true;
      }
    } else {
      if (isConnectedState) {
        isConnectedState.value = false;
      }
    }
  }, [isConnected, isConnectedState]);

  // Perform the contract calls based on the current state
  useEffect(() => {
    switch (state.currentState) {
      case "approval":
        performApproval();
        break;
      case "minting":
        performMinting();
        break;
      case "redeeming":
        performRedeeming();
        break;
      default:
        // Handle any additional states or transitions here
        break;
    }
  }, [state.currentState]);

  return (
    <div className="relative bg-[#468DCB] pb-12">
      {ModalPortal}
      <div
        className={cn(
          "absolute bottom-0 z-30 m-6 w-[30%] max-w-[300px] rounded-2xl border-4 border-black bg-[#b4b4b4] p-3",
          !isConnected && "bottom-12",
        )}
      >
        {isConnected ? (
          <>
            <h1 className="mb-4 text-2xl font-semibold text-white">
              {isMint ? "Mint" : "Redeem"}
            </h1>
            <ul role="list">
              <HoneyTokenInput
                selected={selectedFrom}
                selectedTokens={[selectedFrom, selectedTo]}
                onTokenSelection={setSelectedFrom}
                amount={fromAmount ?? 0}
                balance={fromBalance?.formattedBalance}
                selectable={false}
                hidePrice
                setAmount={(amount) => {
                  setFromAmount(Number(amount));
                  setToAmount(Number(amount) * fee);
                }}
              />
              <div className="flex justify-center py-1">
                <motion.div
                  animate={{ rotate }}
                  transition={{ type: "spring", stiffness: 100, damping: 7 }}
                >
                  <button
                    onClick={() => {
                      setSelectedFrom(selectedTo);
                      setSelectedTo(selectedFrom);
                      setRotate(rotate + 180);
                    }}
                  >
                    <Image
                      src={"/SWAP.png"}
                      width={50}
                      height={50}
                      alt="Swap icon"
                    />
                  </button>
                </motion.div>
              </div>
              <HoneyTokenInput
                selected={selectedTo}
                selectedTokens={[selectedFrom, selectedTo]}
                amount={toAmount}
                setAmount={(amount) => {
                  setToAmount(Number(amount));
                  setFromAmount(Number(amount) * fee2);
                }}
                selectable={false}
                hidePrice
                hideBalance
                balance={toBalance?.formattedBalance}
              />
            </ul>
          </>
        ) : (
          <ConnectButton className="w-full" />
        )}
      </div>

      <div className="aspect-square w-full pt-16">
        <RiveComponent />
      </div>
    </div>
  );
}
