export const products = [
  {
    id: "6c84fb90-12c4-11e1-840d-7b25c5ee775a",
    name: "Cappuccino",
    price: 5000.0,
  },
  {
    id: "110e8400-e29b-11d4-a716-446655440000",
    name: "Americano",
    price: 3500.0,
  },
  {
    id: "3e7c3f6d-bdf5-46ae-8d90-171300f27ae2",
    name: "Expresso",
    price: 3200.0,
  },
  {
    id: "3e7c3f6d-bdf5-46ae-8d90-171300f27ae2",
    name: "Cortado",
    price: 2100.0,
  },
  {
    id: "3e7c3f6d-bdf5-46ae-8d90-171300f27ae2",
    name: "Cafe Moncha",
    price: 4200.0,
  },
];

export type Product = (typeof products)[number];
