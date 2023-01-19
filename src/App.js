import { onAuthStateChanged } from 'firebase/auth';
import { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './App.css';
import NavBar from './components/NavBar/NavBar';
import { auth } from './firebase';
import Home from './pages/Home';
import {SET_USER} from './redux/userSlice';
import {getPosts} from './redux/postSlice'
import { LOADING_END, LOADING_START } from './redux/indexSlice';
import Loader from './components/Loader/index';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  const dispatch = useDispatch();
  const shouldRun = useRef(true);
  const {isGlobalLoading} = useSelector(state => state.index);
  
  useEffect(() => {
    const authUser = async () => {
      onAuthStateChanged(auth, (user) => {
          if (user) {
              dispatch(SET_USER({user}));
          } else {
            dispatch(SET_USER({user:null}));
          }
      });
  }

    const runFunc = async  () => {
      if(shouldRun.current) {
        shouldRun.current = false;
        dispatch(LOADING_START())
        await Promise.allSettled([authUser(), 
          dispatch(getPosts())]).then((data) =>  dispatch(LOADING_END())).catch(() => dispatch(LOADING_END()));
      }
    }
    runFunc();
  }, [dispatch]);

  if(isGlobalLoading) {
    return <Loader />;
  }

  return (
    <div className="App">
      <NavBar />
      <Home />
      {/* {isGlobalLoading && <Loader />} */}
      <ToastContainer />
    </div>
  );
}

export default App;
