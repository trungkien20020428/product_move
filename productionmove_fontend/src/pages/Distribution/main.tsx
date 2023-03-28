import { useEffect, useState } from 'react';
import { Footer } from '../../Common/Footer';
import { Header } from '../../Common/Header';
import { DirectorSideBar } from '../../components/Director/DirectorSideBar';
import axiosClient from '../../services/api_token';
import { getProductLineById, getProductMove } from '../../logic/product';
import { getListProductLine } from '../../services/product_line';
import { getDate } from '../../logic/Date';
import { useSelector } from 'react-redux';
import { findUserById, getRoldeName } from '../../logic/users';
import { DistributionSideBar } from '../../components/Distribution/distributionSideBar';

export const Main = () => {
  const [listContent, setlistContent] = useState([]);
  const listUser = useSelector((state) => state.authSlice.listUser);
  const [isClickStatus, setIsClickStatus] = useState(true);
  const [isClickFactory, setIsClickFactory] = useState(true);
  const [isClickDistribution, setIsClickDistribution] = useState(true);
  const [isClickWantanry, setIsClickWantanry] = useState(true);
  useEffect(() => {
    axiosClient.get('product_warehouse/byStatus/get').then((res) => {
      console.log(res.data);
      setlistContent(res.data);
    });
  }, []);
  return (
    <>
      <Header />
      <DistributionSideBar />
      <div className="homePage pagePlace">
        <div className="homePage__content-main">
          <div className="notication">
            <p>Số liệu sản phẩm</p>
          </div>
          <table className="list">
            <thead>
              <tr>
                <th>Mã sản phẩm</th>
                <th>Tên sản phẩm </th>
                <th>Mã dòng sản phẩm</th>
                <th>Ngày sản xuất</th>
                <th>Trạng thái</th>
                <th>Đang ở</th>
              </tr>
            </thead>
            <tbody>
              {listContent.map((item) => {
                return (
                  <>
                    <tr>
                      <td>{item.id}</td>
                      <td>{item.ProductsModel.name}</td>
                      <td>{item.ProductsModel.product_line_id}</td>
                      <td>{getDate(item.createdAt)}</td>
                      <td>{getProductMove(item.status)}</td>
                      <td>
                        {findUserById(item.user_id, listUser).displayName} là{' '}
                        {getRoldeName(
                          findUserById(item.user_id, listUser).roleId,
                        )}
                      </td>
                    </tr>
                  </>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
      <Footer />
    </>
  );
};
export default Main;
