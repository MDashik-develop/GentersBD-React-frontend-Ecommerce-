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
import AttributeEdit from './components/pages/product/AttributeEdit'
import ProductCreate from './components/pages/product/ProductCreate'
import ProductEdit from './components/pages/product/ProductEdit'

import { Sidebar, SidebarCollapse, SidebarItem, SidebarItemGroup, SidebarItems } from "flowbite-react";
         import { HiArrowSmRight, HiChartPie, HiInbox, HiShoppingBag, HiTable, HiUser, HiTag, HiCog } from "react-icons/hi";


function App() {

  const { getToken, logout } = AuthUser()
  if (!getToken) {
    return <Login />
  }
  return (
    <>
      <ToastContainer position="top-right" autoClose={2000} />
      {/* <nav className="bg-gray-50 dark:bg-gray-700">
        <div className="max-w-7xl px-4 py-3 mx-auto">
          <div className="flex items-center">
            <ul className="flex flex-row flex-wrap font-medium mt-0 space-x-8 gap-1.5 rtl:space-x-reverse text-sm">
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
                <Link to="/attribute" className="text-gray-900 dark:text-white hover:underline">Attribute</Link>
              </li>
              <li>
                <Link to="/attribute-edit" className="text-gray-900 dark:text-white hover:underline">Attribute Edit</Link>
              </li>
              <li>
                <Link to="/product-create" className="text-gray-900 dark:text-white hover:underline">Product</Link>
              </li>
              <li>
                <Link to="/product-edit" className="text-gray-900 dark:text-white hover:underline">Product Edit</Link>
              </li>
            </ul>
          </div>
        </div>
      </nav> */}
      <div className="flex">
      <Sidebar aria-label="Sidebar with multi-level dropdown example" className="flex-shrink-0">

        <SidebarItems>
          <SidebarItemGroup>
            <SidebarItem href="#" icon={HiChartPie}>
              Dashboard
            </SidebarItem>
            <SidebarCollapse icon={HiShoppingBag} label="Products">
              <SidebarItem href="/product-create" icon={HiCog}>Products Create</SidebarItem>
              <SidebarItem href="/product-edit/" icon={HiCog}>Products Edit</SidebarItem>
              <SidebarItem href="#" icon={HiTable}>Products List</SidebarItem>
            </SidebarCollapse>
            <SidebarCollapse icon={HiTag} label="Brand">
              <SidebarItem href="/brand" icon={HiTag}>Brand</SidebarItem>
            </SidebarCollapse>
            <SidebarCollapse icon={HiCog} label="Attribute">
              <SidebarItem href="/attribute" icon={HiCog}>Attribute</SidebarItem>
              <SidebarItem href="/attribute-edit/" icon={HiCog}>Attribute Edit</SidebarItem>
            </SidebarCollapse>
            <SidebarItem href="#" icon={HiInbox}>Inbox</SidebarItem>
            <SidebarItem href="#" icon={HiUser}>Users</SidebarItem>
            <SidebarItem href="#" icon={HiTable}>Products</SidebarItem>
            <SidebarItem href="#" icon={HiArrowSmRight}>Sign In</SidebarItem>
            <SidebarItem href="#" icon={HiTable}>Sign Up</SidebarItem>
          </SidebarItemGroup>
        </SidebarItems>
        </Sidebar>
        <main className="flex-grow p-4">

      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/about' element={<About />} />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path='/brand' element={<Brand />} />
        <Route path='/category' element={<Category />} />
        <Route path='/attribute' element={<Attribute />} />
        <Route path='/attribute-edit/:id' element={<AttributeEdit />} />
        <Route path='/product-create' element={<ProductCreate />} />
        <Route path='/product-edit/:id' element={<ProductEdit />} />
      </Routes>

        </main>

        </div>
    </>
  )
}

export default App
