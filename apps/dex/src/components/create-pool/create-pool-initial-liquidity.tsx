import React from "react";
import { ActionButton } from "@bera/shared-ui";
import { Alert, AlertDescription } from "@bera/ui/alert";
import { Button } from "@bera/ui/button";
import { Card, CardTitle } from "@bera/ui/card";
import { Icons } from "@bera/ui/icons";

import CreatePoolInitialLiquidityInput from "~/components/create-pool/create-pool-initial-liquidity-input";
import { type ITokenWeight } from "~/hooks/useCreateTokenWeights";

type Props = {
	tokenWeights: ITokenWeight[];
	error: Error | undefined;
	onTokenBalanceChange: (index: number, amount: string) => void;
	onContinue: () => void;
	onBack: () => void;
};

export function CreatePoolInitialLiquidity({
	tokenWeights,
	error,
	onTokenBalanceChange,
	onContinue,
	onBack,
}: Props) {
	return (
		<Card className="w-[350px]  px-6 py-8 shadow-lg sm:w-[480px]">
			<CardTitle className="center mb-3 flex items-center">
				<Icons.chevronLeft
					className="block h-6 w-6 hover:cursor-pointer"
					onClick={onBack}
				/>{" "}
				Set initial liquidity
			</CardTitle>
			<div className="flex flex-col gap-4">
				<ul className="divide divide-y divide-border rounded-lg border">
					{tokenWeights.map((tokenWeight, index) => {
						return (
							<CreatePoolInitialLiquidityInput
								key={index}
								tokenWeight={tokenWeight}
								index={index}
								onTokenBalanceChange={onTokenBalanceChange}
							/>
						);
					})}
				</ul>

				{error && (
					<Alert className="my-4" variant="destructive">
						<AlertDescription>
							<Icons.info className="mr-1 mt-[-4px] inline h-4 w-4" />
							{error?.message}
						</AlertDescription>
					</Alert>
				)}
				<ActionButton>
					<Button
						className="mt-4 w-full"
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
