import pic from "../../UI/productImage.png";
const product = (props) => {
    return (
        <div className="row justify-content-center mb-3">
          <div className="col-md-12">
            <div className="card shadow-0 border rounded-3">
              <div className="card-body">
                <div className="row g-0">
                  <div className="col-xl-3 col-md-4 d-flex justify-content-center">
                    <div className="bg-image hover-zoom ripple rounded ripple-surface me-md-3 mb-3 mb-md-0">
                      <img src={pic} className="w-100" />
                      <a href="#!">
                        <div className="hover-overlay">
                          <div className="mask" style={{backgroundColor: "rgba(253, 253, 253, 0.15)"}}></div>
                        </div>
                      </a>
                    </div>
                  </div>
                  <div className="col-xl-6 col-md-5 col-sm-7">
                    <h5>{props.name}</h5>
                    {/* <h5>Status</h5> */}
                    <div className="d-flex flex-row">                      
                      <strong>Status : </strong><span className="text-muted">{props.available? "HURRY UP TO PURCHASE":"OUT OF STOCK"}</span>
                    </div>

                    <p className="text mb-4 mb-md-0">
                      <strong>Description : </strong>{props.description}
                    </p>
                  </div>
                  <div className="col-xl-3 col-md-3 col-sm-5">
                    <div className="d-flex flex-row align-items-center mb-1">
                      <h4 className="mb-1 me-1">Rs {parseFloat(props.price).toFixed(2)} </h4>
                      {/* <span className="text-danger"><s>$49.99</s></span> */}
                    </div>
                    <h6 className="text-success">Free shipping</h6>
                    <div className="mt-4">
                      <button className="btn btn-primary shadow-0" type="button">Buy this</button>
                      {/* <a href="#!" className="btn btn-light border px-2 pt-2 icon-hover"><i className="fas fa-heart fa-lg px-1"></i></a> */}
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