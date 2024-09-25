import './App.css'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ExpenseForm from './Components/ExpenseForm/ExpenseForm'
import ExpenseList from './Components/ExpenseList/ExpenseList'
import GlobalStyles from './GlobalStyles/GlobalStyles'
import { ExpenseProvider } from './Context/ExpenseContext'


function App() {

  return (
    <>
    <ExpenseProvider>
      <GlobalStyles />
        <Routes>
          <Route path="/" element={<ExpenseForm />} />
          <Route path="/list" element={<ExpenseList />} />
        </Routes>
    </ExpenseProvider>
    </>
  )
}

export default App
