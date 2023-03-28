import { useRouter } from 'next/router';

export const DirectorSideBar = (content: any) => {
  const router = useRouter();
  const moveToManageAccount = () => {
    router.push('account');
  };
  const moveToManageProduct = () => {
    router.push('product');
  };
  return (
    <>
      <div className="sidebar">
        <div className="sidebar__container" onClick={() => router.push('main')}>
          <div>
            <p>Trang chủ</p>
          </div>
        </div>
        <div className="sidebar__container" onClick={moveToManageProduct}>
          <div>
            <p>Quản lý dòng sản phẩm</p>
          </div>
        </div>
        <div className="sidebar__container" onClick={moveToManageAccount}>
          <div>
            <p>Quản lý tài khoản</p>
          </div>
        </div>
      </div>
    </>
  );
};
