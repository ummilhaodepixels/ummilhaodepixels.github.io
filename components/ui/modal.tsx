import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogHeader,
  DialogTrigger,
} from "./dialog";
import { cn } from "@/lib/utils";

export default function Modal({
  isOpen,
  title,
  children,
  onOpenChange,
  className,
}: {
  isOpen: boolean;
  title: string;
  children?: React.ReactNode;
  className?: string;
  onOpenChange?: (open: boolean) => void;
}) {
  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange} modal={true}>
      <DialogTrigger></DialogTrigger>
      <DialogContent
        className={cn(
          "flex flex-col max-w-full max-h-full w-2/5 h-2/4 ",
          className
        )}
        onInteractOutside={(e) => e.preventDefault()}
      >
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
        </DialogHeader>

        <div className="flex w-full h-full">{children}</div>
      </DialogContent>
    </Dialog>
  );
}
