export type Category = {
  key: string;
  id: string;
  name: string;
  children?: Category[];
};
