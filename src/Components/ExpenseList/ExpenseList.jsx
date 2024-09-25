import React, { useContext, useState, useEffect } from 'react';
import { ExpenseContext } from '../../Context/ExpenseContext';
import { Bar } from 'react-chartjs-2';
import { useNavigate } from 'react-router-dom';

import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);



const ExpenseList = () => {
    const { expenses, removeExpense, updateExpense } = useContext(ExpenseContext);
    const [editingExpenseId, setEditingExpenseId] = useState(null);
    const [editedExpense, setEditedExpense] = useState({});
    const [searchTerm, setSearchTerm] = useState('');
    const [sortOrder, setSortOrder] = useState('asc');
    const [currentPage, setCurrentPage] = useState(1);
    const [paymentMethod, setPaymentMethod] = useState('All');
    const [showChart, setShowChart] = useState(false); 
    const navigate = useNavigate();


    const expensesPerPage = 5;

    const filteredExpenses = expenses
        .filter(expense =>
            expense.category.toLowerCase().includes(searchTerm.toLowerCase()) &&
            (paymentMethod === 'All' || expense.paymentMethod === paymentMethod)
        )
        .sort((a, b) => {
            const amountA = parseFloat(a.amount);
            const amountB = parseFloat(b.amount);
            return sortOrder === 'asc' ? amountA - amountB : amountB - amountA;
        });

    const indexOfLastExpense = currentPage * expensesPerPage;
    const indexOfFirstExpense = indexOfLastExpense - expensesPerPage;
    const currentExpenses = filteredExpenses.slice(indexOfFirstExpense, indexOfLastExpense);
    const totalPages = Math.ceil(filteredExpenses.length / expensesPerPage);

    const handleEditClick = (expense) => {
        setEditingExpenseId(expense.id);
        setEditedExpense(expense);
    };

    const handleSaveClick = (id) => {
        if (updateExpense) {
            updateExpense({ id, ...editedExpense });
        }
        setEditingExpenseId(null);
        setEditedExpense({});
    };

    const handleCancelClick = () => {
        setEditingExpenseId(null);
        setEditedExpense({});
    };

    useEffect(() => {
        setCurrentPage(1);
    }, [filteredExpenses.length, sortOrder, searchTerm, paymentMethod]);

    const expenseCategories = expenses.reduce((acc, expense) => {
        acc[expense.category] = (acc[expense.category] || 0) + expense.amount;
        return acc;
    }, {});

    const chartData = {
        labels: Object.keys(expenseCategories),
        datasets: [
            {
                label: 'Expenses by Category',
                data: Object.values(expenseCategories),
                backgroundColor: '#ae6ec5',
            },
        ],
    };

    return (

        <div>
            <h3 className='fw-bold text-center mt-5 mb-5'>𝙴𝚡𝚙𝚎𝚗𝚜𝚎 𝙻𝚒𝚜𝚝
            </h3>

            <input
                type="text"
                placeholder="Search by Category"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className='ms-5 w-50 me-4'
            />
            <select value={sortOrder} onChange={(e) => setSortOrder(e.target.value)} className='me-4'>
                <option value="asc">Amount Ascending</option>
                <option value="desc">Amount Descending</option>
            </select>
            <select value={paymentMethod} onChange={(e) => setPaymentMethod(e.target.value)} className='me-4'>
                <option value="All">All Methods</option>
                <option value="Credit Card">Credit Card</option>
                <option value="Cash">Cash</option>
                <option value="Bank Transfer">Bank Transfer</option>
            </select>
            <button onClick={() => setShowChart(!showChart)}>
                {showChart ? 'Hide Chart' : 'Show Chart'}
            </button>
            <button className='ms-4' onClick={() => navigate("/")}>
                Reverse Form
            </button>
            <table>
                <thead>
                    <tr>
                        <th>Amount</th>
                        <th>Description</th>
                        <th>Date</th>
                        <th>Category</th>
                        <th>Payment Method</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {currentExpenses.map((expense) => (
                        <tr key={expense.id}>
                            {editingExpenseId === expense.id ? (
                                <>
                                    <td>
                                        <input
                                            type="number"
                                            value={editedExpense.amount}
                                            onChange={(e) => setEditedExpense({ ...editedExpense, amount: e.target.value })}
                                        />
                                    </td>
                                    <td>
                                        <input
                                            value={editedExpense.description}
                                            onChange={(e) => setEditedExpense({ ...editedExpense, description: e.target.value })}
                                        />
                                    </td>
                                    <td>
                                        <input
                                            type="date"
                                            value={editedExpense.date}
                                            onChange={(e) => setEditedExpense({ ...editedExpense, date: e.target.value })}
                                        />
                                    </td>
                                    <td>
                                        <input
                                            value={editedExpense.category}
                                            onChange={(e) => setEditedExpense({ ...editedExpense, category: e.target.value })}
                                        />
                                    </td>
                                    <td>
                                        <input
                                            value={editedExpense.paymentMethod}
                                            onChange={(e) => setEditedExpense({ ...editedExpense, paymentMethod: e.target.value })}
                                        />
                                    </td>
                                    <td>
                                        <button onClick={() => handleSaveClick(expense.id)}>Save</button>
                                        <button onClick={handleCancelClick}>Cancel</button>
                                    </td>
                                </>
                            ) : (
                                <>
                                    <td>{expense.amount}</td>
                                    <td>{expense.description}</td>
                                    <td>{expense.date}</td>
                                    <td>{expense.category}</td>
                                    <td>{expense.paymentMethod}</td>
                                    <td>
                                        <button onClick={() => handleEditClick(expense)} className='me-4'>Edit</button>
                                        <button onClick={() => removeExpense(expense.id)}>Delete</button>
                                    </td>
                                </>
                            )}
                        </tr>
                    ))}
                </tbody>
            </table>

            <div>
                <button disabled={currentPage === 1} onClick={() => setCurrentPage(currentPage - 1)}>
                    Previous
                </button>
                <span className='text-light'> Page {currentPage} of {totalPages} </span>
                <button disabled={currentPage === totalPages} onClick={() => setCurrentPage(currentPage + 1)}>
                    Next
                </button>
            </div>

            {showChart && (
    <div style={{ marginTop: '30px', height: '400px' }} className='mt-5 mb-5'>
        <Bar
            data={chartData}
            options={{
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        labels: {
                            color: '#fff', 
                        },
                    },
                    tooltip: {
                        bodyColor: '#fff',
                    },
                },
                scales: {
                    x: {
                        ticks: {
                            color: '#fff', 
                        },
                    },
                    y: {
                        ticks: {
                            color: '#fff',
                        },
                    },
                },
            }}
        />
    </div>
)}

        </div>
    );
};

export default ExpenseList;
