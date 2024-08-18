import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Button, message, Form } from 'antd';
import ModalForm from '../DashboardComponent/ModalForm';
import DataTable from '../DashboardComponent/DataTable';


const QuotesPage = () => {
  const [quotes, setQuotes] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingQuote, setEditingQuote] = useState(null);
  const [form] = Form.useForm();

  useEffect(() => {
    fetchQuotes();
  }, []);

  const fetchQuotes = async () => {
    try {
      const { data } = await axios.get('https://giyan-udoye.vercel.app/api/v1/quotes');
      setQuotes(data);
    } catch (error) {
      message.error('Failed to fetch quotes');
    }
  };

  const handleAddQuote = () => {
    setIsModalOpen(true);
    setEditingQuote(null);
    form.resetFields();
  };

  const handleEditQuote = (quote) => {
    setIsModalOpen(true);
    setEditingQuote(quote);
    form.setFieldsValue(quote);
  };

  const handleDeleteQuote = async (id) => {
    try {
      await axios.delete(`https://giyan-udoye.vercel.app/api/v1/quotes/${id}`);
      message.success('Quote deleted successfully');
      fetchQuotes();
    } catch (error) {
      message.error('Failed to delete quote');
    }
  };

  const handleSubmit = async (values) => {
    try {
      if (editingQuote) {
        await axios.put(`https://giyan-udoye.vercel.app/api/v1/quotes/${editingQuote._id}`, values);
        message.success('Quote updated successfully');
      } else {
        await axios.post('https://giyan-udoye.vercel.app/api/v1/quotes', values);
        message.success('Quote added successfully');
      }
      fetchQuotes();
      setIsModalOpen(false);
    } catch (error) {
      message.error('Failed to save quote');
    }
  };

  const columns = [
    { title: 'Text', dataIndex: 'text', key: 'text' },
    { title: 'Author', dataIndex: 'author', key: 'author' },
  ];

  const formFields = [
    { name: 'text', label: 'Quote Text', rules: [{ required: true, message: 'Text is required' }] },
    { name: 'author', label: 'Author', rules: [{ required: true, message: 'Author is required' }] },
  ];

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl">Quotes Management</h2>
        <Button type="primary" onClick={handleAddQuote}>Add Quote</Button>
      </div>
      <DataTable columns={columns} data={quotes} onEdit={handleEditQuote} onDelete={handleDeleteQuote} />
      <ModalForm
        visible={isModalOpen}
        onCancel={() => setIsModalOpen(false)}
        onSubmit={handleSubmit}
        form={form}
        fields={formFields}
      />
    </div>
  );
};

export default QuotesPage;
