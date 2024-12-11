import React from 'react';
import { Play } from 'lucide-react';
import { ThemeToggle } from './ThemeToggle';

export function Header() {
  return (
    <header className="bg-gradient-to-r from-purple-800 to-indigo-900 dark:from-gray-900 dark:to-gray-800 py-6">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Play className="h-8 w-8 text-white" />
            <h1 className="text-2xl font-bold text-white">LiveStream</h1>
          </div>
          <div className="flex items-center space-x-6">
            <nav>
              <ul className="flex space-x-6">
                <li><a href="#" className="text-white hover:text-purple-200">Home</a></li>
                <li><a href="#" className="text-white hover:text-purple-200">Schedule</a></li>
                <li><a href="#" className="text-white hover:text-purple-200">About</a></li>
              </ul>
            </nav>
            <ThemeToggle />
          </div>
        </div>
      </div>
    </header>
  );
}