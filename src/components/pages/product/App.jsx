import './App.css'
import Home from './components/pages/Home'
import About from './components/pages/About'
import { Link, Route, Routes } from 'react-router-dom'
import Login from './components/pages/Login'
import AuthUser from './components/auth/AuthUser'
import Register from './components/pages/Register'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import Brand from './components/pages/product/Brand'
import Category from './components/pages/product/Category'
import Attribute from './components/pages/product/Attribute'


function App() {

  const { getToken, logout } = AuthUser()
  if (!getToken) {
    return <Login />
  }
  return (
    <>
      <ToastContainer position="top-right" autoClose={2000} />
      <nav className="bg-white border-gray-200 dark:bg-gray-900">
        <div className="flex flex-wrap justify-between items-center mx-auto max-w-7xl p-4">
          <a href="https://flowbite.com" className="flex items-center space-x-3 rtl:space-x-reverse">
            <img src="https://flowbite.com/docs/images/logo.svg" className="h-8" alt="Flowbite Logo" />
            <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">Flowbite</span>
          </a>
          <div className="flex items-center space-x-6 rtl:space-x-reverse">
            <a href="tel:5541251234" className="text-sm  text-gray-500 dark:text-white hover:underline">(555) 412-1234</a>
            <a href="#" className="text-sm  text-blue-600 dark:text-blue-500 hover:underline">Login</a>
          </div>
        </div>
      </nav>
      <nav className="bg-gray-50 dark:bg-gray-700">
        <div className="max-w-7xl px-4 py-3 mx-auto">
          <div className="flex items-center">
            <ul className="flex flex-row font-medium mt-0 space-x-8 rtl:space-x-reverse text-sm">
              <li>
                <Link to="/" className="text-gray-900 dark:text-white hover:underline" aria-current="page">Home</Link>
              </li>
              <li>
                <Link to="/register" className="text-gray-900 dark:text-white hover:underline">Register</Link>
              </li>
              <li>
                <Link to="/about" className="text-gray-900 dark:text-white hover:underline">About</Link>
              </li>
              <li>
                <Link to="/login" className="text-gray-900 dark:text-white hover:underline">Login</Link>
              </li>
              <li>
                <a onClick={logout} className="text-gray-900 dark:text-white hover:underline cursor-pointer">Logout</a>
              </li>
              <li>
                <Link to="/brand" className="text-gray-900 dark:text-white hover:underline">Brands</Link>
              </li>
              <li>
                <Link to="/category" className="text-gray-900 dark:text-white hover:underline">Category</Link>
              </li>
              <li>
                <Link to="/attribute" className="text-gray-900 dark:text-white hover:underline">attribute</Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/about' element={<About />} />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path='/brand' element={<Brand />} />
        <Route path='/category' element={<Category />} />
        <Route path='/attribute' element={<Attribute />} />
      </Routes>
    </>
  )
}

export default App
