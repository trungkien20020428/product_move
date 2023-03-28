import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { logOut } from '../redux/authSlice';
import { useRouter } from 'next/router';
import { getRoldeName } from '../logic/users';

export const Header = () => {
  const [clickAvatar, setClickAvatar] = useState(false);
  const dispatch = useDispatch();
  const router = useRouter();
  const currentUser = useSelector((state: any) => state.authSlice.currentUser);
  const handleClickAccount = () => {
    setClickAvatar(!clickAvatar);
    console.log('click', clickAvatar);
  };
  const handleLogout = () => {
    dispatch(logOut({}));
    router.push('/');
  };
  return (
    <>
      <div className="heading">
        <div className="name"> BigCorp </div>
        <div className="user">
          <div className="user__name"> {currentUser.displayName} </div>
          <div className="user__avatar" onClick={handleClickAccount}></div>
          {clickAvatar && (
            <div className="user__options">
              <p>{getRoldeName(currentUser.roleId)}</p>
              <p onClick={handleLogout}> Đăng xuất </p>
            </div>
          )}
        </div>
      </div>
    </>
  );
};
