import { ChangeEvent, MouseEvent, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';

import { signup } from '../../redux/slices/AuthSlice';
import { AppDispatch } from '../../redux/store';
import { SignupData } from '../../types/SignupData';

const Signup: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  
  const detailsRef = useRef<HTMLDetailsElement>(null!);
  const [signupData, setSignupData] = useState<SignupData>({
    name: '',
    email: '',
    password: '',
    userType: '',
    clientName: '',
    userStatus: '',
  });

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setSignupData({
      ...signupData,
      [name]: value,
    });
  };
  
  const handleUserType = (event: MouseEvent<HTMLUListElement>) => {
    const target = event.target as HTMLAnchorElement;
    const userTypeSelected = target.innerText;
    setSignupData({
      ...signupData,
      userType: userTypeSelected,
      userStatus: (userTypeSelected == 'customer') ? 'approved' : 'suspended'
    });
    const dropDown = detailsRef.current;
    dropDown.open = !dropDown.open;
  };

  const resetSignupState = () => {
    setSignupData({
      name: '',
      email: '',
      password: '',
      userType: '',
      clientName: '',
      userStatus: '',
    });
  };

  const handleSubmit = async () => {
    if (
      !signupData.email ||
      !signupData.password ||
      !signupData.name ||
      !signupData.clientName ||
      !signupData.userType ||
      !signupData.userStatus
    )
      return;
    
    const response = await dispatch(signup(signupData));
    if(response.payload) {
      console.log('payload recieved');
      console.log(response);
      navigate('/signin');
    }
    else {
      resetSignupState();
    }
  };

  return (
    <div className="grid place-items-center h-screen">
      <div className="card w-96 bg-primary text-primary-content">
        <div className="card-body">
          <h2 className="card-title text-4xl justify-center mb-5">Sign up</h2>
          <input
            type="text"
            placeholder="Email"
            name="email"
            value={signupData.email}
            onChange={handleChange}
            className="input input-bordered input-success w-full max-w-xs text-white focus:outline-none mb-3"
          />
          <input
            type="text"
            placeholder="Full Name"
            name="name"
            value={signupData.name}
            onChange={handleChange}
            className="input input-bordered input-success w-full max-w-xs text-white focus:outline-none mb-3"
          />
          <input
            type="password"
            placeholder="Password"
            name="password"
            value={signupData.password}
            onChange={handleChange}
            className="input input-bordered input-success w-full max-w-xs text-white focus:outline-none mb-3"
          />
          <details className="dropdown mb-4 w-full" ref={detailsRef}>
            <summary className="btn">{(!signupData.userType) ? 'User Type' : signupData.userType.toUpperCase()}</summary>
            <ul onClick={handleUserType} className="p-2 shadow menu dropdown-content z-[1] bg-base-100 text-white rounded-box w-52">
              <li><a>customer</a></li>
              <li><a>engineer</a></li>
              <li><a>admin</a></li>
            </ul>
          </details>
          <input
            type="text"
            placeholder="Client Name"
            name="clientName"
            value={signupData.clientName}
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
          <p className='text-white'>
            Already Have an account ? <Link to='/signin' className='btn-accent font-semibold hover:text-white'>Login Instead</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signup;
