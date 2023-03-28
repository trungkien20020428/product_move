export const NewProductForm = () => {
    return (
      <div className="dongSPmoi__form">
        <div className="notication">
          <p>Dòng sản phẩm mới</p>
        </div>
        <div>
          <p className="tagnameform"> Tên sản phẩm </p>
          <input type="text" className="infoForm" placeholder=" Xe bán tải bản 2016  " />
        </div>
        <div>
          <p className="tagnameform"> Dòng sản phẩm </p>
          <input type="text" className="infoForm" placeholder=" Xe bán tải " />
        </div>
        <div>
          <p className="tagnameform"> Mã sản phẩm </p>
          <input type="text" className="infoForm" placeholder=" AS2016 " />
        </div>
        <div className="btn">
          <p> Tạo dòng sản phẩm </p>
        </div>
      </div>
    );
  };