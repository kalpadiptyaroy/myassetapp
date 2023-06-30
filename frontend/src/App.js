import './App.css';
import Home from './components/Home';
import NewUserRegister from './components/NewUserRegister';
import {Routes, Route} from 'react-router-dom';


function App() {
  return (
     <Routes>
        <Route path='/' element={<Home />}/>
        <Route path='/signup' element={<NewUserRegister />}/>
     </Routes>
  );
}

export default App;
