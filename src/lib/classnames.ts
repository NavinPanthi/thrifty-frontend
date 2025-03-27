import classNames from "classnames";
import { twMerge } from "tailwind-merge";

export default function cn(...args: Parameters<typeof classNames>) {
  return twMerge(classNames(...args));
}
