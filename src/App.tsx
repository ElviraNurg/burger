import { Routes, Route } from 'react-router-dom';
import Enter from './pages/enter/Enter';
import Registration from './pages/registration/Registration';
import MainConstructor from './pages/mainconstructor/MainConstructor';
import ForgotPass from './pages/forgotpassword/ForgotPass';
import ResetPass from './pages/resetpassword/ResetPass';
import Orders from './pages/orders/Orders';
import ProtectedRoute from './UI/protectedRoute/ProtectedRoute';
import { useTypedDispatch, useTypedSelector } from './hooks/useTypedSelector';
import { useEffect } from 'react';
import { checkToken } from './store/auth/authSlice';
import Profile from './pages/profile/Profile';
function App() {
  const dispatch=useTypedDispatch();
  const auth=useTypedSelector(store=>store.auth.authUser);
  const user=useTypedSelector(store=>store.auth.user)
const refreshToken=localStorage.getItem('refreshToken');
const accessToken=localStorage.getItem('token');
console.log('auth', auth);
useEffect(()=>{
  refreshToken?dispatch(checkToken(refreshToken)):console.log('no token');
},[user])
/* 
useEffect(()=>{
  
  refreshToken?dispatch(checkToken(refreshToken)):console.log('no token')
},[]) */

  return (
    <>
       <Routes>
        <Route path='/' element={<MainConstructor />} />
        <Route path='/constructor' element={<MainConstructor />} />
        <Route path='/login' element={<Enter />} />
        <Route path='/register' element={<Registration />} />
        <Route path='/forgot-password' element={<ForgotPass/>} />
        <Route path='/reset-password' element={<ResetPass/>} />
        <Route path='/profile' element={<ProtectedRoute element={Profile} auth={auth} />} />
        <Route path= '/profile/orders' element={<ProtectedRoute element={Orders} auth={auth} />} />
      </Routes> 
    </>
  )
}

export default App
