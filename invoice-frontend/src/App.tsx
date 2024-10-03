import './App.css'
import Dashboard from './pages/Dashboard'
import Error from './pages/Error'
import Login from './pages/Login'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { useSelector } from 'react-redux';

function App() {

  const auth = useSelector((state: any) => state.auth)

  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Login/>} />
          {auth.userToken ? (<Route path="/invoices" element={<Dashboard />}/>) : (<Route path="/invoices" element={<Error />}/>)}
        </Routes>
      </Router>
    </>
  )
}

export default App
