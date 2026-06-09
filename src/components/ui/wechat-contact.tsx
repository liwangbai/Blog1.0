'use client';

import { useState } from 'react';

export function WeChatContact({ label }: { label: string }) {
  const [showWechat, setShowWechat] = useState(false);

  return (
    <>
      <button
        type="button"
        onClick={() => setShowWechat(!showWechat)}
        className="text-gray-900 dark:text-white underline hover:no-underline cursor-pointer"
      >
        {label}
      </button>
      {showWechat && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
          onClick={() => setShowWechat(false)}
        >
          <div className="relative" onClick={(e) => e.stopPropagation()}>
            <img
              src="/images/wechat_addme.jpg"
              alt="WeChat QR Code"
              className="w-64 rounded-lg shadow-lg"
            />
          </div>
        </div>
      )}
    </>
  );
}
