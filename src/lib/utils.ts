import { ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * @name cn
 * @description Utility function for merging Tailwind classes
 * @param {...ClassValue[]} inputs
 * @returns {string}
 */
export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}
