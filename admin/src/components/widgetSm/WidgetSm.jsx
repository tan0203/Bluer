import "./widgetSm.css";
import { Visibility } from "@material-ui/icons";

export default function WidgetSm({ users }) {
  return (
    <div className="widgetSm">
      <span className="widgetSmTitle">New Join Members</span>
      <ul className="widgetSmList">
        {users?.slice(0, 6)?.map((user) => (
          <li key={user.id} className="widgetSmListItem">
            <img src={user.avatar} alt="" className="widgetSmImg" />
            <div className="widgetSmUser">
              <span className="widgetSmUsername">{user.username}</span>
              <span className="widgetSmUserTitle">{user.title}</span>
            </div>
            <button className="widgetSmButton">
              <Visibility className="widgetSmIcon" />
              View User
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
