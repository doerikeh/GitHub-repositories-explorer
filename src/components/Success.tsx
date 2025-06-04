import CheckIcon from "@/icon/Check";
import { Toast, ToastToggle } from "flowbite-react";

export default function Success() {
  return (
    <Toast className="absolute top-4 right-5 bg-green-50">
      <div className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-green-100 text-green-500 dark:bg-green-800 dark:text-green-200">
        <CheckIcon />
      </div>
      <div className="ml-3 text-sm font-normal">Data Found successfully.</div>
      <ToastToggle />
    </Toast>
  );
}
