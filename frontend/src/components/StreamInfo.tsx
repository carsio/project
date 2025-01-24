import { Users, Clock } from 'lucide-react';

interface StreamInfoProps {
  title: string;
  description: string;
  viewers: number;
  startTime: string;
}

export function StreamInfo({ title, description, viewers, startTime }: StreamInfoProps) {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-md">
      <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-2">{title}</h2>
      <p className="text-gray-600 dark:text-gray-300 mb-4">{description}</p>
      <div className="flex items-center space-x-6">
        <div className="flex items-center text-purple-600 dark:text-purple-400">
          <Users className="h-5 w-5 mr-2" />
          <span>{viewers.toLocaleString()} viewers</span>
        </div>
        <div className="flex items-center text-purple-600 dark:text-purple-400">
          <Clock className="h-5 w-5 mr-2" />
          <span>Started {startTime}</span>
        </div>
      </div>
    </div>
  );
}