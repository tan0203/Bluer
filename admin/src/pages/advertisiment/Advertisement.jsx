import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useHistory, useParams } from "react-router-dom";
import "./product.css";
import { Publish } from "@material-ui/icons";

export default function Advertisiment() {
    const productId = useParams();
    const [product, set_product] = useState({});
    const [postContent, setPostContent] = useState("");
    const [detailContent, setDetailContent] = useState("");
    const [linkContent, setLinkContent] = useState("");
    const [image, setImage] = useState("");
    const [linkImg, setLinkImg] = useState("");
    const history = useHistory();

    const handleUpImage = async images => {
        images.preventDefault();
        setImage(URL.createObjectURL(images.target.files[0]));
        let imgArr = [];
        const formData = new FormData();

        formData.append("file", images.target.files[0]);
        formData.append("upload_preset", "zzimaj7n");
        formData.append("cloud_name", "dkwl9cttg");

        const res = await fetch(
            "https://api.cloudinary.com/v1_1/dkwl9cttg/image/upload",
            {
                method: "POST",
                body: formData,
            }
        );

        const result = await res.json();
        imgArr.push({
            public_id: result.public_id,
            url: result.secure_url,
        });
        setLinkImg(imgArr[0].url);
    };

    const getProduct = async () => {
        try {
            const result = await axios.get(
                "http://localhost:5000/api/data/advertisiment/" +
                    productId.advertisementId
            );
            const post = result.data;
            set_product(post);
            setPostContent(post.content);
            setLinkContent(post.link);
            setDetailContent(post.detail);
            setImage(post.image);
        } catch (error) {
            console.error(error);
        }
    };

    const handleUpdatePost = async e => {
        try {
            e.preventDefault();
            const url = `http://localhost:5000/api/data/advertisiment/${productId.advertisementId}/edit`;
            const data = {
                content: postContent,
                image: linkImg,
                detail: detailContent,
                link: linkContent,
            };
            await fetch(url, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
            });
            await history.push("/advertisiment");
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
                <h1 className="productTitle">Advertisiment</h1>
                <Link to="/newAdvertisiment">
                    <button className="productAddButton">Create</button>
                </Link>
            </div>
            <div className="productTop">
                <div className="productTopRight">
                    <div className="userUpdateForm">
                        <div className="userUpdateLeft">
                            <div className="productInfoTop imgInfo">
                                <img src={image} alt="Link to Advertisiment" className="cssImg"/>
                            </div>
                        </div>
                        <div className="userUpdateRight mtr">
                            <div className="userUpdateUpload">
                                <label htmlFor="file">
                                    <Publish className="userUpdateIcon" />
                                </label>
                                <input
                                    type="file"
                                    id="file"
                                    style={{ display: "none" }}
                                    onChange={e => handleUpImage(e)}
                                />
                            </div>
                        </div>
                    </div>
                    <div className="productInfoBottom">
                        <div className="userUpdateItem">
                            <label>ID Post:</label>
                            <span>{product._id}</span>
                        </div>
                        <div className="userUpdateItem">
                            <label>Content Of Advertisiment</label>
                            <input
                                type="text"
                                value={postContent}
                                className="userUpdateInput"
                                onChange={e => setPostContent(e.target.value)}
                            />
                        </div>
                        <div className="userUpdateItem">
                            <label>Detail Of Advertisiment</label>
                            <input
                                type="text"
                                value={detailContent}
                                className="userUpdateInput"
                                onChange={e => setDetailContent(e.target.value)}
                            />
                        </div>
                        <div className="userUpdateItem">
                            <label>Link Of Advertisiment</label>
                            <input
                                type="text"
                                value={linkContent}
                                className="userUpdateInput"
                                onChange={e => setLinkContent(e.target.value)}
                            />
                        </div>
                    </div>
                    <div
                        className="userUpdateItem"
                        style={{ width: "70%", margin: "0 auto" }}
                    >
                        <button
                            className="productButton mtMPX"
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
