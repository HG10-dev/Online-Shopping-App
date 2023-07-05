import Container from "react-bootstrap/Container";
import Card from "../UI/Card/Card"
import "./Login.css";
import { useState, useContext, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { useNavigate } from "react-router";
import axios from '../Axios';
import UserContext from '../ContextData/User/UserContext';

const Login = () => {
    const initValues = { username: "", password: "" };
    const [formValues, setFormValues] = useState(initValues);
    const [formErrors, setFormErrors] = useState({});
    const [isSubmit, setIsSubmit] = useState(false);
    const [result, setResult] = useState({});
    const { login, setLogin } = useContext(UserContext);
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormValues({
            ...formValues,
            [name]: value
        });
    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        const val = validate(formValues);
        setFormErrors(val)
        console.log(Object.keys(val).length);

        if (Object.keys(val).length === 0) {
            const data = {
                username: formValues.username,
                password: formValues.password
            }
            try {
                await axios.post(
                    "/login",
                    data

                ).then( (res) => {
                    console.log(res);
                    // console.log(typeof(res.data));
                    setResult(res);

                    // console.log(result);
                });
            } catch (e) {
                console.log(e);
                console.log(e.response.data, e.response.status);
                if (e.response.status === 401) {
                    console.log("Unauthorized");
                    setResult({ status: 401 });
                }
                console.log("problem!!");
                alert("Something went Wrong!!\nPlease try again");
            }

            if (result) {
                console.log("Api call complete");
                // console.log(typeof (result.data));
            }
        }

    }

    let initRender1 = true;
    useEffect(() => {
        if (initRender1) {
            initRender1 = false;
        } else {
        }
        switch (result.status) {
            case 200:
                console.log("processing data");
                const temp = result.data.filter(x => true);
                setLogin(() => {
                    return {
                        ...login,
                        token: (' ' + temp[0]).slice(1),
                        username: temp[1],
                        role: (' ' + temp[2]).slice(1)
                    }
                })
                setIsSubmit(true);
                alert("logged in successfully!");
                console.log(login.username);
                for (let i = 1; i < 5; i++) {
                    console.log(login.token);
                }

                break;
            case 401:
                setFormErrors(() => {
                    return {
                        login: "Incorrect Username or Password !"
                    }
                })

                break;
        }
    }, [result]);

    let initRender2 = true;
    useEffect(() => {
        if (initRender2) {
            initRender2 = false;
        } else {
        }
        console.log("Login: ", login);

        if (isSubmit) {
            if (!login || !login.token || login.token === '') {
                console.log("Login Data unavailable", login.token !== '', !login.token, !login, login.token);
            } else {
                console.log("Redirecting");
                if(login.role === "CUSTOMER"){
                    navigate("/CustomerDashboard");
                }
                if(login.role === "ADMIN"){
                    navigate("/AdminPortal/");
                }

            }
        }
    }, [login]);

    const validate = (values) => {
        const errors = {};
        if (!values.username) {
            errors.username = "Username is required!";
        }
        if (!values.password) {
            errors.password = "Password is required!";
        }
        console.log(errors)
        return errors;
    }

    return (

        <Container className="w-100 p-4 d-flex justify-content-center align-items-center pb-4">
            <div style={{ width: 500 }}>
                <Card >
                    <form >
                        <h1>Login</h1>
                        <p className="text-danger text-center">{formErrors.login}</p>
                        <div className="form-outline mb-4">
                            <label className="form-label" for="">Username</label>
                            <input type="text" name="username" placeholder="Username" value={formValues.username} onChange={handleChange} className="form-control" />
                            <p className="text-danger small">{formErrors.username}</p>
                        </div>

                        {/* //-- Password input - */}
                        <div className={'form-outline mb-4'}>
                            <label className="form-label" for="">Password</label>
                            <input type="password" name="password" placeholder="Password" value={formValues.password} onChange={handleChange} className="form-control" />
                            <p className="text-danger small">{formErrors.password}</p>

                        </div>

                        {/* //-- Submit button -- */}

                        <div className="row">
                            <div className="col-6">
                                <button onClick={handleSubmit} className="btn btn-primary btn-block mb-4">Sign in</button>
                            </div>
                            <div className="row col-6 text-small text-primary" style={{ fontSize: '12px' }}>
                                <NavLink to={"/ForgotPassword"} >
                                    <span>Forgot Password?</span>
                                </NavLink>
                                <NavLink to={"/Register"}>
                                    <span>Register</span>
                                </NavLink>
                            </div>
                        </div>
                    </form>
                </Card>
            </div>
        </Container>
    )
}

export default Login