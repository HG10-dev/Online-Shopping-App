import { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import { NavLink, useNavigate } from "react-router-dom";
import axios from '../Axios';

const ForgotPass = () => {

    const initValues = { email: '', pass: '' }
    const [formValues, setFormValues] = useState(initValues);
    const [formError, setFormError] = useState({});
    const navigate = useNavigate();
    const [emailValidated, setEmailValidated] = useState(0);
    const [PassReset, setPassReset] = useState({
        className: "d-none",
        btnText: "Submit"
    });

    useEffect(() => {
        console.log(emailValidated);
        if (emailValidated === 1) {
            console.log("entered if");
            setPassReset(() => {
                return {
                    className: "form-outline d-inline",
                    btnText: "Reset Passsword"
                }
            })
        }
    }, [emailValidated]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormValues({
            ...formValues,
            [name]: value
        });
    }

    const validateEmail = async () => {
        if (!formValues.email || formValues.email.trim() === '') {
            console.log("Setting FormError");
            setFormError({
                ...formError,
                email: 'Email id Required',
            });
            return;
        }

        setFormError({});
        console.log(formValues.email);
        let resultStatus;
        try {
            await axios.get(
                formValues.email.toString() + "/forgot"
            ).then((response) => {
                console.log(response.data === formValues.email ? formValues.email : "!Problem");
                console.log(response);
                setEmailValidated(1);
                console.log(emailValidated);

                resultStatus = 200;

            });
        } catch (e) {

            console.log(e.response.data, e.response.status);
            setEmailValidated(0);
            if (e.response.status === 404 && e.response.data === formValues.email) {
                resultStatus = 404;
            }
        };
        console.log(resultStatus);

        switch (resultStatus) {
            case 404:
                console.log(emailValidated);
                setFormError({ email: "! User with above email id doesn't exist" });
                break;
            case 200:
                console.log(emailValidated);
                
                console.log(emailValidated);
                break;

            default:
                alert("Something went Wrong!!\nPlease try again");
                break;
        }
        return;
    }

    const submitPassword = async () => {
        console.log("Submitting new Password");
        if (!formValues.newPassword || formValues.newPassword.trim() === "") {
            setFormError({
                newPassword: "! Enter new Password"
            })
            return;
        } else {
            if (formValues.newPassword !== formValues.repeatPassword) {
                setFormError({
                    repeatPassword: "! Both Passwords must be same"
                })
                return;
            }
        }
        setFormError({});
        console.log(formValues.email, formValues.newPassword);
        const data = {
            "username": formValues.email,
            "password": formValues.newPassword
        }
        let result;
        try {
            result = await axios.put(
                data.username + "/forgot", data)
                .then((res) => {
                console.log(res);
                return res.status;
            });
        } catch (e) {
            console.log(e.response.data, e.response.status);
            if (e.response.status === 404 && e.response.data === data.username) {
                return e.response.status
            }
            console.log(e.response);
            alert("Oops! Something went wrong");
            window.location.reload(true);
        };

        switch (result) {
            case 204:
                alert("Password changed successfully!");
                navigate('/');
                break;

            case 404:
                alert("! User doesn't exist");
                window.location.reload(true);
                break;
            default:
                alert("Oops! Something went wrong");
                window.location.reload(true);
                break;
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log("Handling Submit");
        console.log(emailValidated);
        if (!emailValidated) {
            await validateEmail();
            console.log(emailValidated);
        } else {
            await submitPassword();
        }

        console.log("Validation complete");

    }

    return (
        <Container className="w-100 p-4 d-flex justify-content-center align-items-center pb-4">
            <form className="card text-center" style={{ width: '300px' }}>
                <div className="card-header h5 text-white bg-primary">Password Reset</div>
                <div className="card-body px-5">
                    <p className="card-text py-2">
                        Enter your email address to validate username
                    </p>
                    <div className="form-outline">
                        <input type="email" name={emailValidated ===1 ? "" : "email"} placeholder="email id" value={formValues.email} onChange={handleChange} className="form-control my-3" />
                        <p className="text-danger small">{formError.email}</p>
                    </div>
                    <div className={PassReset.className}>
                        <input type="password" name="newPassword" placeholder="New Password" value={formValues.newPassword} onChange={handleChange} className="form-control my-3" />
                        <p className="text-danger small">{formError.newPassword}</p>
                    </div>
                    <div className={PassReset.className}>
                        <input type="password" name="repeatPassword" placeholder="Repeat Password" value={formValues.repeatPassword} onChange={handleChange} className="form-control my-3" />
                        <p className="text-danger small">{formError.repeatPassword}</p>
                    </div>

                    <button onClick={handleSubmit} className="btn btn-primary w-100">{PassReset.btnText}</button>
                    <div className="d-flex justify-content-between mt-4 text-primary">
                        <NavLink to={"/"} exact>
                            <span>Login</span>
                        </NavLink>
                        <NavLink to={"/register"} exact>
                            <span>Register</span>
                        </NavLink>
                    </div>
                </div>
            </form>
        </Container>
    )

}

export default ForgotPass;