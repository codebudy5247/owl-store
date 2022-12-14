import * as axios from "axios";
import { ArrayDestructuringAssignment } from "typescript";

const apiURL = "http://localhost:5000/api";

// "http://localhost:5000/api" || "https://owl-store-api.onrender.com/api"

interface ResponseData {
  data: any;
  status: any;
}

export interface AddCardRequestPayload {
  street: string;
  country: string;
  state: string;
  city: string;
  zip: string;
  mobile: string;
  cardNumber: string;
  expiryDate: string;
  cvv: string;
  socialSecurityNumber: string;
  drivingLicenceNumber: string;
  level: string;
  class?: string;
  price: string;
  bankName: string;
  type: string;
  otherDetails?: string;
  extraField?: Array<any>[];
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

//signup {seller}
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

//get user
export async function getUser() {
  try {
    let token: any = localStorage.getItem("authToken");
    const axiosConfig: axios.AxiosRequestConfig = {
      method: "get",
      url: `${apiURL}/user`,
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

//Create card {seller}
export async function createCard(payload: AddCardRequestPayload) {
  try {
    let token: any = localStorage.getItem("authToken");
    const axiosConfig: axios.AxiosRequestConfig = {
      method: "post",
      url: `${apiURL}/card`,
      data: {
        cardNumber: payload.cardNumber,
        expiryDate: payload.expiryDate,
        cvv: payload.cvv,
        socialSecurityNumber: payload.socialSecurityNumber,
        drivingLicenceNumber: payload.drivingLicenceNumber,
        address: {
          street: payload.street,
          country: payload.country,
          state: payload.state,
          city: payload.city,
          zip: payload.zip,
          phoneNo: payload.mobile,
        },
        level: payload.level,
        class: payload.class,
        price: payload.price,
        bankName: payload.bankName,
        type: payload.type,
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

//Get Seller Products
export async function getSellerCards() {
  try {
    let token: any = localStorage.getItem("authToken");
    const axiosConfig: axios.AxiosRequestConfig = {
      method: "get",
      url: `${apiURL}/card/seller_prod`,
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

//Get Card by ID
export async function getCard(itemId: string) {
  try {
    const axiosConfig: axios.AxiosRequestConfig = {
      method: "get",
      url: `${apiURL}/card/${itemId}`,
    };
    const response = await axios.default.request(axiosConfig);
    const normalizedResponse = normalizeServerResponse(response);
    return [null, normalizedResponse];
  } catch (error) {
    const errorObject = normalizeServerError(error);
    return [errorObject, null];
  }
}

//Update Card
export async function updateCard(id: string, payload: AddCardRequestPayload) {
  try {
    let token: any = localStorage.getItem("authToken");
    const axiosConfig: axios.AxiosRequestConfig = {
      method: "put",
      url: `${apiURL}/card/update/${id}`,
      headers: { Authorization: "Bearer " + token },
      data: {
        cardNumber: payload.cardNumber,
        expiryDate: payload.expiryDate,
        cvv: payload.cvv,
        socialSecurityNumber: payload.socialSecurityNumber,
        drivingLicenceNumber: payload.drivingLicenceNumber,
        address: {
          street: payload.street,
          country: payload.country,
          state: payload.state,
          city: payload.city,
          zip: payload.zip,
          phoneNo: payload.mobile,
        },
        level: payload.level,
        price: payload.price,
        bankName: payload.bankName,
        type: payload.type,
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
//Delete Card
export async function deleteCard(id: string) {
  try {
    let token: any = localStorage.getItem("authToken");
    const axiosConfig: axios.AxiosRequestConfig = {
      method: "delete",
      url: `${apiURL}/card/delete/${id}`,
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

//Add to cart
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

//Get user cart items
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

//Remove cart item
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

//create order
export async function createOrder(
  items: [],
  selectedCoin: string,
  totalPrice: string
) {
  try {
    let token: any = localStorage.getItem("authToken");
    const axiosConfig: axios.AxiosRequestConfig = {
      method: "post",
      url: `${apiURL}/order`,
      headers: { Authorization: "Bearer " + token },
      data: {
        items: items,
        payWith: selectedCoin,
        totalPrice: totalPrice,
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

//Create Tx
export async function createTx(
  orderID: string,
  cur1: string,
  cur2: string,
  amount: string,
  buyerEmail: string,
  buyerName: string
) {
  try {
    let token: any = localStorage.getItem("authToken");
    const axiosConfig: axios.AxiosRequestConfig = {
      method: "post",
      url: `${apiURL}/order/create-tx`,
      headers: { Authorization: "Bearer " + token },
      data: {
        orderId: orderID,
        cur1: cur1,
        cur2: cur2,
        amount: amount,
        buyers_email: buyerEmail,
        buyers_name: buyerName,
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

//Get user orders
export async function getOrdersUsers() {
  try {
    let token: any = localStorage.getItem("authToken");
    const axiosConfig: axios.AxiosRequestConfig = {
      method: "get",
      url: `${apiURL}/order/user-orders`,
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

//create deposit api
export async function createDeposit(
  amount: string,
  payWith: string,
  buyersEmail: string,
  buyersName: string
) {
  try {
    let token: any = localStorage.getItem("authToken");
    const axiosConfig: axios.AxiosRequestConfig = {
      method: "post",
      url: `${apiURL}/billing`,
      headers: { Authorization: "Bearer " + token },
      data: {
        amount:amount,
        cur2:payWith,
        buyers_email:buyersEmail,
        buyers_name:buyersName
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

//Get user billing list
export async function getBillingsUsers() {
  try {
    let token: any = localStorage.getItem("authToken");
    const axiosConfig: axios.AxiosRequestConfig = {
      method: "get",
      url: `${apiURL}/billing`,
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
//Get Tx info
export async function getTxInfo(txId:string) {
  try {
    let token: any = localStorage.getItem("authToken");
    const axiosConfig: axios.AxiosRequestConfig = {
      method: "post",
      url: `${apiURL}/billing/tx-info`,
      headers: { Authorization: "Bearer " + token },
      data:{
        txID:txId
      }
    };
    const response = await axios.default.request(axiosConfig);
    const normalizedResponse = normalizeServerResponse(response);
    return [null, normalizedResponse];
  } catch (error) {
    const errorObject = normalizeServerError(error);
    return [errorObject, null];
  }
}