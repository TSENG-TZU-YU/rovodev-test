'use client';

import { useState } from 'react';

// 定義訂單狀態類型
type OrderStatus = '待付款' | '已付款' | '備貨中' | '已出貨' | '配送中' | '已送達' | '已完成' | '已取消' | '退款中' | '已退款';

// 訂單狀態配置
const ORDER_STATUSES: { value: OrderStatus; label: string; color: string }[] = [
  { value: '待付款', label: '待付款', color: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300' },
  { value: '已付款', label: '已付款', color: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300' },
  { value: '備貨中', label: '備貨中', color: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300' },
  { value: '已出貨', label: '已出貨', color: 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300' },
  { value: '配送中', label: '配送中', color: 'bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-300' },
  { value: '已送達', label: '已送達', color: 'bg-teal-100 text-teal-800 dark:bg-teal-900 dark:text-teal-300' },
  { value: '已完成', label: '已完成', color: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300' },
  { value: '已取消', label: '已取消', color: 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300' },
  { value: '退款中', label: '退款中', color: 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-300' },
  { value: '已退款', label: '已退款', color: 'bg-pink-100 text-pink-800 dark:bg-pink-900 dark:text-pink-300' },
];

// 狀態流程定義
const STATUS_FLOW: Record<OrderStatus, OrderStatus[]> = {
  '待付款': ['已付款', '已取消'],
  '已付款': ['備貨中', '已取消', '退款中'],
  '備貨中': ['已出貨', '已取消'],
  '已出貨': ['配送中', '已送達'],
  '配送中': ['已送達', '已完成'],
  '已送達': ['已完成'],
  '已完成': ['退款中'],
  '已取消': [],
  '退款中': ['已退款', '已付款'],
  '已退款': [],
};

export default function OrderManagement() {
  const [orders, setOrders] = useState([
    {
      id: '#ORD001',
      customer: '張小明',
      email: 'zhang@example.com',
      total: 1299,
      status: '已完成' as OrderStatus,
      date: '2024-01-15',
      items: 2,
      payment: '信用卡'
    },
    {
      id: '#ORD002',
      customer: '李小華',
      email: 'li@example.com',
      total: 2599,
      status: '備貨中' as OrderStatus,
      date: '2024-01-15',
      items: 1,
      payment: 'PayPal'
    },
    {
      id: '#ORD003',
      customer: '王小美',
      email: 'wang@example.com',
      total: 899,
      status: '待付款' as OrderStatus,
      date: '2024-01-14',
      items: 3,
      payment: '銀行轉帳'
    },
    {
      id: '#ORD004',
      customer: '陳小強',
      email: 'chen@example.com',
      total: 3599,
      status: '已出貨' as OrderStatus,
      date: '2024-01-14',
      items: 1,
      payment: '信用卡'
    },
    {
      id: '#ORD005',
      customer: '林小雅',
      email: 'lin@example.com',
      total: 599,
      status: '已取消' as OrderStatus,
      date: '2024-01-13',
      items: 2,
      payment: '信用卡'
    },
    {
      id: '#ORD006',
      customer: '黃小明',
      email: 'huang@example.com',
      total: 1899,
      status: '配送中' as OrderStatus,
      date: '2024-01-16',
      items: 1,
      payment: '信用卡'
    },
    {
      id: '#ORD007',
      customer: '吳小芳',
      email: 'wu@example.com',
      total: 799,
      status: '已送達' as OrderStatus,
      date: '2024-01-16',
      items: 2,
      payment: 'PayPal'
    },
    {
      id: '#ORD008',
      customer: '劉小強',
      email: 'liu@example.com',
      total: 2299,
      status: '已付款' as OrderStatus,
      date: '2024-01-17',
      items: 3,
      payment: '信用卡'
    },
  ]);

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const [selectedOrder, setSelectedOrder] = useState<string | null>(null);
  const [showStatusModal, setShowStatusModal] = useState(false);
  const [selectedOrders, setSelectedOrders] = useState<string[]>([]);
  const [statusFilter, setStatusFilter] = useState<OrderStatus | ''>('');
  const [searchTerm, setSearchTerm] = useState('');
  const [dateFilter, setDateFilter] = useState('');
  const [pendingStatusChange, setPendingStatusChange] = useState<{ orderId: string, newStatus: OrderStatus } | null>(null);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [detailOrder, setDetailOrder] = useState<typeof orders[0] | null>(null);

  const getStatusColor = (status: OrderStatus) => {
    const statusConfig = ORDER_STATUSES.find(s => s.value === status);
    return statusConfig?.color || 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300';
  };

  // 更新訂單狀態
  const updateOrderStatus = (orderId: string, newStatus: OrderStatus) => {
    setOrders(prevOrders =>
      prevOrders.map(order =>
        order.id === orderId ? { ...order, status: newStatus } : order
      )
    );
    setShowStatusModal(false);
    setSelectedOrder(null);
    setPendingStatusChange(null);
  };

  // 確認狀態更新
  const confirmStatusUpdate = () => {
    if (pendingStatusChange) {
      updateOrderStatus(pendingStatusChange.orderId, pendingStatusChange.newStatus);
    }
  };

  // 取消狀態更新
  const cancelStatusUpdate = () => {
    setShowStatusModal(false);
    setSelectedOrder(null);
    setPendingStatusChange(null);
  };

  // 獲取可用的下一個狀態
  const getAvailableStatuses = (currentStatus: OrderStatus): OrderStatus[] => {
    return STATUS_FLOW[currentStatus] || [];
  };

  // 計算狀態統計
  const getStatusStats = () => {
    const stats = ORDER_STATUSES.reduce((acc, status) => {
      acc[status.value] = orders.filter(order => order.status === status.value).length;
      return acc;
    }, {} as Record<OrderStatus, number>);

    return {
      total: orders.length,
      pending: stats['待付款'] + stats['已付款'],
      processing: stats['備貨中'] + stats['已出貨'] + stats['配送中'],
      completed: stats['已送達'] + stats['已完成'],
      cancelled: stats['已取消'] + stats['已退款'],
      ...stats
    };
  };

  const statusStats = getStatusStats();

  // 篩選和搜尋邏輯
  const filteredOrders = orders.filter(order => {
    const matchesSearch = searchTerm === '' ||
      order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.email.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus = statusFilter === '' || order.status === statusFilter;

    const matchesDate = dateFilter === '' || order.date === dateFilter;

    return matchesSearch && matchesStatus && matchesDate;
  });

  // 分頁邏輯
  const totalPages = Math.ceil(filteredOrders.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentOrders = filteredOrders.slice(startIndex, endIndex);

  // 批量選擇功能
  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedOrders(currentOrders.map(order => order.id));
    } else {
      setSelectedOrders([]);
    }
  };

  const handleSelectOrder = (orderId: string, checked: boolean) => {
    if (checked) {
      setSelectedOrders(prev => [...prev, orderId]);
    } else {
      setSelectedOrders(prev => prev.filter(id => id !== orderId));
    }
  };

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

  // 匯出 CSV 工具
  const exportOrdersToCSV = (ordersToExport: typeof orders) => {
    const header = ['訂單編號', '客戶', 'Email', '金額', '狀態', '日期', '商品數', '付款方式'];
    const rows = ordersToExport.map(order => [
      order.id, order.customer, order.email, order.total, order.status, order.date, order.items, order.payment
    ]);
    const csvContent = [header, ...rows]
      .map(row => row.map(field => `"${String(field).replace(/"/g, '""')}"`).join(','))
      .join('\r\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'orders.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="p-6 bg-app-primary min-h-screen transition-all duration-300">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-app-primary transition-all duration-300">訂單管理</h2>
        <button
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors"
          onClick={() => exportOrdersToCSV(filteredOrders)}
        >
          匯出訂單
        </button>
      </div>

      {/* 統計卡片 */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md">
          <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">總訂單</h3>
          <p className="text-2xl font-bold text-gray-900 dark:text-white">{statusStats.total}</p>
        </div>
        <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md">
          <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">待處理</h3>
          <p className="text-2xl font-bold text-yellow-600">{statusStats.pending}</p>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
            待付款: {statusStats['待付款']} | 已付款: {statusStats['已付款']}
          </p>
        </div>
        <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md">
          <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">處理中</h3>
          <p className="text-2xl font-bold text-blue-600">{statusStats.processing}</p>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
            備貨: {statusStats['備貨中']} | 已出貨: {statusStats['已出貨']} | 配送: {statusStats['配送中']}
          </p>
        </div>
        <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md">
          <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">已完成</h3>
          <p className="text-2xl font-bold text-green-600">{statusStats.completed}</p>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
            已送達: {statusStats['已送達']} | 已完成: {statusStats['已完成']}
          </p>
        </div>
      </div>

      {/* 快速狀態概覽 */}
      <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md mb-6">
        <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-3">狀態概覽</h3>
        <div className="grid grid-cols-2 md:grid-cols-5 lg:grid-cols-10 gap-2">
          {ORDER_STATUSES.map(status => (
            <div key={status.value} className="text-center">
              <div className={`px-2 py-1 text-xs rounded-full ${status.color} mb-1`}>
                {status.label}
              </div>
              <div className="text-sm font-medium text-gray-900 dark:text-white">
                {statusStats[status.value]}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 搜尋和篩選 */}
      <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md mb-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
          <input
            type="text"
            placeholder="搜尋訂單編號或客戶..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-black dark:bg-gray-700 dark:text-white"
          />
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value as OrderStatus | '')}
            className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-black dark:bg-gray-700 dark:text-white"
          >
            <option value="">所有狀態</option>
            {ORDER_STATUSES.map(status => (
              <option key={status.value} value={status.value}>{status.label}</option>
            ))}
          </select>
          <input
            type="date"
            value={dateFilter}
            onChange={(e) => setDateFilter(e.target.value)}
            className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-black dark:bg-gray-700 dark:text-white"
          />
          <button
            onClick={() => {
              setSearchTerm('');
              setStatusFilter('');
              setDateFilter('');
              setCurrentPage(1);
            }}
            className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-lg transition-colors"
          >
            清除篩選
          </button>
        </div>

        {/* 批量操作 */}
        {selectedOrders.length > 0 && (
          <div className="flex items-center justify-between p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
            <span className="text-sm text-blue-700 dark:text-blue-300">
              已選擇 {selectedOrders.length} 個訂單
            </span>
            <div className="flex space-x-2">
              <button
                className="px-3 py-1 bg-blue-600 hover:bg-blue-700 text-white text-sm rounded transition-colors"
                onClick={() => exportOrdersToCSV(orders.filter(order => selectedOrders.includes(order.id)))}
              >
                批量匯出
              </button>
              <button
                onClick={() => setSelectedOrders([])}
                className="px-3 py-1 bg-gray-600 hover:bg-gray-700 text-white text-sm rounded transition-colors"
              >
                取消選擇
              </button>
            </div>
          </div>
        )}
      </div>

      {/* 訂單列表 */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 dark:bg-gray-700">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  <input
                    type="checkbox"
                    checked={currentOrders.length > 0 && selectedOrders.length === currentOrders.length}
                    onChange={(e) => handleSelectAll(e.target.checked)}
                    className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                </th>
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
                    <input
                      type="checkbox"
                      checked={selectedOrders.includes(order.id)}
                      onChange={(e) => handleSelectOrder(order.id, e.target.checked)}
                      className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    />
                  </td>
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
                    <button className="text-blue-600 hover:text-blue-900 dark:text-blue-400 dark:hover:text-blue-300 mr-3"
                      onClick={() => {
                        setDetailOrder(order);
                        setShowDetailModal(true);
                      }}
                    >
                      查看
                    </button>
                    <button
                      onClick={() => {
                        setSelectedOrder(order.id);
                        setShowStatusModal(true);
                      }}
                      className="text-green-600 hover:text-green-900 dark:text-green-400 dark:hover:text-green-300"
                      disabled={getAvailableStatuses(order.status).length === 0}
                    >
                      {getAvailableStatuses(order.status).length > 0 ? '更新狀態' : '無法更新'}
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
          顯示 {startIndex + 1}-{Math.min(endIndex, filteredOrders.length)} 筆，共 {filteredOrders.length} 筆訂單
          {filteredOrders.length !== orders.length && (
            <span className="ml-2 text-blue-600 dark:text-blue-400">
              (從 {orders.length} 筆中篩選)
            </span>
          )}
        </div>
        <div className="flex space-x-2">
          <button
            onClick={handlePrevPage}
            disabled={currentPage === 1}
            className={`px-3 py-1 border rounded text-sm transition-colors ${currentPage === 1
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
              className={`px-3 py-1 rounded text-sm transition-colors ${currentPage === page
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
            className={`px-3 py-1 border rounded text-sm transition-colors ${currentPage === totalPages
              ? 'border-gray-300 dark:border-gray-600 text-gray-400 dark:text-gray-500 cursor-not-allowed'
              : 'border-gray-300 dark:border-gray-600 text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700'
              }`}
          >
            下一頁
          </button>
        </div>
      </div>

      {/* 狀態更新模態框 */}
      {showStatusModal && selectedOrder && (
        <div className="fixed inset-0 modal-backdrop flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 w-96 max-w-md mx-4">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              更新訂單狀態
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
              訂單編號: {selectedOrder}
            </p>

            {(() => {
              const order = orders.find(o => o.id === selectedOrder);
              if (!order) return null;

              const availableStatuses = getAvailableStatuses(order.status);

              return (
                <div className="space-y-4">
                  <div>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                      目前狀態: <span className={`px-2 py-1 text-xs rounded-full ${getStatusColor(order.status)}`}>
                        {order.status}
                      </span>
                    </p>
                    {pendingStatusChange && (
                      <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                        將變更為: <span className={`px-2 py-1 text-xs rounded-full ${getStatusColor(pendingStatusChange.newStatus)}`}>
                          {pendingStatusChange.newStatus}
                        </span>
                      </p>
                    )}
                  </div>

                  {availableStatuses.length > 0 ? (
                    <div>
                      <p className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        選擇新狀態:
                      </p>
                      <select
                        onChange={(e) => {
                          if (e.target.value) {
                            setPendingStatusChange({
                              orderId: selectedOrder,
                              newStatus: e.target.value as OrderStatus
                            });
                          }
                        }}
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        value={pendingStatusChange?.newStatus || ""}
                      >
                        <option value="" disabled>請選擇新狀態</option>
                        {availableStatuses.map(status => (
                          <option key={status} value={status}>
                            {status}
                          </option>
                        ))}
                      </select>
                    </div>
                  ) : (
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      此訂單狀態無法再更新
                    </p>
                  )}

                  <div className="flex justify-end space-x-3 mt-6">
                    <button
                      onClick={cancelStatusUpdate}
                      className="px-4 py-2 text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 transition-colors"
                    >
                      取消
                    </button>
                    {pendingStatusChange && (
                      <button
                        onClick={confirmStatusUpdate}
                        className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                      >
                        確認修改
                      </button>
                    )}
                  </div>
                </div>
              );
            })()}
          </div>
        </div>
      )}

      {/* 訂單詳情模態框 */}
      {showDetailModal && detailOrder && (
        <div className="fixed inset-0 modal-backdrop flex items-center justify-center z-50">
          <div
            className="rounded-lg p-6 w-96 max-w-md mx-4"
            style={{
              backgroundColor: '#fff', // 強制白底
              color: '#111',           // 強制黑字
            }}
          >
            <h3 className="text-lg font-semibold mb-4" style={{ color: '#111' }}>
              訂單詳情
            </h3>
            <ul className="text-sm space-y-2">
              <li>
                <span style={{ color: '#222' }}>訂單編號：</span>
                <span className="font-bold" style={{ color: '#111' }}>{detailOrder.id}</span>
              </li>
              <li>
                <span style={{ color: '#222' }}>客戶：</span>
                <span className="font-bold" style={{ color: '#111' }}>{detailOrder.customer}</span>
              </li>
              <li>
                <span style={{ color: '#222' }}>Email：</span>
                <span className="font-bold" style={{ color: '#111' }}>{detailOrder.email}</span>
              </li>
              <li>
                <span style={{ color: '#222' }}>金額：</span>
                <span className="font-bold" style={{ color: '#15803d' }}>NT${detailOrder.total.toLocaleString()}</span>
              </li>
              <li>
                <span style={{ color: '#222' }}>狀態：</span>
                <span className={`font-bold ${getStatusColor(detailOrder.status)}`} style={{ color: '#111' }}>{detailOrder.status}</span>
              </li>
              <li>
                <span style={{ color: '#222' }}>日期：</span>
                <span className="font-bold" style={{ color: '#111' }}>{detailOrder.date}</span>
              </li>
              <li>
                <span style={{ color: '#222' }}>商品數：</span>
                <span className="font-bold" style={{ color: '#111' }}>{detailOrder.items}</span>
              </li>
              <li>
                <span style={{ color: '#222' }}>付款方式：</span>
                <span className="font-bold" style={{ color: '#111' }}>{detailOrder.payment}</span>
              </li>
            </ul>
            <div className="flex justify-end mt-6">
              <button
                onClick={() => setShowDetailModal(false)}
                className="px-4 py-2 transition-colors"
                style={{ color: '#111' }}
              >
                關閉
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}