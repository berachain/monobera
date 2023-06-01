import React from "react";

interface GovernanceActivity {
  delegationAmount: number;
  currencyName: string;
  validatorName: string;
  transactionHash: string;
  timestamp: number;
}

const governanceActivities: GovernanceActivity[] = [
  {
    delegationAmount: 100,
    currencyName: "BGT",
    validatorName: "Validator A",
    transactionHash: "0xabc123",
    timestamp: 654320000, // Example timestamp (Unix epoch time in seconds)
  },
  {
    delegationAmount: 200,
    currencyName: "BGT",
    validatorName: "Validator B",
    transactionHash: "0xdef456",
    timestamp: 1654330000, // Example timestamp (Unix epoch time in seconds)
  },
  {
    delegationAmount: 150,
    currencyName: "BGT",
    validatorName: "Validator C",
    transactionHash: "0xghi789",
    timestamp: 1654340000, // Example timestamp (Unix epoch time in seconds)
  },
  // Add more governance activities as needed
];

export function BgtActivity() {
  return (
    <div className="grid gap-4">
      <h3 className="text-xl font-medium">History</h3>
      {governanceActivities.map((activity) => (
        <div
          className="flex justify-between border-t border-backgroundSecondary pt-2"
          key={activity.transactionHash}
        >
          <div className="text-xs">
            <p className="font-medium">
              Delegated {activity.delegationAmount} {activity.currencyName} to{" "}
              {activity.validatorName}
            </p>
            <p className="text-backgroundSecondary">
              {activity.transactionHash}
            </p>
          </div>
          <div className="text-xs">4:20</div>
        </div>
      ))}
    </div>
  );
}
