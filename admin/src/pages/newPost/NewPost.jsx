import { Publish } from "@material-ui/icons";
import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import "./newProducttt.css";

export default function NewPost() {
    const [content, setContent] = useState("");
    const [image, setImage] = useState("");
    const [dataUser, setDataUser] = useState([]);
    const [idUserPost, setIdUserPost] = useState("");
    const [imgDefault, setImgDefault] = useState(
        "https://www.pngkey.com/png/detail/238-2384948_clickhere-uparrow-blue-click-here-arrow-up.png"
    );
    const history = useHistory();

    const getAllUser = async () => {
        await fetch("http://localhost:5000/api/data")
            .then(response => response.json())
            .then(data => {
                const newData = data?.map(row => ({
                    ...row,
                    id: row._id,
                    followLength: row.following.length,
                    // fullname: row.firstName + " " + row.lastName,
                }));
                setDataUser(newData);
                setIdUserPost(newData[0]?.id);
            })
            .catch(err => console.log(err));
    };

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
        let link = "";
        if (image.length > 0) {
            link = image;
        } else {
            link = imgDefault;
        }
        const obj = {
            url: link,
        };
        console.log(link)
        try {
            e.preventDefault();
            const url = `http://localhost:5000/api/data/post/create`;
            const data = {
                id: idUserPost,
                content,
                image: obj,
            };
            const check = await fetch(url, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
            });
            if (check) {
                await history.push("/posts");
            }
        } catch (err) {
            console.log(err);
        }
    };

    useEffect(() => {
        getAllUser();
        return () => {};
    }, []);

    return (
        <div className="user">
            <div className="userTitleContainer">
                <h1 className="userTitle">Create Post</h1>
            </div>
            <div className="userContainer">
                <div className="userUpdate">
                    <span className="userUpdateTitle">Create</span>
                    <form className="userUpdateForm">
                        <div className="userUpdateLeft">
                            <div className="addProductItem">
                                <label>User</label>
                                <select
                                    name="active"
                                    id="active"
                                    onChange={e =>
                                        setIdUserPost(e.target.value)
                                    }
                                >
                                    {dataUser.map(user => (
                                        <option value={user.id}>
                                            {user.fullname}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div className="userUpdateItem">
                                <label>Content</label>
                                <input
                                    type="text"
                                    value={content}
                                    className="userUpdateInput"
                                    onChange={e => setContent(e.target.value)}
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
                                Create
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}
