// @ts-nocheck
import { useEffect, useState } from 'react';
import { Header } from '../../Common/Header';
import { activeProduct, getListRequest } from '../../services/product_move';
import { FactorySideBar } from '../../components/Factory/FactorySideBar';
import { toast } from 'react-toastify';
import { getProductLineById } from '../../logic/product';
import { getListProductLine } from '../../services/product_line';
import { useDispatch, useSelector } from 'react-redux';
import { requestProductLine } from '../../redux/productSlice';
import { PRODUCT_STATUS } from '../../types';
import { Footer } from '../../Common/Footer';

export const listRequest = () => {
  const [listRequest, setListRequest] = useState([]);
  const dispatch = useDispatch();
  const productLines = useSelector(
    (state: any) => state.productSlice.productLines,
  );

  const handleSelectAll = (e: any) => {
    const check = document.getElementsByName('check');
    const checkAll = document.getElementById('all');

    for (let i = 0; i < check.length; i++) {
      check[i].checked = checkAll.checked;
    }
  };

  const handleMakeProduct = (listId: any) => {
    activeProduct(listId )
      .then((res) => {
        if (res.data.success) {
          toast.success('Product in making process');
        } else {
          toast.error(res.data.message);
        }
      })
      .catch((err) => {
        console.error(err);
        toast.error('can not make product ,please check network and try again');
      });
  };

  const handleSubmit = (e: any) => {
    const check = document.getElementsByName('check');
    const listId = [];
    for (let i = 0; i < check.length; i++) {
      if (check[i].checked) {
        listId.push(check[i].id);
      }
    }
    handleMakeProduct(listId);
    window.location.reload();
  };
  const fetch = () => {
    getListRequest()
      .then((res) => {
        if (res.data.success) {
          setListRequest(res.data.result);
        } else {
          toast.error(res.data.message);
        }
      })
      .catch((err) => {
        console.error(err);
        toast.error('can not fetch data');
      });
  };
  useEffect(() => {
    getListProductLine().then((res) => {
      const productLines = res.data.result;
      dispatch(requestProductLine({ productLines }));
    });
    fetch();
  }, []);
  return (
    <>
      <Header />
      <FactorySideBar cotent="aaa" />
      <div className="yeucauSX pagePlace">
        <div className="notication">
          <p> Yêu cầu sản xuất </p>
        </div>
        <div className="selectall">
          <input
            type="checkbox"
            name="check-all"
            id="all"
            onClick={handleSelectAll}
          />
          <p>Chọn tất cả </p>
        </div>
        <table className="list">
          <thead>
            <tr>
              <th></th>
              <th>Mã sản phẩm</th>
              <th>Tên sản phẩm </th>
              <th>Dòng sản phẩm</th>
            </tr>
          </thead>
          <tbody>
            {listRequest.map((item) => {
              return (
                <>
                  <tr>
                    <td>
                      <input
                        id={item.ProductsModel.id}
                        type="checkbox"
                        name="check"
                      />
                    </td>
                    <td>{item.id}</td>
                    <td>{item.ProductsModel.name}</td>
                    <td>
                      {getProductLineById(
                        item.ProductsModel.product_line_id,
                        productLines,
                      )}
                    </td>
                  </tr>
                </>
              );
            })}
          </tbody>
        </table>
        <div className="list__btn" onClick={handleSubmit}>
          Bắt đầu sản xuất
        </div>
      </div>
      <Footer />
    </>
  );
};
export default listRequest;
