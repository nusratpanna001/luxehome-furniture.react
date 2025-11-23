import { useState, useEffect, useMemo } from 'react';
import { Plus } from 'lucide-react';
import ProductList from '../components/product/ProductList';
import ProductFilters from '../components/product/ProductFilters';
import ProductForm from '../components/product/ProductForm';
import Modal from '../components/ui/Modal';
import Button from '../components/ui/Button';
import Card from '../components/ui/Card';
import { useToast } from '../contexts/ToastContext';
import { mockService } from '../lib/mockData';

function InventoryPage() {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [filters, setFilters] = useState({});
  const { success, error } = useToast();

  useEffect(() => {
    loadProducts();
  }, []);

  useEffect(() => {
    applyFilters();
  }, [products, filters]);

  const loadProducts = async () => {
    setLoading(true);
    try {
      const response = await mockService.products.list();
      setProducts(response.data);
    } catch (err) {
      error('Failed to load products');
    } finally {
      setLoading(false);
    }
  };

  const applyFilters = () => {
    let filtered = [...products];

    if (filters.search) {
      const searchLower = filters.search.toLowerCase();
      filtered = filtered.filter(
        (p) =>
          p.name.toLowerCase().includes(searchLower) ||
          p.category.toLowerCase().includes(searchLower)
      );
    }

    if (filters.category) {
      filtered = filtered.filter((p) => p.category === filters.category);
    }

    if (filters.material) {
      filtered = filtered.filter((p) => p.material === filters.material);
    }

    if (filters.minPrice) {
      filtered = filtered.filter((p) => p.price >= parseFloat(filters.minPrice));
    }

    if (filters.maxPrice) {
      filtered = filtered.filter((p) => p.price <= parseFloat(filters.maxPrice));
    }

    if (filters.inStock) {
      filtered = filtered.filter((p) => p.stock > 0);
    }

    setFilteredProducts(filtered);
  };

  const handleCreate = async (data) => {
    setLoading(true);
    try {
      const response = await mockService.products.create(data);
      setProducts([...products, response.data]);
      success('Product created successfully');
      setShowModal(false);
    } catch (err) {
      error('Failed to create product');
    } finally {
      setLoading(false);
    }
  };

  const handleUpdate = async (data) => {
    setLoading(true);
    try {
      const response = await mockService.products.update(editingProduct.id, data);
      setProducts(products.map((p) => (p.id === editingProduct.id ? response.data : p)));
      success('Product updated successfully');
      setShowModal(false);
      setEditingProduct(null);
    } catch (err) {
      error('Failed to update product');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (product) => {
    if (!confirm(`Are you sure you want to delete "${product.name}"?`)) return;

    setLoading(true);
    try {
      await mockService.products.delete(product.id);
      setProducts(products.filter((p) => p.id !== product.id));
      success('Product deleted successfully');
    } catch (err) {
      error('Failed to delete product');
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (product) => {
    setEditingProduct(product);
    setShowModal(true);
  };

  const handleModalClose = () => {
    setShowModal(false);
    setEditingProduct(null);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <Card
        title="Inventory Management"
        subtitle="Manage your furniture products and stock levels"
        actions={
          <Button onClick={() => setShowModal(true)} icon={<Plus size={20} />}>
            Add Product
          </Button>
        }
      />

      {/* Filters */}
      <ProductFilters onFilterChange={setFilters} />

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <div className="text-center">
            <p className="text-3xl font-bold text-amber-700">{products.length}</p>
            <p className="text-gray-600 mt-1">Total Products</p>
          </div>
        </Card>
        <Card>
          <div className="text-center">
            <p className="text-3xl font-bold text-green-600">
              {products.filter((p) => p.stock > 0).length}
            </p>
            <p className="text-gray-600 mt-1">In Stock</p>
          </div>
        </Card>
        <Card>
          <div className="text-center">
            <p className="text-3xl font-bold text-red-600">
              {products.filter((p) => p.stock < 10).length}
            </p>
            <p className="text-gray-600 mt-1">Low Stock</p>
          </div>
        </Card>
      </div>

      {/* Product List */}
      <ProductList
        products={filteredProducts}
        onEdit={handleEdit}
        onDelete={handleDelete}
        loading={loading}
      />

      {/* Modal */}
      <Modal
        isOpen={showModal}
        onClose={handleModalClose}
        title={editingProduct ? 'Edit Product' : 'Add New Product'}
        size="lg"
      >
        <ProductForm
          initialData={editingProduct}
          onSubmit={editingProduct ? handleUpdate : handleCreate}
          onCancel={handleModalClose}
          loading={loading}
        />
      </Modal>
    </div>
  );
}

export default InventoryPage;
