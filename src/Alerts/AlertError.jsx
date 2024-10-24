import React from 'react';

const ErrorAlert = ({ message, onClose }) => {
    return (
        <div style={styles.overlay}>
            <div style={styles.alertBox}>
                <div style={styles.header}>
                    <h2 style={styles.title}>Oops, something went wrong!</h2>
                    <button style={styles.closeButton} onClick={onClose}>
                        &times;
                    </button>
                </div>
                <p style={styles.message}>{message}</p>
                <button style={styles.okButton} onClick={onClose}>
                    OK
                </button>
            </div>
        </div>
    );
};

const fadeIn = {
    animation: 'fadeIn 0.5s ease-out',
    '@keyframes fadeIn': {
        '0%': {
            opacity: 0,
            transform: 'scale(0.9)',
        },
        '100%': {
            opacity: 1,
            transform: 'scale(1)',
        },
    },
};

const styles = {
    overlay: {
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        backdropFilter: 'blur(4px)', // Suaviza el fondo
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 1000,
        ...fadeIn, // Aplicando animación de entrada
    },
    alertBox: {
        backgroundColor: '#2c3e50', // Fondo oscuro y elegante
        borderRadius: '15px',
        padding: '30px',
        width: '450px',
        maxWidth: '90%',
        boxShadow: '0 8px 20px rgba(0, 0, 0, 0.4)',
        textAlign: 'center',
        animation: 'slideUp 0.5s ease-out',
        '@keyframes slideUp': {
            '0%': {
                opacity: 0,
                transform: 'translateY(30px)',
            },
            '100%': {
                opacity: 1,
                transform: 'translateY(0)',
            },
        },
    },
    header: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderBottom: '1px solid rgba(255, 255, 255, 0.2)',
        paddingBottom: '10px',
        marginBottom: '20px',
    },
    title: {
        fontSize: '1.8rem',
        color: '#e74c3c',
        margin: 0,
        fontWeight: 'bold',
        letterSpacing: '1px',
        textShadow: '1px 1px 5px rgba(0, 0, 0, 0.2)', // Sutil sombra
    },
    closeButton: {
        fontSize: '1.8rem',
        background: 'none',
        border: 'none',
        cursor: 'pointer',
        color: '#ecf0f1',
        transition: 'color 0.3s ease',
    },
    message: {
        fontSize: '1.2rem',
        color: '#ecf0f1',
        marginBottom: '20px',
        lineHeight: '1.6',
    },
    okButton: {
        padding: '12px 30px',
        backgroundColor: '#e74c3c',
        color: '#fff',
        border: 'none',
        borderRadius: '30px',
        cursor: 'pointer',
        fontSize: '1.1rem',
        fontWeight: '600',
        transition: 'background-color 0.3s ease, transform 0.2s',
        boxShadow: '0 6px 15px rgba(231, 76, 60, 0.5)',
    },
    okButtonHover: {
        ':hover': {
            backgroundColor: '#c0392b',
            transform: 'scale(1.05)',
        },
    },
};

export default ErrorAlert;
