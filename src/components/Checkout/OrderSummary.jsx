import { TbDiscount2 } from "react-icons/tb";
import { BsCashCoin } from "react-icons/bs";
const OrderSumary = () => {
  return (
    <div>
      <div className="title">
        <h3>Order Summary</h3>
      </div>
      <div className="">
        <div className="row">
          <div className="col-5 text-muted">
            <h4>Total</h4>
          </div>
          <div className="col-7 text-end">
            <h4>Rs. 2000</h4>
          </div>
        </div>
        <div className="row">
          <div className="col-5 text-muted">
            <h4>
              Discount &nbsp;
              <TbDiscount2 />
            </h4>
          </div>
          <div className="col-7 text-end">
            <h4>- Rs. 200</h4>
          </div>
        </div>
        <hr />
        <div className="row">
          <div className="col-5 text-muted">
            <h4>
              Subtotal &nbsp;
              <BsCashCoin />
            </h4>
          </div>
          <div className="col-7 text-end">
            <h4>Rs. 2000</h4>
          </div>
        </div>
      </div>

      {/* <Button variant="primary">Add Customer</Button>
      <Button variant="success">Add Product Manually</Button>
      <Button variant="warning">Checkout</Button> */}
    </div>
  );
};

export default OrderSumary;
