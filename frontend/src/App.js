
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import HomePage from './Components/HomePage';
import {CMSFooter} from './Components/CMSFooter';
import {CMSHeader} from './Components/CMSHeader';
import { UserForm } from './Components/UserForm';

function App() {
  return (
    <BrowserRouter>
    <CMSHeader title={'Contact Management System'}/>
    
    <Routes>
      <Route path='/' element={<HomePage/>}/>
      <Route path='/addUser' element={<UserForm/>}/>
      <Route path='/edit/:id' element={<UserForm/>}/>
    </Routes>
    <CMSFooter/>
    </BrowserRouter>
   
  );
}

export default App;
