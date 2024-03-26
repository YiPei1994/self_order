export type Menu = {
  menu_id: number;
  name: string;
  type: string;
  allergies: string;
  price: number;
  ingredients: string;
  image: string;
};

export type NewMenu = {
  name: string;
  type: string;
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
