import { ChangeEvent, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { login } from '../../redux/slices/AuthSlice';
import { AppDispatch } from '../../redux/store';
import { LoginData } from '../../types/LoginData';

const Login: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const[loginData, setLoginData] = useState<LoginData>({
    email: '',
    password: ''
  });

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setLoginData((prevData) => {
      return {
        ...prevData,
        [name]: value
      };
    });
  };

  const restLoginState = () => {
    setLoginData({
      email: '',
      password: ''
    });
  };

  const handleSubmit = async () => {
    if(!loginData.email || !loginData.password) return;
    const response = await dispatch(login(loginData));
    if(response.payload) navigate('/');
    else restLoginState();
  };

  return(
    <div className="grid place-items-center h-screen">
      <div className="card w-96 bg-primary text-primary-content">
        <div className="card-body">
          <h2 className="card-title text-4xl justify-center mb-5">Login</h2>
          <input
            type="text"
            placeholder="Email"
            name="email"
            value={loginData.email}
            onChange={handleChange}
            className="input input-bordered input-success w-full max-w-xs text-white focus:outline-none mb-3"
          />
          <input
            type="password"
            placeholder="Password"
            name="password"
            value={loginData.password}
            onChange={handleChange}
            className="input input-bordered input-success w-full max-w-xs text-white focus:outline-none mb-3"
          />
          <div className="card-actions w-full">
            <button
              className="btn btn-accent w-full hover:bg-login hover:text-accent transition-colors duration-300 text-lg"
              onClick={handleSubmit}
            >
            Submit
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;