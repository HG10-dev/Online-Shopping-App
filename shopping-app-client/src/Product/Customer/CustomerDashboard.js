import Header from "./CustomerHeader";
import Footer from "./CustomerFooter";
import "./Customer.css"
import Product from "./Product";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router";
import UserContext from '../../ContextData/User/UserContext';
import axios from '../../Axios';
import newAxios from 'axios';
import product from "./Product";
import { Container } from "react-bootstrap";

const CustomerDashboard = () => {

  const { login, setLogin } = useContext(UserContext);
  const [products, setProducts] = useState([]);
  const navigate = useNavigate()
  const [loading, setLoading] = useState(0);
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
        setLoading(1);
        console.log(loading);
        await axios.get(
          "/all", {
          headers: {
            "Access-Control-Allow-Origin": "true",
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
        loginFirst();
      } else {
        console.log(login);
        if (productYettoLoad) {
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

    console.log(products);
    if (loading) {
      setLoading(0);
      console.log(loading);
    }
  }, [products]);

  const logOut = () => {
    alert("Logging you out");
    setLogin({});
    navigate('/Login');
  }

  return (
    <>
      {/* <!--Main Navigation--> */}
      <Header name={login.username} changeHandler={logOut} />

      {/* // <!-- sidebar + content --> */}

      <section className="">
        <Container className="d-flex justify-content-center align-items-center ">
          <div className="row">
            {/* <!-- sidebar --> */}
            {/* Sidebar was Here*/}
            {/* <!-- sidebar --> */}


            {/* <!-- content --> */}
            <div className="col-lg-9">
              <header className="d-sm-flex align-items-center border-bottom mb-4 pb-3">
                <strong className="d-block py-2">{products.length} Items found </strong>
                <div className="ms-auto">

                  {/* <div className="btn-group shadow-0 border">
                    <a href="#" className="btn btn-light" title="List view">
                      
                    </a>
                    <a href="#" className="btn btn-light active" title="Grid view">
                      <i className="fa fa-th fa-lg"></i>
                    </a>
                  </div> */}
                </div>
              </header>

              {/* { */}
               <h1 className={loading === 0? "d-none":''}>Loading</h1>
              {
                products.map(product => (
                  <Product key={product.id} name={product.name} description={product.description} price={product.price} available={product.availability} />
                ))}

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
                  {/* <li className="page-item"><a className="page-link" href="#">2</a></li>
                  <li className="page-item"><a className="page-link" href="#">3</a></li> */}
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
      </section>
      {/* // <!-- Footer --> */}
      <Footer />
      {/* // <!-- Footer --> */}
    </>
  );
}

export default CustomerDashboard;