import { Routes, Route } from 'react-router-dom';
import AppHeader from './components/header/AppHeader'
import Enter from './pages/enter/Enter';
import Registration from './pages/registration/Registration';
import MainConstructor from './pages/mainconstructor/MainConstructor';
import ForgotPass from './pages/forgotpassword/ForgotPass';
import ResetPass from './pages/resetpassword/ResetPass';
import Account from './UI/account/Account';
import Orders from './pages/orders/Orders';
import { useTypedDispatch, useTypedSelector } from './hooks/useTypedSelector';
import { useEffect } from 'react';
import { checkToken } from './store/auth/authSlice';
function App() {
  const dispatch=useTypedDispatch()
const token=localStorage.getItem('token');
useEffect(()=>{
  console.log('token', token);
  
  token?dispatch(checkToken()):null
},[token])

  return (
    <>
       <Routes>
        <Route path='/' element={<AppHeader />} />
        <Route path='/constructor' element={<MainConstructor />} />
        <Route path='/login' element={<Enter />} />
        <Route path='/register' element={<Registration />} />
        <Route path='/forgot-password' element={<ForgotPass/>} />
        <Route path='/reset-password' element={<ResetPass/>} />
        <Route path= '/profile' element={<Account/>} />
        <Route path= '/profile/orders' element={<Orders/>} />
      </Routes> 
    </>
  )
}

export default App
