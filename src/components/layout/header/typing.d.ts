export type Category = {
  key: string;
  id: number;
  name: string;
  children?: Category[];
};
