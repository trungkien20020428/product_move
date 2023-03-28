// @ts-nocheck
import React, { useEffect } from 'react';
import { useState } from 'react';
import { Header } from '../../Common/Header';
import { DistributionSideBar } from '../../components/Distribution/distributionSideBar';
import {
  changeAllProductStatusFollowProductLine,
  changeProductStatus,
  getProductInformation,
} from '../../services/product';
import { toast } from 'react-toastify';
import { getDate } from '../../logic/Date';
import { PRODUCT_STATUS } from '../../types';
import { requestMove } from '../../services/product_move';
import { useSelector } from 'react-redux';
import { Footer } from '../../Common/Footer';
export const productInformation = () => {
  const [productInformation, setProductInformation] = useState({});
  const [isOpen, setIsOpen] = useState(false);
  const [productCode, setProductCode] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [insurance, setInsurance] = useState();
  const listUser = useSelector((state: any) => state.authSlice.listUser);
  const currentUser = useSelector((state: any) => state.authSlice.currentUser);
  const GetInformation = (id: string) => {
    setIsLoading(true);
    console.log(document.getElementById('ttbh')?.value);

    getProductInformation(id)
      .then((res) => {
        if (res.data.success) {
          console.log(res.data.result);
          setProductInformation(res.data.result);
          toast.success(res.data.message);
          setIsOpen(true);
        } else {
          toast.error(res.data.message);
        }
      })
      .catch((err) => {
        console.error(err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };
  const handleGetInformation = () => {
    GetInformation(productCode);
  };
  const handleWanttary = (e: any) => {
    console.log(productInformation, currentUser.id);
    if (
      productInformation?.product.status != PRODUCT_STATUS.WARRANTY_TIME_OUT &&
      productInformation.product.user_id == currentUser.id
    ) {
      changeProductStatus(PRODUCT_STATUS.ERROR_NEED_WARRANTY, productCode)
        .then((res) => {
          toast.dark(res.data);
          setIsOpen(false);
        })
        .catch((err) => {
          console.error(err);
          toast.error('please checking network');
        });
      const moveId = parseInt(document.getElementById('ttbh')?.value);
      requestMove(moveId, productInformation.product.product_id);
    } else {
      toast.error('product wanttanry time out !');
    }
  };

  const handleSummon = () => {
    const product_line_id =
      productInformation.product.ProductsModel.product_line_id;
    const moveId = parseInt(document.getElementById('ttbh')?.value);
    changeAllProductStatusFollowProductLine(
      PRODUCT_STATUS.NEED_TO_RECOVERY,
      product_line_id,
      moveId,
    )
      .then((res) => {
        toast.success(res.data);
      })
      .catch((err) => {
        console.error(err);
        toast.error('Check networking and try it again !');
      });
  };

  return (
    <>
      <Header />
      <DistributionSideBar />
      <div className="dataSP pagePlace">
        <div className="dataSP__nhapidSP">
          <input
            type="text"
            className="infoSP"
            placeholder="code san pham"
            value={productCode}
            onChange={(e) => {
              setProductCode(e.target.value);
            }}
          />
        </div>
        <div className="btn" onClick={handleGetInformation}>
          Xuất thông tin
        </div>
        {isOpen && (
          <div className="dataSP__showdata">
            <p className="dataSP__showdata__data IDSP">
              Ma san pham {productInformation.product?.id}
            </p>
            <p className="dataSP__showdata__data IDKH">
              Ten khach hang : {productInformation.customer?.name}
            </p>
            <p className="dataSP__showdata__data IDgiaodich">
              Mã giao dịch : {productInformation?.product?.order_id}
            </p>
            <p className="dataSP__showdata__data ngaysanxuat">
              Ngày sản xuất : {getDate(productInformation?.product?.createdAt)}
            </p>
            <p className="dataSP__showdata__data hanbaohanh">
              Hạn bảo hành :{' '}
              {getDate(productInformation?.product?.warrantyDate)}
            </p>
          </div>
        )}
        {isOpen && (
          <div>
            <span>chon ttbh</span>
            <select name="status" className="infoSP" id="ttbh">
              {listUser.map((item) => {
                return (
                  <>
                    {item.roleId == 3 ? (
                      <option value={item.id}>{item.displayName}</option>
                    ) : null}
                  </>
                );
              })}
            </select>
          </div>
        )}
        {isOpen && (
          <div className="option">
            <div className="btn" onClick={handleWanttary}>
              Bảo hành máy
            </div>
            <div className="btn" onClick={handleSummon}>
              Triệu hồi dong san pham nay{' '}
            </div>
          </div>
        )}
      </div>
      <Footer />
    </>
  );
};
export default productInformation;
