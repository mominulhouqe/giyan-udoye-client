import React from 'react';
import { Table, Button } from 'antd';

const DataTable = ({ columns, data, onEdit, onDelete }) => (
  <Table
    columns={[
      ...columns,
      {
        title: 'Actions',
        key: 'actions',
        render: (text, record) => (
          <span>
            <Button type="link" onClick={() => onEdit(record)}>Edit</Button>
            <Button type="link" danger onClick={() => onDelete(record._id)}>Delete</Button>
          </span>
        ),
      },
    ]}
    dataSource={data}
    rowKey="_id"
  />
);

export default DataTable;

