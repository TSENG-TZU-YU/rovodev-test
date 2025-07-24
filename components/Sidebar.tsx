'use client';

import { useState } from 'react';
import * as React from 'react';

interface SidebarProps {
  onMenuSelect: (menu: string) => void;
  currentMenu: string;
}

export default function Sidebar({ onMenuSelect, currentMenu }: SidebarProps) {
  const [isDarkMode, setIsDarkMode] = useState(true);

  const menuItems = [
    { id: 'dashboard', label: '儀表板', icon: '📊' },
    { id: 'products', label: '商品管理', icon: '📦' },
    { id: 'orders', label: '訂單管理', icon: '📋' },
    { id: 'customers', label: '會員管理', icon: '👥' },
    { id: 'analytics', label: '數據分析', icon: '📈' },
    { id: 'settings', label: '系統設定', icon: '⚙️' },
    { id: 'account', label: '帳號設定', icon: '👤' },
  ];

  const toggleDarkMode = () => {
    const newDarkMode = !isDarkMode;
    setIsDarkMode(newDarkMode);
    
    if (newDarkMode) {
      document.documentElement.classList.remove('light-mode');
      document.body.classList.remove('light-mode');
      localStorage.setItem('darkMode', 'true');
    } else {
      document.documentElement.classList.add('light-mode');
      document.body.classList.add('light-mode');
      localStorage.setItem('darkMode', 'false');
    }
  };

  // 初始化深色模式
  React.useEffect(() => {
    const savedDarkMode = localStorage.getItem('darkMode');
    const prefersLight = window.matchMedia('(prefers-color-scheme: light)').matches;
    const shouldBeDark = savedDarkMode === 'true' || (savedDarkMode === null && !prefersLight);
    
    setIsDarkMode(shouldBeDark);
    if (shouldBeDark) {
      document.documentElement.classList.remove('light-mode');
      document.body.classList.remove('light-mode');
    } else {
      document.documentElement.classList.add('light-mode');
      document.body.classList.add('light-mode');
    }
  }, []);

  return (
    <div className="w-64 bg-app-secondary shadow-lg h-screen fixed left-0 top-0 z-10 transition-all duration-300">
      <div className="p-6 border-b border-app transition-all duration-300">
        <h1 className="text-xl font-bold text-app-primary transition-all duration-300">電商後台</h1>
      </div>
      
      <nav className="mt-6">
        {menuItems.map((item) => (
          <button
            key={item.id}
            onClick={() => onMenuSelect(item.id)}
            className={`w-full flex items-center px-6 py-3 text-left hover:bg-app-tertiary transition-all duration-300 ${
              currentMenu === item.id 
                ? 'bg-blue-600 text-white border-r-2 border-blue-500' 
                : 'text-app-secondary'
            }`}
          >
            <span className="mr-3 text-lg transition-all duration-300">{item.icon}</span>
            <span className="transition-all duration-300">{item.label}</span>
          </button>
        ))}
      </nav>

      <div className="absolute bottom-6 left-6 right-6">
        <button
          onClick={toggleDarkMode}
          className="w-full flex items-center justify-center px-4 py-2 bg-app-tertiary rounded-lg hover:bg-app-primary transition-all duration-300 text-app-primary"
        >
          <span className="mr-2">{isDarkMode ? '☀️' : '🌙'}</span>
          {isDarkMode ? '淺色模式' : '深色模式'}
        </button>
      </div>
    </div>
  );
}