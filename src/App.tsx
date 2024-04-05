import { Routes, Route } from 'react-router-dom';
import AppHeader from './components/header/AppHeader'
import Enter from './pages/enter/Enter';
import Registration from './pages/registration/Registration';
import MainConstructor from './pages/mainconstructor/MainConstructor';
function App() {


  return (
    <>
       <Routes>
        <Route path='/' element={<AppHeader />} />
        <Route path='/constructor' element={<MainConstructor />} />
        <Route path='/enter' element={<Enter />} />
        <Route path='/registration' element={<Registration />} />
      </Routes> 
    </>
  )
}

export default App
