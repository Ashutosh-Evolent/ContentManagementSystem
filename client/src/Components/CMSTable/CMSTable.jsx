import { useState } from "react";
import {Table} from "semantic-ui-react";

import { CMSButton } from "../CMSButton/CMSButton";
import { CMSModel } from "../Model/CMSModel";

const headerRow = [
  "Id",
  "First Name",
  "Last Name",
  "Email",
  "ContactNumber",
  "Status",
  "Action",
];


export const CMSTable = ({ contactList }) => {
  return (<>
    <Table celled padded>
      <Table.Header>
        <Table.Row>
          {headerRow.map((header) => (
            <Table.HeaderCell key={header}>{header}</Table.HeaderCell>
          ))}
        </Table.Row>
      </Table.Header>
      <Table.Body>
        {contactList.map((contact) => (
          <Table.Row key={contact.id}>
            <Table.Cell>{contact.id}</Table.Cell>
            <Table.Cell>{contact.firstName}</Table.Cell>
            <Table.Cell>{contact.lastName}</Table.Cell>
            <Table.Cell>{contact.email}</Table.Cell>
            <Table.Cell>{contact.contactNumber}</Table.Cell>
            <Table.Cell>{contact.status}</Table.Cell>
            <Table.Cell>
            <CMSModel contactDetails={contact} name={'Edit'}/>
              <CMSButton>delete</CMSButton>
            </Table.Cell>
          </Table.Row>
        ))}
      </Table.Body>
    </Table>
   
    </>
  );
};
