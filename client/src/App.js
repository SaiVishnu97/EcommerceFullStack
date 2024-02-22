import './App.css';
import Login from './components/Login'
import { BrowserRouter,Routes,Route } from 'react-router-dom';
import Shoppingmain from './components/Shoppingmain';
import Shoppingbody from './components/Shoppingbody';
import EachItem from './components/EachItem';

function App() {

  return (
    <>
      
      <BrowserRouter>
      
        <Routes>
          <Route path='/shoppingmain' element={<Shoppingmain/>} >
            <Route index element={<Shoppingbody></Shoppingbody>}></Route>
            <Route path=':id' element={<EachItem/>}></Route>
            </Route>
          <Route path='/' element={<Login/>} />
        </Routes>
      </BrowserRouter>
    </>
  );
}
export default App
