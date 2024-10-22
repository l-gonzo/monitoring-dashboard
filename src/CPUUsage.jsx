import React, { useState, useEffect } from "react";
import Plot from "react-plotly.js";
import axios from 'axios';

export const CPUUsage = (cpuUsage) => {

  useEffect(() => {
    console.log('useEffect', cpuUsage.cpuUsage);
  }, [cpuUsage]);

  return (
    <div>
      <h1>CPU Usage</h1>
      <Plot
        data={[
          {
            x: cpuUsage.cpuUsage.x,
            y: cpuUsage.cpuUsage.y,
            type: 'scatter',
            mode: 'lines+points',
            marker: { color: 'red' },

          },
        ]}
        layout={{ width: 1000, height: 600 }}
      />
    </div>
  );
};