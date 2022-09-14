import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { login } from '../../redux/features/authSlice';

const initialState = {
  email: '',
  password: '',
};
const Login = () => {
  const [formValue, setFormValue] = useState(initialState);
  const { loading, error } = useSelector((state) => state.auth);
  const { email, password } = formValue;
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    error && toast.error(error);
  }, [error]);

  if (loading) return <p>Loading...</p>;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email && password) {
      dispatch(login({ formValue, navigate, toast }));
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
                    <img src="http://placehold.it/500x300" alt="" />
                  </div>
                  <div className="row justify-content-center">
                    <div className="w-75 mx-md-5 mx-1 mx-sm-2 mb-5 mt-4 px-sm-5 px-md-2">
                      <h1 className="wlcm">Welcome to you board!</h1>
                      <span className="rounded-pill bg-dangers" />
                      <span className="ml-2 px-1 rounded-circle" />
                    </div>
                  </div>
                </div>
                <div className="col-7 col-sm-12 col-xs-12">
                  <div className="row">
                    <div className="nav fw-bold mb-1 mb-sm-2 mbl-lg-5 px-sm-2 px-lg-5">
                      <Link className="nav-link" to="/addtour">
                        careers
                      </Link>
                      <Link className="nav-link" to="/dashboard">
                        Students
                      </Link>
                      <Link className="nav-link" to="/admission">
                        Admission
                      </Link>
                    </div>
                    <form onSubmit={handleSubmit}>
                      <div className="d-flex">
                        <img
                          srcSet="http://i.imgur.com/pFfTOwy.jpg"
                          alt=""
                          height="22px"
                          width="22px"
                          className="mr-3 mt-2"
                        />
                        <h3>Log in</h3>
                      </div>
                      <input
                        name="email"
                        type="email"
                        placeholder="Email"
                        onChange={onInputChange}
                      />
                      <input
                        type="password"
                        name="password"
                        placeholder="password"
                        onChange={onInputChange}
                      />
                      <span className="ac" id="forgot">
                        Forgot?
                      </span>
                      <button className="btn btn-primary">Sign In</button>
                      <h5 className="ac" id="register">
                        Register
                      </h5>
                    </form>
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

export default Login;
