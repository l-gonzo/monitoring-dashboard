import React from "react";

export const Tab = ({ title, percentage, onClick = null }) => {
    return (
        <div
            style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                borderRadius: '12px',
                background: 'linear-gradient(145deg, #333333, #2c3e50)',
                boxShadow: '4px 4px 15px rgba(0, 0, 0, 0.5)',
                padding: '20px',
                margin: '20px',
                width: '20vw',
                height: '19.3vh',
                cursor: 'pointer',
                transition: 'transform 0.2s ease-in-out',
                fontSize: '48px',
                color: 'white',
                textShadow: `
            -1px -1px 0 white,
            1px -1px 0 white,
            -1px 1px 0 white,
            1px 1px 0 white`
            }}
            onClick={onClick}
            onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
            onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
        >
            <h2 style={{ fontSize: '1.5rem', color: '#333' }}>{title}</h2>
            <h3 style={{ fontSize: '2rem', color: '#4caf50' }}>{percentage}%</h3>
        </div>
    );
};
