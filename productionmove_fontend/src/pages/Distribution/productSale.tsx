// @ts-nocheck
import { useState } from 'react';
import { Header } from '../../Common/Header';
import { DistributionSideBar } from '../../components/Distribution/distributionSideBar';
import { getProductInformation, saleProduct } from '../../services/product';
import { toast } from 'react-toastify';
import { Footer } from '../../Common/Footer';

export const productSale = () => {
  const [productInfor, SetProductInfo] = useState({});
  const [productCode, setProductCode] = useState('');
  const [isShow, setIsShow] = useState(false);
  const [customerName, setCustomerName] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const handleProductInformation = (e: any) => {
    getProductInformation(productCode)
      .then((res) => {
        if (res.data.success) {
          const data = res.data.result;
          SetProductInfo(data);
          toast.success(res.data.message);
        } else {
          toast.error(res.data.message);
        }
      })
      .catch((err) => {
        console.error(err);
        toast.error('please try network or check product code again');
      })
      .finally(() => {
        setIsShow(true);
      });
  };

  const handleSaleProduct = (e: any) => {
    saleProduct(productInfor?.product?.ProductsModel?.id, { name: customerName, phone, address })
      .then((res) => {
        if (res.data.success) {
          toast.success('sale success');
        } else {
          toast.error('sale false');
        }
      })
      .then(() => {
        setProductCode('');
        setCustomerName('');
        setPhone('');
        setAddress('');
        setIsShow(false);
      })
      .catch((err) => {
        console.log(err);
        toast.error('please checking networking and try again');
      });
  };

  return (
    <>
      <Header />
      <DistributionSideBar />
      <div className="banSP pagePlace">
        <div className="notication">
          {' '}
          <p> Thông tin sản phẩm </p>
        </div>
        <div className="banSP__form">
          <div>
            <p className="tagname"> Mã sản phẩm </p>
            <input
              type="text"
              className="infoSP"
              placeholder=" AS2016 "
              value={productCode}
              onChange={(e) => {
                setProductCode(e.target.value);
              }}
              onBlur={handleProductInformation}
            />
          </div>
          {isShow && (
            <div>
              <p className="tagname"> Tên sản phẩm </p>
              <input
                className="infoSP"
                value={productInfor?.product?.ProductsModel?.name}
              />
            </div>
          )}
          {/* <div>
            <p className="tagname"> Trạng thái </p>
            <select name="status" className="infoSP">
              <option> Đưa về đại lý </option>
              <option> Lỗi, cần bảo hành </option>
              <option> Đã bảo hành xong </option>
            </select>
          </div> */}
        </div>
        <div className="notication">
          {' '}
          <p> Thông tin khách hàng </p>{' '}
        </div>
        <div className="banSP__form">
          <div>
            <p className="tagname"> Tên khách hàng </p>
            <input
              type="text"
              className="infoSP"
              placeholder=" Nguyễn Văn A "
              onChange={(e) => {
                setCustomerName(e.target.value);
              }}
              value={customerName}
            />
          </div>
          {/* <div>
            <p className="tagname"> Mã khách hàng </p>
            <input type="text" className="infoSP" placeholder=" 2018A12 " />
          </div> */}
          <div>
            <p className="tagname"> Số điện thoại </p>
            <input
              type="number"
              className="infoSP"
              placeholder=" 09XXXXXXXX "
              onChange={(e) => {
                setPhone(e.target.value);
              }}
              value={phone}
            />
          </div>
          <div>
            <p className="tagname"> Địa chỉ </p>
            <input
              type="text"
              className="infoSP"
              placeholder=" Hà Nội "
              onChange={(e) => {
                setAddress(e.target.value);
              }}
              value={address}
            />
          </div>
        </div>
        <div className="infoSP btn" onClick={handleSaleProduct}>
          <p> Bán sản phẩm </p>
        </div>
      </div>
      <Footer />
    </>

  );
};

export default productSale;
