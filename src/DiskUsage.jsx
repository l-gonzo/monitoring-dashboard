import React, { useState, useEffect } from "react";
import Plot from "react-plotly.js";
import axios from 'axios';


export const DiskUsage = (diskUsage) => {

    return (
        <div>
            <h1>Memory Usage</h1>
            {/* Disk Usage Plot */}
            <Plot
                data={[
                    {
                        x: diskUsage.diskUsage.x,
                        y: diskUsage.diskUsage.y,
                        type: 'scatter',
                        mode: 'lines+points',
                        marker: { color: 'green' },
                    },
                ]}
                layout={{ width: 1000, height: 600 }}
                />
        </div>
    );
};