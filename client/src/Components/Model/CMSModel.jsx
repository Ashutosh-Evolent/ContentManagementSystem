import { useEffect, useState } from "react";
import {
  Button,
  Dropdown,
  Input,
  Modal,
} from "semantic-ui-react";

export const CMSModel = ({ contactDetails,name }) => {
    const [open, setOpen] = useState(false);
    const [saveUpdateButton,setSaveUpdateButton]=useState("Save")
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [contactNumber, setContactNumber] = useState("");
    const [status, setStatus] = useState("");
    const init=()=>{
        if(contactDetails!==undefined){
            setFirstName(contactDetails.firstName);
            setLastName(contactDetails.lastName);
            setEmail(contactDetails.email);
            setContactNumber(contactDetails.contactNumber);
            setStatus(contactDetails.status);
            setSaveUpdateButton("Update");
        }
    }
  useEffect=(()=>{
    init();
  });

  const options = [
    { key: 1, text: "active", value: "active" },
    { key: 2, text: "inactive", value: "inactive" },
  ];
  return (
    <Modal
      onClose={() => setOpen(false)}
      onOpen={() => setOpen(true)}
      open={open}
      trigger={<Button>{name}</Button>}
    >
      <Modal.Header>Contact Details</Modal.Header>
      <Modal.Content>
        <Input
          type="text"
          placeholder="First Name"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
        />
        <Input
          type="text"
          placeholder="Last Name"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
        />
        <Input
          type="text"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <Input
          type="text"
          placeholder="Contact Number"
          value={contactNumber}
          onChange={(e) => setContactNumber(e.target.value)}
        />
        <Dropdown
          options={options}
          value={status}
          onChange={(e) => setStatus(e.target.value)}
        />
      </Modal.Content>
      <Modal.Actions>
        <Button color="black" onClick={() => setOpen(false)}>
          Cancel
        </Button>
        <Button color="green" onClick={() => setOpen(false)}>
          {saveUpdateButton}
        </Button>
      </Modal.Actions>
    </Modal>
  );
};
