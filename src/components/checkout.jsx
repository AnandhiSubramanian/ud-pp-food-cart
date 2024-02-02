import { useContext } from "react";
import CartContext from "../store/CartContext";
import Input from "./UI/Input";
import Modal from "./UI/Modal";
import UserProgressContext from "../store/UserProgressContext";
import { currencyFormatter } from "../util/formatting";
import Button from "./UI/button";
import Error from "./Error";
import useHttp from "../Hooks/useHttp";

const requestConfig = {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
};
export default function Checkout() {
  const cartCtx = useContext(CartContext);
  const userProgressCtx = useContext(UserProgressContext);

  const {
    data,
    isLoading: isSending,
    error,
    sendRequest,
    clearData,
  } = useHttp("http://localhost:3000/orders", requestConfig);

  const cartTotal = cartCtx.items.reduce((totalPrice, item) => {
    return totalPrice + item.price * item.quantity;
  }, 0);

  function onCloseModal() {
    userProgressCtx.hideCheckout();
  }

  function onFinish() {
    userProgressCtx.hideCheckout();
    cartCtx.clearCart();
    clearData();
  }

  function handleSubmit(event) {
    event.preventDefault();

    const fd = new FormData(event.target);
    const customerData = Object.fromEntries(fd.entries());

    sendRequest(
      JSON.stringify({
        order: {
          items: cartCtx.items,
          customer: customerData,
        },
      })
    );
  }
  let actions = (
    <>
      <Button type="button" textOnly onClick={onCloseModal}>
        Close
      </Button>
      <Button>Submit Order</Button>
    </>
  );

  if (isSending) {
    actions = <span>Sending order data....</span>;
  }

  if (data && !error) {
    return (
      <Modal
        open={userProgressCtx.progress === "checkout"}
        onClose={onCloseModal}
      >
        <h2>Success!!!</h2>
        <p>Your order is submitted successfully!!!</p>
        <p className="modal-actions">
          <Button onClick={onFinish}>Okay</Button>
        </p>
      </Modal>
    );
  }
  return (
    <Modal
      open={userProgressCtx.progress === "checkout"}
      onClose={onCloseModal}
    >
      <form onSubmit={handleSubmit}>
        <h2>Checkout</h2>
        <p>Total amount: {currencyFormatter.format(cartTotal)}</p>
        <Input label="Full Name" type="text" id="name"></Input>
        <Input label="Email" id="email" type="email"></Input>
        <Input label="Street" id="street" type="text"></Input>
        <div className="control-row">
          <Input label="Postal code" type="text" id="postal-code"></Input>
          <Input label="City" type="text" id="city"></Input>
        </div>
        {error && <Error title="Error occured" msg={error}></Error>}
        <p className="modal-actions">{actions}</p>
      </form>
    </Modal>
  );
}
