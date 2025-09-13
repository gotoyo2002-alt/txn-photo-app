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
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="bg-primary rounded-2xl shadow-2xl p-8 w-full max-w-2xl relative flex flex-col md:flex-row gap-8">
        <button
          className="absolute top-4 right-4 text-accent text-2xl font-bold hover:scale-110 transition"
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
        {/* 可根據 TradeForm 狀態傳遞 props 實作更進階功能 */}
        <div className="flex-1 min-w-0 flex flex-col items-center justify-center">
          {/* 這裡可放縮圖預覽、策略標籤、R/R 圖示等 */}
          <div className="w-40 h-40 bg-accent/10 rounded-lg flex items-center justify-center text-accent font-mono">
            縮圖預覽
          </div>
          <div className="mt-4 text-accent font-mono text-lg">R/R 即時計算</div>
        </div>
      </div>
    </div>
  );
};

export default TradeFormModal;
