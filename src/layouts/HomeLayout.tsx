import { useEffect } from 'react';
import { RiMenu2Line } from 'react-icons/ri';
import { TypedUseSelectorHook, useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';

import { logout } from '../redux/slices/AuthSlice';
import { AppDispatch, RootState } from '../redux/store';

interface Props {
  children: React.ReactNode
}

const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector;

const HomeLayout: React.FC<Props> = ({ children }) => {
  const authState = useTypedSelector((state) => state.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();

  function onLogout() {
    dispatch(logout());
    navigate('/signin');
  }

  useEffect(() => {
    if(!authState.isLoggedIn) navigate('/signin');
  }, []);
  return (
    <div className="min-h-[90vh]">
      <div className="drawer w-0 absolute mt-2 ">
        <input id="my-drawer" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content">
          <label htmlFor="my-drawer" className="drawer-button">
            <RiMenu2Line size={'30px'} className='ml-3 mt-2 cursor-pointer' />
          </label>
        </div>
        <div className="drawer-side">
          <label htmlFor="my-drawer" aria-label="close sidebar" className="drawer-overlay"></label>
          <ul className="menu bg-base-200 text-base-content min-h-full w-80 p-4">
            <li><a>View All Tickets</a></li>
            <li><a>Dashboard</a></li>
            <li className='absolute bottom-8 w-3/4'>
              <div className='w-full flex justify-center items-center'>
                { !authState.isLoggedIn ? (
                  <>
                    <Link to='/signin'><button className='btn btn-primary'>Sign In</button></Link>
                    <Link to='/signup'><button className='btn-secondary btn'>Sign Up</button></Link>
                  </>
                ) : (
                  <>
                    <button onClick={onLogout} className='btn btn-primary'>Sign Out </button>
                    <button className='btn-secondary btn'>Profile</button>
                  </>
                ) }
              </div>
            </li>
          </ul>
        </div>
      </div>

      <div className='flex items-start justify-center'>
        <div className='w-3/5'>
          { children }
        </div>
      </div>
    </div>
  );
};

export default HomeLayout;