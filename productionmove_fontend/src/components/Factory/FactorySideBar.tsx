import { useRouter } from 'next/router';

export const FactorySideBar = (content: any) => {
  const router = useRouter();
  const MoveToProduct = () => {
    router.push('moveProduct');
  };
  const moveToListRequest = () => {
    router.push('listRequest');
  };
  const moveToReciveFactory = () => {
    router.push('reciveFactory');
  };
  return (
    <>
      <div className="sidebar">
        <div className="sidebar__container" onClick={() => router.push('main')}>
          <p>Trang chủ</p>
        </div>
        <div className="sidebar__container" onClick={moveToListRequest}>
          <p>Nhận yêu cầu sản xuất</p>
        </div>
        <div className="sidebar__container" onClick={MoveToProduct}>
          <p>Xuất sản phẩm</p>
        </div>
        <div className="sidebar__container" onClick={moveToReciveFactory}>
          <p>Nhận sản phẩm</p>
        </div>
      </div>
    </>
  );
};
