export interface PageRequest {
  key: string;
  offset: number;
  limit: number;
  countTotal: boolean;
  reverse: boolean;
}

export const defaultPagination: PageRequest = {
  key: "",
  offset: 0,
  limit: 0,
  countTotal: true,
  reverse: false,
};
