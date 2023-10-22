import { TbDiscount2 } from "react-icons/tb";
import { BsCashCoin } from "react-icons/bs";
import { useSelector } from "react-redux";
const OrderSumary = () => {
  const { total } = useSelector((state) => state.checkout);
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
            <h4>Rs. {total}</h4>
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
            <h4>Rs. 0</h4>
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
            <h4>Rs. {total}</h4>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderSumary;
