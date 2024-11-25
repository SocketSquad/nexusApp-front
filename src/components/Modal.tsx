import React, { useEffect } from 'react';
import IconX from './Icon/IconX';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
}

export default function Modal({ isOpen, onClose, title, children }: ModalProps) {
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="fixed inset-0 bg-black backdrop-blur-md bg-opacity-50 transition-opacity" onClick={onClose} />
      <div className="flex min-h-full items-center justify-center p-4">
        <div className="relative w-full max-w-md transform rounded-lg bg-white dark:bg-slate-800 p-6 shadow-xl transition-all">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-slate-900 dark:text-white">{title}</h3>
            <button
              onClick={onClose}
              className="rounded-full p-1 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors"
            >
              <IconX className="w-5 h-5 text-slate-500 dark:text-white" />
            </button>
          </div>
          <div className="h-px w-full border-b border-white-light dark:border-slate-700"></div>
          {children}
        </div>
      </div>
    </div>
  );
}