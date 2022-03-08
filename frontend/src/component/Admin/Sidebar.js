import AddIcon from "@mui/icons-material/Add";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ListAltIcon from "@mui/icons-material/ListAlt";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import PostAddIcon from "@mui/icons-material/PostAdd";
import RateReviewIcon from "@mui/icons-material/RateReview";
import TreeItem from "@mui/lab/TreeItem";
import TreeView from "@mui/lab/TreeView";
import React from "react";
import { Link } from "react-router-dom";
import Logo from "../../images/profile.png";
import "./Sidebar.css";

const Sidebar = () => {
  return (
    <div>
      <div className="sidebar">
        <Link to="/">
          <img src={Logo} alt="Ecommerce" />
        </Link>
        <Link to="/admin/dashboard">
          <p>Dashboard</p>
        </Link>

        <TreeView
          defaultCollapseIcon={<ExpandMoreIcon />}
          defaultExpandIcon={<ChevronRightIcon />}
        >
          <TreeItem nodeId="1" label="Products">
            <Link to="/admin/products">
              <TreeItem nodeId="2" label="All" icon={<PostAddIcon />} />
            </Link>
            <Link to="/admin/product">
              <TreeItem nodeId="3" label="Create" icon={<AddIcon />} />
            </Link>
          </TreeItem>
        </TreeView>
        <Link to="/admin/orders">
          <p>
            <ListAltIcon /> Orders
          </p>
        </Link>
        <Link to="/admin/users">
          <p>
            <PeopleAltIcon /> Users
          </p>
        </Link>
        <Link to="/admin/reviews">
          <p>
            <RateReviewIcon /> Reviews
          </p>
        </Link>
      </div>
    </div>
  );
};

export default Sidebar;
