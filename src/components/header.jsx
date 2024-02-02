import { useContext } from "react";
import logo from "../assets/logo.jpg";
import Button from "./UI/button";
import CartContext from "../store/CartContext";
import UserProgressContext from "../store/UserProgressContext";

export default function Header() {
  const cartCtx = useContext(CartContext);
  const userProgressCtx = useContext(UserProgressContext);

  const totalCartItems = cartCtx.items.reduce((totalNoOfItems, item) => {
    return totalNoOfItems + item.quantity;
  }, 0);

  function handleShowCart() {
    userProgressCtx.showCart();
  }
  return (
    <header id="main-header">
      <div id="title">
        <img src={logo} alt="food plate" />
        <h1>Reactfood</h1>
      </div>

      <Button textOnly onClick={handleShowCart}>
        Cart({totalCartItems})
      </Button>
    </header>
  );
}
