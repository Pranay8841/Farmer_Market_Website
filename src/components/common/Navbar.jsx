import React from 'react'
import { NavbarLinks } from '../../data/NavbarLinks'
import { Link, matchPath, useLocation } from 'react-router-dom'
import { AiOutlineShoppingCart, AiOutlineMenu } from "react-icons/ai"
import ProfileDropDown from '../core/Auth/ProfileDropDown'
import logo from "../../assets/Logos/Logo_Light.png"

const Navbar = () => {
    const location = useLocation();

    const matchRoute = (route) => {
        return matchPath({ path: route }, location.pathname)
    }

    return (
        <div className='flex h-16 items-center justify-center border-b-[1px] border-b-brown-700 transition-all duration-200'>
            <div className='flex w-11/12 max-w-maxContent items-center justify-between'>
                {/* Logo */}
                <Link to="/">
                    <img src={logo} alt="Logo" width={250} height={32} loading='lazy' />
                </Link>

                {/* Navigation Links */}
                <nav className='hidden md:block'>
                    <ul className='flex gap-x-6 text-brown-700 font-bold'>
                        {
                            NavbarLinks.map((link, index) => (
                                <li key={index}>
                                    {
                                        link.title === "Our Products" ?
                                            (
                                                <div>
                                                    Our Products
                                                </div>
                                            ) :
                                            (
                                                <Link to={link?.path}>
                                                    <p className={`${matchRoute(link?.path) ?
                                                        "text-brown-700" :
                                                        "text-[#7e7e73]"}`}
                                                    >
                                                        {link.title}
                                                    </p>
                                                </Link>
                                            )
                                    }
                                </li>
                            ))
                        }
                    </ul>
                </nav>

                {/* Login / Signup / Dashboard */}
                <div className='hidden items-center gap-x-4 md:flex'>

                    <Link to="/dashboard/cart" className='relative'>
                        <AiOutlineShoppingCart className='text-2xl text-brown-700' />

                        <span className='absolute -bottom-2 -right-2 grid h-5 w-5 place-items-center overflow-hidden rounded-full bg-brown-700 text-center text-xs font-bold text-white'>
                            1
                        </span>
                    </Link>

                    <Link to='/login'>
                        <button className='rounded-[8px] border border-brown-700 bg-brown-800 px-[12px] py-[8px] text-white'>
                            Log In
                        </button>
                    </Link>

                    <Link to='/signup'>
                        <button className='rounded-[8px] border border-brown-700 bg-brown-800 px-[12px] py-[8px] text-white'>
                            Sign Up
                        </button>
                    </Link>

                    <ProfileDropDown />
                </div>

                <button className="mr-4 md:hidden">
                    <AiOutlineMenu fontSize={24} fill="#54433a" />
                </button>
            </div>
        </div>
    )
}

export default Navbar
