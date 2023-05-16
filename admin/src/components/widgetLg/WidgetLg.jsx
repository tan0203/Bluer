import "./widgetLg.css";

export default function WidgetLg({ users }) {
    console.log(users);
    return (
        <div className="widgetLg">
            <h3 className="widgetLgTitle">New Join Member</h3>
            <table className="widgetLgTable">
                <tr className="widgetLgTr">
                    <th className="widgetLgTh">Full Name</th>
                    <th className="widgetLgTh">UserName</th>
                    <th className="widgetLgTh">Email</th>
                    <th className="widgetLgTh">Role</th>
                    <th className="widgetLgTh">Date</th>
                </tr>
                {users?.slice(0, 6)?.map(user => (
                    <tr className="widgetLgTr">
                        <td className="widgetLgUser">
                            <img
                                src={user.avatar}
                                alt=""
                                className="widgetLgImg"
                            />
                            <span className="widgetLgName">
                                {user.fullname}
                            </span>
                        </td>
                        <td className="widgetLgAmount">{user.username}</td>
                        <td className="widgetLgAmount">{user.email}</td>
                        <td className="widgetLgAmount">{user.role}</td>
                        <td className="widgetLgDate">
                            {user.updatedAt.slice(0, 10)}
                        </td>
                    </tr>
                ))}
            </table>
        </div>
    );
}
