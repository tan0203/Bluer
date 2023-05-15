import "./productList.css";
import { DataGrid } from "@material-ui/data-grid";
import { DeleteOutline } from "@material-ui/icons";
import { Link } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import { useEffect } from "react";

export default function AdvertisementList() {
    const [data, setData] = useState([]);

    const getAllPost = async () => {
        try {
            const result = await axios(
                "http://localhost:5000/api/data/advertisiment"
            );
            let posts = result.data;
            const newPosts = posts.map(post => {
                return {
                    ...post,
                    id: post._id,
                };
            });
            setData(newPosts);
        } catch (error) {
            console.error(error);
        }
    };


    useEffect(() => {
        getAllPost();
        return setData([]);
    }, []);

    const handleDelete = async id => {

        try {
            await fetch(`http://localhost:5000/api/data/advertisiment/${id}/delete`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                },
            })
                .then(() => {
                    getAllPost();
                })
                .catch(err => console.log(err));
        } catch (error) {
            console.error(error);
        }
    };
    const columns = [
        { field: "id", headerName: "ID", width: 200 },
        { field: "image", headerName: "Image", width: 200 },
        { field: "content", headerName: "Content", width: 200 },
        { field: "detail", headerName: "Description", width: 200 },
        { field: "link", headerName: "Link", width: 200 },
        {
            field: "action",
            headerName: "Action",
            width: 150,
            renderCell: params => {
                return (
                    <>
                        <Link to={"/advertisement/" + params.row._id}>
                            <button className="productListEdit">Edit</button>
                        </Link>
                        <DeleteOutline
                            className="productListDelete"
                            onClick={() => handleDelete(params.row.id)}
                        />
                    </>
                );
            },
        },
    ];

    return (
        <div className="productList" style={{ width: "300px" }}>
            <DataGrid
                rows={data}
                disableSelectionOnClick
                columns={columns}
                pageSize={10}
                checkboxSelection
            />
        </div>
    );
}
