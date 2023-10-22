import React from "react";
import { Modal, Form, Button, Spinner } from "react-bootstrap";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useMutation } from "@apollo/client";
import { ADD_TO_STOCK_LEVEL } from "../../graphql/inventory";
import { toast } from "react-toastify";

const TransferStockModal = ({ show, onClose, stockArrival }) => {
  const [addToStockLevel, { loading }] = useMutation(ADD_TO_STOCK_LEVEL);
  console.log(stockArrival);
  const formik = useFormik({
    initialValues: {
      expiryDate: "",
      sellingPrice: "",
    },
    validationSchema: Yup.object({
      expiryDate: Yup.date().required("Expiry Date is required"),
      sellingPrice: Yup.number().min(0, "Should greater than 0").required("Selling Price is required"),
    }),
    onSubmit: (values) => {
      console.log(values);
      addToStockLevel({
        variables: {
          stockLevelInput: {
            stockArrivalId: stockArrival?.id,
            expiryDate: values.expiryDate,
            sellingPrice: parseFloat(values.sellingPrice),
            quantity: stockArrival?.quantity,
          },
        },
      }).then((response) => {
        toast.success("Stock transferred successfully");
        console.log(response.data);
        onClose();
      });
    },
  });

  return (
    <Modal centered show={show} onHide={onClose}>
      <Modal.Header closeButton>
        <Modal.Title>Transfer Items to Stock Level</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <h5>Stock Arrival ID: {stockArrival?.id}</h5>
        <h5>Unit Item Cost: Rs. {stockArrival?.purchaseOrderItem.purchaseItemUnitCost}</h5>
        <h5>Quantity: {stockArrival?.quantity}</h5>
        <Form onSubmit={formik.handleSubmit}>
          <Form.Group>
            <Form.Label>Expiry Date</Form.Label>
            <Form.Control
              type="date"
              placeholder="Enter expiry date"
              name="expiryDate"
              value={formik.values.expiryDate}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.expiryDate && formik.errors.expiryDate ? <div className="text-danger">{formik.errors.expiryDate}</div> : null}
          </Form.Group>
          <Form.Group>
            <Form.Label>Selling Price</Form.Label>
            <Form.Control
              type="number"
              placeholder="Enter selling price of unit item"
              name="sellingPrice"
              value={formik.values.sellingPrice}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.sellingPrice && formik.errors.sellingPrice ? <div className="text-danger">{formik.errors.sellingPrice}</div> : null}
          </Form.Group>

          {loading ? (
            <Button variant="primary" type="submit" className="button w-100" disabled>
              <Spinner animation="border" size="sm" className="me-2" />
              Loading...
            </Button>
          ) : (
            <Button variant="primary" type="submit" className="button w-100 mt-2">
              Transfer
            </Button>
          )}
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onClose}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default TransferStockModal;
