import React from "react";

export default function GovernanceByStatus({
  params,
}: {
  params: { status: string };
}) {
  return <div>GovernanceByStatus: {params.status}</div>;
}
