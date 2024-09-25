import React, { useContext, useState } from 'react';
import { ExpenseContext } from '../../Context/ExpenseContext';
import { useNavigate } from 'react-router-dom';

const ExpenseForm = () => {
    const { addExpense } = useContext(ExpenseContext);
    const navigate = useNavigate();
    const [amount, setAmount] = useState('');
    const [description, setDescription] = useState('');
    const [date, setDate] = useState('');
    const [category, setCategory] = useState('');
    const [paymentMethod, setPaymentMethod] = useState('cash');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (amount && date) {
            addExpense({ amount: parseFloat(amount), description, date, category, paymentMethod });
            clearForm();
            navigate('/list');
        }
    };

    const clearForm = () => {
        setAmount('');
        setDescription('');
        setDate('');
        setCategory('');
        setPaymentMethod('cash');
    };

    return (
        <>
        <h3 className='fw-bold text-center mt-5 mb-4'>𝙴𝚡𝚙𝚎𝚗𝚜𝚎 𝚃𝚛𝚊𝚌𝚔𝚎𝚛</h3>
        <form onSubmit={handleSubmit} className=' border border-light'>
            <input
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="Amount"
                required
            />
            <input
                type="text"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Description"
            />
            <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                required
            />
            <input
                type="text"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                placeholder="Category"
            />
            <select
                value={paymentMethod}
                onChange={(e) => setPaymentMethod(e.target.value)}
            >
                <option value="All">All Methods</option>
                <option value="Credit Card">Credit Card</option>
                <option value="Cash">Cash</option>
                <option value="Bank Transfer">Bank Transfer</option>
            </select>
            <button type="submit">Add Expense</button>
        </form>
        </>
      
    );
};

export default ExpenseForm;
