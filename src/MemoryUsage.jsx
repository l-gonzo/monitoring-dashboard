import React, { useState, useEffect } from "react";
import Plot from "react-plotly.js";
import axios from 'axios';

export const MemoryUsage = (memoryUsage) => {


    return (
        <div>
            <h1>Memory Usage</h1>
            <Plot
                data={[
                    {
                        x: memoryUsage.memoryUsage.x,
                        y: memoryUsage  .memoryUsage.y,
                        type: 'scatter',
                        mode: 'lines+points',
                        marker: { color: 'blue' },
                    },
                ]}
                layout={{ width: 1000, height: 600 }}
                />
        </div>
    );
};