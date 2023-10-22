import React, { useState } from "react";
import { Button, Table } from "react-bootstrap";
import Modal from "react-bootstrap/Modal";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useMutation, useQuery } from "@apollo/client";
import { ADD_PURCHASE_ORDER_ITEM_ARRIVAL, GET_PURCHASE_ORDER_BY_ID } from "../../graphql/inventory";
import PropTypes from "prop-types";
import { toast } from "react-toastify";
import Skeleton from "react-loading-skeleton";

const ReceiveModal = ({ show, handleClose, orderId }) => {
  const { data, loading, refetch } = useQuery(GET_PURCHASE_ORDER_BY_ID, {
    variables: {
      id: orderId,
    },
  });

  const handleItemReceived = () => {
    refetch();
  };
  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Receive Items</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <h4>Order: {orderId}</h4>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Item</th>
              <th>Received Quantity</th>
              <th>Already Quantity</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <td colSpan="4" className="text-center">
                <Skeleton count={4} />
              </td>
            ) : (
              data?.PurchaseOrderById.purchaseOrderItemList.map((item) => (
                <ReceiveItemRow key={item.id} item={item} onItemReceived={handleItemReceived} />
              ))
            )}
          </tbody>
        </Table>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

const ReceiveItemRow = ({ item, onItemReceived }) => {
  const [addPurchaseOrderItemArrival, { loading }] = useMutation(ADD_PURCHASE_ORDER_ITEM_ARRIVAL);
  const validationSchema = Yup.object().shape({
    receivedQuantity: Yup.number().min(0).required("Received quantity is required"),
  });

  const formik = useFormik({
    initialValues: {
      receivedQuantity: 0,
    },
    validationSchema,
    onSubmit: (values) => {
      addPurchaseOrderItemArrival({
        variables: {
          arrivalDetails: {
            purchaseOrderItemId: item.id,
            receivedQuantity: values.receivedQuantity,
          },
        },
      }).then((response) => {
        formik.resetForm();
        toast.success("Item received successfully");
        onItemReceived(item.id, response.data.PurchaseOrderItemArrival);
      });
    },
  });

  return (
    <tr key={item.id}>
      <td>{item.item.name}</td>
      <td>
        <form onSubmit={formik.handleSubmit}>
          <input
            type="number"
            name={`receivedQuantity`}
            value={formik.values.receivedQuantity}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.receivedQuantity && formik.errors.receivedQuantity && <div className="error">{formik.errors.receivedQuantity}</div>}
        </form>
      </td>
      <td>
        {item.receivedQuantity}/{item.quantity}
      </td>
      <td>
        {loading ? (
          <Button variant="success" size="sm" disabled>
            Receiving...
          </Button>
        ) : (
          <Button variant="success" size="sm" onClick={formik.handleSubmit}>
            Receive
          </Button>
        )}
      </td>
    </tr>
  );
};

ReceiveModal.propTypes = {
  show: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  orderId: PropTypes.string.isRequired,
};

export default ReceiveModal;
