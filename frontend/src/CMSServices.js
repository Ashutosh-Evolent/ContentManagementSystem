import axios from 'axios';

const CMS_API_BASE_URL="https://localhost:44361/Employee/";

class CMSServices{
    getContacts(){
        return axios.get(CMS_API_BASE_URL);
    }
    createContact(contact){
        return axios.post(CMS_API_BASE_URL,contact);
    }
    updateContact(contact){
        return axios.put(CMS_API_BASE_URL,contact);
    }
    deleteContact(contact){
        return axios.delete(CMS_API_BASE_URL,contact);
    }
}

export default new CMSServices()