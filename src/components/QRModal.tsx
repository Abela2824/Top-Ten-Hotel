import React, { useEffect } from 'react';
import { QRCodeSVG } from 'qrcode.react';
import { X, ExternalLink, QrCode } from 'lucide-react';
import { MENU_URL } from '../config';

interface QRModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const QRModal: React.FC<QRModalProps> = ({ isOpen, onClose }) => {
  // Prevent background scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  // Handle ESC key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="qr-modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/85 backdrop-blur-md animate-in fade-in duration-200"
      onClick={onClose}
    >
      {/* Modal Container */}
      <div
        className="relative w-full max-w-sm bg-[#161616] border border-stone-800 shadow-2xl p-6 sm:p-8 text-center"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Subtle Close Button (Top Right) */}
        <button
          type="button"
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-stone-400 hover:text-stone-100 transition-colors cursor-pointer"
          aria-label="Close modal"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Brand Eyebrow */}
        <div className="text-[10px] tracking-[0.35em] text-[#C5A880] uppercase font-sans font-medium mb-2">
          TOP TEN HOTEL
        </div>

        {/* Title */}
        <h3
          id="qr-modal-title"
          className="font-serif-luxury text-xl sm:text-2xl text-[#F2EEE7] font-light tracking-wide mb-6"
        >
          SCAN TO VIEW OUR MENU
        </h3>

        {/* High-Contrast Scannable QR Code with Subtle Luxury Frame */}
        <div className="relative inline-block p-4 bg-white border border-[#C5A880]/40 shadow-xl mb-5 mx-auto">
          <QRCodeSVG
            value={MENU_URL}
            size={180}
            level="M"
            bgColor="#ffffff"
            fgColor="#121212"
            marginSize={0}
          />
        </div>

        {/* Supporting Copy */}
        <p className="text-xs text-stone-300 font-sans tracking-wide mb-1">
          Scan with your phone camera
        </p>
        <p className="text-[11px] text-stone-500 font-sans tracking-normal mb-6">
          Explore our current dining menu from your phone.
        </p>

        {/* Direct Link Preview & Close Button */}
        <div className="pt-4 border-t border-stone-800/80 flex flex-col items-center space-y-3">
          <a
            href="/menu"
            onClick={(e) => {
              e.preventDefault();
              onClose();
              window.history.pushState({}, '', '/menu');
              window.dispatchEvent(new PopStateEvent('popstate'));
            }}
            className="text-[10px] tracking-[0.2em] text-[#C5A880] hover:text-[#e4cfb0] uppercase font-sans inline-flex items-center space-x-1.5 transition-colors cursor-pointer"
          >
            <span>Open menu on this device</span>
            <ExternalLink className="w-3 h-3" />
          </a>

          <button
            type="button"
            onClick={onClose}
            className="w-full py-2.5 px-4 text-xs font-sans tracking-[0.2em] uppercase text-stone-300 hover:text-white border border-stone-800 hover:border-stone-700 bg-stone-900/50 transition-colors cursor-pointer"
          >
            CLOSE
          </button>
        </div>
      </div>
    </div>
  );
};
