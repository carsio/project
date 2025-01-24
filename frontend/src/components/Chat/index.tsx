import { ChatHeader } from './ChatHeader';
import { ChatMessages } from './ChatMessages';
import { ChatInput } from './ChatInput';
import Message, { User } from '../../models/message';
import { useState } from 'react';
import useCuteUserName from '../../hooks/useCuteUserName';

export function Chat() {

  const [messages, setMessages] = useState<Message[]>([]);

  const cuteName = useCuteUserName();

  const handleSendMessage = (message: string) => {
    console.log('Message sent:', message);
    const newMessage = new Message(message, new User(cuteName));
    setMessages([...messages, newMessage]);
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md h-[600px] flex flex-col border border-gray-200 dark:border-gray-700">
      <ChatHeader />
      <ChatMessages messages={messages}/>
      <ChatInput onSendMessage={handleSendMessage} />
    </div>
  );
}