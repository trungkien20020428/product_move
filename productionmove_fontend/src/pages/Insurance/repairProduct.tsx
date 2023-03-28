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
import { getProductCode, requestMove } from '../../services/product_move';
import { useSelector } from 'react-redux';
import axiosClient from '../../services/api_token';
import { Footer } from '../../Common/Footer';
import { SerivceCenterSidleBar } from '../../components/Service_center/serviceCenterSidleBar';
export const repairProduct = () => {
  const [productInformation, setProductInformation] = useState({});
  const [isOpen, setIsOpen] = useState(false);
  const [productCode, setProductCode] = useState('');
  const [isLoading, setIsLoading] = useState(false);
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
    console.log(productInformation);
  };
  const handleFix = (e: any) => {
    if (
      productInformation?.product.status != PRODUCT_STATUS.WARRANTY_TIME_OUT &&
      productInformation.product.user_id == currentUser.id
    ) {
      const status = parseInt(document.getElementById('ttbh')?.value);
      changeProductStatus(status, productCode)
        .then((res) => {
          toast.dark(res.data);
          setIsOpen(false);
          getProductCode(productCode).then((res) => {
            requestMove(res.data, productInformation.product.product_id);
          });
        })
        .catch((err) => {
          console.error(err);
          toast.error('please checking network');
        });
    } else {
      toast.error('product wanttanry time out !');
    }
  };

  return (
    <>
      <Header />
      <SerivceCenterSidleBar />
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
            <span>xửa xong </span>
            <select name="status" className="infoSP" id="ttbh">
              <option value={PRODUCT_STATUS.WARRANTY_DONE}>xửa xong</option>
              <option value={PRODUCT_STATUS.ERROR_NEED_RETURN_FACTORY}>
                không xửa được{' '}
              </option>
            </select>
          </div>
        )}
        {isOpen && (
          <div className="option">
            <div className="btn" onClick={handleFix}>
              Confirm
            </div>
          </div>
        )}
      </div>
      <Footer />
    </>
  );
};
export default repairProduct;
