import React from 'react';

const ReactApexChart = React.lazy(() => import('react-apexcharts')); 

export default function Charts() {
  const options = {
    chart: { id: 'basic-bar' },
    xaxis: { categories: [1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998, 1999] }
  };

  const series = [{
    name: 'series-1',
    data: [30, 40, 35, 50, 49, 60, 70, 91, 125]
  }];
  return (
    <React.Suspense fallback={<div>Loading Chart...</div>}>
        <ReactApexChart 
          options={options} 
          series={series} 
          type="bar" 
          height={350} 
        />
      </React.Suspense>
  );
}