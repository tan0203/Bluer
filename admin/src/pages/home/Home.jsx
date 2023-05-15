import Chart from "../../components/chart/Chart";
import FeaturedInfo from "../../components/featuredInfo/FeaturedInfo";
import "./home.css";
import { userData } from "../../dummyData";
import WidgetSm from "../../components/widgetSm/WidgetSm";
import WidgetLg from "../../components/widgetLg/WidgetLg";
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";

export default function Home() {
    const [data, setData] = useState([]);
    const [users, setUsersLastest] = useState([]);
    const [posts, set_posts] = useState(0);
    const [comments, set_comments] = useState(0);
    const getUserByMonth = async () => {
        const res = await axios("http://localhost:5000/api/users/register");
        const { users } = res.data;
        const result = userData.map(user => {
            const findUser = users.find(u => {
                return u._id.createMonth === user.num;
            });
            if (findUser) {
                return {
                    ...user,
                    total: findUser.total,
                };
            } else {
                return {
                    ...user,
                    total: 0,
                };
            }
        });
        setData([...result]);
    };
    const getUserLastest = async () => {
        const res = await axios("http://localhost:5000/api/users/lastest");
        const { users } = res.data;
        setUsersLastest([...users]);
    };
    const getAllPosts = async () => {
        const result = await axios("http://localhost:5000/api/admin/posts");
        const { posts } = result.data;
        const count = posts.reduce((prevState, currentState) => {
            return prevState + currentState?.likes?.length;
        }, 0);
        const comments = posts.reduce((prevState, currentState) => {
            return prevState + currentState?.comments?.length;
        }, 0);
        set_posts(count);
        set_comments(comments);
    };
    useEffect(() => {
        getUserByMonth();
        getUserLastest();
        getAllPosts();
    }, []);
    return (
        <div className="home">
            <FeaturedInfo users={users} posts={posts} comments={comments} />
            <Chart data={data} title="User Analytics" grid dataKey="total" />
            <div className="homeWidgets">
                {/* <WidgetLg /> */}
            </div>
                <WidgetSm users={users} />
        </div>
    );
}
