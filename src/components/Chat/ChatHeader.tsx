import React from 'react';
import { MessageSquare } from 'lucide-react';

export function ChatHeader() {
  return (
    <div className="p-4 border-b border-gray-200 dark:border-gray-700">
      <div className="flex items-center gap-2">
        <MessageSquare className="w-5 h-5 text-primary-600 dark:text-primary-400" />
        <h2 className="text-lg font-semibold text-gray-800 dark:text-white">Live Chat</h2>
      </div>
    </div>
  );
}