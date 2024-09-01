// src/components/ContractForm.js
import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import './ContractForm.css';

const ContractForm = () => {
    const formik = useFormik({
        initialValues: {
            farmerName: '',
            buyerName: '',
            date: '',
            amount: '',
            contractDuration: '',
        },
        validationSchema: Yup.object({
            farmerName: Yup.string().required('Required'),
            buyerName: Yup.string().required('Required'),
            date: Yup.date().required('Required'),
            amount: Yup.number().required('Required'),
            contractDuration: Yup.string().required('Required'),
        }),
        onSubmit: values => {
            axios.post('http://localhost:5000/generate-contract', values, { responseType: 'blob' })
                .then(response => {
                    const url = window.URL.createObjectURL(new Blob([response.data]));
                    const link = document.createElement('a');
                    link.href = url;
                    link.setAttribute('download', 'contract.pdf');
                    document.body.appendChild(link);
                    link.click();
                })
                .catch(error => console.error('Error generating contract', error));
        },
    });

    return (
        <form onSubmit={formik.handleSubmit} className="contract-form">
            <label htmlFor="farmerName">Farmer Name</label>
            <input
                id="farmerName"
                name="farmerName"
                type="text"
                onChange={formik.handleChange}
                value={formik.values.farmerName}
            />
            {formik.errors.farmerName ? <div>{formik.errors.farmerName}</div> : null}

            <label htmlFor="buyerName">Buyer Name</label>
            <input
                id="buyerName"
                name="buyerName"
                type="text"
                onChange={formik.handleChange}
                value={formik.values.buyerName}
            />
            {formik.errors.buyerName ? <div>{formik.errors.buyerName}</div> : null}

            <label htmlFor="date">Date</label>
            <input
                id="date"
                name="date"
                type="date"
                onChange={formik.handleChange}
                value={formik.values.date}
            />
            {formik.errors.date ? <div>{formik.errors.date}</div> : null}

            <label htmlFor="amount">Amount</label>
            <input
                id="amount"
                name="amount"
                type="number"
                onChange={formik.handleChange}
                value={formik.values.amount}
            />
            {formik.errors.amount ? <div>{formik.errors.amount}</div> : null}

            <label htmlFor="contractDuration">Contract Duration</label>
            <input
                id="contractDuration"
                name="contractDuration"
                type="text"
                onChange={formik.handleChange}
                value={formik.values.contractDuration}
            />
            {formik.errors.contractDuration ? <div>{formik.errors.contractDuration}</div> : null}

            <button type="submit">Generate Contract</button>
        </form>
    );
};

export default ContractForm;
