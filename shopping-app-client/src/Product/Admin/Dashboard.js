import Product from './Product';
import { Container, NavLink } from "react-bootstrap";
import UserContext from '../../ContextData/User/UserContext';
import { useContext, useEffect, useState } from 'react';
import axios from '../../Axios';
import { useNavigate } from 'react-router';


const Dashboard = () => {
    const { login, products, setProducts } = useContext(UserContext);
    const navigate = useNavigate();

    useEffect(() => {
        console.log("Dashboard initiated");
        console.log(products);
    }, []);

    const updateProducts =(obj)=>{
        const newArr = products.filter(p => p.id !== obj.id);
        setProducts([...newArr]);
        console.log("Updated successfull(delete)");
        // navigate("/AdminPortal/dashboard");
    }

    const deleteItem =async (data)=>{
        try {
            if (!login || !login.token) {
                alert("You are not logged in");
                navigate('/Login');
            } else {
                await axios.delete(
                    data.name + "/delete/" + data.id, {
                    headers: {
                        Authorization: "Bearer " + login.token
                    },
                }).then(res => {
                    console.log(res);
                    alert("Product "+data.name+" is deleted successfully");
                    updateProducts(data);
                })
            }

        } catch (e) {
            console.log(e);
            if (e.response.status === 401) {
                alert("Unauthorized !!");
                navigate("/Login");
            }else if (e.response.status === 404){
                alert("Product not found in database !!");
            }else{
                alert("Update failed");
                navigate("/AdminPortal/dashboard");
            }

        }
    }

    const handleEdit = (item) => {
        console.log(item);
        navigate("/AdminPortal/update",{
            state: {item}
        })
    }

    const handleDelete = (item) => { 
        const message = "Do you want to delete product "+item.name+" ?";
        const confirmed = window.confirm(message);
        if(confirmed){
            deleteItem(item);
        }
    }

    const goToAddNew = ()=>{
        console.log("Redirecting to add new");
        navigate("/AdminPortal/addNew");
    }

    return (
        <Container className="d-flex justify-content-center align-items-center ">
            <div className="row">
                <div className="col-lg-9">
                    <header className="d-sm-flex border-bottom mb-4 pb-3">
                        <strong className="d-block py-2">{products.length} Items found </strong>
                        <button className="btn btn-info ms-auto d-block border pt-1 " onClick={goToAddNew}><h5 className='mt-1'>Add New</h5></button>
                    </header>
                    <div className="">
                        {
                            products.map(product => (
                                <Product
                                    key={product.id}
                                    props={product}
                                    clickedEdit={() => { handleEdit(product) }}
                                    clickedDelete={() => { handleDelete(product)}}
                                />
                            ))}
                    </div>
                    <hr />
                    {/* <!-- Pagination --> */}
                    <nav aria-label="Page navigation example" className="d-flex justify-content-center mt-3">
                        <ul className="pagination">
                            <li className="page-item disabled">
                                <a className="page-link" href="#" aria-label="Previous">
                                    <span aria-hidden="true">&laquo;</span>
                                </a>
                            </li>
                            <li className="page-item active"><a className="page-link" href="#">1</a></li>
                            {/* <li className="page-item"><a className="page-link" href="#">2</a></li> */}
                            {/* <li className="page-item"><a className="page-link" href="#">3</a></li> */}
                            <li className="page-item">
                                <a className="page-link" href="#" aria-label="Next">
                                    <span aria-hidden="true">&raquo;</span>
                                </a>
                            </li>
                        </ul>
                    </nav>
                    {/* <!-- Pagination --> */}
                </div>

            </div>
        </Container>
    )
}

export default Dashboard;