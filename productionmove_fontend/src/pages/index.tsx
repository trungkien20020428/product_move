import { useRouter } from 'next/router';
import React, { useState } from 'react';
import { authAPI } from '../services/auth';
import { useDispatch } from 'react-redux';
import { login, requestListUser } from '../redux/authSlice';
import { toast } from 'react-toastify';
import { getListUser } from '../services/users';
import { Footer } from '../Common/Footer';
const Index = () => {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const dispatch = useDispatch();
  const handleSubmitLogin = () => {
    if (email == '' || password == '') {
      toast.error('email and password is requried');
      return;
    }
    authAPI(email, password)
      .then((res) => {
        if (res.data.success) {
          const currentUser = res.data.result.user;
          const accessToken = res.data.result.accessToken;
          toast.success(res.data.message);
          dispatch(login({ currentUser, accessToken }));
          if (currentUser.roleId == 1) {
            router.push('Director/account');
          }
          if (currentUser.roleId == 2) {
            router.push('Factory/listRequest');
          }
          if (currentUser.roleId == 3) {
            router.push('Insurance/reciveProduct');
          }
          if(currentUser.roleId == 4) {
            router.push('Distribution/productInformation')
          }
        } else {
          toast.error(res.data.message);
        }
      })
      .catch((err) => {
        console.error(err);
      });
    getListUser()
      .then((res) => {
        if (res.data.success) {
          const listUser = res.data.result;
          dispatch(requestListUser({ listUser }));
        }
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const handleSaveEmail = (e: any) => {
    setEmail(e.target.value);
  };

  const handleSavePassword = (e: any) => {
    setPassword(e.target.value);
  };

  return (
    <>
      <div className="box">
        <div className="slogan">
          <div className="slogan__picture"> </div>
          <div className="slogan__slogan">
            <p className="slogan__slogan__text"> Work for our future </p>
          </div>
        </div>
        <div className="login-form">
          <div className="form">
            <input
              type="text"
              className="login-form__input"
              placeholder="Username or email"
              value={email}
              onChange={handleSaveEmail}
            />
          </div>
          <div className="form">
            <input
              type="password"
              className="login-form__input"
              placeholder="Password"
              value={password}
              onChange={handleSavePassword}
            />
          </div>
          <button className='login-form__btn' onClick={handleSubmitLogin}>Login</button>
        </div>
      </div>
      <Footer />
    </>
  );
};
export default Index;
