'use client';

import { Menu } from 'lucide-react';

interface MoreMenuProps {
  onMenuClick?: () => void;
  className?: string;
}

export function MoreMenu({ 
  onMenuClick,
  className = ''
}: MoreMenuProps) {
  return (
    <div className={`relative ${className}`}>
      {/* 触发按钮 */}
      <button
        onClick={() => {
          console.log('MoreMenu button clicked');
          if (onMenuClick) {
            onMenuClick();
          }
        }}
        className="p-2 rounded-full bg-gray-800/50 text-white hover:bg-gray-700/50 transition-colors"
      >
        <Menu size={20} />
      </button>
    </div>
  );
} 