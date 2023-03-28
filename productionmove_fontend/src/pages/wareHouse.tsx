import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { DistributionSideBar } from '../components/Distribution/distributionSideBar';
import { Header } from '../Common/Header';
import { getAllProduct } from '../services/product';
import { getListProductLine } from '../services/product_line';
import { requestProductLine } from '../redux/productSlice';
import { getProductLineById, getProductMove } from '../logic/product';
import { getDate } from '../logic/Date';

export const wareHouse = () => {
  const [listRecive, setListRecive] = useState([]);
  const dispath = useDispatch();
  const productLines = useSelector(
    (state: any) => state.productSlice.productLines,
  );

  const listUser = useSelector((state: any) => state.authSlice.listUser);
  const fetch = () => {
    getAllProduct()
      .then((res) => {
        if (res.data.success) {
          setListRecive(res.data.result);
        }
      })
      .catch((err) => {
        console.error(err);
      });
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
      <DistributionSideBar />
      <div className="xuatSP pagePlace">
        <div className="notication">
          <p> Kho </p>
        </div>
        <table className="list">
          <thead>
            <tr>
              <th>Mã sản phẩm</th>
              <th>Tên sản phẩm </th>
              <th>Dòng sản phẩm</th>
              <th>Ngày sản xuất</th>
              <th>trang thai</th>
            </tr>
          </thead>
          <tbody>
            {listRecive.map((item) => {
              console.log(item);
              
              console.log(  item.ProductsModel?.product_line_id  );

              return (
                <>
                  <tr>
                    <td>{item.id}</td>
                    <td>{item.ProductsModel?.name}</td>
                    <td>
                      {getProductLineById(
                        item.ProductsModel?.product_line_id  ,
                        productLines,
                      )}
                    </td>
                    <td>{getDate(item.createdAt)}</td>
                    <td>
                      {getProductMove(item.status)}
                    </td>
                  </tr>
                </>
              );
            })}
          </tbody>
        </table>
      </div>
    </>
  );
};
export default wareHouse;
