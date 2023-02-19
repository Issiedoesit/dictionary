import React, { useEffect, useState } from 'react'
import $ from 'jquery'
import { NavLink } from 'react-router-dom'
import useThemeStore from '../../hooks/stores/useThemeStore'
import { BiSun, BiMoon } from 'react-icons/bi'
import Colors from '../Colors/Colors'


const Nav = () => {

    const { primary, variant } = useThemeStore(state => state.theme)
    const theme = useThemeStore(state => state.theme)
    const changeTheme = useThemeStore(state=>state.changeTheme)
    const [dropGames, setDropGames] = useState(true)

    const handleTheme = (e) => {
        changeTheme({...theme, [e.target.name ] : e.target.value})
    }


    const handleInnerMenu = () => {
        $('#games').on('mouseover', function(){
            $('#innerMenu').removeClass('lg:invisible lg:opacity-0 lg:translate-y-10 ')
            $('#gamesSVG').addClass('lg:rotate-180')
        })

        $(document).on('mouseover', function(e) {
            if(!(($(e.target).closest('#innerMenu').length > 0 ) || ($(e.target).closest('#navItemWrap').length > 0))){
              if (!($('#innerMenu').hasClass('translate-y-10'))) {
                $('#innerMenu').addClass('lg:invisible lg:opacity-0 lg:translate-y-10 ');
                $('#gamesSVG').removeClass('lg:rotate-180')
              }
            }
          })
    }
    const handleMobileMenu = () => {
        $('#mobileInnerMenuWrap').css({
            'transform': `translateX(0%)`
        })
        $('#menu').toggleClass('invisible opacity-0 scale-90')
    }

    const changeVariant = (type) => {
        changeTheme({...theme, ["variant"] : type})
    }

    useEffect(() => {
        $(document.body).css("--color-primary", primary)
        variant == 'light' ? $(document.body).css("--text-theme", "#161616") : $(document.body).css("--text-theme", "#FFFFFF")

    }, [theme])
    useEffect(() => {
        document.addEventListener('mouseover', handleInnerMenu())
       return () => {
         document.removeEventListener('mouseover', handleInnerMenu())
       }
       
     }, [])

  return (
    <nav className='px-5 sm:px-10 lg:px-20 py-6 flex gap-40 items-center justify-between'>
        <div>
            <NavLink to='/'>
                <svg className='w-20' viewBox="0 0 224 205" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path className='fill-primary-color transition-colors duration-500 ease-in-out' d="M54.2267 17.5C45.08 18.265 37.3334 26 37.3334 34.5V170.5C37.3334 179.425 46.2 187.5 56 187.5H168C177.8 187.5 186.667 179.425 186.667 170.5V34.5C186.667 29.9913 184.7 25.6673 181.199 22.4792C177.699 19.2911 172.951 17.5 168 17.5H112V77L88.6667 64.25L65.3334 77V17.5H54.2267ZM112 111H121.333C123.809 111 126.183 111.896 127.933 113.49C129.683 115.084 130.667 117.246 130.667 119.5V153.5H121.333V136.5H112V153.5H102.667V119.5C102.667 117.246 103.65 115.084 105.4 113.49C107.151 111.896 109.525 111 112 111ZM112 119.5V128H121.333V119.5H112ZM140 128H168V136.5L149.333 162H168V170.5H140V162L158.667 136.5H140V128Z" fill="#9747FF"/>
                </svg>
            </NavLink>
        </div>
       <div id='menu' className={`invisible opacity-0 scale-90 border-0.5 font-semibold text-theme-text-color ${variant === 'light' ? 'bg-white' : 'bg-black'} lg:bg-transparent lg:flex items-center justify-between w-ninetyPercent z-50 lg:w-full lg:overflow-visible lg:scale-100 lg:opacity-100 transition-all duration-300 ease-out lg:visible absolute right-fiftyPercent translate-x-fiftyPercent sm:translate-x-0 sm:right-4 top-4 sm:w-350 h-fit lg:h-auto pt-4 pb-1 lg:p-0 rounded-lg lg:rounded-none shadow-xl lg:shadow-none lg:static`}>
            <ul id='navItemWrap' className='lg:flex gap-4 items-center h-fit'>
                <div className="lg:hidden flex justify-end py-4 px-5 lg:p-0">
                    <button type='button' onClick={handleMobileMenu}>
                        <svg className='group' width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path className='group-hover:fill-primary-color fill-theme-text-color group-hover:shadow-md transition-all duration-500 ease-in-out' d="M12 2C6.49 2 2 6.49 2 12C2 17.51 6.49 22 12 22C17.51 22 22 17.51 22 12C22 6.49 17.51 2 12 2ZM15.36 14.3C15.65 14.59 15.65 15.07 15.36 15.36C15.21 15.51 15.02 15.58 14.83 15.58C14.64 15.58 14.45 15.51 14.3 15.36L12 13.06L9.7 15.36C9.55 15.51 9.36 15.58 9.17 15.58C8.98 15.58 8.79 15.51 8.64 15.36C8.50052 15.2189 8.4223 15.0284 8.4223 14.83C8.4223 14.6316 8.50052 14.4411 8.64 14.3L10.94 12L8.64 9.7C8.50052 9.55886 8.4223 9.36843 8.4223 9.17C8.4223 8.97157 8.50052 8.78114 8.64 8.64C8.93 8.35 9.41 8.35 9.7 8.64L12 10.94L14.3 8.64C14.59 8.35 15.07 8.35 15.36 8.64C15.65 8.93 15.65 9.41 15.36 9.7L13.06 12L15.36 14.3Z" fill="black"/>
                        </svg>
                        <span className='hidden'>Close</span>
                    </button>
                </div>
                <li><NavLink to="#" className='nav-link flex gap-2 items-center py-4 px-5 lg:p-0 border-dashed border-b border-b-brandGray3x w-full lg:w-auto lg:border-b-0'>Word of The Day</NavLink></li>
                <li><NavLink to="/examples" className='nav-link flex gap-2 items-center py-4 px-5 lg:p-0 border-dashed border-b border-b-brandGray3x w-full lg:w-auto lg:border-b-0'>Examples</NavLink></li>
                <li className='h-full py-4 relative'>
                    <button id='games' type='button' className='hidden lg:flex py-2 px-5 lg:p-0 justify-between w-full lg:w-auto lg:gap-2 items-center border-dashed border-b border-b-brandGray3x lg:border-b-0'>
                        Games
                        <svg id='gamesSVG' className='transition-all duration-500 ease-in-out hidden lg:block' width="20" height="21" viewBox="0 0 20 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path className={'stroke-theme-text-color'} d="M16.6 7.9585L11.1667 13.3918C10.525 14.0335 9.47503 14.0335 8.83336 13.3918L3.40002 7.9585" stroke="#161616" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" />
                        </svg>
                    </button>
                    <button id='gamesDrop' onClick={()=>setDropGames(prevDropGames=>!prevDropGames)} type='button' className='flex lg:hidden py-2 px-5 lg:p-0 justify-between w-full lg:w-auto lg:gap-2 items-center border-dashed border-b border-b-brandGray3x lg:border-b-0'>
                        Games
                        <svg id='gamesSVG' className='transition-all duration-500 ease-in-out block lg:hidden' width="20" height="21" viewBox="0 0 20 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path className={'stroke-theme-text-color'} d="M16.6 7.9585L11.1667 13.3918C10.525 14.0335 9.47503 14.0335 8.83336 13.3918L3.40002 7.9585" stroke="#161616" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" />
                        </svg>
                    </button>
                    <div id='innerMenu' className={`lg:invisible lg:opacity-0 lg:translate-y-10 ${dropGames && 'h-0 max-h-0 overflow-hidden py-0'} transition-all duration-500 ease-in-out z-50 lg:absolute top-12 ${variant == 'light' ? 'bg-white' : 'bg-black'} px-6 py-3 lg:rounded-lg lg:w-fit right-0 border-b lg:border`}>
                        <div className='flex flex-col gap-3'>
                            <NavLink to="/games/hangman"  className={`hover:text-primary-color transition-all duration-500 ease-in-out`}>Hangman</NavLink>
                            <NavLink to="#" className={`hover:text-primary-color transition-all duration-500 ease-in-out`}>Hangman</NavLink>
                            <NavLink to="#" className={`hover:text-primary-color transition-all duration-500 ease-in-out`}>Hangman</NavLink>
                        </div>
                    </div>
                </li>
            </ul>
            <div className='flex items-center justify-center lg:justify-start gap-5 h-fit py-4 px-5 lg:p-0'>
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
       <button id='openMobileMenu' onClick={handleMobileMenu} type='button' className='block lg:hidden hover:bg-primary-color transition-all duration-500 ease-in-out rounded-forty px-4 py-2'>
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path className="stroke-theme-text-color" d="M3 7H21M3 12H21M3 17H21" stroke='#161616' strokeWidth="1.5" strokeLinecap="round"/>
            </svg>
            <span className='hidden'>Menu</span>
        </button>
    </nav>
  )
}

export default Nav