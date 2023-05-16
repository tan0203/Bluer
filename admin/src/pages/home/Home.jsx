import React, { useState, useEffect } from "react";
import axios from "axios";
import Chart from "../../components/chart/Chart";
import FeaturedInfo from "../../components/featuredInfo/FeaturedInfo";
import "./home.css";
import { userData } from "../../dummyData";
import WidgetLg from "../../components/widgetLg/WidgetLg";
import Loading from "../../components/loading/Loading";

export default function Home() {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [users, setUsersLastest] = useState([]);
  const [posts, set_posts] = useState(0);
  const [comments, set_comments] = useState(0);

  const getUserByMonth = async () => {
    // Simulate delay to see the loading component
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    try {
      const res = await axios.get("http://localhost:5000/api/users/register");
      const { users } = res.data;
      const result = userData.map(user => {
        const findUser = users.find(u => u._id.createMonth === user.num);
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
      setData(result);
      setLoading(false);
    } catch (error) {
      console.error(error);
    }
  };

  const getUserLastest = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/users/lastest");
      const { users } = res.data;
      setUsersLastest(users);
    } catch (error) {
      console.error(error);
    }
  };

  const getAllPosts = async () => {
    try {
      const result = await axios.get("http://localhost:5000/api/admin/posts");
      const { posts } = result.data;
      const count = posts.reduce((prevState, currentState) => {
        return prevState + (currentState?.likes?.length || 0);
      }, 0);
      const comments = posts.reduce((prevState, currentState) => {
        return prevState + (currentState?.comments?.length || 0);
      }, 0);
      set_posts(count);
      set_comments(comments);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getUserByMonth();
    getUserLastest();
    getAllPosts();
  }, []);

  return (
    <div className="home">
      {loading ? (
        <Loading />
      ) : (
        <>
          <FeaturedInfo users={users} posts={posts} comments={comments} />
          <Chart data={data} title="User Analytics" grid dataKey="total" />
          <div className="homeWidgets">
            <WidgetLg users={users} />
          </div>
        </>
      )}
    </div>
  );
}
