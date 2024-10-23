import React, { useState, useEffect } from "react";
import Plot from "react-plotly.js";
import axios from 'axios';


export const DiskUsage = (diskUsage) => {

    return (
        <div style={{
            backgroundColor: '#ffffff',
            padding: '20px',
            borderRadius: '12px',
            boxShadow: '4px 4px 10px rgba(0, 0, 0, 0.1)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
        }}>
            <h2 style={{ color: '#333', marginBottom: '20px', fontSize: '1.8rem' }}>Disk Usage</h2>
            <Plot
                style={{ width: '100%', height: '65vh' }}
                data={[
                    {
                        x: diskUsage.diskUsage.x.slice(-15),
                        y: diskUsage.diskUsage.y.slice(-15),
                        type: 'scatter',
                        mode: 'lines+points',
                        marker: { color: '#1e90ff' }, 
                    },
                ]}
                layout={{
                    yaxis: { range: [0, 100], title: 'Percentage' },
                    xaxis: { title: 'Time', },
                    margin: { t: 0, b: 30 },
                    plot_bgcolor: '#f9f9f9',
                    paper_bgcolor: '#ffffff',
                }}
            />
        </div>
    );
};