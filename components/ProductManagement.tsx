'use client';

import { useState } from 'react';

interface Product {
    id: number;
    name: string;
    category: string;
    price: number;
    stock: number;
    status: string;
    description?: string;
    image?: string;
}

export default function ProductManagement() {
    const [products, setProducts] = useState<Product[]>([
        { id: 1, name: 'iPhone 15 Pro', category: '手機', price: 35999, stock: 50, status: '上架' },
        { id: 2, name: 'MacBook Air M3', category: '筆電', price: 36900, stock: 25, status: '上架' },
        { id: 3, name: 'AirPods Pro', category: '耳機', price: 7490, stock: 100, status: '上架' },
        { id: 4, name: 'iPad Pro', category: '平板', price: 28900, stock: 0, status: '缺貨' },
        { id: 5, name: 'Apple Watch', category: '手錶', price: 12900, stock: 75, status: '上架' },
    ]);

    const [showModal, setShowModal] = useState(false);
    const [editingProduct, setEditingProduct] = useState<Product | null>(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [categoryFilter, setCategoryFilter] = useState('');
    const [statusFilter, setStatusFilter] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(10);
    const [formData, setFormData] = useState({
        name: '',
        category: '',
        price: '',
        stock: '',
        status: '上架',
        description: '',
    });

    const categories = ['手機', '筆電', '耳機', '平板', '手錶', '配件'];

    const filteredProducts = products.filter((product) => {
        const matchesSearch =
            product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            product.category.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesCategory = categoryFilter === '' || product.category === categoryFilter;
        const matchesStatus = statusFilter === '' || product.status === statusFilter;
        return matchesSearch && matchesCategory && matchesStatus;
    });

    // 分頁邏輯
    const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const currentProducts = filteredProducts.slice(startIndex, endIndex);

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
        setEditingProduct(null);
        setFormData({
            name: '',
            category: '',
            price: '',
            stock: '',
            status: '上架',
            description: '',
        });
        setShowModal(true);
    };

    const handleEdit = (product: Product) => {
        setEditingProduct(product);
        setFormData({
            name: product.name,
            category: product.category,
            price: product.price.toString(),
            stock: product.stock.toString(),
            status: product.status,
            description: product.description || '',
        });
        setShowModal(true);
    };

    const handleDelete = (id: number) => {
        if (confirm('確定要刪除此商品嗎？')) {
            setProducts(products.filter((product) => product.id !== id));
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (editingProduct) {
            // 編輯現有商品
            setProducts(
                products.map((product) =>
                    product.id === editingProduct.id
                        ? {
                              ...product,
                              name: formData.name,
                              category: formData.category,
                              price: parseInt(formData.price),
                              stock: parseInt(formData.stock),
                              status: formData.status,
                              description: formData.description,
                          }
                        : product
                )
            );
        } else {
            // 新增商品
            const newProduct: Product = {
                id: Math.max(...products.map((p) => p.id)) + 1,
                name: formData.name,
                category: formData.category,
                price: parseInt(formData.price),
                stock: parseInt(formData.stock),
                status: formData.status,
                description: formData.description,
            };
            setProducts([...products, newProduct]);
        }

        setShowModal(false);
    };

    return (
        <div className="p-6 bg-app-primary min-h-screen transition-all duration-300">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-app-primary transition-all duration-300">商品管理</h2>
                <button
                    onClick={handleAdd}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors"
                >
                    + 新增商品
                </button>
            </div>

            {/* 搜尋和篩選 */}
            <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md mb-6">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <input
                        type="text"
                        placeholder="搜尋商品名稱或分類..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                    />
                    <select
                        value={categoryFilter}
                        onChange={(e) => setCategoryFilter(e.target.value)}
                        className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                    >
                        <option value="">所有分類</option>
                        {categories.map((category) => (
                            <option key={category} value={category}>
                                {category}
                            </option>
                        ))}
                    </select>
                    <select
                        value={statusFilter}
                        onChange={(e) => setStatusFilter(e.target.value)}
                        className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                    >
                        <option value="">所有狀態</option>
                        <option value="上架">上架</option>
                        <option value="下架">下架</option>
                        <option value="缺貨">缺貨</option>
                    </select>
                    <button
                        onClick={() => {
                            setSearchTerm('');
                            setCategoryFilter('');
                            setStatusFilter('');
                            setCurrentPage(1);
                        }}
                        className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-lg transition-colors"
                    >
                        清除篩選
                    </button>
                </div>
            </div>

            {/* 商品列表 */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead className="bg-gray-50 dark:bg-gray-700">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                                    商品
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                                    分類
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                                    價格
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                                    庫存
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                                    狀態
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                                    操作
                                </th>
                            </tr>
                        </thead>
                        <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                            {currentProducts.map((product) => (
                                <tr key={product.id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="flex items-center">
                                            <div className="h-10 w-10 bg-gray-200 dark:bg-gray-600 rounded-lg mr-3"></div>
                                            <div className="text-sm font-medium text-gray-900 dark:text-white">
                                                {product.name}
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">
                                        {product.category}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                                        NT${product.price.toLocaleString()}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">
                                        {product.stock}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <span
                                            className={`px-2 py-1 text-xs rounded-full ${
                                                product.status === '上架'
                                                    ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300'
                                                    : product.status === '缺貨'
                                                    ? 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300'
                                                    : 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300'
                                            }`}
                                        >
                                            {product.status}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                        <button
                                            onClick={() => handleEdit(product)}
                                            className="text-blue-600 hover:text-blue-900 dark:text-blue-400 dark:hover:text-blue-300 mr-3"
                                        >
                                            編輯
                                        </button>
                                        <button
                                            onClick={() => handleDelete(product.id)}
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
                    顯示 {startIndex + 1}-{Math.min(endIndex, filteredProducts.length)} 筆，共 {filteredProducts.length} 筆商品
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
                    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-xl w-full max-w-md max-h-[90vh] overflow-y-auto">
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                            {editingProduct ? '編輯商品' : '新增商品'}
                        </h3>
                        <form onSubmit={handleSubmit}>
                            <div className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                        商品名稱
                                    </label>
                                    <input
                                        type="text"
                                        required
                                        value={formData.name}
                                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                        分類
                                    </label>
                                    <select
                                        required
                                        value={formData.category}
                                        onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                                    >
                                        <option value="">請選擇分類</option>
                                        {categories.map((category) => (
                                            <option key={category} value={category}>
                                                {category}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                        價格 (NT$)
                                    </label>
                                    <input
                                        type="number"
                                        required
                                        min="0"
                                        value={formData.price}
                                        onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                        庫存數量
                                    </label>
                                    <input
                                        type="number"
                                        required
                                        min="0"
                                        value={formData.stock}
                                        onChange={(e) => setFormData({ ...formData, stock: e.target.value })}
                                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                        狀態
                                    </label>
                                    <select
                                        value={formData.status}
                                        onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                                    >
                                        <option value="上架">上架</option>
                                        <option value="下架">下架</option>
                                        <option value="缺貨">缺貨</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                        商品描述
                                    </label>
                                    <textarea
                                        rows={3}
                                        value={formData.description}
                                        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                                        placeholder="請輸入商品描述..."
                                    />
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
                                    {editingProduct ? '更新' : '新增'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}
