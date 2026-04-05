"use client";

interface ConfirmModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  message: string;
  children?: React.ReactNode;
}

export default function ConfirmModal({
  isOpen,
  onClose,
  onConfirm,
  title,
  message,
  children,
}: ConfirmModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm">
      <div className="bg-white dark:bg-[#1a1a1a] w-full max-w-sm rounded-2xl shadow-xl border border-[#ededed] dark:border-[#333] overflow-hidden animate-in fade-in zoom-in duration-200">
        <div className="p-6">
          <h3 className="text-lg font-semibold text-[#222] dark:text-[#eee] mb-2">
            {title}
          </h3>
          <p className="text-sm text-[#666] dark:text-[#aaa] leading-relaxed">
            {message}
          </p>
          {children}
        </div>

        <div className="flex border-t border-[#ededed] dark:border-[#333]">
          <button
            onClick={onClose}
            className="flex-1 px-4 py-3 text-sm font-medium text-[#666] dark:text-[#aaa] hover:bg-[#f9f9f9] dark:hover:bg-[#252525] transition-colors border-r border-[#ededed] dark:border-[#333]"
          >
            Cancelar
          </button>
          <button
            onClick={onConfirm}
            className="flex-1 px-4 py-3 text-sm font-semibold text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-colors"
          >
            Aceptar
          </button>
        </div>
      </div>
    </div>
  );
}
