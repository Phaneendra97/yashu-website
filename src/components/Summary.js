import React from 'react';
import './Header.css'; // Reusing Header styles for consistency

export const Summary = () => {
    return (
        <div className="summary-section" style={{ padding: '0 24px 20px 24px', display: 'flex', gap: '24px', fontSize: '14px', color: '#172B4D', marginTop: '16px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <strong style={{ color: '#5E6C84' }}>Email:</strong>
                <a href="mailto:yashaswini.phani@gmail.com" style={{ color: '#0052CC', textDecoration: 'none', fontWeight: 500 }}>
                    yashaswini.phani@gmail.com
                </a>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <strong style={{ color: '#5E6C84' }}>LinkedIn:</strong>
                <a href="https://linkedin.com/in/yashaswinimohan" target="_blank" rel="noopener noreferrer" style={{ color: '#0052CC', textDecoration: 'none', fontWeight: 500 }}>
                    linkedin.com/in/yashaswinimohan
                </a>
            </div>
        </div>
    );
};
