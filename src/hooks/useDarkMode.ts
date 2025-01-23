import { useState, useEffect, useContext } from 'react';
import { DarkModeContext } from '../contexts/DarkModeContext';

export function useDarkMode() {
  const context = useContext(DarkModeContext);
  if (!context) {
    throw new Error('useDarkMode deve ser usado dentro de um DarkModeProvider');
  }
  return context;
}