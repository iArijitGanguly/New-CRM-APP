import { Route, Routes } from 'react-router-dom';

import Login from '../pages/auth/Login';
import Signup from '../pages/auth/Signup';

const MainRouter: React.FC = () => {
  return(
    <Routes>
      <Route path='/signin' element={<Login />} />
      <Route path='/signup' element={<Signup />} />
    </Routes>
  );
};

export default MainRouter;