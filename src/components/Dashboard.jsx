import React, { useState, useEffect } from 'react';
import LineChartDatasetTransition from './LineChart/LineChartDatasetTransition';
import BarChart from './BarChart';
import StackedBarplot from './StackedBarPlot';
import Table from './Table/Table';
import BAR_CHART_DATA from '../data/BAR_CHART_DATA'
import bplot from '../data/bplot.json'
import dayjs from "dayjs";

import MOCK_DATA from './Table/MOCK_DATA.json'
function Dashboard() {

  const columns = [
    
        {
          header: "Account",
          accessorKey: "Department",
          
        },
        {
          header: "This month",
          accessorKey: "sales",
          
        },
      
    {
      header: "YTD",
      accessorKey: "ytd",
    
    }  ];

  
  
  const [chartWidth, setChartWidth] = useState(700); // Initial width
  useEffect(() => {
    const handleResize = () => {
      // Adjust the width based on the screen size
      const screenWidth = window.innerWidth;

      // Define your own logic to set width responsively
      if (screenWidth < 600) {
        setChartWidth(screenWidth); // Adjust for padding/margin
      } else if (screenWidth < 1200) {
        setChartWidth(screenWidth * 0.8); // 80% of the screen width
      } else {
        setChartWidth(screenWidth * 0.4 - 20); // 60% of the screen width
      }
    };

    // Set initial width on mount
    handleResize();

    // Add event listener for window resize
    window.addEventListener('resize', handleResize);

    // Cleanup the event listener on component unmount
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []); // Empty dependency array ensures this effect runs only on mount and unmount

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 m-8">
      <LineChartDatasetTransition width={chartWidth} height={400} />
      <BarChart initialData={BAR_CHART_DATA} height={300} width={chartWidth} />
      <StackedBarplot data={bplot} width={chartWidth} height={300} />
      <Table data ={MOCK_DATA} columns={columns}/>
    </div>
  );
}

export default Dashboard;
