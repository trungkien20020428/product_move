// @ts-nocheck
import React, { useEffect, useState } from 'react';
import { Header } from '../../Common/Header';
import {
  getListTo,
  reciveProductFrom,
  requestMove,
} from '../../services/product_move';
import { toast } from 'react-toastify';
import { getProductLineById, getProductMove } from '../../logic/product';
import { getListProductLine } from '../../services/product_line';
import { useDispatch, useSelector } from 'react-redux';
import { requestProductLine } from '../../redux/productSlice';
import { PRODUCT_STATUS } from '../../types';
import { findUserById, getProdcutId, getRoldeName } from '../../logic/users';
import { getDate } from '../../logic/Date';
import { DistributionSideBar } from '../../components/Distribution/distributionSideBar';
import { getProductInformation } from '../../services/product';
import { Footer } from '../../Common/Footer';

export const recive = () => {
  const [listRecive, setListRecive] = useState([]);
  const dispath = useDispatch();
  const productLines = useSelector(
    (state: any) => state.productSlice.productLines,
  );

  const listUser = useSelector((state: any) => state.authSlice.listUser);
  const fetch = () => {
    getListTo()
      .then((res) => {
        if (res.data.success) {
          setListRecive(res.data.result);
        } else {
          toast.error(res.data.message);
        }
      })
      .catch((err) => console.error(err));
  };

  async function getProductStatus(productId: string) {
    const status = await await (
      await getProductInformation(productId)
    ).data.result.product.status;
    return status;
  }

  const handleSubmit = (e: any) => {
    const check = document.getElementsByName('check');
    const listRecived = [];
    const listProductId = [];
    for (let i = 0; i < check.length; i++) {
      if (check[i].checked) {
        listRecived.push(parseInt(check[i].id));
        const product = listRecive.find((item) => item.id == check[i].id);
        listProductId.push(product.ProductModels.id);
      }
    }
    console.log(listRecived, listProductId);
    handleReciveProduct(
      listRecived,
      listProductId,
      //PRODUCT_STATUS.BRING_TO_DISTRIBUTION,
    );
  };

  const handleReciveProduct = (
    listId: any[],
    listProductId: number[],
    // status: number,
  ) => {
    reciveProductFrom(listId, listProductId)
      .then((res) => {
        if (res.data.success) {
          toast.success(res.data.message);
          listRecive.map((item) => {
            if (
              item.ProductWarehousesModel.status ==
              PRODUCT_STATUS.ERROR_NEED_RETURN_FACTORY
            ) {
              requestMove(
                item.ProductWarehousesModel.author_id,
                item.ProductModels.id,
              );
            }
          });
          //window.location.reload();
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
    getListProductLine().then((res) => {
      const productLines = res.data.result;
      dispath(requestProductLine({ productLines }));
    });
    fetch();
  }, []);
  return (
    <>
      <Header />
      <DistributionSideBar content="aaa" />
      <div className="xuatSP pagePlace">
        <div className="notication">
          <p> Nhan san pham </p>
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
              <th>Noi Gui</th>
              <th>chuc nang</th>
              <th>trang thai</th>
            </tr>
          </thead>
          <tbody>
            {listRecive.map((item) => {
              const reciveId = item.from;
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
                    <td>{findUserById(reciveId, listUser)?.displayName}:</td>
                    <td>
                      {getRoldeName(findUserById(reciveId, listUser).roleId)}
                    </td>
                    <td>
                      {getProductMove(item.ProductWarehousesModel.status)}
                    </td>
                  </tr>
                </>
              );
            })}
          </tbody>
        </table>
        <div className="list__btn" onClick={handleSubmit}>
          nhan san pham
        </div>
      </div>
      <Footer />
    </>
  );
};
export default recive;
