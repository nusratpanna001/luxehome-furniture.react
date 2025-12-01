import { useEffect, useState } from 'react';
import { mockService } from '../lib/mockData';

function AdminCategoriesPage() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    mockService.categories?.list?.().then(res => {
      setCategories(res.data);
      setLoading(false);
    });
  }, []);

    return (
      <div className="p-6">
        <h1 className="text-2xl font-bold mb-6">Categories (Admin)</h1>
        <CategoryList categories={categories} loading={loading} />
      </div>
    );

  function CategoryList({ categories, loading }) {
    return (
      <div className="bg-white rounded-lg shadow p-6">
        {loading ? (
          <p>Loading...</p>
        ) : categories.length === 0 ? (
          <p>No categories found.</p>
        ) : (
          <table className="min-w-full divide-y divide-gray-200">
            <thead>
              <tr>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">#</th>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Category Name</th>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {categories.map((cat, idx) => (
                <tr key={idx}>
                  <td className="px-4 py-2">{idx + 1}</td>
                  <td className="px-4 py-2 font-semibold">{cat.name || cat}</td>
                  <td className="px-4 py-2">
                    <button className="text-blue-600 hover:underline mr-2">Edit</button>
                    <button className="text-red-600 hover:underline">Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    );
}

}

export default AdminCategoriesPage;