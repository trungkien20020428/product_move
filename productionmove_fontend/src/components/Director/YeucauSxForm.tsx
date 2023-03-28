import { useSelector } from 'react-redux';
import Select from 'react-select/dist/declarations/src/Select';
import { Role } from '../../types';
import { useState } from 'react';
import { addProduct } from '../../services/product';
import { toast } from 'react-toastify';

export const YeucauSXForm = ({ setIsRequest, productLineId }) => {
  const listUser = useSelector((state: any) => state.authSlice.listUser);
  console.log(listUser);
  const listFactory = listUser.filter((item) => item.roleId == Role.FACTORY);
  const listDistribution = listUser.filter(
    (item) => item.roleId == Role.DISTRIBUTION,
  );
  const [amount, setAmount] = useState<number>(0);

  const [name, setName] = useState('');
  const handleSendRequest = () => {
    const factoryId = parseInt(document.getElementById('factory')?.value);
    const distributionId = parseInt(
      document.getElementById('distribution')?.value,
    );
    addProduct(amount, factoryId, name, distributionId, productLineId)
      .then((res) => {
        if (!res.data.success) {
          toast.error(res.data.message);
        }
      })
      .catch((err) => {
        console.error(err);
      });
    setIsRequest(false);
  };
  return (
    <>
      <div className="yeucauSX__form">
        <div className="notication">
          <p>Yêu cầu sản xuất</p>
        </div>
        <div>
          <p className="tagnameform"> Số lượng (chiếc)</p>
          <input
            type="text"
            className="infoForm"
            placeholder=" 13 "
            onChange={(e) => {
              setAmount(parseInt(e.target.value));
            }}
          />
        </div>
        <div>
          <p className="tagnameform"> ten san pham</p>
          <input
            type="text"
            className="infoForm"
            onChange={(e) => {
              setName(e.target.value);
            }}
          />
        </div>
        <div className="tagnameform">
          {' '}
          choose Factory
          <select id="factory">
            {listFactory.map((item) => {
              return (
                <>
                  <option value={item.id}>{item.displayName}</option>
                </>
              );
            })}
          </select>
        </div>
        <div className="tagnameform">
          {' '}
          choose Distribution
          <select id="distribution">
            {listDistribution.map((item) => {
              return (
                <>
                  <option value={item.id}>{item.displayName}</option>
                </>
              );
            })}
          </select>
        </div>
        <div className="btn" onClick={handleSendRequest}>
          Gửi yêu cầu đến cơ sở sản xuất
        </div>
      </div>
    </>
  );
};
