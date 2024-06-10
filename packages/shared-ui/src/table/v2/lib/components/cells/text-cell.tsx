import React, { ReactNode, type CSSProperties } from "react";

import { type CellContext } from "@tanstack/react-table";
import { BaseCell } from "./base-cell";

interface BaseCellProps<TData, TValue> extends CellContext<TData, TValue> {
  style?: CSSProperties;
  className?: string;
}

export interface TextCellProps<TData, TValue>
  extends BaseCellProps<TData, TValue> {}

function _TextCell<TData, TValue>(props: TextCellProps<TData, TValue>) {
  const value = props.renderValue();

  return (
    <BaseCell
      column={props.column}
      key={props.cell.id}
      tabIndex={0}
      className={`${props.className ?? ""}`}
      style={props.style}
      title={typeof value === "string" ? value : undefined}
    >
      {value as ReactNode}
    </BaseCell>
  );
}

export const TextCell = React.memo(_TextCell) as typeof _TextCell;
