import { useState } from "react";
import { useHistory } from "react-router-dom";
import "./newUser.css";

export default function NewUser() {
    const [fullname, setFullname] = useState("");
    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [gender, setGender] = useState("male");
    const history = useHistory();

    const handleCreateUser = async e => {
        e.preventDefault();
        const dataUser = {
            fullname: fullname,
            email: email,
            password: password,
            username: username,
            gender: gender,
        };
        const url = `http://localhost:5000/api/data/user/newuser`;
        await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(dataUser),
        });
        history.push("/users");

    };
    return (
        <div className="newUser">
            <h1 className="newUserTitle">New User</h1>
            <form className="newUserForm">
                <div className="newUserItem">
                    <label>
                        Full Name <span style={{ color: "red" }}>*</span>
                    </label>
                    <input
                        type="text"
                        placeholder="John Smith"
                        onChange={e => setFullname(e.target.value)}
                    />
                </div>
                <div className="newUserItem">
                    <label>
                        User Name <span style={{ color: "red" }}>*</span>
                    </label>
                    <input
                        type="text"
                        placeholder="example_123"
                        onChange={e => setUsername(e.target.value)}
                    />
                </div>
                <div className="newUserItem">
                    <label>
                        Email <span style={{ color: "red" }}>*</span>
                    </label>
                    <input
                        type="email"
                        placeholder="john@gmail.com"
                        onChange={e => setEmail(e.target.value)}
                    />
                </div>
                <div className="newUserItem">
                    <label>
                        Password <span style={{ color: "red" }}>*</span>
                    </label>
                    <input
                        type="password"
                        placeholder="password"
                        onChange={e => setPassword(e.target.value)}
                    />
                </div>
                <div className="newUserItem">
                    <div className="rdb">
                        <div className="form-check form-check-inline">
                            <input
                                className="form-check-input"
                                type="radio"
                                name="inlineRadioOptions"
                                id="inlineRadio1"
                                defaultValue="option1"
                                checked={gender === "male"}
                                onChange={e => setGender("male")}
                            />
                            <label
                                className="form-check-label"
                                htmlFor="inlineRadio1"
                            >
                                Male
                            </label>
                        </div>
                        <div className="form-check form-check-inline">
                            <input
                                className="form-check-input"
                                type="radio"
                                name="inlineRadioOptions"
                                id="inlineRadio2"
                                defaultValue="option2"
                                checked={gender === "female"}
                                onChange={e => setGender("female")}
                            />
                            <label
                                className="form-check-label"
                                htmlFor="inlineRadio2"
                            >
                                Female
                            </label>
                        </div>
                        <div className="form-check form-check-inline">
                            <input
                                className="form-check-input"
                                type="radio"
                                name="inlineRadioOptions"
                                id="inlineRadio3"
                                defaultValue="option3"
                                checked={gender === "other"}
                                onChange={e => setGender("other")}
                            />
                            <label
                                className="form-check-label"
                                htmlFor="inlineRadio3"
                            >
                                Other
                            </label>
                        </div>
                    </div>
                </div>
                <div className="newUserItem">
                    <button
                        className="newUserButton"
                        onClick={e => handleCreateUser(e)}
                    >
                        Create
                    </button>
                </div>
            </form>
        </div>
    );
}
