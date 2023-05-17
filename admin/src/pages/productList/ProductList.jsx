import React, {
    useState,
    useEffect,
    useCallback,
    useMemo,
    useRef,
} from "react";
import axios from "axios";
import { DataGrid } from "@material-ui/data-grid";
import { DeleteOutline } from "@material-ui/icons";
import { Link } from "react-router-dom";
import { debounce } from "lodash";
import Loading from "../../components/loading/Loading";

export default function ProductList() {
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState([]);
    const searchInputRef = useRef();
    const [searchValue, setSearchValue] = useState("");

    const handleSearchContent = () => {
        setSearchValue(searchInputRef.current.value);
    };

    const getAllPost = useCallback(async () => {
        try {
            const result = await axios.get(
                "http://localhost:5000/api/admin/posts"
            );
            const { posts } = result.data;

            const updatedPosts = await Promise.all(
                posts.map(async post => {
                    const username = await handlerGetUserName(post);
                    return {
                        ...post,
                        id: post._id,
                        lengthLikes: post.likes.length,
                        lengthComments: post.comments.length,
                        username: username,
                    };
                })
            );

            const filteredPosts = updatedPosts.filter(post =>
                post.content.includes(searchValue)
            );

            setData(filteredPosts);
            setLoading(false);
        } catch (error) {
            console.error(error);
        }
    }, [searchValue]);

    const handlerGetUserName = useCallback(async post => {
        try {
            const user = await axios.get(
                `http://localhost:5000/api/data/user/${post.user}`
            );
            const userName = user.data;
            return userName.fullname;
        } catch (error) {
            console.error(error);
        }
    }, []);

    useEffect(() => {
        const searchDebounce = debounce(getAllPost, 300);
        searchDebounce();
        return () => {
            searchDebounce.cancel();
        };
    }, [searchValue, getAllPost]);

    const handleDelete = async id => {
        try {
            await fetch(`http://localhost:5000/api/data/post/${id}/delete`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                },
            });
            getAllPost();
        } catch (error) {
            console.error(error);
        }
    };

    const columns = useMemo(
        () => [
            { field: "id", headerName: "ID", width: 200 },
            { field: "username", headerName: "UserName", width: 200 },
            { field: "content", headerName: "Content", width: 200 },
            { field: "lengthLikes", headerName: "Like", width: 200 },
            { field: "lengthComments", headerName: "Comments", width: 200 },
            {
                field: "action",
                headerName: "Action",
                width: 150,
                renderCell: params => {
                    return (
                        <>
                            <Link to={"/product/" + params.row.id}>
                                <button className="productListEdit">
                                    Edit
                                </button>
                            </Link>
                            <DeleteOutline
                                className="productListDelete"
                                onClick={() => handleDelete(params.row.id)}
                            />
                        </>
                    );
                },
            },
        ],
        []
    );

    return (
        <div className="productList">
            {loading ? (
                <Loading />
            ) : (
                <>
                    <input
                        type="text"
                        ref={searchInputRef}
                        value={searchValue}
                        onChange={handleSearchContent}
                        placeholder="Search"
                        className="searchInput"
                    />
                    <DataGrid
                        rows={data}
                        disableSelectionOnClick
                        columns={columns}
                        pageSize={10}
                        // checkboxSelection
                    />
                </>
            )}
        </div>
    );
}
