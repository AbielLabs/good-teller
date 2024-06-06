import { atom, useAtom } from "jotai";

import { Product, products } from "@/app/(site)/data";

type Config = {
  selected: Product["id"] | null;
  cart: Product[];
};

const configAtom = atom<Config>({
  selected: products[0].id,
  cart: [],
});



export function useProduct() {
  return useAtom(configAtom);
}
