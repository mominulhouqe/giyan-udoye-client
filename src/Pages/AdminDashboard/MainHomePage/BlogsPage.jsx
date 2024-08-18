
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Button, message, Form } from 'antd';
import ModalForm from '../DashboardComponent/ModalForm';
import DataTable from '../DashboardComponent/DataTable';

const BlogsPage = () => {
  const [blogs, setBlogs] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingBlog, setEditingBlog] = useState(null);
  const [form] = Form.useForm();

  useEffect(() => {
    fetchBlogs();
  }, []);

  const fetchBlogs = async () => {
    try {
      const { data } = await axios.get('https://giyan-udoye.vercel.app/api/v1/blogs');
      setBlogs(data);
    } catch (error) {
      message.error('Failed to fetch blogs');
    }
  };

  const handleAddBlog = () => {
    setIsModalOpen(true);
    setEditingBlog(null);
    form.resetFields();
  };

  const handleEditBlog = (blog) => {
    setIsModalOpen(true);
    setEditingBlog(blog);
    form.setFieldsValue(blog);
  };

  const handleDeleteBlog = async (id) => {
    try {
      await axios.delete(`https://giyan-udoye.vercel.app/api/v1/blogs/${id}`);
      message.success('Blog deleted successfully');
      fetchBlogs();
    } catch (error) {
      message.error('Failed to delete blog');
    }
  };

  const handleSubmit = async (values) => {
    try {
      if (editingBlog) {
        await axios.put(`https://giyan-udoye.vercel.app/api/v1/blogs/${editingBlog._id}`, values);
        message.success('Blog updated successfully');
      } else {
        await axios.post('https://giyan-udoye.vercel.app/api/v1/blogs', values);
        message.success('Blog added successfully');
      }
      fetchBlogs();
      setIsModalOpen(false);
    } catch (error) {
      message.error('Failed to save blog');
    }
  };

  const columns = [
    { title: 'Title', dataIndex: 'title', key: 'title' },
    { title: 'Author', dataIndex: 'author', key: 'author' },
    { title: 'Category', dataIndex: 'category', key: 'category' },
  ];

  const formFields = [
    { name: 'title', label: 'Title', rules: [{ required: true, message: 'Title is required' }] },
    { name: 'author', label: 'Author', rules: [{ required: true, message: 'Author is required' }] },
    { name: 'category', label: 'Category', rules: [{ required: true, message: 'Category is required' }] },
    { name: 'content', label: 'Content', rules: [{ required: true, message: 'Content is required' }] },
  ];

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl">Blogs Management</h2>
        <Button type="primary" onClick={handleAddBlog}>Add Blog</Button>
      </div>
      <DataTable columns={columns} data={blogs} onEdit={handleEditBlog} onDelete={handleDeleteBlog} />
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

export default BlogsPage;
