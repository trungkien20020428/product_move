import { useRouter } from 'next/router';

export const SerivceCenterSidleBar = () => {
  const router = useRouter();
  return (
    <>
      <div className="sidebar">
        <div className="sidebar__container" onClick={() => router.push('main')}>
          <p>Trang chủ</p>
        </div>
        <div
          className="sidebar__container"
          onClick={() => router.push('reciveProduct')}
        >
          <p>Nhận sản phẩm</p>
        </div>
        <div
          className="sidebar__container"
          onClick={() => {
            router.push('repairProduct');
          }}
        >
          <p>bảo hành sản phẩm </p>
        </div>
        <div
          className="sidebar__container"
          onClick={() => {
            router.push('moveProductToFactory');
          }}
        >
          <p>Gửi sản phẩm </p>
        </div>
      </div>
    </>
  );
};
