'use client';

export default function Dashboard() {
  const stats = [
    { title: '今日訂單', value: '156', change: '+12%', color: 'text-green-600' },
    { title: '總銷售額', value: 'NT$45,231', change: '+8%', color: 'text-green-600' },
    { title: '新會員', value: '23', change: '+15%', color: 'text-green-600' },
    { title: '商品數量', value: '1,234', change: '-2%', color: 'text-red-600' },
  ];

  const recentOrders = [
    { id: '#001', customer: '張小明', amount: 'NT$299', status: '已完成', time: '10:30' },
    { id: '#002', customer: '李小華', amount: 'NT$599', status: '處理中', time: '11:15' },
    { id: '#003', customer: '王小美', amount: 'NT$199', status: '待付款', time: '12:00' },
    { id: '#004', customer: '陳小強', amount: 'NT$899', status: '已完成', time: '13:45' },
  ];

  return (
    <div className="p-6 bg-app-primary min-h-screen transition-all duration-300">
      <h2 className="text-2xl font-bold text-app-primary mb-6 transition-all duration-300">儀表板</h2>
      
      {/* 統計卡片 */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, index) => (
          <div key={index} className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
            <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">{stat.title}</h3>
            <div className="flex items-center justify-between mt-2">
              <span className="text-2xl font-bold text-gray-900 dark:text-white">{stat.value}</span>
              <span className={`text-sm font-medium ${stat.color}`}>{stat.change}</span>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* 銷售圖表 */}
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">銷售趨勢</h3>
          <div className="h-64 flex items-center justify-center bg-gray-50 dark:bg-gray-700 rounded">
            <span className="text-gray-500 dark:text-gray-400">圖表區域 (Chart.js)</span>
          </div>
        </div>

        {/* 最近訂單 */}
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">最近訂單</h3>
          <div className="space-y-3">
            {recentOrders.map((order) => (
              <div key={order.id} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded">
                <div>
                  <div className="font-medium text-gray-900 dark:text-white">{order.id}</div>
                  <div className="text-sm text-gray-500 dark:text-gray-400">{order.customer}</div>
                </div>
                <div className="text-right">
                  <div className="font-medium text-gray-900 dark:text-white">{order.amount}</div>
                  <div className="text-sm text-gray-500 dark:text-gray-400">{order.time}</div>
                </div>
                <span className={`px-2 py-1 text-xs rounded-full ${
                  order.status === '已完成' ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300' :
                  order.status === '處理中' ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300' :
                  'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300'
                }`}>
                  {order.status}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}