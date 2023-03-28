import { useRouter } from 'next/router';

export const DistributionSideBar = () => {
  const router = useRouter();
  return (
    <>
      <div className="sidebar">
        <div className="sidebar__container" onClick={() => router.push('main')}>
          <p>Trang chủ</p>
        </div>
        <div
          className="sidebar__container"
          onClick={() => router.push('recive')}
        >
          <p>Nhập sản phẩm</p>
        </div>
        <div
          className="sidebar__container"
          onClick={() => router.push('productInformation')}
        >
          <p>Thông tin sản phẩm</p>
        </div>
        <div
          className="sidebar__container"
          onClick={() => router.push('productSale')}
        >
          <p>Bán sản phẩm </p>
        </div>
        <div
          className="sidebar__container"
          onClick={() => router.push('moveProduct')}
        >
          <p>Xuất sản phẩm </p>
        </div>
      </div>
    </>
  );
};
