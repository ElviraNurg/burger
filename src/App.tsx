import { Routes, Route } from 'react-router-dom';
import Enter from './pages/enter/Enter';
import Registration from './pages/registration/Registration';
import MainConstructor from './pages/mainconstructor/MainConstructor';
import ForgotPass from './pages/forgotpassword/ForgotPass';
import ResetPass from './pages/resetpassword/ResetPass';
import ProtectedRoute from './UI/protectedRoute/ProtectedRoute';
import { useTypedDispatch, useTypedSelector } from './hooks/useTypedSelector';
import { useEffect } from 'react';
import { getUser } from './store/auth/authSlice';
import { useLocation } from 'react-router-dom';
import Profile from './pages/profile/Profile';
import Feed from './pages/feed/feed';
import ModalOverlay from './components/modaloverlay/ModalOverlay';
import Modal from './components/modal/Modal';
import ContentModal from './UI/contentmodal/ContentModal';
import { fetchIngridients } from './store/action-creators/ingridients';
import { findItem } from './utils/functions/functions';
import { toggleModalActive } from './store/constructor/constroctorSlice';
import { toggleFeedsModal } from './store/feeds/feedsSlice';
import FeedItemDetails from './UI/feedItemDetails/FeedItemDetails';
import Orders from './pages/orders/Orders';
function App() {
  const dispatch = useTypedDispatch();
  const auth = useTypedSelector(store => store.auth.authUser);
  const currentItem = useTypedSelector(store => store.consrtructor.currentItem);
  const modalActive = useTypedSelector(store => store.consrtructor.modalActive);
  const modalFeedsActive = useTypedSelector(store => store.feeds.feedsModal);
  const { data } = useTypedSelector(state => state.ingridients.ingridients);
  const { orderlist } = useTypedSelector(store => store.feeds);
  const accessToken = localStorage.getItem('token');
  const location = useLocation();
  const pathName = location.pathname.split('/')[location.pathname.split('/').length - 1]
  const orderInfo = orderlist.length !== 0 ? findItem(orderlist, pathName) : console.log('No orderList');
 // console.log('orderInfo', orderInfo);
  const item = currentItem ? currentItem : findItem(data, pathName)
  useEffect(() => {
    data.length === 0 && dispatch(fetchIngridients())
  }, [])
  useEffect(() => {
    accessToken ? dispatch(getUser(accessToken)) : console.log('no token');
  }, [])

  return (
    <>
      <Routes>
        <Route path='/' element={<MainConstructor />} />
        <Route path='/constructor' element={<MainConstructor />} />
        <Route path='/login' element={<Enter />} />
        <Route path='/register' element={<Registration />} />
        <Route path='/forgot-password' element={<ForgotPass />} />
        <Route path='/reset-password' element={<ResetPass />} />
        <Route path='/profile' element={<ProtectedRoute element={Profile} auth={auth} />} />
        <Route path='/profile/orders' element={<ProtectedRoute element={Orders} auth={auth} />} />
        <Route path='/feed' element={<Feed />} />


        <Route path={`/ingredients/:id`} element={
          <ModalOverlay active={currentItem ? modalActive : true} setActive={toggleModalActive} parent='/' >
            <Modal Children={<ContentModal currentItem={item} setActive={toggleModalActive} />} />
          </ModalOverlay>}>
        </Route>
        {/* <Route path={currentItem ? `/ingredients/${currentItem._id}` : `/ingredients/${pathName}`} element={
          <ModalOverlay active={currentItem?modalActive:true} setActive={toggleModalActive} >
            <Modal Children={<ContentModal currentItem={item?item:null} setActive={toggleModalActive} />} />
          </ModalOverlay>}>
        </Route> */}
        <Route path={`/feed/:id`} element={
          <ModalOverlay active={orderInfo ? modalFeedsActive : true} setActive={toggleFeedsModal} parent='/feed' >
            <Modal Children={<FeedItemDetails currentOrder={orderInfo} setActive={toggleFeedsModal} />} />
          </ModalOverlay>}>
        </Route>
      </Routes>
    </>
  )


}

export default App
