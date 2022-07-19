export const headerRow = [
  { key: 1, value: "firstName", text: "First Name" },
  { key: 2, value: "lastName", text: "Last Name" },
  { key: 3, value: "email", text: "Email" },
  { key: 4, value: "contactNumber", text: "ContactNumber" },
  { key: 5, value: "stat", text: "Status" },
  { key: 6, value: "action", text: "Action" },
];

export const initialState = {
  firstName: "sort",
  lastName: "sort",
  email: "sort",
  contactNumber: "sort",
  stat: "sort",
};

export const contactInitialState={
    firstName: "",
    lastName: "",
    email: "",
    contactNumber: "",
    stat: "Active",
  }

export const emailRegex = /([a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9_-]+)/;
export const contactNumberRegex = /^([+]\d{2}[ ])?\d{10}$/;
export const nameRegex = /^[a-zA-Z]{1,30}$/;
export const baseUrl="https://localhost:44361/Employee/";