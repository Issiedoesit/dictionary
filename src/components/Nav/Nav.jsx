import React, { useEffect, useState } from 'react'
import $ from 'jquery'
import { NavLink } from 'react-router-dom'
import Logo from '../../assets/media/logos/dc-logo.png'
import useThemeStore from '../../hooks/stores/useThemeStore'
import { BiSun, BiMoon } from 'react-icons/bi'
import Colors from '../Colors/Colors'


const Nav = () => {

    const { primary, variant } = useThemeStore(state => state.theme)
    const theme = useThemeStore(state => state.theme)
    const changeTheme = useThemeStore(state=>state.changeTheme)

    const handleTheme = (e) => {
        changeTheme({...theme, [e.target.name ] : e.target.value})
    }

    const changeVariant = (type) => {
        changeTheme({...theme, ["variant"] : type})
    }

    useEffect(() => {
        $(document.body).css("--color-primary", primary)
        variant == 'light' ? $(document.body).css("--text-theme", "#161616") : $(document.body).css("--text-theme", "#FFFFFF")

    }, [theme])

  return (
    <nav className='px-5 sm:px-10 lg:px-20 py-6 flex gap-40 items-center justify-between'>
        <div>
            <NavLink to='/'>
                <svg className='w-20' viewBox="0 0 224 205" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path className='fill-primary-color transition-colors duration-500 ease-in-out' d="M54.2267 17.5C45.08 18.265 37.3334 26 37.3334 34.5V170.5C37.3334 179.425 46.2 187.5 56 187.5H168C177.8 187.5 186.667 179.425 186.667 170.5V34.5C186.667 29.9913 184.7 25.6673 181.199 22.4792C177.699 19.2911 172.951 17.5 168 17.5H112V77L88.6667 64.25L65.3334 77V17.5H54.2267ZM112 111H121.333C123.809 111 126.183 111.896 127.933 113.49C129.683 115.084 130.667 117.246 130.667 119.5V153.5H121.333V136.5H112V153.5H102.667V119.5C102.667 117.246 103.65 115.084 105.4 113.49C107.151 111.896 109.525 111 112 111ZM112 119.5V128H121.333V119.5H112ZM140 128H168V136.5L149.333 162H168V170.5H140V162L158.667 136.5H140V128Z" fill="#9747FF"/>
                </svg>

            </NavLink>
        </div>
       <div className='font-semibold flex items-center justify-between w-full'>
            <ul className='flex gap-4 items-center'>
                <li><NavLink to="#" className='nav-link'>Word of The Day</NavLink></li>
                <li><NavLink to="/examples" className='nav-link'>Examples</NavLink></li>
                <li className='h-full py-4 relative'>
                    <NavLink to="/games" className='nav-link'>Games</NavLink>
                    <div className={`absolute top-12 ${variant == 'light' ? 'bg-white' : 'bg-black'} px-6 py-3 rounded-lg w-fit right-0 border`}>
                        <div className='flex flex-col gap-3'>
                            <NavLink to="/games/hangman"  className={`hover:text-primary-color transition-all duration-500 ease-in-out`}>Hangman</NavLink>
                            <NavLink to="#" className={`hover:text-primary-color transition-all duration-500 ease-in-out`}>Hangman</NavLink>
                            <NavLink to="#" className={`hover:text-primary-color transition-all duration-500 ease-in-out`}>Hangman</NavLink>
                        </div>
                    </div>
                </li>
            </ul>
            <div className='flex items-center gap-5'>
                <NavLink to="/auth/login" className='px-6 py-2 text-primary-color'>
                    Login
                </NavLink>
                <NavLink to="/auth/sign-up" className='bg-primary-color rounded-3xl px-6 py-2 text-white'>
                    Sign Up
                </NavLink>  
                <Colors />              
                {/* <input type="color" name="primary" id="primary" onChange={handleTheme} defaultValue={primary} /> */}
                <button className='' onClick={()=>{variant == 'light' ? changeVariant('dark') : changeVariant('light')}}>
                    {variant == 'light' ? <BiMoon size="20px" color={primary} /> : <BiSun color='orange' size="20px" />}
                </button>
            </div>
       </div>
    </nav>
  )
}

export default Nav