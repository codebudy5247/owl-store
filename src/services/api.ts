import * as axios from "axios";

const apiURL =
  "http://localhost:5000/api" || "https://owl-store-api.onrender.com/api";

interface ResponseData {
  data: any;
  status: any;
}

function normalizeServerResponse(serverResponse: any) {
  let response: ResponseData = {
    data: serverResponse.data,
    status: serverResponse.status,
  };

  return response;
}

function normalizeServerError(serverResponse: any) {
  let response: ResponseData = {
    data: serverResponse.message,
    status: serverResponse.status,
  };

  return response;
}

//signup
export async function signUp(
  username: string,
  email: string,
  password: string
) {
  try {
    const axiosConfig: axios.AxiosRequestConfig = {
      method: "post",
      url: `${apiURL}/auth/register`,
      data: {
        username: username,
        email_id: email,
        password: password,
      },
    };

    const response = await axios.default.request(axiosConfig);
    const normalizedResponse = normalizeServerResponse(response);
    return [null, normalizedResponse];
  } catch (error) {
    const errorObject = normalizeServerError(error);
    return [errorObject, null];
  }
}

//signup seller
export async function signUpSeller(
  username: string,
  email: string,
  password: string
) {
  try {
    const axiosConfig: axios.AxiosRequestConfig = {
      method: "post",
      url: `${apiURL}/auth/registerSeller`,
      data: {
        username: username,
        email_id: email,
        password: password,
      },
    };

    const response = await axios.default.request(axiosConfig);
    const normalizedResponse = normalizeServerResponse(response);
    return [null, normalizedResponse];
  } catch (error) {
    const errorObject = normalizeServerError(error);
    return [errorObject, null];
  }
}

//signin
export async function signIn(email: string, password: string) {
  try {
    const axiosConfig: axios.AxiosRequestConfig = {
      method: "post",
      url: `${apiURL}/auth/login`,
      data: {
        email_id: email,
        password: password,
      },
    };

    const response = await axios.default.request(axiosConfig);
    const normalizedResponse = normalizeServerResponse(response);
    return [null, normalizedResponse];
  } catch (error) {
    const errorObject = normalizeServerError(error);
    return [errorObject, null];
  }
}

//get all cards
export async function getCards() {
  try {
    const axiosConfig: axios.AxiosRequestConfig = {
      method: "get",
      url: `${apiURL}/card`,
    };
    const response = await axios.default.request(axiosConfig);
    const normalizedResponse = normalizeServerResponse(response);
    return [null, normalizedResponse];
  } catch (error) {
    const errorObject = normalizeServerError(error);
    return [errorObject, null];
  }
}

//add to cart
export async function addToCart(itemId: string) {
  try {
    let token: any = localStorage.getItem("authToken");
    const axiosConfig: axios.AxiosRequestConfig = {
      method: "post",
      url: `${apiURL}/user/cart`,
      data: {
        itemId: itemId,
      },
      headers: { Authorization: "Bearer " + token },
    };
    const response = await axios.default.request(axiosConfig);
    const normalizedResponse = normalizeServerResponse(response);
    return [null, normalizedResponse];
  } catch (error) {
    const errorObject = normalizeServerError(error);
    return [errorObject, null];
  }
}

//get cart items
export async function getCartItems() {
  try {
    let token: any = localStorage.getItem("authToken");
    const axiosConfig: axios.AxiosRequestConfig = {
      method: "get",
      url: `${apiURL}/user/cart`,
      headers: { Authorization: "Bearer " + token },
    };
    const response = await axios.default.request(axiosConfig);
    const normalizedResponse = normalizeServerResponse(response);
    return [null, normalizedResponse];
  } catch (error) {
    const errorObject = normalizeServerError(error);
    return [errorObject, null];
  }
}

//remove cart item
export async function removeItem(itemId: string) {
  try {
    let token: any = localStorage.getItem("authToken");
    const axiosConfig: axios.AxiosRequestConfig = {
      method: "post",
      url: `${apiURL}/user/cart/delete`,
      data: {
        itemId: itemId,
      },
      headers: { Authorization: "Bearer " + token },
    };
    const response = await axios.default.request(axiosConfig);
    const normalizedResponse = normalizeServerResponse(response);
    return [null, normalizedResponse];
  } catch (error) {
    const errorObject = normalizeServerError(error);
    return [errorObject, null];
  }
}
