import { Header } from '../../Common/Header';
import { AddProduct } from '../../components/Director/AddProduct';
import {
  getListProduct,
  addProduct,
  removeProduct,
} from '../../services/product';
import { toast } from 'react-toastify';
import { useEffect, useState } from 'react';
import { DirectorSideBar } from '../../components/Director/DirectorSideBar';
import { Footer } from '../../Common/Footer';
import {
  addProductLine,
  getListProductLine,
} from '../../services/product_line';
import { getProductLineById } from '../../logic/product';
import { YeucauSXForm } from '../../components/Director/YeucauSxForm';

export const product = () => {
  const [listProduct, setListProduct] = useState<any[]>([]);
  const [isAddProduct, setIsAddProduct] = useState(false);
  const [productLineId, setProductLineId] = useState();
  const [isRequest, setIsRequest] = useState(false);

  useEffect(() => {
    getListProductLine()
      .then((res: any) => {
        setListProduct(res.data.result);
      })
      .catch((error: any) => {
        toast.error(
          'Có lỗi xảy ra khi lấy danh sách dòng sản phẩm: ' + error.message,
        );
      });
    // getListProduct()
  }, []);

  const handleAddProduct = (product: any) => {
    console.log(product);
    addProductLine(product)
      .then((response) => {
        window.location.reload();

        toast.success('Dòng sản phẩm đã được tạo thành công!');

        setIsAddProduct(false);
      })
      .catch((error) => {
        toast.error('Có lỗi xảy ra khi tạo dòng sản phẩm: ' + error.message);
      });
  };

  const handleRemoveProduct = (productId: number) => {
    removeProduct(productId)
      .then(() => {
        setListProduct(
          listProduct.filter((product) => product.id !== productId),
        );

        toast.success('Dòng sản phẩm đã được xóa thành công!');
      })
      .catch((error) => {
        toast.error('Có lỗi xảy ra khi xóa dòng sản phẩm: ' + error.message);
      });
  };

  return (
    <>
      <div className="quanlydongSP pagePlace">
        <Header />
        <DirectorSideBar content="aaaa" />
        <div className="notication">
          <p> Danh sách dòng sản phẩm </p>
        </div>
        <table className="list">
          <thead>
            <tr>
              <th>Dòng sản phẩm</th>
            </tr>
          </thead>
          <tbody>
            {listProduct.map((product) => (
              <tr key={product.id}>
                <td>{product.name}</td>
                <td
                  className="yeucauSX"
                  onClick={(e) => {
                    setProductLineId(product.id);
                    setIsRequest(true);
                  }}
                >
                  {' '}
                  Sản xuất{' '}
                </td>
                <td
                  className="xoadongSP"
                  onClick={() => handleRemoveProduct(product.id)}
                >
                  Xóa
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {isRequest && (
          <YeucauSXForm
            setIsRequest={setIsRequest}
            productLineId={productLineId}
          />
        )}
        {/* <div className="list__btn" onClick={() => setIsAddProduct(true)}> */}
        {
          <div
            className="list__btn"
            onClick={() => {
              setIsAddProduct(!isAddProduct);
            }}
          >
            Thêm dòng sản phẩm mới
          </div>
        }
        {/* Render the AddProduct component if the isAddProduct state is true */}
        {isAddProduct && (
          <AddProduct
            onAddProduct={handleAddProduct}
            onCancel={() => setIsAddProduct(false)}
          />
        )}
      </div>
      <Footer />
    </>
  );
};

export default product;
