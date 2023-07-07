// Will set up all API Requests here
export const BASE_URL = "https://tigers-den.onrender.com/api"


/*users*/

/* POST /users/register */
export async function createUser(email, password, firstName, lastName) {
  try {
    const response = await fetch(`${BASE_URL}/users/register`, {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
          email,
          password,
          firstName,
          lastName,
      })
    });
    const result = await response.json();
    console.log(result);
    return result;
  } catch (err) {
    console.error(err)
  }
}



//////////////////



/*products*/ 

/* GET /products */
export async function getAllProducts() {
  try {
    const response = await fetch(`${BASE_URL}/products`);
    const result = await response.json();
    const info = result.data.products;
    // console.log(info)
    return info
  } catch (err) {
    console.error(err)
  }
}


//////////////////