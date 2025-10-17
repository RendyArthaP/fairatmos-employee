import * as React from "react";

type ModalSize = "sm" | "md" | "lg" | "xl";

export interface ModalProps {
  open: boolean;
  onClose: () => void;
  title?: string;
  children?: React.ReactNode;
  footer?: React.ReactNode;
  size?: ModalSize;
  showClose?: boolean;
  contentClassName?: string;
}

export function Modal({
  open,
  onClose,
  title,
  children,
  footer,
  size = "md",
  showClose = true,
  contentClassName = "",
}: ModalProps) {
  React.useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      // pastikan dikembalikan saat unmount
      document.body.style.overflow = "";
    };
  }, [open]);

  // Close on Escape
  React.useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  if (!open) return null;

  const sizeClass =
    size === "sm"
      ? "max-w-sm"
      : size === "lg"
      ? "max-w-2xl"
      : size === "xl"
      ? "max-w-3xl"
      : "max-w-lg";

  return (
    <div className="fixed inset-0 z-50">
      {/* Overlay */}
      <button
        aria-label="Close modal"
        onClick={onClose}
        className="absolute inset-0 bg-gray-500 opacity-30 backdrop-blur-[2px]"
      />
      {/* Dialog */}
      <div className="absolute inset-0 flex items-center justify-center p-4">
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby={title ? "modal-title" : undefined}
          className={`w-full ${sizeClass} rounded-lg border border-gray-500 bg-white shadow-lg`}
        >
          {(title || showClose) && (
            <div className="relative flex bg-gray-300 rounded-tr-lg rounded-tl-lg items-center justify-center border-b border-border px-5 py-4">
              {title ? (
                <h2
                  id="modal-title"
                  className="text-base md:text-xl font-semibold text-gray-600 text-balance"
                >
                  {title}
                </h2>
              ) : (
                <span className="sr-only">Modal</span>
              )}
              {showClose && (
                <button
                  type="button"
                  onClick={onClose}
                  aria-label="Close"
                  className="absolute right-3 top-1/2 grid h-9 w-9 -translate-y-1/2 place-items-center rounded-md text-foreground/80 hover:bg-muted focus:outline-none focus:ring-2 focus:ring-ring"
                >
                  {/* X icon */}
                  <svg
                    viewBox="0 0 14 14"
                    className="h-4 w-4"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                  >
                    <path d="M3 3L11 11M11 3L3 11" />
                  </svg>
                </button>
              )}
            </div>
          )}

          <div className={`px-5 py-4 ${contentClassName}`}>{children}</div>

          {footer && (
            <div className="rounded-b-[var(--radius)] border-t border-border bg-muted/40 px-5 py-4">
              {footer}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Modal;
