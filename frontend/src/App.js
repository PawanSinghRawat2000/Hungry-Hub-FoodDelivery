import { BrowserRouter, Routes ,Route} from 'react-router-dom';
import Home from './Pages/Home/Home'
import Menu from './Pages/Menu/Menu.jsx'
import About from './Pages/About/About.jsx'
import Cart from './Pages/Cart/Cart.jsx'
import Footer from './components/Footer/Footer';


function App() {
  return (
    <div className="App">
      
      <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/menu' element={<Menu/>}/>
        <Route path='/about' element={<About/>}/>
        <Route path='/cart' element={<Cart/>}/>

      </Routes>
      <Footer/>
      </BrowserRouter>
      
    </div>
  );
}

export default App;
