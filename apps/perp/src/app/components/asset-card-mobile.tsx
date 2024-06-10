import type { ICards, IRow } from "~/types/order-history";

export function AsesetCardMobile({ card }: { card: ICards }) {
  return (
    <div className="flex flex-col gap-4 rounded-md border border-border bg-background p-4 lg:hidden">
      <p className="text-xs font-medium leading-tight">{card.title}</p>
      <div className="flex flex-col gap-1">
        {card.rows.map((row: IRow, index) => {
          return (
            <div key={index} className="flex w-full flex-row justify-between">
              <p className="text-xs leading-tight text-muted-foreground">
                {row.key}
              </p>
              {row.value}
            </div>
          );
        })}
      </div>
      {card.footer}
    </div>
  );
}
