import { useState } from "react";
import { Container } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import { useNavigate } from "react-router";
import Card from "../UI/Card/Card";
import axios from '../Axios';
import "./Register.css"


const Register = () => {

    const [formValues, setFormValues] = useState({});
    const [formErrors, setFormErrors] = useState({});
    const [checked, setChecked] = useState(false);
    const [result, setResult] = useState({});
    const navigate = useNavigate();


    const handleCheck = () => {
        setChecked(!checked);
    }
    const setCheckError = (e) => {
        e.preventDefault();
        const val = validate(formValues);
        setFormErrors(val)
        if (Object.keys(val).length === 0) {

            setFormErrors(() => { return { ...formErrors, checkOut: "Check this box out" } });
        }

    }

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormValues({
            ...formValues,
            [name]: value
        });
    }

    const validate = (values) => {
        const errors = {};
        if (!values.name) {
            errors.name = "Name is required!";
        }
        const validRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
        if (!values.email) {
            errors.email = "Email is required!";
        } else if (!values.email.match(validRegex)) {
            errors.email = "Enter valid email id (\"name@mail.com\")!";
        }
        if (!values.phone) {
            errors.phone = "Enter valid 10 digit phone number!";
        } else {
            const validPhone = /^\d{10}$/;

            if (!values.phone.match(validPhone)) {
                errors.phone = "Enter valid 10 digit phone number!";
            }
        }
        if (!values.dob) {
            errors.dob = "Date of Birth is required!";
        }
        if (!values.gender) {
            errors.gender = "Gender is required!";
        }
        if (!values.password) {
            errors.password = "Password is required!";
        }
        if (values.password !== values.repeatPassword) {
            errors.password = "Both Password must be same!";
        }
        console.log(errors)
        return errors;
    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        const val = validate(formValues);
        setFormErrors(val)
        console.log(Object.keys(val).length);
        if (Object.keys(val).length === 0) {
            const data = {
                name: formValues.name,
                email: formValues.email,
                phone: formValues.phone,
                dob: formValues.dob.toString(),
                gender: formValues.gender,
                password: formValues.password
            }
            console.log(data);
            try {
                await axios.post(
                    "https://localhost:7105/api/Registration",
                    data

                ).then((res) => {
                    console.log(res);
                    // console.log(typeof(res.data));
                    setResult(res);
                    // console.log(result);
                })
            } catch (e) {
                console.log(e.response.data, e.response.status);
                if (e.response.status === 400 && e.response.data === data.email) {
                    setResult(e.response);
                }
            }

            if (result) {
                console.log("Api call complete");
                // console.log(typeof (result.data));
            }

            switch (result.status) {
                case 201:
                    alert('You are registered successfully!\nYour username is' + data.email);
                    navigate('/Login');
                    break;

                case 400:
                    alert('User with email id ' + data.email + ' already exist');
                    navigate('/Login');
                    break;

                default:
                    alert("Something went Wrong!!\nPlease try again");
                    break;
            }

        }
    }

    return (
        <Container className="w-100 p-4 d-flex justify-content-center align-items-center pb-4">
            <div style={{ width: 600 }}>
                <Card >
                    <form >
                        <h1>Regsiter</h1>
                        <div className="form-group row">
                            <label className="col-sm-3 col-form-label" for="name">Full Name</label>
                            <div className="col-sm-9">
                                <input type="text" name="name" placeholder="Full Name" value={formValues.name} onChange={handleChange} className="form-control" />
                                <p className="text-danger small">{formErrors.name}</p>
                            </div>
                        </div>
                        <div className="form-group row">
                            <label className="col-sm-3 col-form-label" for="email">Email</label>
                            <div className="col-sm-9">
                                <input type="text" name="email" placeholder="email (e.g: name@mail.com)" value={formValues.email} onChange={handleChange} className="form-control" />
                                <p className="text-danger small">{formErrors.email}</p>
                            </div>
                        </div>
                        <div className="form-group row">
                            <label className="col-sm-3 col-form-label" for="phone">Phone Number</label>
                            <div className="col-sm-9">
                                <input type="text" name="phone" placeholder="XXXXXXXXXX(10 digit)" value={formValues.phone} onChange={handleChange} className="form-control" />
                                <p className="text-danger small">{formErrors.phone}</p>
                            </div>
                        </div>
                        <div className="form-group row">
                            <label className="col-sm-3 col-form-label" for="dob">Date of Birth</label>
                            <div className="col-sm-9">
                                <input type="date" name="dob" placeholder="Date of Birth" value={formValues.dob} onChange={handleChange} className="form-control" />
                                <p className="text-danger small">{formErrors.dob}</p>
                            </div>
                        </div>
                        <fieldset className="form-group row">
                            <label className="col-form-label col-sm-2 pt-0" >Gender</label>
                            <div className="col-sm-10 small">
                                <div className="form-check">
                                    <input type="radio" name="gender" value="Male" checked={formValues.gender === "Male"} onChange={handleChange} />
                                    <span for="female">Male</span>
                                </div>
                                <div className="form-check">
                                    <input type="radio" name="gender" value="Female" checked={formValues.gender === "Female"} onChange={handleChange} />
                                    <span for="female">Female</span>
                                </div>
                                <div className="form-check">
                                    <input type="radio" name="gender" value="Other" checked={formValues.gender === "Other"} onChange={handleChange} />
                                    <span for="female">Other</span>
                                </div>

                            </div>
                            <p className="text-danger small">{formErrors.dob}</p>
                        </fieldset>

                        <div className={'form-group row'}>
                            <label className="col-sm-3 col-form-label" for="">Password</label>
                            <div className="col-sm-4">
                                <input type="password" name="password" placeholder="Password" value={formValues.password} onChange={handleChange} className="form-control" />
                                <p className="text-danger small">{formErrors.password}</p>
                            </div>
                            <div className="col-sm-4">
                                <input type="password" name="repeatPassword" placeholder="Repeat Password" value={formValues.repeatPassword} onChange={handleChange} className="form-control" />
                                <p className="text-danger small">{formErrors.password}</p>
                            </div>
                        </div>

                        <div class="form-group">
                            <div class="form-check">
                                <input class="form-check-input" type="checkbox" checked={checked} onChange={handleCheck} />
                                <label class="form-check-label" for="gridCheck">
                                    Check me out<p className="text-danger small">{formErrors.checkOut}</p>
                                </label>
                            </div>
                        </div>
                        <div class="text-center form-group ">
                            <button onClick={checked ? handleSubmit : setCheckError} className="btn btn-primary btn-block"> Create Account  </button>
                        </div>
                        <p className="text-center"> Have an account? <NavLink to={"/Login"}>Log in</NavLink> </p>
                    </form>
                </Card>
            </div>
        </Container>

    )
}

export default Register;