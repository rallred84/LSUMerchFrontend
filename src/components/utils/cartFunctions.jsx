import { addProductToCart, getProfile } from "../../api";

export async function addToCart(
  e,
  product,
  user,
  setUser,
  cart,
  setCart,
  token,
  inCartToast
) {
  e.stopPropagation();

  let alreadyInCart = false;
  cart.products.forEach((p) => {
    if (p.id === product.id) {
      alreadyInCart = true;
      return;
    }
  });

  if (alreadyInCart) {
    console.log("Item already in cart");
    inCartToast();
    return;
  }

  if (!user.id) {
    addToAnonCart(product, cart, setCart);
    return;
  }
  if (!user.cart.id) {
    await createNewCart(token);
  }
  await addProductToCart(token, product.id);
  const fetchMe = await getProfile(token);
  setUser(fetchMe);
}

export function addToAnonCart(product, cart, setCart) {
  const newCart = { ...cart };

  newCart.products.push({
    id: product.id,
    name: product.name,
    price: product.price,
    imageURL: product.imageURL,
    quantity: 1,
  });

  // let cartTotal = 0;

  // newCart.products.forEach((product) => {
  //   cartTotal =
  //     cartTotal + Number(product.price.slice(1)) * Number(product.quantity);
  //   console.log(cartTotal);
  // });

  // newCart.totalPrice = cartTotal;

  newCart.totalPrice = calculateCartPrice(newCart);

  setCart(newCart);
  window.localStorage.setItem("cart", JSON.stringify(newCart));
}

export function calculateCartPrice(cart) {
  let cartTotal = 0;

  cart.products.forEach((product) => {
    cartTotal =
      cartTotal + Number(product.price.slice(1)) * Number(product.quantity);
    console.log(cartTotal);
  });

  return cartTotal;
}
