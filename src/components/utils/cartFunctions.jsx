import { addProductToCart, getProfile } from "../../api";

export async function addToCart(e, product, user, cart, setUser, token) {
  e.stopPropagation();
  if (!user.id) {
    addToAnonCart(product, cart);
    return;
  }
  if (!user.cart.id) {
    await createNewCart(token);
  }
  await addProductToCart(token, product.id);
  const fetchMe = await getProfile(token);
  setUser(fetchMe);
}

export function addToAnonCart(product, cart) {
  if (!cart?.products) {
    console.log("no products yet");
    cart.products = [
      {
        id: product.id,
        name: product.name,
        price: product.price,
        quantity: 1,
      },
    ];
    console.log(cart);
    window.localStorage.setItem("cart", JSON.stringify(cart));

    return;
  }
  let alreadyInCart = false;
  cart.products.forEach((p) => {
    if (p.id === product.id) {
      alreadyInCart = true;
      return;
    }
  });

  if (alreadyInCart) {
    console.log("Item already in cart");
    return;
  }

  cart.products.push({
    id: product.id,
    name: product.name,
    price: product.price,
    quantity: 1,
  });
  console.log(cart);
  window.localStorage.setItem("cart", JSON.stringify(cart));
}
