import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import MonetizationOnOutlinedIcon from "@mui/icons-material/MonetizationOnOutlined";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import PlaylistAddCheckOutlinedIcon from "@mui/icons-material/PlaylistAddCheckOutlined";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import { Link } from "react-router-dom";
import "./Widget.scss";
const Widget = ({ info }) => {
  let data;
  switch (info.type) {
    case "user":
      data = {
        title: "USERS",
        quantity: info.qty,
        link: "See All Users",
        url: info.url,
        icon: <PersonOutlinedIcon className="icon" />,
      };
      break;
    case "order":
      data = {
        title: "ORDER",
        quantity: info.qty,
        url: info.url,

        link: "See All Orders",
        icon: <ShoppingCartOutlinedIcon className="icon" />,
      };
      break;
    case "earnings":
      data = {
        title: "EARNINGS",
        url: info.url,
        quantity: info.qty,
        link: "View net earnings",
        icon: <MonetizationOnOutlinedIcon className="icon" />,
      };
      break;
    case "products":
      data = {
        title: "PRODUCTS",
        url: info.url,
        quantity: info.qty,
        link: "See All Products",
        icon: <PlaylistAddCheckOutlinedIcon className="icon" />,
      };
      break;
    default:
      break;
  }

  return (
    <div className="widget">
      <div className="left">
        <span className="title">{data?.title}</span>
        <span className="counter">{data.quantity}</span>
        <Link className="link" to={data.url}>
          {data?.link}
        </Link>
      </div>
      <div className="right">
        <div className="percentage positive">
          <KeyboardArrowUpIcon />
          50%
        </div>
        {data?.icon}
      </div>
    </div>
  );
};

export default Widget;
