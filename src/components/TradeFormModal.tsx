import React from 'react';
import TradeForm from './TradeForm';

interface TradeFormModalProps {
  open: boolean;
  onClose: () => void;
  onSubmit?: () => void;
}

const TradeFormModal: React.FC<TradeFormModalProps> = ({ open, onClose, onSubmit }) => {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 animate-fade-in">
      <div className="bg-gradient-to-br from-primary/90 via-primary/80 to-accent/10 rounded-3xl shadow-2xl p-8 w-full max-w-3xl relative flex flex-col md:flex-row gap-8 border border-accent/20 animate-fade-in-up">
        <button
          className="absolute top-4 right-4 text-accent text-3xl font-extrabold hover:scale-125 hover:text-accent/80 transition-transform duration-150"
          onClick={onClose}
          aria-label="關閉"
        >
          ×
        </button>
        {/* 左欄：表單 */}
        <div className="flex-1 min-w-0">
          <TradeForm onSubmit={onSubmit} />
        </div>
        {/* 右欄：縮圖預覽與即時 R/R 計算 */}
        <div className="flex-1 min-w-0 flex flex-col items-center justify-center gap-4">
          <div className="w-44 h-44 bg-accent/10 rounded-2xl flex items-center justify-center text-accent font-mono shadow-lg border border-accent/20">
            <span className="text-lg">縮圖預覽</span>
          </div>
          <div className="mt-2 text-accent font-mono text-xl font-bold drop-shadow">R/R 即時計算</div>
        </div>
      </div>
    </div>
  );
};

export default TradeFormModal;
