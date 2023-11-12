import React, { useState, useEffect } from 'react';
import LineChartDatasetTransition from './LineChart/LineChartDatasetTransition';

function Dashboard() {
  const [chartWidth, setChartWidth] = useState(800); // Initial width

  useEffect(() => {
    const handleResize = () => {
      // Adjust the width based on the screen size
      const screenWidth = window.innerWidth;

      // Define your own logic to set width responsively
      if (screenWidth < 600) {
        setChartWidth(screenWidth - 20); // Adjust for padding/margin
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
      <LineChartDatasetTransition width={chartWidth} height={400} />
      <LineChartDatasetTransition width={chartWidth} height={400} />
      <LineChartDatasetTransition width={chartWidth} height={400} />
    </div>
  );
}

export default Dashboard;
