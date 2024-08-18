import React from 'react';
import { Modal, Form, Input, Button } from 'antd';

const ModalForm = ({ visible, onCancel, onSubmit, form, fields }) => (
  <Modal
    title="Add / Edit Item"
    visible={visible}
    onCancel={onCancel}
    footer={[
      <Button key="cancel" onClick={onCancel}>Cancel</Button>,
      <Button key="submit" type="primary" onClick={() => form.submit()}>Submit</Button>,
    ]}
  >
    <Form layout="vertical" form={form} onFinish={onSubmit}>
      {fields.map((field) => (
        <Form.Item
          key={field.name}
          name={field.name}
          label={field.label}
          rules={field.rules}
        >
          <Input />
        </Form.Item>
      ))}
    </Form>
  </Modal>
);

export default ModalForm;
