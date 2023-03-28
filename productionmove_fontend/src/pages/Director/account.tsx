// @ts-nocheck
import { useEffect, useState } from 'react';
import { DirectorSideBar } from '../../components/Director/DirectorSideBar';
import {
  getListUser,
  addUser,
  removeUser,
  patchUser,
} from '../../services/users';
import { Role } from '../../types';
import { AddAccount } from '../../components/Director/AddAccount';
import { toast } from 'react-toastify';
import { Header } from '../../Common/Header';
import { findUserById } from '../../logic/users';
import { Footer } from '../../Common/Footer';

export const account = () => {
  const [listUser, setListUser] = useState<any[]>([]);

  const [isAddAccount, setIsAddAccount] = useState(false);

  const [editUser, setEditUser] = useState(Object);

  const [isEdit, setIsEdit] = useState(false);

  const getRoleName = (roleNumber: any) => {
    switch (roleNumber) {
      case Role.DIRECTOR:
        return 'Director';
      case Role.DISTRIBUTION:
        return 'Distribution';
      case Role.FACTORY:
        return 'Factory';
      case Role.INSURANCE:
        return 'Insurance';
    }
  };

  const handleAddAccount = (e: any) => {
    e.preventDefault();
    e.stopPropagation();
    setIsAddAccount(true);
    setEditUser({});
  };

  const handleEditUser = (e: any) => {
    const userId = e.target.id;
    setEditUser(findUserById(userId, listUser));
    setIsEdit(true);
    setIsAddAccount(true);
  };

  const EditUser = (user: any) => {
    const userId = editUser.id;
    patchUser(userId, user)
      .then((res) => {
        if (res.data.success) {
          window.location.reload();
          toast.success(res.data.message);
        }
      })
      .catch((err) => {
        console.error(err);
        toast.error('can not edit user now!,please try again');
      });
  };

  const postUser = (user: any) => {
    addUser(user)
      .then((res) => {
        console.log(res.data);
        if (res.data.success) {
          toast.success('create user success');
          setListUser([...listUser, res.data.result.userCreated]);
        } else {
          toast.error('failed create new users');
        }
      })
      .catch((err) => {
        console.error(err);
        toast.error('Can not create new User');
      });
  };

  const deleteUser = (e: any) => {
    if (window.confirm('Are you sure delete this account ?')) {
      const userId = e.target.id;
      removeUser(userId).then((res) => {
        if (res.data.success) {
          toast.success(res.data.message);
        } else {
          toast.error(res.data.message);
        }
      });
    }
  };

  // eslint-disable-next-line react-hooks/rules-of-hooks
  useEffect(() => {
    getListUser()
      .then((res) => {

        setListUser(res.data.result);
        toast.success(res.data.message);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);
  return (
    <>
      <div>
        <div className="quanlyTK pagePlace">
          <Header />
          <DirectorSideBar content="aaaa" />
          <div className="notication">
            <p> Danh sách tài khoản </p>
          </div>
          <table className="list">
            <thead>
              <tr>
                <th>Tên tài khoản </th>
                <th>Status</th>
                <th>Roles</th>
              </tr>
            </thead>
            <tbody>
              {listUser.map((item) => {
                return (
                  <tr>
                    <td>{item?.displayName}</td>
                    <td>Online</td>
                    <td>{getRoleName(item?.roleId)}</td>
                    <td
                      id={item.id}
                      className="updateTK"
                      onClick={handleEditUser}
                    >
                      {' '}
                      Chỉnh sửa{' '}
                    </td>
                    <td id={item.id} className="xoaTK" onClick={deleteUser}>
                      {' '}
                      Xóa{' '}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          <div className="list__btn" onClick={handleAddAccount}>
            Thêm tài khoản mới
          </div>
          {isAddAccount && (
            <AddAccount
              handleAddAccount={postUser}
              setIsAddAccount={setIsAddAccount}
              isEditUser={isEdit}
              editUser={editUser}
              setIsEdit={setIsEdit}
              handleEditAccount = {EditUser}
            />
          )}
        </div>
      </div>
        <Footer />
    </>
  );
};
export default account;
