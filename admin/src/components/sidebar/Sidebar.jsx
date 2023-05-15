import {
  LineStyle,
  PermIdentity,
  Storefront
} from "@material-ui/icons";
import { Link } from "react-router-dom";
import "./sidebar.css";
import { AdbOutlined } from "@material-ui/icons";

export default function Sidebar() {
    return (
        <div className="sidebar">
            <div className="sidebarWrapper">
                <div className="sidebarMenu">
                    <h3 className="sidebarTitle">Dashboard</h3>
                    <ul className="sidebarList">
                        <Link to="/" className="link">
                            <li className="sidebarListItem active">
                                <LineStyle className="sidebarIcon" />
                                Home
                            </li>
                        </Link>
                    </ul>
                </div>
                <div className="sidebarMenu">
                    <h3 className="sidebarTitle">Quick Menu</h3>
                    <ul className="sidebarList">
                        <Link to="/users" className="link">
                            <li className="sidebarListItem">
                                <PermIdentity className="sidebarIcon" />
                                Users
                            </li>
                        </Link>
                        <Link to="/posts" className="link">
                            <li className="sidebarListItem">
                                <Storefront className="sidebarIcon" />
                                Posts
                            </li>
                        </Link>
                        <Link to="/advertisiment" className="link">
                            <li className="sidebarListItem">
                                <AdbOutlined className="sidebarIcon" />
                                Advitiserment
                            </li>
                        </Link>
                    </ul>
                </div>
            </div>
        </div>
    );
}
