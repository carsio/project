import React from 'react';
import { ChatHeader } from './ChatHeader';
import { ChatMessages } from './ChatMessages';
import { ChatInput } from './ChatInput';

export function Chat() {
  const handleSendMessage = (message: string) => {
    console.log('Message sent:', message);
    // TODO: Implement message sending functionality
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md h-[600px] flex flex-col border border-gray-200 dark:border-gray-700">
      <ChatHeader />
      <ChatMessages />
      <ChatInput onSendMessage={handleSendMessage} />
    </div>
  );
}