import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function extractPath(urlString: URL | string) {
  const url = new URL(urlString);
  return url.pathname; // This returns the path part of the URL
}
