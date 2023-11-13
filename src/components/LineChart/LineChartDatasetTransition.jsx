import React, { useState, useEffect } from 'react';
import LineChart from './LineChart';

const BUTTONS_HEIGHT = 50;

// Function to generate random data for a specific month and data operation
const generateRandomData = (month, dataOp) => {
  return Array.from({ length: 10 }, (_, index) => ({
    x: index + 1,
    [month]: Math.floor(Math.random() * 100),
    dataOp: Math.floor(Math.random() * 100),
  }));
};

const months = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

const dataop = ['Examine', 'View', 'Project'];


const LineChartDatasetTransition = ({ width, height }) => {
  const [selectedMonth, setSelectedMonth] = useState(months[1]);
  const [selectedDataOp, setSelectedDataOp] = useState(dataop[1]);
  const [data, setData] = useState(generateRandomData(selectedMonth, selectedDataOp));

  const handleMonthChange = (event) => {
    setSelectedMonth(event.target.value);
  };

  const handleDataOpChange = (event) => {
    setSelectedDataOp(event.target.value);
  };

  useEffect(() => {
    setData(generateRandomData(selectedMonth, selectedDataOp));
  }, [selectedMonth, selectedDataOp]);

  return (
    <div width={width} className='rounded-md bg-white'>
      <div className='flex justify-between border-b-2 border-gray-100  p-3'>
      <h1 className='p-3 text-lg font-bold '>Checking account</h1>
      <div className='flex justify-between'>
        <select value={selectedMonth} className='mx-2 w-30 rounded-md p-2 border-2 font-bold border-gray-200' onChange={handleMonthChange}>
          {months.map((month) => (
            <option key={month} value={month}>
              {month}
            </option>
          ))}
        </select>
        <select value={selectedDataOp} onChange={handleDataOpChange} className='mx-2 w-30 rounded-md p-2 border-2 font-bold border-gray-200'>
          {dataop.map((op) => (
            <option key={op} value={op}>
              {op}
            </option>
          ))}
        </select>
      </div>
      </div>
      <LineChart
        width={width}
        height={height - BUTTONS_HEIGHT}
        data={data}
        selectedGroup={selectedMonth}
      />
    </div>
  );
};

export default LineChartDatasetTransition;
