import { cn } from "@/lib/utils";

export default function Spinner({ className }: { className?: string }) {
  return (
    <svg
      className={cn("animate-spin h-16 w-16 text-black", className)}
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
    >
      <circle
        className="opacity-25"
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        strokeWidth="2"
      />

      <circle
        className="opacity-75"
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        strokeWidth="2"
        strokeDasharray="62.83"
        strokeDashoffset="15"
      />
    </svg>
  );
}
