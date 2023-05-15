import Sidebar from "./components/sidebar/Sidebar";
import Topbar from "./components/topbar/Topbar";
import "./App.css";
import Home from "./pages/home/Home";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import UserList from "./pages/userList/UserList";
import User from "./pages/user/User";
import NewUser from "./pages/newUser/NewUser";
import ProductList from "./pages/productList/ProductList";
import Product from "./pages/product/Product";
import NewProduct from "./pages/newProduct/NewProduct";
import AdvertisementList from "./pages/advertisementList/AdvertisementList";
import Advertisement from "./pages/advertisiment/Advertisement";
import NewAdvertisiment from "./pages/newAdvertisiment/NewAdvertisiment";
import NewPost from "./pages/newPost/NewPost";

function App() {
    return (
        <Router>
            <Topbar />
            <div className="container">
                <Sidebar />
                <Switch>
                    <Route exact path="/">
                        <Home />
                    </Route>
                    <Route path="/users">
                        <UserList />
                    </Route>
                    <Route path="/user/:userId">
                        <User />
                    </Route>
                    <Route path="/newUser">
                        <NewUser />
                    </Route>
                    <Route path="/posts">
                        <ProductList />
                    </Route>
                    <Route path="/cc">
                        <ProductList />
                    </Route>
                    <Route path="/advertisiment">
                        <AdvertisementList />
                    </Route>
                    <Route path="/advertisement/:advertisementId">
                        <Advertisement />
                    </Route>
                    <Route path="/product/:productId">
                        <Product />
                    </Route>
                    <Route path="/newproduct">
                        <NewProduct />
                    </Route>
                    <Route path="/newpost">
                        <NewPost/>
                    </Route>
                    <Route path="/newAdvertisiment">
                        <NewAdvertisiment />
                    </Route>
                </Switch>
            </div>
        </Router>
    );
}

export default App;
