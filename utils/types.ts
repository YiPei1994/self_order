export type TableNames = "A1" | "A2" | "A3" | "";

export type MenuTypes = "starter" | "main" | "dessert";

export type Menu = {
  menu_id: number;
  name: string;
  type: MenuTypes;
  allergies: string;
  price: number;
  ingredients: string;
  image: string;
};

export type NewMenu = {
  name: string;
  type: MenuTypes;
  allergies: string;
  price: number;
  ingredients: string;
  image: any;
};

export type CartItem = {
  id: string;
  menu: Menu | undefined;
  menu_id: number;
  quantity: number;
  price: number;
};
