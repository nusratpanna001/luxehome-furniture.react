import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Package, ShoppingCart, DollarSign, AlertTriangle, TrendingUp, Home, Users, FileText, Truck, BarChart3, Settings, User, Phone, Info } from 'lucide-react';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import Card from '../components/ui/Card';
import Badge from '../components/ui/Badge';
import Table from '../components/ui/Table';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';
import Modal from '../components/ui/Modal';
import { mockService } from '../lib/mockData';
import { formatCurrency } from '../lib/utils';
import { CATEGORIES } from '../lib/constants';
import { useAuth } from '../contexts/AuthContext';

function DashboardPage() {
  const { user } = useAuth();
  // Local category management (mock) - hooks must be at the top
  const [categoriesList, setCategoriesList] = useState([]);
  const [showAddCategory, setShowAddCategory] = useState(false);
  const [newCategory, setNewCategory] = useState('');

  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadDashboardData();
  }, []);

  const loadDashboardData = async () => {
    setLoading(true);
    try {
      const response = await mockService.reports.dashboard();
      setDashboardData(response.data);
    } catch (err) {
      console.error('Failed to load dashboard data', err);
    } finally {
      setLoading(false);
    }
  };

  const kpiCards = [
    {
      title: 'Total Revenue',
      value: formatCurrency(dashboardData?.kpis.totalRevenue || 0),
      icon: DollarSign,
      color: 'text-amber-600',
      bgColor: 'bg-amber-100',
    },
    {
      title: 'Total Orders',
      value: dashboardData?.kpis.totalOrders || 0,
      icon: ShoppingCart,
      color: 'text-amber-700',
      bgColor: 'bg-amber-100',
    },
    {
      title: 'Total Products',
      value: dashboardData?.kpis.totalProducts || 0,
      icon: Package,
      color: 'text-amber-600',
      bgColor: 'bg-amber-100',
    },
    {
      title: 'Low Stock Items',
      value: dashboardData?.kpis.lowStockItems || 0,
      icon: AlertTriangle,
      color: 'text-amber-800',
      bgColor: 'bg-amber-100',
    },
  ];

  const topProductsColumns = [
    {
      header: 'Product',
      accessor: 'name',
      render: (row) => <span className="font-medium">{row.name}</span>,
    },
    {
      header: 'Sales',
      accessor: 'sales',
      render: (row) => <Badge variant="info">{row.sales}</Badge>,
    },
    {
      header: 'Revenue',
      render: (row) => <span className="font-semibold text-green-600">{formatCurrency(row.revenue)}</span>,
    },
  ];

  const lowStockColumns = [
    {
      header: 'Product',
      accessor: 'name',
    },
    {
      header: 'Category',
      accessor: 'category',
    },
    {
      header: 'Stock',
      render: (row) => <Badge variant="danger">{row.stock}</Badge>,
    },
  ];

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-96">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-gray-200 border-t-amber-700" />
      </div>
    );
  }

  const adminNavigation = [
    // Core Admin Functions
    { name: 'Categories', path: '/inventory', icon: Package, color: 'bg-gradient-to-r from-amber-500 to-amber-700', description: 'Product categories & inventory' },
    { name: 'Products', path: '/admin/products', icon: Settings, color: 'bg-gradient-to-r from-amber-600 to-amber-800', description: 'Furniture catalog management' },
    { name: 'Orders', path: '/orders', icon: ShoppingCart, color: 'bg-gradient-to-r from-amber-500 to-amber-700', description: 'Manage all customer orders' },
    { name: 'Customers', path: '/customers', icon: Users, color: 'bg-gradient-to-r from-amber-600 to-amber-800', description: 'Customer management' }
  ];

  const handleAddCategory = () => {
    const trimmed = newCategory.trim();
    if (!trimmed) return;
    if (categoriesList.includes(trimmed)) {
      setNewCategory('');
      setShowAddCategory(false);
      return;
    }
    setCategoriesList((prev) => [trimmed, ...prev]);
    setNewCategory('');
    setShowAddCategory(false);
  };

  return (
    <div className="space-y-6">
      {/* Welcome */}
      <div className="bg-gradient-to-r from-amber-600 to-amber-800 text-white rounded-lg shadow-lg p-8">
        <h1 className="text-3xl font-bold mb-2">Admin Dashboard - Welcome back, {user?.name}!</h1>
        <p className="text-amber-100">Manage your furniture business from this admin control panel.</p>
      </div>

      {/* Admin Navigation */}
      <Card title="Admin Control Panel" subtitle="Manage categories, furniture, orders & reports">
        <div className="flex items-center justify-between mb-4">
          <div />
          <div>
            <Button size="sm" onClick={() => setShowAddCategory(true)} className="bg-amber-600 text-white">
              Add Category
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {adminNavigation.map((page, index) => {
            const Icon = page.icon;
            return (
              <Link
                key={index}
                to={page.path}
                className="group flex flex-col items-center p-6 bg-white border border-gray-200 rounded-xl hover:border-amber-300 hover:shadow-lg transition-all duration-300 hover:bg-amber-50"
              >
                <div className={`p-4 rounded-full ${page.color} text-white mb-4 group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
                  <Icon size={28} />
                </div>
                <h3 className="font-bold text-gray-900 text-base text-center mb-2">{page.name}</h3>
                <p className="text-sm text-gray-600 text-center leading-relaxed">{page.description}</p>
              </Link>
            );
          })}
        </div>
        </Card>

        {/* Add Category Modal */}
        <Modal isOpen={showAddCategory} onClose={() => setShowAddCategory(false)} title="Add New Category">
          <div className="space-y-4">
            <Input
              label="Category Name"
              value={newCategory}
              onChange={(e) => setNewCategory(e.target.value)}
              placeholder="e.g. Coffee Table"
            />
            <div className="flex justify-end gap-2">
              <Button size="sm" variant="outline" onClick={() => setShowAddCategory(false)}>Cancel</Button>
              <Button size="sm" onClick={handleAddCategory} className="bg-amber-600 text-white">Add</Button>
            </div>
          </div>
        </Modal>

      {/* Admin Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <div className="text-center">
            <div className="text-2xl font-bold text-amber-600">24</div>
            <div className="text-sm text-gray-600">Pending Orders</div>
          </div>
        </Card>
        <Card>
          <div className="text-center">
            <div className="text-2xl font-bold text-amber-700">156</div>
            <div className="text-sm text-gray-600">Furniture Items</div>
          </div>
        </Card>
        <Card>
          <div className="text-center">
            <div className="text-2xl font-bold text-amber-600">8</div>
            <div className="text-sm text-gray-600">Categories</div>
          </div>
        </Card>
        <Card>
          <div className="text-center">
            <div className="text-2xl font-bold text-amber-800">3</div>
            <div className="text-sm text-gray-600">Low Stock Items</div>
          </div>
        </Card>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {kpiCards.map((kpi, index) => {
          const Icon = kpi.icon;
          return (
            <Card key={index}>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 mb-1">{kpi.title}</p>
                  <p className="text-3xl font-bold text-gray-900">{kpi.value}</p>
                </div>
                <div className={`p-3 rounded-full ${kpi.bgColor}`}>
                  <Icon className={kpi.color} size={24} />
                </div>
              </div>
            </Card>
          );
        })}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Sales Trend */}
        <Card title="Sales Trend" subtitle="Last 30 days">
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={dashboardData?.salesTrend || []}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="sales" stroke="#B45309" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </Card>

        {/* Top Products */}
        <Card title="Top Products" subtitle="Best sellers this month">
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={dashboardData?.topProducts || []}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />``
              <Tooltip />
              <Bar dataKey="sales" fill="#B45309" />
            </BarChart>
          </ResponsiveContainer>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Top Products Table */}
        <Card title="Top Selling Products">
          <Table columns={topProductsColumns} data={dashboardData?.topProducts || []} />
        </Card>

        {/* Low Stock Alert */}
        <Card title="Low Stock Alert">
          <Table columns={lowStockColumns} data={dashboardData?.lowStockProducts || []} />
        </Card>
      </div>
    </div>
  );
}

export default DashboardPage;
