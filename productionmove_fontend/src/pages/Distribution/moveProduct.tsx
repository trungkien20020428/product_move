// @ts-nocheck
import React, { useEffect, useState } from 'react';
import { Header } from '../../Common/Header';
import { FactorySideBar } from '../../components/Factory/FactorySideBar';
import { getListMove, moveProductTo } from '../../services/product_move';
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import { findUserById, getProdcutId } from '../../logic/users';
import { getProductLineById, getProductMove } from '../../logic/product';
import { getDate } from '../../logic/Date';
import { PRODUCT_STATUS } from '../../types';
import { DistributionSideBar } from '../../components/Distribution/distributionSideBar';
import { Footer } from '../../Common/Footer';

export const moveProduct = () => {
  const [listMove, setListMove] = useState([]);
  const dispath = useDispatch();
  const productLines = useSelector(
    (state: any) => state.productSlice.productLines,
  );

  const listUser = useSelector((state: any) => state.authSlice.listUser);
  const fetch = () => {
    getListMove()
      .then((res) => {
        if (res.data.success) {
          setListMove(res.data.result);
        } else {
          toast.error(res.data.message);
        }
      })
      .catch((err) => console.error(err));
  };

  const handleSubmit = (e: any) => {
    const check = document.getElementsByName('check');
    const listMoveId = [];
    const listProductId = [];
    for (let i = 0; i < check.length; i++) {
      if (check[i].checked) {
        listMoveId.push(check[i].id);
        const product = listMove.find((item) => item.id == check[i].id);
        listProductId.push(product.ProductModels.id);
      }
    }
    handleMoveProduct(
      listMoveId,
      listProductId,
     // PRODUCT_STATUS.ERROR_NEED_WARRANTY,
    );
  };

  const handleMoveProduct = (
    listId: any[],
    listProductId: number[],
   // status: number,
  ) => {
    moveProductTo(listId, listProductId)
      .then((res) => {
        if (res.data.success) {
          toast.success(res.data.message);
          window.location.reload();
        }
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const handleSelectAll = (e: any) => {
    const check = document.getElementsByName('check');
    const checkAll = document.getElementById('all');

    for (let i = 0; i < check.length; i++) {
      check[i].checked = checkAll.checked;
    }
  };

  useEffect(() => {
    fetch();
  }, []);
  return (
    <>
      <Header />
      <DistributionSideBar />
      <div className="xuatSP pagePlace">
        <div className="notication">
          <p> Xuất sản phẩm </p>
        </div>
        <div className="selectall">
          <input
            type="checkbox"
            name="check-all"
            id="all"
            onClick={handleSelectAll}
          />
          <p>Chọn tất cả</p>
        </div>
        <table className="list">
          <thead>
            <tr>
              <th></th>
              <th>Mã sản phẩm</th>
              <th>Tên sản phẩm </th>
              <th>Dòng sản phẩm</th>
              <th>Ngày sản xuất</th>
              <th>Gui den</th>
              <th>trang thai</th>
            </tr>
          </thead>
          <tbody>
            {listMove.map((item) => {
              const moveId = item.to;
              return (
                <>
                  <tr>
                    <td>
                      <input type="checkbox" name="check" id={item.id} />
                    </td>
                    <td>{getProdcutId(item.ProductModels.id)}</td>
                    <td>{item.ProductModels.name}</td>
                    <td>
                      {getProductLineById(
                        item.ProductModels.product_line_id,
                        productLines,
                      )}
                    </td>
                    <td>{getDate(item.createdAt)}</td>
                    <td>{findUserById(moveId, listUser)?.displayName}</td>
                    <td>
                      {getProductMove(item.ProductWarehousesModel?.status)}
                    </td>
                  </tr>
                </>
              );
            })}
          </tbody>
        </table>
        <div className="list__btn" onClick={handleSubmit}>
          {' '}
          Gửi Đi
        </div>
      </div>
      <Footer />
    </>
  );
};
export default moveProduct;
