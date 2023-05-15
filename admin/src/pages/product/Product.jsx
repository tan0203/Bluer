import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useHistory, useParams } from "react-router-dom";
import "./product.css";

export default function Product() {
    const { productId } = useParams();
    const [product, set_product] = useState({});
    const [userPost, setUserPost] = useState({});
    const [postContent, setPostContent] = useState("");
    const history = useHistory();

    const getProduct = async () => {
        try {
            const result = await axios.get(
                "http://localhost:5000/api/admin/post/" + productId
            );
            const { post } = result.data;
            set_product(post);
            setPostContent(post.content);
            const user = await handlerGetUser(post);
            setUserPost(user);
        } catch (error) {
            console.error(error);
        }
    };

    const handlerGetUser = async result => {
        try {
            const user = await axios(
                `http://localhost:5000/api/data/user/${result.user}`
            );
            return user.data;
        } catch (error) {
            console.error(error);
            return null;
        }
    };

    const handleUpdatePost = async e => {
        try {
            e.preventDefault();
            const url = `http://localhost:5000/api/data/post/${productId}/edit`;
            const data = {
                content: postContent,
            };
            const call = await fetch(url, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
            });
            if (call) {
                await history.push("/products");
            }
        } catch (err) {
            console.log(err);
        }
    };

    useEffect(() => {
        getProduct();
    }, []);
    return (
        <div className="product">
            <div className="productTitleContainer">
                <h1 className="productTitle">Post</h1>
                <Link to="/newpost/" id="hihi">
                    <button className="productAddButton">Create</button>
                </Link>
            </div>
            <div className="productTop">
                <div className="productTopRight">
                    <div className="productInfoTop">
                        <img
                            src={userPost?.avatar}
                            alt=""
                            className="productInfoImg"
                        />
                        <span className="productName">
                            {userPost?.fullname}
                        </span>
                    </div>
                    <div className="productInfoBottom">
                        <div className="userUpdateItem">
                            <label>ID Post:</label>
                            <span>{product._id}</span>
                        </div>
                        <div className="userUpdateItem">
                            <label>Content Post</label>
                            <input
                                type="text"
                                value={postContent}
                                className="userUpdateInput"
                                onChange={e => setPostContent(e.target.value)}
                            />
                        </div>
                        <div className="userUpdateItem">
                            <label>Like Of Post:</label>
                            <span>{product?.likes?.length}</span>
                        </div>
                        <div className="userUpdateItem">
                            <label>Comments Of Post:</label>
                            <span> {product?.comments?.length}</span>
                        </div>
                        <div className="userUpdateItem">
                            {product.images
                                ?.filter(img => Object.keys(img).length !== 0)
                                .map(img => (
                                    <div className="productInfoItem">
                                        <img
                                            src={img.url}
                                            alt=""
                                            className="productUploadImg"
                                        />
                                    </div>
                                ))}
                        </div>
                    </div>
                    <div
                        className="userUpdateItem"
                        style={{ width: "70%", margin: "0 auto" }}
                    >
                        <button
                            className="productButton"
                            onClick={e => handleUpdatePost(e)}
                        >
                            Update
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
