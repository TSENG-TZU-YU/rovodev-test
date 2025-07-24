'use client';

import { useState } from 'react';

interface Customer {
  id: number;
  name: string;
  email: string;
  phone: string;
  totalOrders: number;
  totalSpent: number;
  status: string;
  joinDate: string;
  lastOrder: string;
}

export default function CustomerManagement() {
  const [customers, setCustomers] = useState<Customer[]>([
    { 
      id: 1, 
      name: '張小明', 
      email: 'zhang@example.com',
      phone: '0912-345-678',
      totalOrders: 15,
      totalSpent: 45600,
      status: '活躍',
      joinDate: '2023-05-15',
      lastOrder: '2024-01-15'
    },
    { 
      id: 2, 
      name: '李小華', 
      email: 'li@example.com',
      phone: '0923-456-789',
      totalOrders: 8,
      totalSpent: 23400,
      status: '活躍',
      joinDate: '2023-08-22',
      lastOrder: '2024-01-12'
    },
    { 
      id: 3, 
      name: '王小美', 
      email: 'wang@example.com',
      phone: '0934-567-890',
      totalOrders: 3,
      totalSpent: 8900,
      status: '新會員',
      joinDate: '2024-01-01',
      lastOrder: '2024-01-10'
    },
    { 
      id: 4, 
      name: '陳小強', 
      email: 'chen@example.com',
      phone: '0945-678-901',
      totalOrders: 25,
      totalSpent: 78900,
      status: 'VIP',
      joinDate: '2022-12-10',
      lastOrder: '2024-01-14'
    },
    { 
      id: 5, 
      name: '林小雅', 
      email: 'lin@example.com',
      phone: '0956-789-012',
      totalOrders: 2,
      totalSpent: 1200,
      status: '非活躍',
      joinDate: '2023-11-20',
      lastOrder: '2023-12-05'
    },
  ]);

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const [showModal, setShowModal] = useState(false);
  const [editingCustomer, setEditingCustomer] = useState<Customer | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    status: '新會員'
  });

  const filteredCustomers = customers.filter(customer => {
    const matchesSearch = customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         customer.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         customer.phone.includes(searchTerm);
    const matchesStatus = statusFilter === '' || customer.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  // 分頁邏輯
  const totalPages = Math.ceil(filteredCustomers.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentCustomers = filteredCustomers.slice(startIndex, endIndex);

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

  const handleAdd = () => {
    setEditingCustomer(null);
    setFormData({
      name: '',
      email: '',
      phone: '',
      status: '新會員'
    });
    setShowModal(true);
  };

  const handleEdit = (customer: Customer) => {
    setEditingCustomer(customer);
    setFormData({
      name: customer.name,
      email: customer.email,
      phone: customer.phone,
      status: customer.status
    });
    setShowModal(true);
  };

  const handleDelete = (id: number) => {
    if (confirm('確定要刪除此會員嗎？')) {
      setCustomers(customers.filter(customer => customer.id !== id));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (editingCustomer) {
      // 編輯現有會員
      setCustomers(customers.map(customer =>
        customer.id === editingCustomer.id
          ? { ...customer, ...formData }
          : customer
      ));
    } else {
      // 新增會員
      const newCustomer: Customer = {
        id: Math.max(...customers.map(c => c.id)) + 1,
        ...formData,
        totalOrders: 0,
        totalSpent: 0,
        joinDate: new Date().toISOString().split('T')[0],
        lastOrder: '尚未下單'
      };
      setCustomers([...customers, newCustomer]);
    }
    
    setShowModal(false);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'VIP': return 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300';
      case '活躍': return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300';
      case '新會員': return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300';
      case '非活躍': return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300';
    }
  };

  return (
    <div className="p-6 bg-app-primary min-h-screen transition-all duration-300">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-app-primary transition-all duration-300">會員管理</h2>
        <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors">
          + 新增會員
        </button>
      </div>

      {/* 統計卡片 */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md">
          <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">總會員數</h3>
          <p className="text-2xl font-bold text-gray-900 dark:text-white">2,456</p>
          <p className="text-sm text-green-600">+12% 本月</p>
        </div>
        <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md">
          <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">活躍會員</h3>
          <p className="text-2xl font-bold text-green-600">1,892</p>
          <p className="text-sm text-green-600">+8% 本月</p>
        </div>
        <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md">
          <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">VIP會員</h3>
          <p className="text-2xl font-bold text-purple-600">156</p>
          <p className="text-sm text-green-600">+15% 本月</p>
        </div>
        <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md">
          <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">平均消費</h3>
          <p className="text-2xl font-bold text-gray-900 dark:text-white">NT$3,245</p>
          <p className="text-sm text-green-600">+5% 本月</p>
        </div>
      </div>

      {/* 搜尋和篩選 */}
      <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md mb-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <input
            type="text"
            placeholder="搜尋會員姓名、信箱或電話..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
          />
          <select 
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
          >
            <option value="">所有狀態</option>
            <option value="VIP">VIP</option>
            <option value="活躍">活躍</option>
            <option value="新會員">新會員</option>
            <option value="非活躍">非活躍</option>
          </select>
          <button 
            onClick={() => {setSearchTerm(''); setStatusFilter(''); setCurrentPage(1);}}
            className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-lg transition-colors"
          >
            清除篩選
          </button>
        </div>
      </div>

      {/* 會員列表 */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 dark:bg-gray-700">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">會員</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">聯絡資訊</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">訂單數</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">總消費</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">狀態</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">註冊日期</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">最後訂單</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">操作</th>
              </tr>
            </thead>
            <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
              {currentCustomers.map((customer) => (
                <tr key={customer.id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="h-10 w-10 bg-gray-200 dark:bg-gray-600 rounded-full mr-3 flex items-center justify-center">
                        <span className="text-sm font-medium text-gray-600 dark:text-gray-300">
                          {customer.name.charAt(0)}
                        </span>
                      </div>
                      <div className="text-sm font-medium text-gray-900 dark:text-white">{customer.name}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900 dark:text-white">{customer.email}</div>
                    <div className="text-sm text-gray-500 dark:text-gray-400">{customer.phone}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">
                    {customer.totalOrders}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                    ¥{customer.totalSpent.toLocaleString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 text-xs rounded-full ${getStatusColor(customer.status)}`}>
                      {customer.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">
                    {customer.joinDate}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">
                    {customer.lastOrder}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <button 
                      onClick={() => handleEdit(customer)}
                      className="text-blue-600 hover:text-blue-900 dark:text-blue-400 dark:hover:text-blue-300 mr-3"
                    >
                      編輯
                    </button>
                    <button 
                      onClick={() => handleDelete(customer.id)}
                      className="text-red-600 hover:text-red-900 dark:text-red-400 dark:hover:text-red-300"
                    >
                      刪除
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
          顯示 {startIndex + 1}-{Math.min(endIndex, filteredCustomers.length)} 筆，共 {filteredCustomers.length} 筆會員
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

      {/* 新增/編輯模態框 */}
      {showModal && (
        <div className="fixed inset-0 modal-backdrop flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-xl w-full max-w-md">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              {editingCustomer ? '編輯會員' : '新增會員'}
            </h3>
            <form onSubmit={handleSubmit}>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    姓名
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    電子郵件
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    電話
                  </label>
                  <input
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({...formData, phone: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    會員狀態
                  </label>
                  <select
                    value={formData.status}
                    onChange={(e) => setFormData({...formData, status: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                  >
                    <option value="新會員">新會員</option>
                    <option value="活躍">活躍</option>
                    <option value="VIP">VIP</option>
                    <option value="非活躍">非活躍</option>
                  </select>
                </div>
              </div>
              <div className="flex justify-end space-x-4 mt-6">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                >
                  取消
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
                >
                  {editingCustomer ? '更新' : '新增'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}