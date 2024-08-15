// src/components/ReportGeneration.tsx
import React, { useState } from 'react';
import axios from 'axios';
import { Button, DatePicker, notification } from 'antd';
import dayjs from 'dayjs';

const ReportGeneration = () => {
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  const generateReport = async () => {
    try {
      if (!startDate || !endDate) {
        notification.error({ message: 'Please select both start and end dates.' });
        return;
      }

      const response = await axios.get('/api/reports', {
        params: {
          startDate: dayjs(startDate).format('YYYY-MM-DD'),
          endDate: dayjs(endDate).format('YYYY-MM-DD'),
        },
      });

      // Handle report generation logic here
      console.log('Report data:', response.data);
      notification.success({ message: 'Report generated successfully!' });
    } catch (error) {
      console.error('Error generating report:', error);
      notification.error({ message: 'Failed to generate report' });
    }
  };

  return (
    <div>
      <DatePicker onChange={(date) => setStartDate(date)} placeholder="Start Date" style={{ marginRight: 8 }} />
      <DatePicker onChange={(date) => setEndDate(date)} placeholder="End Date" />
      <Button type="primary" onClick={generateReport} style={{ marginLeft: 16 }}>
        Generate Report
      </Button>
    </div>
  );
};

export default ReportGeneration;
