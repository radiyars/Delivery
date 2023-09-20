import { Outlet } from "react-router-dom";
import Header from "../сomponents/Header";

const Mainlayout = () => {
  return (
    <div className="wrapper">
      <Header />
      <div className="content">
        <Outlet />
      </div>
    </div>
  );
};

export default Mainlayout;
