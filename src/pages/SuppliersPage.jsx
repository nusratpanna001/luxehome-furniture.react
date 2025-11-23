import { useState, useEffect } from 'react';
import { Plus, Edit, Trash2 } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import Table from '../components/ui/Table';
import Modal from '../components/ui/Modal';
import Input from '../components/ui/Input';
import { useToast } from '../contexts/ToastContext';
import { mockService } from '../lib/mockData';
import { supplierSchema } from '../lib/formSchemas';

function SuppliersPage() {
  const [suppliers, setSuppliers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [editingSupplier, setEditingSupplier] = useState(null);
  const { success, error } = useToast();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: zodResolver(supplierSchema),
  });

  useEffect(() => {
    loadSuppliers();
  }, []);

  const loadSuppliers = async () => {
    setLoading(true);
    try {
      const response = await mockService.suppliers.list();
      setSuppliers(response.data);
    } catch (err) {
      error('Failed to load suppliers');
    } finally {
      setLoading(false);
    }
  };

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      if (editingSupplier) {
        const response = await mockService.suppliers.update(editingSupplier.id, data);
        setSuppliers(suppliers.map((s) => (s.id === editingSupplier.id ? response.data : s)));
        success('Supplier updated successfully');
      } else {
        const response = await mockService.suppliers.create(data);
        setSuppliers([...suppliers, response.data]);
        success('Supplier created successfully');
      }
      handleModalClose();
    } catch (err) {
      error('Failed to save supplier');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (supplier) => {
    if (!confirm(`Are you sure you want to delete "${supplier.name}"?`)) return;

    setLoading(true);
    try {
      await mockService.suppliers.delete(supplier.id);
      setSuppliers(suppliers.filter((s) => s.id !== supplier.id));
      success('Supplier deleted successfully');
    } catch (err) {
      error('Failed to delete supplier');
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (supplier) => {
    setEditingSupplier(supplier);
    reset(supplier);
    setShowModal(true);
  };

  const handleModalClose = () => {
    setShowModal(false);
    setEditingSupplier(null);
    reset({});
  };

  const columns = [
    {
      header: 'Name',
      accessor: 'name',
      render: (row) => <span className="font-semibold">{row.name}</span>,
    },
    {
      header: 'Contact Person',
      accessor: 'contactPerson',
    },
    {
      header: 'Email',
      accessor: 'email',
    },
    {
      header: 'Phone',
      accessor: 'phone',
    },
    {
      header: 'Actions',
      render: (row) => (
        <div className="flex gap-2">
          <Button
            size="sm"
            variant="ghost"
            onClick={() => handleEdit(row)}
            icon={<Edit size={16} />}
          />
          <Button
            size="sm"
            variant="ghost"
            onClick={() => handleDelete(row)}
            icon={<Trash2 size={16} />}
            className="text-red-600 hover:bg-red-50"
          />
        </div>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      <Card
        title="Suppliers Management"
        subtitle="Manage your furniture suppliers"
        actions={
          <Button onClick={() => setShowModal(true)} icon={<Plus size={20} />}>
            Add Supplier
          </Button>
        }
      />

      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <Table columns={columns} data={suppliers} />
      </div>

      <Modal
        isOpen={showModal}
        onClose={handleModalClose}
        title={editingSupplier ? 'Edit Supplier' : 'Add New Supplier'}
        size="lg"
      >
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Input
              label="Supplier Name"
              placeholder="ABC Furniture Co."
              error={errors.name?.message}
              required
              {...register('name')}
            />

            <Input
              label="Contact Person"
              placeholder="John Doe"
              error={errors.contactPerson?.message}
              required
              {...register('contactPerson')}
            />

            <Input
              label="Email"
              type="email"
              placeholder="contact@supplier.com"
              error={errors.email?.message}
              required
              {...register('email')}
            />

            <Input
              label="Phone"
              type="tel"
              placeholder="+880-1700-000000"
              error={errors.phone?.message}
              required
              {...register('phone')}
            />
          </div>

          <div>
            <label className="block text-gray-700 font-semibold mb-2 text-sm">
              Address <span className="text-red-500">*</span>
            </label>
            <textarea
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-600 focus:border-transparent resize-none"
              rows={3}
              placeholder="Enter supplier address"
              {...register('address')}
            />
            {errors.address && (
              <p className="mt-1 text-sm text-red-600">{errors.address.message}</p>
            )}
          </div>

          <div>
            <label className="block text-gray-700 font-semibold mb-2 text-sm">Notes</label>
            <textarea
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-600 focus:border-transparent resize-none"
              rows={2}
              placeholder="Additional notes (optional)"
              {...register('notes')}
            />
          </div>

          <div className="flex justify-end gap-3 pt-4">
            <Button type="button" variant="secondary" onClick={handleModalClose} disabled={loading}>
              Cancel
            </Button>
            <Button type="submit" loading={loading} disabled={loading}>
              {editingSupplier ? 'Update Supplier' : 'Create Supplier'}
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
}

export default SuppliersPage;
