'use client';

import { useState } from 'react';

export default function OrderManagement() {
  const [orders] = useState([
    { 
      id: '#ORD001', 
      customer: '張小明', 
      email: 'zhang@example.com',
      total: 1299, 
      status: '已完成', 
      date: '2024-01-15',
      items: 2,
      payment: '信用卡'
    },
    { 
      id: '#ORD002', 
      customer: '李小華', 
      email: 'li@example.com',
      total: 2599, 
      status: '處理中', 
      date: '2024-01-15',
      items: 1,
      payment: 'PayPal'
    },
    { 
      id: '#ORD003', 
      customer: '王小美', 
      email: 'wang@example.com',
      total: 899, 
      status: '待付款', 
      date: '2024-01-14',
      items: 3,
      payment: '銀行轉帳'
    },
    { 
      id: '#ORD004', 
      customer: '陳小強', 
      email: 'chen@example.com',
      total: 3599, 
      status: '已發貨', 
      date: '2024-01-14',
      items: 1,
      payment: '信用卡'
    },
    { 
      id: '#ORD005', 
      customer: '林小雅', 
      email: 'lin@example.com',
      total: 599, 
      status: '已取消', 
      date: '2024-01-13',
      items: 2,
      payment: '信用卡'
    },
  ]);

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);

  const getStatusColor = (status: string) => {
    switch (status) {
      case '已完成': return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300';
      case '處理中': return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300';
      case '待付款': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300';
      case '已發貨': return 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300';
      case '已取消': return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300';
    }
  };

  // 分頁邏輯
  const totalPages = Math.ceil(orders.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentOrders = orders.slice(startIndex, endIndex);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  return (
    <div className="p-6 bg-app-primary min-h-screen transition-all duration-300">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-app-primary transition-all duration-300">訂單管理</h2>
        <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors">
          匯出訂單
        </button>
      </div>

      {/* 統計卡片 */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md">
          <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">總訂單</h3>
          <p className="text-2xl font-bold text-gray-900 dark:text-white">1,234</p>
        </div>
        <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md">
          <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">待處理</h3>
          <p className="text-2xl font-bold text-yellow-600">23</p>
        </div>
        <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md">
          <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">已完成</h3>
          <p className="text-2xl font-bold text-green-600">1,156</p>
        </div>
        <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md">
          <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">總金額</h3>
          <p className="text-2xl font-bold text-gray-900 dark:text-white">NT$456,789</p>
        </div>
      </div>

      {/* 搜尋和篩選 */}
      <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md mb-6">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          <input
            type="text"
            placeholder="搜尋訂單編號或客戶..."
            className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
          />
          <select className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white">
            <option value="">所有狀態</option>
            <option value="待付款">待付款</option>
            <option value="處理中">處理中</option>
            <option value="已發貨">已發貨</option>
            <option value="已完成">已完成</option>
            <option value="已取消">已取消</option>
          </select>
          <input
            type="date"
            className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
          />
          <input
            type="date"
            className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
          />
          <button className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-lg transition-colors">
            搜尋
          </button>
        </div>
      </div>

      {/* 訂單列表 */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 dark:bg-gray-700">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">訂單編號</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">客戶</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">金額</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">商品數</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">付款方式</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">狀態</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">日期</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">操作</th>
              </tr>
            </thead>
            <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
              {currentOrders.map((order) => (
                <tr key={order.id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900 dark:text-white">{order.id}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900 dark:text-white">{order.customer}</div>
                    <div className="text-sm text-gray-500 dark:text-gray-400">{order.email}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                    NT${order.total.toLocaleString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">
                    {order.items} 件
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">
                    {order.payment}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 text-xs rounded-full ${getStatusColor(order.status)}`}>
                      {order.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">
                    {order.date}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <button className="text-blue-600 hover:text-blue-900 dark:text-blue-400 dark:hover:text-blue-300 mr-3">
                      查看
                    </button>
                    <button className="text-green-600 hover:text-green-900 dark:text-green-400 dark:hover:text-green-300">
                      處理
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* 分頁 */}
      <div className="flex justify-between items-center mt-6">
        <div className="text-sm text-gray-500 dark:text-gray-400">
          顯示 {startIndex + 1}-{Math.min(endIndex, orders.length)} 筆，共 {orders.length} 筆訂單
        </div>
        <div className="flex space-x-2">
          <button 
            onClick={handlePrevPage}
            disabled={currentPage === 1}
            className={`px-3 py-1 border rounded text-sm transition-colors ${
              currentPage === 1 
                ? 'border-gray-300 dark:border-gray-600 text-gray-400 dark:text-gray-500 cursor-not-allowed' 
                : 'border-gray-300 dark:border-gray-600 text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700'
            }`}
          >
            上一頁
          </button>
          
          {/* 頁碼按鈕 */}
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
            <button
              key={page}
              onClick={() => handlePageChange(page)}
              className={`px-3 py-1 rounded text-sm transition-colors ${
                currentPage === page
                  ? 'bg-blue-600 text-white'
                  : 'border border-gray-300 dark:border-gray-600 text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700'
              }`}
            >
              {page}
            </button>
          ))}
          
          <button 
            onClick={handleNextPage}
            disabled={currentPage === totalPages}
            className={`px-3 py-1 border rounded text-sm transition-colors ${
              currentPage === totalPages 
                ? 'border-gray-300 dark:border-gray-600 text-gray-400 dark:text-gray-500 cursor-not-allowed' 
                : 'border-gray-300 dark:border-gray-600 text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700'
            }`}
          >
            下一頁
          </button>
        </div>
      </div>
    </div>
  );
}