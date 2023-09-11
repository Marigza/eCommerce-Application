import { NavLink } from "react-router-dom";
import "./Category.scss";
import PhoneIphoneIcon from "@mui/icons-material/PhoneIphone";
import TabletMacIcon from "@mui/icons-material/TabletMac";
import LaptopMacIcon from "@mui/icons-material/LaptopMac";

const Category: React.FC = () => {
  return (
    <div className="catalog-categories">
      <NavLink
        to="phones"
        style={({ isActive }) => ({
          color: isActive ? "white" : "black",
          background: isActive ? "black" : "none",
        })}
      >
        <PhoneIphoneIcon style={{ fontSize: "5vh" }} />
        <p>Phones</p>
      </NavLink>
      <NavLink
        to="tablets"
        style={({ isActive }) => ({
          color: isActive ? "white" : "black",
          background: isActive ? "black" : "none",
        })}
      >
        <TabletMacIcon style={{ fontSize: "5vh" }} />
        <p>Tablets</p>
      </NavLink>
      <NavLink
        to="laptops"
        style={({ isActive }) => ({
          color: isActive ? "white" : "black",
          background: isActive ? "black" : "none",
        })}
      >
        <LaptopMacIcon style={{ fontSize: "5vh" }} />
        <p>Laptops</p>
      </NavLink>
    </div>
  );
};

export default Category;
