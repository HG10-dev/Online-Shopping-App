import { useContext, useEffect, useState } from "react";
import UserContext from '../../ContextData/User/UserContext';
import { Container } from "react-bootstrap";
import { useLocation, useNavigate } from "react-router";
import Card from "../../UI/Card/Card";
import axios from '../../Axios';

const EditItem = () => {
    const navigate = useNavigate();
    const [formValues, setFormValues] = useState({});
    const [formErrors, setFormErrors] = useState({});
    const [checked, setChecked] = useState(false);
    const [product, setProduct] = useState({});
    const location = useLocation();
    const { login, products, setProducts } = useContext(UserContext);

    let initialRender = true;

    try {
        useEffect(() => {
            if (initialRender) {
                initialRender = false;
                console.log(login);
                console.log(products);
                console.log(initialRender);
                console.log(location.state.item);
                setProduct(() => {
                    return {
                        ...location.state.item,
                    }
                });
                console.log(product);
                setFormValues(() => {
                    return {
                        ...location.state.item,
                    }
                });
            }
        }, []);
    } catch (e) {
        console.log(e);
        alert("Something went wrong in Edit");
        navigate("/AdminPortal/dashboard");
    }

    const handleCheck = () => {
        setChecked(!checked);
        console.log(checked);
    }
    const setCheckError = (e) => {
        e.preventDefault();
        const val = validate(formValues);
        setFormErrors(val)
        console.log(val);
        if (Object.keys(val).length === 0) {

            setFormErrors(() => { return { ...formErrors, checkOut: "Check this box out" } });
            console.log(formErrors);
        }

    }
    const validate = (values) => {
        const errors = {};
        if (!values.name) {
            errors.name = "Name is required!";
        }

        if (!values.price) {
            errors.price = "Price is required!";
        }
        if (!isNaN(values.description)) {
            errors.description = "Enter valid description!";
        }
        if (!values.quantity) {
            errors.quantity = "Quantity is required!";
        }
        if (!isNaN(values.category)) {
            errors.category = "Enter valid Category!";
        }

        console.log(errors)
        return errors;
    }

    const updateProducts =(obj)=>{
        const newArr = products.filter(p => p.id !== obj.id);
        setProducts([{...obj},...newArr]);
        console.log("Update successfull");
        navigate("/AdminPortal/dashboard");
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(formValues);
        const val = validate(formValues);
        setFormErrors(val)
        console.log(Object.keys(val).length);

        if (Object.keys(val).length === 0) {
            const data = {
                id: formValues.id,
                name: formValues.name,
                description: formValues.description,
                quantity: formValues.quantity,
                price: formValues.price,
                category: formValues.category
            }
            try {
                if (!login || !login.token) {
                    alert("You are not logged in");
                    navigate('/Login');
                } else {
                    await axios.put(
                        data.name + "/update/" + data.id, data, {
                        headers: {
                            Authorization: "Bearer " + login.token,
                            "Access-Control-Allow-Origin": "true",
                        },
                    }).then(res => {
                        console.log(res);
                        updateProducts(data);
                    })
                }

            } catch (e) {
                console.log(e);
                if (e.response.status === 401) {
                    alert("Unauthorized !!");
                    navigate("/Login");
                }else{
                    alert("Update failed");
                    navigate("/AdminPortal/dashboard");
                }

            }
        }
    }

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormValues({
            ...formValues,
            [name]: value
        });
    }

    return (

        <Container>
            <Card>
                <form>
                    <h2 className="text-center"><u>Product Details</u></h2>
                    <div className="row">
                        <div className="form-group col-md-6">
                            <label for="name">Name</label>
                            <input type="text" id="name" className="form-control" value={formValues.name} readOnly />
                            <p className="text-danger small">{formErrors.name}</p>
                        </div>
                        <div className="form-group col-md-2">
                            <label for="price">Price</label>
                            <input type="number" name="price" className="form-control" value={formValues.price} onChange={handleChange} />
                            <p className="text-danger small">{formErrors.price}</p>
                        </div>
                    </div>
                    <div className="form-group">
                        <label for="description">Description</label>
                        <input type="text" name="description" className="form-control" value={formValues.description} onChange={handleChange} />
                        <p className="text-danger small">{formErrors.description}</p>
                    </div>
                    <div className="row">
                        <div className="form-group col-md-6">
                            <label for="category">Category</label>
                            <input type="text" name="category" className="form-control" value={formValues.category} onChange={handleChange} />
                            <p className="text-danger small">{formErrors.category}</p>
                        </div>
                        <div className="form-group col-md-2">
                            <label for="quantity">Quantity</label>
                            <input type="number" name="quantity" className="form-control" value={formValues.quantity} onChange={handleChange} />
                            <p className="text-danger small">{formErrors.quantity}</p>
                        </div>
                    </div>
                    <div className="row mt-1">
                        <div className="form-group col-md-6">
                            <div className="form-check">
                                <input className="form-check-input" type="checkbox" checked={checked} onChange={handleCheck} />
                                <label className="form-check-label" for="gridCheck">
                                    Check me out
                                </label>
                                <div className="text-danger small">{formErrors.checkOut}</div>

                            </div>
                        </div>
                        <button onClick={checked ? handleSubmit : setCheckError} className="btn btn-primary col-md-1">Update</button>
                    </div>
                </form>
            </Card>
        </Container>
    )
}

export default EditItem;