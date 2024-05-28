import { DataTable } from "@bera/shared-ui";

import { user_bgt_columns } from "~/columns/user-bgt-columns";

const fakedata = [
  {
    gaugeAddress: "Validator 1",
    vAPY: 0.1,
    BGT: 0.1,
  },
  {
    gaugeAddress: "Validator 1",
    vAPY: 0.1,
    BGT: 0.1,
  },
  {
    gaugeAddress: "Validator 1",
    vAPY: 0.1,
    BGT: 0.1,
  },
  {
    gaugeAddress: "Validator 1",
    vAPY: 0.1,
    BGT: 0.1,
  },
];
export const BGTRewardsTable = () => {
  return (
    <div>
      <DataTable
        columns={user_bgt_columns as any}
        data={fakedata}
        className="min-w-[700px] shadow"
        enablePagination
      />
    </div>
  );
};
