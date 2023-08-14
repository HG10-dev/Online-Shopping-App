import pic from "../../UI/productImage.png";
const product = (props) => {
  // console.log(props.props.id,props);
  const item = props.props;
  console.log(item);
  return (
    <div className="row justify-content-center mb-3">
      <div className="col-md-12">
        <div className="card shadow-0 border rounded-3">
          <div className="card-body">
            <div className="row g-0">

              <div className="col-xl-6 col-md-5 col-sm-7">
                <h5>{item.name}</h5>
                <div className="d-flex flex-row">
                  <strong>Category : </strong> {item.category}
                </div>
                <div className="d-flex flex-row">
                  <strong>Quantity : </strong> {item.quantity>0?item.quantity:"OUT OF STOCK"}
                </div>

                <p className="text mb-4 mb-md-0">
                  <strong>Description : </strong> {item.description}
                </p>
                <div className="d-flex flex-row align-items-center mb-1">
                  <h4 className="mb-1 me-1">Rs {parseFloat(item.price).toFixed(2)} </h4>
                  {/* <span className="text-danger"><s>$49.99</s></span> */}
                </div>
              </div>
              <div className="col-xl-3 col-md-3 col-sm-5">
                <div className="mt-4" >
                  <div className="row mt-2 mb-2" style={{width: "100px"}}>
                    <button className="btn btn-primary shadow-0" onClick={props.clickedEdit}>Edit</button>
                  </div>
                  <div className="row mt-2 mb-2" style={{width: "100px"}}>
                    <button className="btn btn-danger shadow-0" onClick={props.clickedDelete}>Remove</button>
                  </div>

                </div>
              </div>
              <div className="col-xl-3 col-md-4 d-flex justify-content-center">
                <div className="bg-image hover-zoom ripple rounded ripple-surface me-md-3 mb-3 mb-md-0">
                  <img src={pic} alt="Product Img" className="w-100" />
                  <a href="#!">
                    <div className="hover-overlay">
                      <div className="mask" style={{ backgroundColor: "rgba(253, 253, 253, 0.15)" }}></div>
                    </div>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default product;