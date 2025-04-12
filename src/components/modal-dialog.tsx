import { ReactNode } from "react";
import { Button } from "./ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";

export function ModalDialog({
  open,
  children,
  onSubmit,
  onCancel,
  cancelTitle,
  saveTitle,
  title,
  isSubmitting,
}: {
  children: ReactNode;
  open: boolean;
  onSubmit: () => void;
  onCancel?: () => void;
  cancelTitle?: string;
  saveTitle?: string;
  title: string;
  isSubmitting?: boolean;
}) {
  return (
    <Dialog open={open} onOpenChange={onCancel}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
        </DialogHeader>
        {children}
        <DialogFooter>
          {onCancel && (
            <Button variant="outline" onClick={onCancel} type="submit">
              {cancelTitle ?? "Cancel"}
            </Button>
          )}
          <Button disabled={isSubmitting} onClick={onSubmit} type="submit">
            {isSubmitting && (
              <span className="mr-2 h-4 w-4 animate-spin rounded-full border-b-2 border-current border-r-2"></span>
            )}
            {saveTitle ?? "Save changes"}
          </Button>
        </DialogFooter>
      </DialogContent>
      <DialogClose onClick={onCancel} />
    </Dialog>
  );
}
