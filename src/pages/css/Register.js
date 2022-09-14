import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { register } from '../../redux/features/authSlice';

const initialState = {
  firstName: '',
  lastName: '',
  email: '',
  password: '',
  confirmPassword: '',
};

const Register = () => {
  const [formValue, setFormValue] = useState(initialState);
  const { loading, error } = useSelector((state) => state.auth);
  const { email, password, firstName, lastName, confirmPassword } = formValue;
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    error && toast.error(error);
  }, [error]);

  if (loading) return 'loading...';

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      return toast.error('Password do not match');
    }
    if (email && password && firstName && lastName && confirmPassword) {
      dispatch(register({ formValue, navigate, toast }));
      navigate('/login');
    }
  };

  const onInputChange = (e) => {
    const { name, value } = e.target;
    setFormValue({ ...formValue, [name]: value });
  };
  return (
    <>
      <div className="container-fluid">
        <div className="row justify-content-center">
          <div className="col-12 col-sm-10 col-md-12 col-lg-11 col-xl-10">
            <div className="card d-flex mx-auto my-5">
              <div className="row">
                <div className="col-5 col-sm-12 col-xs-12 p-5">
                  <div className="row mb-5 m-3">
                    <img
                      srcSet="http://i.imgur.com/pFfTOwy.jpg"
                      alt="img"
                      width="70vw"
                      height="55vw"
                    />
                  </div>
                  <div className="row justify-content-center">
                    <div className="col-12 col-sm-10 col-md-12 col-lg-11 col-xl-10">
                      <div className="row">
                        <div className="nav fw-bold mb-1 mb-sm-2 mbl-lg-5 px-sm-2 px-lg-5">
                          <Link className="nav-link" to='="/addtour'>
                            Careers
                          </Link>
                          <Link className="nav-link ac" to="/dashboard">
                            Students
                          </Link>
                          <Link className="nav-link" to='="/admission'>
                            Admission
                          </Link>
                        </div>
                      </div>
                      <form className="px-5 pb-5" onSubmit={handleSubmit}>
                        <div className="d-flex">
                          <img srcSet="http://i.imgur.com/pFfTOwy.jpg" alt="" />
                          <h3 className="fw-bold">Register in</h3>
                        </div>
                        <input
                          type="email"
                          value={email}
                          name="email"
                          placeholder="please enter your email address"
                          onChange={onInputChange}
                        />
                        <input
                          type="password"
                          value={password}
                          name="password"
                          placeholder="please enter your password"
                          onChange={onInputChange}
                        />
                        <input
                          type="confirmPassword"
                          value={confirmPassword}
                          name="confirmPassword"
                          placeholder="please enter your password"
                          onChange={onInputChange}
                        />
                        <input
                          type="firstName"
                          value={firstName}
                          name="firstName"
                          placeholder="please enter your password"
                          onChange={onInputChange}
                        />
                        <input
                          type="lastName"
                          value={lastName}
                          name="lastName"
                          placeholder="please enter your password"
                          onChange={onInputChange}
                        />
                        <button
                          className="text-white text-weight-bold bt"
                          type="submit"
                        >
                          Register
                        </button>
                        <h5 className="ac" id="register">
                          Login
                        </h5>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Register;
