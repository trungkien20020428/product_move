// @ts-nocheck
import { useEffect, useState } from 'react';
import { Header } from '../../Common/Header';
import { SerivceCenterSidleBar } from '../../components/Service_center/serviceCenterSidleBar';
import { useDispatch, useSelector } from 'react-redux';
import { getListTo, reciveProductFrom } from '../../services/product_move';
import { toast } from 'react-toastify';
import {
  changeProductStatus,
  changeProductStatuss,
  getProductInformation,
} from '../../services/product';
import { PRODUCT_STATUS } from '../../types';
import { getListProductLine } from '../../services/product_line';
import { requestProductLine } from '../../redux/productSlice';
import { findUserById, getProdcutId, getRoldeName } from '../../logic/users';
import { getProductLineById, getProductMove } from '../../logic/product';
import { getDate } from '../../logic/Date';
import { Footer } from '../../Common/Footer';
export const reciveProduct = () => {
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
    const listProductWarehouseId = [];
    for (let i = 0; i < check.length; i++) {
      if (check[i].checked) {
        listRecived.push(parseInt(check[i].id));
        const product = listRecive.find((item) => item.id == check[i].id);
        listProductId.push(product.ProductModels.id);
        listProductWarehouseId.push(getProdcutId(product.ProductModels.id));
      }
    }
    handleReciveProduct(
      listRecived,
      listProductId,
      listProductWarehouseId
    );
  };

  const handleReciveProduct = (
    listId: any[],
    listProductId: number[],
    listProductWarehouseId:any
    // status: number,
  ) => {
    reciveProductFrom(listId, listProductId)
      .then((res) => {
        if (res.data.success) {
          toast.success(res.data.message);
          changeProductStatuss(
            PRODUCT_STATUS.WARRANTY_REPAIRING,
            listProductWarehouseId,
          );
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
    getListProductLine().then((res) => {
      const productLines = res.data.result;
      dispath(requestProductLine({ productLines }));
    });
    fetch();
  }, []);
  return (
    <>
      <Header />
      <SerivceCenterSidleBar />
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
export default reciveProduct;
