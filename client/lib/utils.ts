import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatNumberToCurrency(number: number , currency:string = 'USD'): string {
  // Create a NumberFormat object with options for USD format
  var formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: currency,
  });

  // Format the number using the NumberFormat object
  var formattedNumber = formatter.format(number);

  return formattedNumber;
}
