'use client';

import { useState } from 'react';

export function SocialLinks({ githubLabel }: { githubLabel: string }) {
  const [showWechat, setShowWechat] = useState(false);

  return (
    <div className="flex items-center gap-4">
      <a
        href="https://github.com/liwangbai"
        target="_blank"
        rel="noopener noreferrer"
        className="text-sm text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
      >
        {githubLabel}
      </a>
      <button
        type="button"
        onClick={() => setShowWechat(!showWechat)}
        className="text-sm text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors cursor-pointer"
      >
        WeChat
      </button>
      {showWechat && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50" onClick={() => setShowWechat(false)}>
          <div className="relative" onClick={(e) => e.stopPropagation()}>
            <img
              src="/images/wechat_addme.jpg"
              alt="WeChat QR Code"
              className="w-64 h-64 rounded-lg shadow-lg"
            />
          </div>
        </div>
      )}
    </div>
  );
}
