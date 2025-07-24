'use client';

import { useState } from 'react';
import Sidebar from './Sidebar';
import Dashboard from './Dashboard';
import ProductManagement from './ProductManagement';
import OrderManagement from './OrderManagement';
import CustomerManagement from './CustomerManagement';
import Analytics from './Analytics';
import Settings from './Settings';
import AccountManagement from './AccountManagement';

export default function AdminLayout() {
  const [currentMenu, setCurrentMenu] = useState('dashboard');

  const renderContent = () => {
    switch (currentMenu) {
      case 'dashboard':
        return <Dashboard />;
      case 'products':
        return <ProductManagement />;
      case 'orders':
        return <OrderManagement />;
      case 'customers':
        return <CustomerManagement />;
      case 'analytics':
        return <Analytics />;
      case 'settings':
        return <Settings />;
      case 'account':
        return <AccountManagement />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="min-h-screen bg-app-primary transition-all duration-300">
      <Sidebar onMenuSelect={setCurrentMenu} currentMenu={currentMenu} />
      <div className="ml-64">
        <header className="bg-app-secondary shadow-sm border-b border-app transition-all duration-300">
          <div className="px-6 py-4">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-xl font-semibold text-app-primary transition-all duration-300">
                  {currentMenu === 'dashboard' && '儀表板'}
                  {currentMenu === 'products' && '商品管理'}
                  {currentMenu === 'orders' && '訂單管理'}
                  {currentMenu === 'customers' && '會員管理'}
                  {currentMenu === 'analytics' && '數據分析'}
                  {currentMenu === 'settings' && '系統設定'}
                  {currentMenu === 'account' && '帳號設定'}
                </h1>
                <p className="text-sm text-app-muted transition-all duration-300">
                  {new Date().toLocaleDateString('zh-TW', { 
                    year: 'numeric', 
                    month: 'long', 
                    day: 'numeric',
                    weekday: 'long'
                  })}
                </p>
              </div>
              <div className="flex items-center space-x-4">
                <button className="relative p-2 text-app-muted hover:text-app-secondary transition-all duration-300">
                  <span className="sr-only">通知</span>
                  🔔
                  <span className="absolute top-0 right-0 block h-2 w-2 rounded-full bg-red-400"></span>
                </button>
                <div className="flex items-center space-x-3">
                  <div className="h-8 w-8 bg-app-tertiary rounded-full flex items-center justify-center transition-all duration-300">
                    <span className="text-sm font-medium text-app-primary">管</span>
                  </div>
                  <span className="text-sm font-medium text-app-secondary transition-all duration-300">管理員</span>
                </div>
              </div>
            </div>
          </div>
        </header>
        <main className="flex-1">
          {renderContent()}
        </main>
      </div>
    </div>
  );
}