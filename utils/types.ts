export type TableNames = "A1" | "A2" | "A3" | "";

export type MenuTypes = "starter" | "main" | "dessert";

export type Status = "new" | "cooking" | "done" | "paid";

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
  id: number;
  menu: Menu | undefined;
  menu_id: number;
  quantity: number;
  price: number;
};

export type Order = {
  id: number;
  total: number;
  status: Status;
  table_name?: TableNames;
  customer_id?: string;
};

export type OrderDetails = {
  orderItems: CartItem[];
} & Order;
