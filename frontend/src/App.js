
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import HomePage from './Components/HomePage';
import { UserForm } from './Components/UserForm';

function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path='/' element={<HomePage/>}/>
      <Route path='/addUser' element={<UserForm/>}/>
      <Route path='/edit/:id' element={<UserForm/>}/>
    </Routes>
    </BrowserRouter>
   
  );
}

export default App;
