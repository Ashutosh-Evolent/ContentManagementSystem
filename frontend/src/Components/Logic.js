import axios from "axios";
import swal from "sweetalert";
import { baseUrl } from "./constant";
import { emailRegex, nameRegex, contactNumberRegex } from "./constant";

export const validateData = (contact) => {
  return (
    emailRegex.test(contact.email) &&
    contactNumberRegex.test(contact.contactNumber) &&
    nameRegex.test(contact.firstName) &&
    nameRegex.test(contact.lastName)
  );
};

export const createLogic = async (requestType, url, data) => {
  try {
    switch (requestType) {
      case "get":
        return await (
          await axios.get(`${baseUrl}${url}`)
        ).data;
      case "post":
        return await (
          await axios.post(`${baseUrl}${url}`, data)
        ).data;
      case "put":
        return await (
          await axios.put(`${baseUrl}${url}`, data)
        ).data;
      case "delete":
        return await (
          await axios.delete(`${baseUrl}${url}`)
        ).data;
      default:
        console.log("Invalid RequestType");
    }
  } catch (error) {
    swal("Error", "Something went Wrong please try some times later ", "error");
  }
};
