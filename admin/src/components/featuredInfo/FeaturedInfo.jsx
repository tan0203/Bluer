import "./featuredInfo.css";
import { ArrowDownward, ArrowUpward } from "@material-ui/icons";

export default function FeaturedInfo({ users, posts, comments }) {
    return (
        <div className="featured">
            <div className="featuredItem">
                <span className="featuredTitle">Users</span>
                <div className="featuredMoneyContainer">
                    <span className="featuredMoney">{users?.length}</span>
                </div>
                <span className="featuredSub">Compared to last month</span>
            </div>
            <div className="featuredItem">
                <span className="featuredTitle">Likes</span>
                <div className="featuredMoneyContainer">
                    <span className="featuredMoney">{posts}</span>
                </div>
                <span className="featuredSub">Compared to last month</span>
            </div>
            <div className="featuredItem">
                <span className="featuredTitle">Comments</span>
                <div className="featuredMoneyContainer">
                    <span className="featuredMoney">{comments}</span>
                </div>
                <span className="featuredSub">Compared to last month</span>
            </div>
        </div>
    );
}
