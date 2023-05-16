import "./userList.css";
import { DataGrid } from "@material-ui/data-grid";
import { DeleteOutline } from "@material-ui/icons";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import Loading from "../../components/loading/Loading";

export default function UserList() {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchValue, setSearchValue] = useState("");

    const handleSeachUser = e => {
        setSearchValue(e.target.value);
    };

    const handleDelete = async id => {
        await fetch(`http://localhost:5000/api/data/user/${id}/delete`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
            },
        })
            .then(() => {
                getAllUser();
            })
            .catch(err => console.log(err));
    };

    const getAllUser = () => {
        fetch("http://localhost:5000/api/data")
            .then(response => response.json())
            .then(data => {
                const newData = data
                    .filter(row => row.username.includes(searchValue))
                    .map(row => ({
                        ...row,
                        id: row._id,
                        followLength: row?.following.length,
                    }));
                setData(newData);
                setLoading(false);
            })
            .catch(err => console.log(err));
    };

    useEffect(() => {
        getAllUser();
        return () => {
            setData([]);
        };
    }, [searchValue]);

    const columns = [
        { field: "id", headerName: "ID", width: 200 },
        { field: "email", headerName: "Email", width: 200 },
        {
            field: "gender",
            headerName: "Gender",
            width: 120,
        },
        {
            field: "username",
            headerName: "User Name",
            width: 200,
        },
        {
            field: "fullname",
            headerName: "User",
            width: 200,
            renderCell: params => {
                return (
                    <div className="userListUser">
                        <img
                            className="userListImg"
                            src={params.row.avatar}
                            alt=""
                        />
                        {params.row.fullname}
                    </div>
                );
            },
        },
        {
            field: "followLength",
            headerName: "Following",
            width: 120,
        },
        {
            field: "action",
            headerName: "Action",
            width: 150,
            renderCell: params => {
                return (
                    <>
                        <Link to={"/user/" + params.row._id}>
                            <button className="userListEdit">Edit</button>
                        </Link>
                        <DeleteOutline
                            className="userListDelete"
                            onClick={() => handleDelete(params.row._id)}
                        />
                    </>
                );
            },
        },
    ];

    return (
        <div className="userList">
            {loading ? (
                <Loading />
            ) : (
                <>
                    <h1 className="userTitle">Edit User</h1>
                    <div className="userTitleContainer">
                        <input
                            type="text"
                            value={searchValue}
                            onChange={event => handleSeachUser(event)}
                            placeholder="Search by username"
                            className="searchInput"
                        />
                        <Link to="/newUser">
                            <button className="userAddButton">Create</button>
                        </Link>
                    </div>

                    <DataGrid
                        rows={data}
                        disableSelectionOnClick
                        columns={columns}
                        pageSize={10}
                        checkboxSelection
                    />
                </>
            )}
        </div>
    );
}
