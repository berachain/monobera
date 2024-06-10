import { Row } from "@tanstack/react-table";

/**
 * Create a multi-term regexp with support for exact match when filter values
 * are quoted

 *
 * @param {string} filter A string of terms to filter for, where each term is seperated by a space,
 * unless term is inbetween quotes
 */
function createSearchRegExp(filter: string) {
  const filterValues = filter.match(/[^\s"']+|"([^"]*)"|'([^']*)'/g);
  const formatString = (val: string) =>
    val.toLowerCase().replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

  const result = filterValues?.map((val) =>
    val[0] === '"' && val[val.length - 1] === '"'
      ? `(?=.*?([^\\w-\\.]|\\s|^)${formatString(
          val.substring(1, val.length - 1),
        )}([^\\w-\\.]|\\s|$))`
      : `(?=.*?${formatString(val)})`,
  );

  return RegExp(`^.*?${(result ?? []).join("")}.*?$`);
}

export function regexFilter<TData>(
  row: Row<TData>,
  columnId: string,
  filterValue: string,
) {
  const filter: RegExp = createSearchRegExp(filterValue);
  const value = row.getValue(columnId);
  let normalizedValue;
  if (typeof value === "string") {
    normalizedValue = value;
  } else {
    normalizedValue = String(value);
  }
  return filter.test(normalizedValue.toLowerCase());
}
