import { Outlet } from "react-router-dom";
import Header from "../сomponents/Header";

const Mainlayout: React.FC = () => {
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
