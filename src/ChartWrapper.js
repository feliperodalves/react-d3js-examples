import React, { useEffect, useRef, useState } from 'react';
import D3Chart from './D3Chart-example-02';

const ChartWrapper = ({ gender }) => {
  const chartRef = useRef(null);
  const [chart, setChart] = useState(null);

  useEffect(() => {
    if (!chart) {
      setChart(new D3Chart(chartRef.current));
    } else if (chart.menData) {
      chart.update(gender);
    }
  }, [chart, gender]);

  return <div ref={chartRef}></div>;
};

export default ChartWrapper;
