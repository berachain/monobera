"use client";

import React, { useState } from "react";
import { ActionButton } from "@bera/shared-ui";
import { Alert, AlertDescription, AlertTitle } from "@bera/ui/alert";
import { Button } from "@bera/ui/button";
import { Card, CardTitle } from "@bera/ui/card";
import { Icons } from "@bera/ui/icons";
import { Tabs, TabsList, TabsTrigger } from "@bera/ui/tabs";

type Props = {
	swapFee: number;
	error: Error | undefined;
	setSwapFee: (feeData: number) => void;
	onContinue: () => void;
	onBack: () => void;
};

enum Types {
	VALUE = "value",
	CUSTOM = "custom",
}

enum VALUES {
	FIVE_BPS = "0.15",
	TEN_BPS = "0.20",
	THIRTY_BPS = "0.40",
	ONE_PERCENT = "1.10",
	CUSTOM = "custom",
}
export function CreatePoolFeeData({
	swapFee,
	error,
	setSwapFee,
	onContinue,
	onBack,
}: Props) {
	const [_type, setType] = useState(Types.VALUE);
	const [customValue, _setCustomValue] = useState(swapFee);
	const handleFeeChange = (value: string) => {
		setSwapFee(Number(value));
	};
	return (
		<Card className="w-[350px]  px-6 py-8 shadow-lg  sm:w-[480px]">
			<CardTitle className="center text-md mb-3 flex items-center p-0 font-semibold sm:text-lg">
				<Icons.chevronLeft
					className="block h-6 w-6 hover:cursor-pointer"
					onClick={onBack}
				/>
				Set pool fees
			</CardTitle>
			<div className="flex flex-col gap-4">
				<Tabs
					defaultValue={swapFee.toFixed(2)}
					onValueChange={(value: string) => {
						if (value === Types.CUSTOM) {
							setType(Types.CUSTOM);
							setSwapFee(Number(customValue));
						}
						if (value !== Types.CUSTOM) {
							setType(Types.VALUE);
							handleFeeChange(value);
						}
					}}
				>
					<TabsList className="w-full">
						<TabsTrigger value={VALUES.FIVE_BPS} className="w-full ">
							0.15%
						</TabsTrigger>
						{/* <TabsTrigger value={VALUES.TEN_BPS} className="w-full">
              0.20%
            </TabsTrigger> */}
						<TabsTrigger value={VALUES.THIRTY_BPS} className="w-full ">
							0.40%
						</TabsTrigger>
						<TabsTrigger
							value={VALUES.ONE_PERCENT}
							className="w-full  min-w-[30px]"
						>
							1.10%
						</TabsTrigger>
						{/* <TabsTrigger value={VALUES.CUSTOM} className="w-full">
              Custom
            </TabsTrigger> */}
					</TabsList>
				</Tabs>
				{/* <Input
          type="number"
          step="any"
          className="h-[40px] w-full pl-1 pr-6 text-right"
          disabled={type !== Types.CUSTOM}
          placeholder={customValue.toString()}
          defaultValue={customValue}
          endAdornment={
            <p
              className={cn(
                "ml-2 self-center pl-1 text-xs text-foreground",
                type !== Types.CUSTOM && "opacity-50",
              )}
            >
              %
            </p>
          }
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            setType(Types.CUSTOM);
            setCustomValue(e.target.value);
            handleFeeChange(e.target.value);
          }}
        /> */}
				<p className="text-sm font-medium text-muted-foreground">
					0.15% to 0.40% is recommended for stable pairings
				</p>
				{error && (
					<Alert variant="destructive" className="my-4">
						<AlertTitle>Error</AlertTitle>
						<AlertDescription>{error?.message}</AlertDescription>
					</Alert>
				)}
				<ActionButton>
					<Button
						className="w-full"
						onClick={onContinue}
						disabled={error !== undefined}
					>
						Next
					</Button>
				</ActionButton>
			</div>
		</Card>
	);
}
