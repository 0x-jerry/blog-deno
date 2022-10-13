import { JSX } from "preact";

export function Button(props: JSX.HTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      {...props}
      className="px-2 py-1 border(gray-100 1) bg-gray-100 hover:bg-gray-200"
    />
  );
}
