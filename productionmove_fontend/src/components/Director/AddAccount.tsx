import React, { useState } from 'react';
import Select from 'react-select';
import { toast } from 'react-toast';

export const AddAccount = ({
  handleAddAccount,
  setIsAddAccount,
  isEditUser,
  editUser,
  setIsEdit,
  handleEditAccount,
}) => {
  const [phone, setPhone] = useState(editUser?.phone);
  const [displayName, setDisplayName] = useState(editUser?.displayName);
  const [roleId, setRoleId] = useState(editUser?.roleId);
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfrimPassword] = useState('');
  const [email, setEmail] = useState(editUser?.email);
  const [isEqualPassword, setIsEqualPassword] = useState(true);

  const options = [
    { value: 1, label: 'Director' },
    { value: 2, label: 'Factory' },
    { value: 3, label: 'Insurance' },
    { value: 4, label: 'Distribution' },
  ];

  const onChangeRole = (selectedOption: any) => {
    setRoleId(selectedOption.value);
  };

  const checkInformation = () => {
    if (
      phone != '' &&
      roleId != 0 &&
      password != '' &&
      confirmPassword != '' &&
      email != '' &&
      displayName != ''
    ) {
      if (isEqualPassword) {
        return true;
      }
    } else {
      toast.error('Can not submit , you need completed sheet');
      return false;
    }
  };

  const submitAddAccount = () => {
    if (checkInformation()) {
      handleAddAccount({ phone, roleId, password, email, displayName });
    }
  };

  const submitUpdateAccount = () => {
    handleEditAccount({ phone, roleId, email, displayName });
    setIsEdit(false);
    setIsAddAccount(false);
  };
  const comparePassword = () => {
    if (confirmPassword === password || password === '') {
      setIsEqualPassword(true);
      return;
    }
    setIsEqualPassword(false);
  };

  return (
    <>
      <div className="modal">
        <div
          className="modal__overlay"
          onClick={(e) => {
            setIsAddAccount(false);
            setIsEdit(false);
          }}
        ></div>
        <div className="modal__body">
          <div className="modal__inner">
            <div className="themTK__form">
              <div className="notication">
                <p>Tạo tài khoản</p>
              </div>
              <div>
                <p className="tagnameform"> email </p>
                <input
                  type="text"
                  className="infoForm"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                  }}
                />
              </div>
              <div>
                <p className="tagnameform"> Tên tài khoản </p>
                <input
                  type="text"
                  className="infoForm"
                  value={displayName}
                  onChange={(e) => setDisplayName(e.target.value)}
                />
              </div>
              <div>
                <p className="tagnameform"> Roles </p>
                <Select
                  className="infoForm"
                  options={options}
                  onChange={onChangeRole}
                  defaultValue={options[editUser.roleId - 1]}
                />
              </div>
              {!isEditUser && (
                <div>
                  <p className="tagnameform"> Password </p>
                  <input
                    type="password"
                    className="infoForm"
                    value={password}
                    autoComplete="new-password"
                    onChange={(e) => {
                      setPassword(e.target.value);
                    }}
                  />
                </div>
              )}
              {!isEditUser && (
                <div>
                  <p className="tagnameform"> Confirm Password </p>
                  <input
                    type="password"
                    className="infoForm"
                    value={confirmPassword}
                    onChange={(e) => {
                      setConfrimPassword(e.target.value);
                    }}
                    onBlur={comparePassword}
                  />
                </div>
              )}
              {!isEqualPassword && (
                <span>confirm password not equal password</span>
              )}

              <div>
                <p className="tagnameform"> phone Number </p>
                <input
                  type="text"
                  className="infoForm"
                  value={phone}
                  onChange={(e) => {
                    setPhone(e.target.value);
                  }}
                />
              </div>
              <div
                className="btn"
                onClick={isEditUser ? submitUpdateAccount : submitAddAccount}
              >
                <p> {isEditUser ? 'Chinh sua' : 'Tạo tài khoản mới '} </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
