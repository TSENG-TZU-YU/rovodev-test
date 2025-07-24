'use client';

export default function Analytics() {
  const salesData = [
    { month: '1月', sales: 45000, orders: 156 },
    { month: '2月', sales: 52000, orders: 189 },
    { month: '3月', sales: 48000, orders: 167 },
    { month: '4月', sales: 61000, orders: 203 },
    { month: '5月', sales: 55000, orders: 178 },
    { month: '6月', sales: 67000, orders: 234 },
  ];

  const topProducts = [
    { name: 'iPhone 15 Pro', sales: 1250, revenue: 44975000 },
    { name: 'MacBook Air M3', sales: 890, revenue: 32841000 },
    { name: 'AirPods Pro', sales: 2340, revenue: 17526600 },
    { name: 'iPad Pro', sales: 567, revenue: 16387300 },
    { name: 'Apple Watch', sales: 1120, revenue: 14448000 },
  ];

  return (
    <div className="p-6 bg-app-primary min-h-screen transition-all duration-300">
      <h2 className="text-2xl font-bold text-app-primary mb-6 transition-all duration-300">數據分析</h2>
      
      {/* 關鍵指標 */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
          <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">總收入</h3>
          <p className="text-2xl font-bold text-gray-900 dark:text-white">NT$1,234,567</p>
          <p className="text-sm text-green-600">+15.3% 較上月</p>
        </div>
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
          <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">平均訂單價值</h3>
          <p className="text-2xl font-bold text-gray-900 dark:text-white">NT$2,456</p>
          <p className="text-sm text-green-600">+8.2% 較上月</p>
        </div>
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
          <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">轉換率</h3>
          <p className="text-2xl font-bold text-gray-900 dark:text-white">3.24%</p>
          <p className="text-sm text-red-600">-0.5% 較上月</p>
        </div>
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
          <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">客戶滿意度</h3>
          <p className="text-2xl font-bold text-gray-900 dark:text-white">4.8/5</p>
          <p className="text-sm text-green-600">+0.2 較上月</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* 銷售趨勢圖 */}
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">銷售趨勢</h3>
          <div className="h-64 flex items-end justify-between bg-gray-50 dark:bg-gray-700 rounded p-4">
            {salesData.map((data, index) => (
              <div key={index} className="flex flex-col items-center">
                <div 
                  className="bg-blue-500 rounded-t w-8 mb-2"
                  style={{ height: `${(data.sales / 70000) * 200}px` }}
                ></div>
                <span className="text-xs text-gray-600 dark:text-gray-400">{data.month}</span>
                <span className="text-xs text-gray-500 dark:text-gray-500">NT${(data.sales / 1000).toFixed(0)}k</span>
              </div>
            ))}
          </div>
        </div>

        {/* 訂單狀態分布 */}
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">訂單狀態分布</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600 dark:text-gray-400">已完成</span>
              <div className="flex items-center">
                <div className="w-32 bg-gray-200 dark:bg-gray-700 rounded-full h-2 mr-3">
                  <div className="bg-green-500 h-2 rounded-full" style={{ width: '75%' }}></div>
                </div>
                <span className="text-sm font-medium text-gray-900 dark:text-white">75%</span>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600 dark:text-gray-400">處理中</span>
              <div className="flex items-center">
                <div className="w-32 bg-gray-200 dark:bg-gray-700 rounded-full h-2 mr-3">
                  <div className="bg-blue-500 h-2 rounded-full" style={{ width: '15%' }}></div>
                </div>
                <span className="text-sm font-medium text-gray-900 dark:text-white">15%</span>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600 dark:text-gray-400">待付款</span>
              <div className="flex items-center">
                <div className="w-32 bg-gray-200 dark:bg-gray-700 rounded-full h-2 mr-3">
                  <div className="bg-yellow-500 h-2 rounded-full" style={{ width: '7%' }}></div>
                </div>
                <span className="text-sm font-medium text-gray-900 dark:text-white">7%</span>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600 dark:text-gray-400">已取消</span>
              <div className="flex items-center">
                <div className="w-32 bg-gray-200 dark:bg-gray-700 rounded-full h-2 mr-3">
                  <div className="bg-red-500 h-2 rounded-full" style={{ width: '3%' }}></div>
                </div>
                <span className="text-sm font-medium text-gray-900 dark:text-white">3%</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 熱銷商品 */}
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
        <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">熱銷商品排行</h3>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200 dark:border-gray-700">
                <th className="text-left py-3 text-sm font-medium text-gray-500 dark:text-gray-400">排名</th>
                <th className="text-left py-3 text-sm font-medium text-gray-500 dark:text-gray-400">商品名稱</th>
                <th className="text-left py-3 text-sm font-medium text-gray-500 dark:text-gray-400">銷售數量</th>
                <th className="text-left py-3 text-sm font-medium text-gray-500 dark:text-gray-400">銷售金額</th>
                <th className="text-left py-3 text-sm font-medium text-gray-500 dark:text-gray-400">佔比</th>
              </tr>
            </thead>
            <tbody>
              {topProducts.map((product, index) => (
                <tr key={index} className="border-b border-gray-100 dark:border-gray-700">
                  <td className="py-3">
                    <span className={`inline-flex items-center justify-center w-6 h-6 rounded-full text-xs font-medium ${
                      index === 0 ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300' :
                      index === 1 ? 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300' :
                      index === 2 ? 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-300' :
                      'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300'
                    }`}>
                      {index + 1}
                    </span>
                  </td>
                  <td className="py-3 text-sm font-medium text-gray-900 dark:text-white">{product.name}</td>
                  <td className="py-3 text-sm text-gray-500 dark:text-gray-400">{product.sales.toLocaleString()}</td>
                  <td className="py-3 text-sm text-gray-900 dark:text-white">NT${product.revenue.toLocaleString()}</td>
                  <td className="py-3">
                    <div className="flex items-center">
                      <div className="w-16 bg-gray-200 dark:bg-gray-700 rounded-full h-2 mr-2">
                        <div 
                          className="bg-blue-500 h-2 rounded-full" 
                          style={{ width: `${(product.revenue / 45000000) * 100}%` }}
                        ></div>
                      </div>
                      <span className="text-xs text-gray-500 dark:text-gray-400">
                        {((product.revenue / 45000000) * 100).toFixed(1)}%
                      </span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}