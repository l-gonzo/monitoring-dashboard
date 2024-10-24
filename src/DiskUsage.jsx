import React from 'react';
import Plot from 'react-plotly.js';

export const DiskUsage = ( diskUsage ) => {
  return (
    <div style={{
      background: 'linear-gradient(145deg, #2c3e50, #333333)',
      padding: '20px',
      borderRadius: '12px',
      boxShadow: '4px 4px 15px rgba(0, 0, 0, 0.5)', 
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    }}>
      <h2 style={{ color: '#ffffff', marginBottom: '20px', fontSize: '1.8rem' }}>Disk Usage</h2>
      <Plot
        style={{ width: '100%', height: '65vh' }}
        data={[
          {
            x: diskUsage.diskUsage.x.slice(-15),
            y: diskUsage.diskUsage.y.slice(-15),
            type: 'scatter',
            mode: 'lines+points',
            marker: { color: '#1e90ff' }, // Color del marcador
          },
        ]}
        layout={{
          yaxis: { range: [0, 102], title: 'Percentage', color: '#ffffff' }, // Color del texto del eje Y
          xaxis: { title: 'Time', color: '#ffffff', range: [0, 14] }, // Color del texto del eje X
          margin: { t: 0, b: 30 },
          plot_bgcolor: '#333333', // Fondo del gráfico
          // redondear las esquinas del gráfico\
          
          paper_bgcolor: 'rgba(0, 0, 0, 0)', // Fondo del papel transparente
          shapes: [
            {
              type: 'rect',
              x0: -0.5,
              x1: 1,
              y0: -0.5,
              y1: 1,
              fillcolor: 'rgba(44, 62, 80, 0.8)', // Color del fondo
              line: {
                width: 0,
              },
              layer: 'below',
              opacity: 1,
              // Aquí se definen las esquinas redondeadas
              path: 'M 0,0 L 1,0 L 1,1 L 0,1 Z',
              transforms: [
                {
                  type: 'translate',
                  x: 0,
                  y: 0,
                },
              ],
            },
          ],

          font: { color: '#ffffff' }, // Color del texto
        }}
      />
    </div>
  );
};
