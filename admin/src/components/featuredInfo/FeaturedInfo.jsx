import "./featuredInfo.css";

export default function FeaturedInfo({ users, posts, comments }) {
  return (
    <div className="featured">
      <div className="featuredItem">
        <span className="featuredTitle">Users</span>
        <div className="featuredMoneyContainer">
          <span className="featuredMoney">{users?.length} </span>
        </div>
      </div>
      <div className="featuredItem">
        <span className="featuredTitle">Likes</span>
        <div className="featuredMoneyContainer">
          <span className="featuredMoney">{posts}</span>
        </div>
      </div>
      <div className="featuredItem">
        <span className="featuredTitle">Comments</span>
        <div className="featuredMoneyContainer">
          <span className="featuredMoney">{comments}</span>
        </div>
      </div>
    </div>
  );
}
