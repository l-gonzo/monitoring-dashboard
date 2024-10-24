import React from "react";
import Plot from "react-plotly.js";

export const HistoryResource = (data) => {
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
            <h2 style={{ color: '#ffffff', marginBottom: '20px', fontSize: '1.8rem' }}>{data.typeResource} used</h2>
            <Plot
                style={{ width: '100%', height: '65vh' }}
                data={[
                    {
                        x: data.data.x,
                        y: data.data.y,
                        type: 'scatter',
                        mode: 'lines+points',
                        marker: { color: data.typeResource === 'cpu' ? '#ff6347' : data.typeResource === 'memory' ? '#32cd32' : '#1e90ff' },
                    },
                ]}
                layout={{
                    yaxis: { 
                        range: [0, 102], 
                        title: 'Percentage', 
                        gridcolor: '#444', // Color de las líneas del grid en el eje Y
                        zerolinecolor: '#888' // Color de la línea cero
                    },
                    xaxis: { 
                        title: 'Time', 
                        gridcolor: '#444', // Color de las líneas del grid en el eje X
                    },
                    margin: { t: 0, b: 30 },
                    plot_bgcolor: '#333333', // Fondo del gráfico
                    paper_bgcolor: 'rgba(0, 0, 0, 0)', // Fondo del papel transparente
                    font: { color: '#ffffff' }, // Color del texto
                }}
            />
        </div>
    );
};

