import { useEffect, useState } from 'react';
import ProductList from '../components/product/ProductList';
import { mockService } from '../lib/mockData';

function AdminProductsPage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    mockService.products.list().then(res => {
      setProducts(res.data);
      setLoading(false);
    });
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Products (Admin)</h1>
      <ProductList products={products} loading={loading} onEdit={() => {}} onDelete={() => {}} />
    </div>
  );
}

export default AdminProductsPage;
