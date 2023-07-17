import { Nav, NavLink } from "react-bootstrap";

const header = (props) =>{
    return (
        <header>
  {/* <!-- Jumbotron --> */}
  <div className="p-3 text-center bg-white border-bottom">
    <div className="container">
      <div className="row gy-3">
        {/* <!-- Left elements --> */}
        <div className="col-lg-4 col-sm-4 col-4">
          <Nav>
            <h4><strong>Online Shopping App</strong></h4>
          </Nav>
        </div>
        {/* <!-- Left elements --> */}

        {/* <!-- Center elements --> */}
        <div className="order-lg-last col-lg-4 col-sm-8 col-8">
          <div className="d-flex float-end">
            <NavLink href="#" className="me-1 border-none py-1 px-3  d-flex align-items-center" target="_blank">
            <select className="form-select d-inline-block w-auto border-none" name="select" onChange={props.changeHandler}>
                    <option value="0"><i>&#128100;</i><p className="d-none d-md-block mb-0">{props.name}</p></option>
                    <option value="1">Logout</option>
                  </select>
                </NavLink>
            <NavLink href="#" className="me-1 border rounded py-1 px-3 d-flex align-items-center" target="_blank"><i>&#10084;</i> <p className="d-none d-md-block mb-0">Wishlist</p> </NavLink>
            <NavLink href="#" className="border rounded py-1 px-3  d-flex align-items-center" target="_blank"><i>&#128722;</i> <p className="d-none d-md-block mb-0">Cart</p> </NavLink>
          </div>
        </div>
        {/* <!-- Center elements --> */}

        {/* <!-- Right elements --> */}
        <div className="col-lg-4 col-md-12 col-12">
          <div className="input-group float-center">
            <div className="form-outline">
              <input type="search" id="form1" className="form-control" placeholder="Search" disabled/>
            </div>
            <button type="button" className="btn btn-primary shadow-0" disabled>
              <i className="fas fa-search"></i>
            </button>
          </div>
        </div>
        {/* <!-- Right elements --> */}
      </div>
    </div>
  </div>
  {/* <!-- Jumbotron --> */}

  {/* <!-- Heading --> */}
  <div className="bg-primary mb-4">
    <div className="container py-4">
      <h3 className="text-white mt-2">Awesome Products</h3>
      {/* <!-- Breadcrumb --> */}
      <nav className="d-flex mb-2">
        <h6 className="mb-0">
          <a href="#" className="text-white-50" disabled>Home</a>
          {/* <span className="text-white-50 mx-2"> {"\>"} </span>
          <a href="" className="text-white-50">Library</a>
          <span className="text-white-50 mx-2">{"\>"} </span>
          <a href="" className="text-white"><u>Data</u></a> */}
        </h6>
      </nav>
      {/* <!-- Breadcrumb --> */}
    </div>
  </div>
  {/* <!-- Heading --> */}
</header>
    );
}

export default header;