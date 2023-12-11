import React from "react";
import { type Token } from "@bera/berajs";
import { ActionButton } from "@bera/shared-ui";
import { Alert, AlertDescription } from "@bera/ui/alert";
import { Button } from "@bera/ui/button";
import { Card, CardTitle } from "@bera/ui/card";
import { Icons } from "@bera/ui/icons";

import CreatePoolInput from "~/components/create-pool/create-pool-input";
import { type ITokenWeight } from "~/hooks/useCreateTokenWeights";

type Props = {
	tokenWeights: ITokenWeight[];
	totalWeight: number;
	error: Error | undefined;
	onContinue: () => void;
	onTokenSelection: (token: Token | undefined, index: number) => void;
	onAddToken: () => void;
	onRemove: (index: number) => void;
	onTokenWeightChange: (index: number, weight: number) => void;
	onLock: (index: number) => void;
	onUnlock: (index: number) => void;
};

export function CreatePool({
	tokenWeights,
	totalWeight,
	error,
	onContinue,
	onTokenSelection,
	onAddToken,
	onRemove,
	onTokenWeightChange,
	onLock,
	onUnlock,
}: Props) {
	// const exceeding = totalWeight > 100;
	const selectedTokens = tokenWeights.map((tokenWeight: ITokenWeight) => {
		return tokenWeight.token;
	}) as Token[];
	return (
		<Card className="w-[350px] px-6 py-8 shadow-lg sm:w-[480px]">
			<CardTitle className="center text-md mb-3 flex w-full self-center p-0 text-center font-semibold sm:text-lg">
				Choose tokens and allocate weights
			</CardTitle>

			<div className="flex flex-col gap-4">
				<ul className="divide divide-y divide-border rounded-lg border">
					{tokenWeights.map((tokenWeight, index) => {
						return (
							<CreatePoolInput
								key={index}
								tokenWeight={tokenWeight}
								index={index}
								selectedTokens={selectedTokens}
								onTokenSelection={onTokenSelection}
								onRemove={onRemove}
								onTokenWeightChange={onTokenWeightChange}
								onLock={onLock}
								onUnlock={onUnlock}
							/>
						);
					})}
				</ul>
				<Icons.plusCircle
					className="mt-4 h-6 w-6 self-center text-muted-foreground"
					onClick={onAddToken}
				/>
				{error && (
					<Alert variant="destructive">
						<AlertDescription>
							{" "}
							<Icons.info className="mr-1 mt-[-4px] inline h-4 w-4" />
							{error?.message}
						</AlertDescription>
					</Alert>
				)}
				<div className="flex-col items-center justify-center rounded-2xl bg-muted p-3">
					<div className="flex items-center justify-between ">
						<div className="text-sm font-normal leading-normal text-stone-400">
							Total allocated
						</div>
						<div className="text-right text-sm font-medium leading-normal">
							{totalWeight.toFixed(2)}%
						</div>
					</div>
				</div>
				<ActionButton>
					<Button
						disabled={error?.message === "Tokens must be selected"}
						className="mt-4 w-full"
						onClick={onContinue}
					>
						Next
					</Button>
				</ActionButton>
			</div>
		</Card>
	);
}
