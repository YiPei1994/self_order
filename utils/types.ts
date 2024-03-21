export type Menu = {
  menu_id: number;
  name: string;
  type: string;
  allergies: number[];
  price: number;
  ingredients: string;
  image: string;
};

export type CartItem = {
  id: string;
  menu: Menu | undefined;
  menu_id: number;
  quantity: number;
  price: number;
};
