import "./widgetSm.css";
import { Visibility } from "@material-ui/icons";

export default function WidgetSm({ users }) {
    return (
        <div className="widgetLg">
            <span className="widgetSmTitle">New Join Members</span>
            <ul className="widgetSmList">
                {users?.slice(0, 6)?.map(user => {
                    return (
                        <li className="widgetSmListItem">
                            <img
                                src={user.avatar}
                                alt=""
                                className="widgetSmImg"
                            />
                            <div className="widgetSmUser">
                                <span className="widgetSmUsername">
                                    {user.username}
                                </span>
                                <span className="widgetSmUserTitle">
                                    {"XXX"}
                                </span>
                            </div>
                            <button className="widgetSmButton">
                                <Visibility className="widgetSmIcon" />
                                Display
                            </button>
                        </li>
                    );
                })}
            </ul>
        </div>
    );
}
