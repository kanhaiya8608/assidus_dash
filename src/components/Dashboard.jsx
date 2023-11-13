import React, { useState, useEffect } from 'react';
import LineChartDatasetTransition from './LineChart/LineChartDatasetTransition';
import BarChart from './BarChart';

function Dashboard() {
  const [modalOpen, setModalOpen] = useState(false);
  const [chartWidth, setChartWidth] = useState(700); // Initial width
  const BAR_CHART_DATA = [
    { label: "Older", value: 8 },
    { label: "Jan 01-18", value:10 },
    { label: "Jan 09-16", value: 16 },
    { label: "Jan 17-24", value: 9 },
    { label: "Jan 25-31", value: 7 },
    { label: "Present", value: 4},
  ];
  
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
      <LineChartDatasetTransition width={chartWidth} height={400} />
      <LineChartDatasetTransition width={chartWidth} height={400} />
    </div>
  );
}

export default Dashboard;
