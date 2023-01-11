import * as axios from "axios";
import { ArrayDestructuringAssignment } from "typescript";

const apiURL = "http://165.232.185.229:5000/api";

//http://165.232.185.229:5000/api
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

//GEt all products
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

//Add User
export async function addUser(
  username: string,
  email: string,
  password: string,
  role: string
) {
  try {
    const axiosConfig: axios.AxiosRequestConfig = {
      method: "post",
      url: `${apiURL}/admin/add-user`,
      data: {
        username: username,
        email_id: email,
        password: password,
        role: role,
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

//delete user
export async function deleteUser(id: string) {
  try {
    let token: any = localStorage.getItem("authToken");
    const axiosConfig: axios.AxiosRequestConfig = {
      method: "delete",
      url: `${apiURL}/admin/delete-user/${id}`,
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

//GEt all users
export async function getUsers() {
  try {
    const axiosConfig: axios.AxiosRequestConfig = {
      method: "get",
      url: `${apiURL}/user/users`,
    };
    const response = await axios.default.request(axiosConfig);
    const normalizedResponse = normalizeServerResponse(response);
    return [null, normalizedResponse];
  } catch (error) {
    const errorObject = normalizeServerError(error);
    return [errorObject, null];
  }
}

//cerate card
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

//delete card
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

//Get Orders
export async function getOrders() {
  try {
    const axiosConfig: axios.AxiosRequestConfig = {
      method: "get",
      url: `${apiURL}/admin/orders`,
    };
    const response = await axios.default.request(axiosConfig);
    const normalizedResponse = normalizeServerResponse(response);
    return [null, normalizedResponse];
  } catch (error) {
    const errorObject = normalizeServerError(error);
    return [errorObject, null];
  }
}

//Update Order
export async function updateOrder(orderId: string, status: string) {
  try {
    const axiosConfig: axios.AxiosRequestConfig = {
      method: "post",
      url: `${apiURL}/admin/update-order`,
      data: {
        orderId: orderId,
        status: status,
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

//Delete Order

//Get Billings
export async function getBillings() {
  try {
    const axiosConfig: axios.AxiosRequestConfig = {
      method: "get",
      url: `${apiURL}/admin/billings`,
    };
    const response = await axios.default.request(axiosConfig);
    const normalizedResponse = normalizeServerResponse(response);
    return [null, normalizedResponse];
  } catch (error) {
    const errorObject = normalizeServerError(error);
    return [errorObject, null];
  }
}

//Get user by ID
export async function getUserByID(userId: string) {
  try {
    let token: any = localStorage.getItem("authToken");
    const axiosConfig: axios.AxiosRequestConfig = {
      method: "get",
      url: `${apiURL}/user/user-by-id/${userId}`,
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

//Deposit amount
export async function depositAmount(
  userId: string,
  amount: string,
  billingId: string
) {
  try {
    const axiosConfig: axios.AxiosRequestConfig = {
      method: "post",
      url: `${apiURL}/admin/deposit-money`,
      data: {
        userId: userId,
        amount: amount,
        billingId: billingId,
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

//Get all withdrawal Requests
export async function getWithdrawals() {
  try {
    const axiosConfig: axios.AxiosRequestConfig = {
      method: "get",
      url: `${apiURL}/withdraw`,
    };
    const response = await axios.default.request(axiosConfig);
    const normalizedResponse = normalizeServerResponse(response);
    return [null, normalizedResponse];
  } catch (error) {
    const errorObject = normalizeServerError(error);
    return [errorObject, null];
  }
}

//Get all news
export async function getNews() {
  try {
    let token: any = localStorage.getItem("authToken");
    const axiosConfig: axios.AxiosRequestConfig = {
      method: "get",
      url: `${apiURL}/news`,
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

//Create News
export async function createNews(title: string, content: string) {
  try {
    const axiosConfig: axios.AxiosRequestConfig = {
      method: "post",
      url: `${apiURL}/news`,
      data: {
        title: title,
        content: content,
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

//Delete news
export async function deleteNews(id: string) {
  try {
    let token: any = localStorage.getItem("authToken");
    const axiosConfig: axios.AxiosRequestConfig = {
      method: "delete",
      url: `${apiURL}/news/${id}`,
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

//Get all rules
export async function getRules() {
  try {
    let token: any = localStorage.getItem("authToken");
    const axiosConfig: axios.AxiosRequestConfig = {
      method: "get",
      url: `${apiURL}/rules`,
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

//Create Rules
export async function createRules(title: string, content: string) {
  try {
    const axiosConfig: axios.AxiosRequestConfig = {
      method: "post",
      url: `${apiURL}/rules`,
      data: {
        title: title,
        content: content,
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

//Delete Rules
export async function deleteRules(id: string) {
  try {
    let token: any = localStorage.getItem("authToken");
    const axiosConfig: axios.AxiosRequestConfig = {
      method: "delete",
      url: `${apiURL}/rules/${id}`,
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

//Get Tickets
export async function getTickets() {
  try {
    let token: any = localStorage.getItem("authToken");
    const axiosConfig: axios.AxiosRequestConfig = {
      method: "get",
      url: `${apiURL}/ticket`,
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

//Reply to tickets
export async function createAnswer(ticketId: string, content: string) {
  try {
    const axiosConfig: axios.AxiosRequestConfig = {
      method: "post",
      url: `${apiURL}/answer`,
      data: {
        ticketId: ticketId,
        content: content,
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

//Get single reply
export async function getReplyAnswer(id: string) {
  try {
    let token: any = localStorage.getItem("authToken");
    const axiosConfig: axios.AxiosRequestConfig = {
      method: "get",
      url: `${apiURL}/answer/${id}`,
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


