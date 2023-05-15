import { Publish } from "@material-ui/icons";
import { useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import "./newProductt.css";

export default function NewProduct() {
    const [content, setContent] = useState("");
    const [detail, setDetail] = useState("");
    const [link, setLink] = useState("");
    const [image, setImage] = useState("");
    const [imgDefault, setImgDefault] = useState(
        "https://cdn.brvn.vn/users/200px/2017/24949_Advertising-Vietnam_1507541235.png"
    );
    const history = useHistory();
    let { userId } = useParams();

    const handleUpImage = async images => {
        setImgDefault(URL.createObjectURL(images.target.files[0]));
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
        setImage(imgArr[0].url);
    };

    const handleSubmitForm = async e => {
        try {
            e.preventDefault();
            const url = `http://localhost:5000/api/data/advertisiment/create`;
            const data = {
                content,
                link,
                detail,
                image,
            };
            const check = await fetch(url, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
            });
            if (check) {
                await history.push("/advertisiment");
            }
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <div className="user">
            <div className="userTitleContainer">
                <h1 className="userTitle">Create Advertisiment</h1>
            </div>
            <div className="userContainer">
                <div className="userUpdate">
                    <span className="userUpdateTitle">Create</span>
                    <form className="userUpdateForm">
                        <div className="userUpdateLeft">
                            <div className="userUpdateItem">
                                <label>Content</label>
                                <input
                                    type="text"
                                    value={content}
                                    className="userUpdateInput"
                                    onChange={e => setContent(e.target.value)}
                                />
                            </div>
                            <div className="userUpdateItem">
                                <label>Detail</label>
                                <input
                                    type="text"
                                    value={detail}
                                    className="userUpdateInput"
                                    onChange={e => setDetail(e.target.value)}
                                />
                            </div>
                            <div className="userUpdateItem">
                                <label>Link</label>
                                <input
                                    type="text"
                                    value={link}
                                    className="userUpdateInput"
                                    onChange={e => setLink(e.target.value)}
                                />
                            </div>
                        </div>
                        <div className="userUpdateRight">
                            <div className="userUpdateUpload">
                                <img
                                    className="userUpdateImg imgZoom"
                                    src={imgDefault}
                                    alt=""
                                />
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
                            <button
                                className="userUpdateButton"
                                onClick={e => handleSubmitForm(e)}
                                type="button"
                                style={{
                                    width: "90%",
                                    marginTop: "10px",
                                    padding: "10px",
                                }}
                            >
                                Update
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}
