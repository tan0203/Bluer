import "./productList.css";
import { DataGrid } from "@material-ui/data-grid";
import { DeleteOutline } from "@material-ui/icons";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import Loading from "../../components/loading/Loading";

export default function AdvertisementList() {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchValue, setSearchValue] = useState("");

    const handleSearchValue = e => {
        setSearchValue(e.target.value);
    };

    const getAllPost = async () => {
        try {
            const result = await axios(
                "http://localhost:5000/api/data/advertisiment"
            );
            const posts = result.data;
            const newPosts = posts.map(post => {
                return {
                    ...post,
                    id: post._id,
                };
            });
            setData(newPosts);
            setLoading(false);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        getAllPost();
        return () => setData([]);
    }, []);

    const handleDelete = async id => {
        try {
            await fetch(
                `http://localhost:5000/api/data/advertisiment/${id}/delete`,
                {
                    method: "DELETE",
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            );
            getAllPost();
        } catch (error) {
            console.error(error);
        }
    };

    const filteredData = data.filter(post =>
        post.content.toLowerCase().includes(searchValue.toLowerCase())
    );

    const columns = [
        { field: "id", headerName: "ID", width: 150  },
        { field: "image", headerName: "Image", width: 150 },
        { field: "time", headerName: "Time", width: 150 },
        { field: "content", headerName: "Content", width: 150 },
        { field: "detail", headerName: "Description", width: 150 },
        { field: "link", headerName: "Link", width: 150 },
        { field: "click", headerName: "Click", width: 150 },
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
            {loading ? (
                <Loading />
            ) : (
                <>
                    <h1 className="productTitle">Advertisiment</h1>
                    <div className="productTitleContainer">
                        <input
                            type="text"
                            value={searchValue}
                            onChange={event => handleSearchValue(event)}
                            placeholder="Search by content"
                            className="searchInput"
                        />
                        <Link to="/newAdvertisiment">
                            <button className="productAddButton">Create</button>
                        </Link>
                    </div>

                    <DataGrid
                        rows={filteredData}
                        disableSelectionOnClick
                        columns={columns}
                        pageSize={10}
                        checkboxSelection={false}
                    />
                </>
            )}
        </div>
    );
}
