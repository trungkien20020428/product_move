import { useState, useEffect } from 'react';
import { addProductLine } from '../../services/product_line';

export const AddProduct = ({ onAddProduct, onCancel }) => {
  const [productLine, setProductLine] = useState('');

  const handleSubmit = (event: any) => {
    event.preventDefault();

    onAddProduct(productLine);
  };
  const handleChange = (event: any) => {
    const { name, value } = event.target;
    if (name === 'productLine') {
      setProductLine(value);
    }
  };

  return (
    <div className="productdongSPmoi__form">
      <div className="productnotication">
        <p>Dòng sản phẩm mới</p>
      </div>
      <form onSubmit={handleSubmit}>
        <div>
          <p className="producttagnameform"> Dòng sản phẩm </p>
          <input
            type="text"
            className="productinfoForm"
            placeholder=" Xe bán tải "
            name="productLine"
            value={productLine}
            onChange={handleChange}
          />
        </div>
        <div className="productbtn" onClick={handleSubmit}>
          Tạo dòng sản phẩm
        </div>
      </form>
    </div>
  );
};
