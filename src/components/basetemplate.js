// src/components/BaseTemplate.js
import React from 'react';
import ContractForm from './ContractForm'; // Ensure this matches the filename and path
import './basetemplate.css';

const BaseTemplate = () => {
    return (
        <div className="base-template-container">
            <header className="header">
                <h1>Contract Generator</h1>
            </header>
            <main className="main-content">
                <ContractForm />
            </main>
            <footer className="footer">
                <p>&copy; 2024 My Company</p>
            </footer>
        </div>
    );

};

export default BaseTemplate;
