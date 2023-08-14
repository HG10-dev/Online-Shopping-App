import Header from "./AdminHeader";
import Dashboard from './Dashboard';
// import Footer from "./CustomerFooter";
import "../Customer/Customer.css"
import Product from "./Product";
import react, { useContext, useEffect, useState } from "react";
import { Route, Routes, useNavigate } from "react-router";
import UserContext from '../../ContextData/User/UserContext';
import axios from '../../Axios';
import product from "./Product";
import { Container } from "react-bootstrap";
import EditItem from "./EditItem";
import AddNew from './AddNew';

const AdminPortal = () => {

    const { login, setLogin } = useContext(UserContext);
    const [products, setProducts] = useState([]);
    const navigate = useNavigate()
    const [loading, setLoading] = useState(0);
    const [isEditing, setIsEditing] = useState(0);
    const [classLoad, setClassLoad] = useState("");
    let productYettoLoad = true;

    const loginFirst = () => {
        alert("You are not logged in");
        navigate('/Login');
    }

    let initialRender = true;

    useEffect(() => {

        console.log("useEffect executing");
        const fetchProducts = async () => {
            try {
                console.log("abc" + login.token + "paq");
                console.log(loading);
                await axios.get(
                    "/all", {
                    headers: {
                        Authorization: "Bearer " + login.token
                    }
                }
                ).then((res) => {
                    handleResponse(res);
                })
            } catch (e) {
                if (e.response) {
                    console.log(e.response.data, e.response.status);
                } else {
                    console.log(e);
                    if (e.message === "Network Error") {
                        navigate("/Login");
                    }
                }

                handleResponse(e.response);
            }
        }
        if (initialRender) {
            initialRender = false;
            console.log(login);
            if (!login.token || login.token.trim() === "") {
                console.log("Redirecting");
                navigate("/Login");
                loginFirst();
            } else {
                console.log(login);
                if (productYettoLoad) {
                    setLoading(1);
                    console.log(loading);
                    fetchProducts();
                }
            }
        }


    }, []);

    const handleResponse = (res) => {
        console.log("Handling response");
        if (productYettoLoad) {
            // if(products.length >= 1){return}
            switch (res.status) {
                case 200:
                    const temp = res.data.filter(x => true);
                    console.log(temp);
                    setProducts(() => {
                        return [...temp]
                    });
                    productYettoLoad = false;
                    console.log(products);
                    break;

                case 401:
                    console.log("Unauthorized");
                    setLoading(0);
                    console.log("Redirecting");
                    loginFirst();
                    break;

                default:
                    setLoading(0)
                    alert("! Something went wrong. Please login again");
                    console.log("Gone wrong...Redirecting");
                    navigate('/Login');
                    break;
            }
        }
    }

    useEffect(() => {
        console.log("product useEffect");
        console.log(initialRender);
        if (!initialRender) {
            console.log(products);
            if (loading === 1) {
                setLoading(0);
            }
            if (loading === 0) {
                setClassLoad("d-none");
                console.log(loading);
                navigate("/AdminPortal/dashboard")
            }
            console.log(loading);
        }
    }, [products]);

    // useEffect(() => {
        
    // }, [loading]);

    const logOut = () => {
        alert("Logging you out");
        console.log("Logging Out");
        setLogin({});
        navigate('/Login');
    }

    const goHome = () => navigate("/AdminPortal/dashboard")

    // let itemToEdit;
    // const handleEdit = (item) => {
    //     itemToEdit = item;
    //     setIsEditing(1);
    // }

    // const deleteHandler = (item) => { }

    return (
        <>
            {/* <!--Main Navigation--> */}
            <Header name={login.username} changeHandler={logOut} clicked={goHome} />
            {/* // <!-- sidebar + content --> */}
            <h1 className={classLoad}>Loading...</h1>
            {/* <AddNew/> */}
            <section className="">
                <UserContext.Provider value={{ login, setLogin, products, setProducts }}>
                    <Routes>
                        <Route path="/dashboard" element={<Dashboard />} />
                        <Route path="/update" Component={EditItem} />
                        <Route path="/addNew" Component={AddNew} />
                    </Routes>
                </UserContext.Provider>

            </section>
            {/* // <!-- Footer --> */}
            {/* <Footer /> */}
            {/* // <!-- Footer --> */}
        </>
    );
}

export default AdminPortal;