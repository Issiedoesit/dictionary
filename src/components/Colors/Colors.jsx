import React, { useState } from 'react'
import useThemeStore from '../../hooks/stores/useThemeStore'
import useComponentVisible from '../../hooks/useHideOnClickOutside'

const Colors = () => {
    const [color, setColor] = useState('hsl(230, 77%, 56%)')
    const [selected, setSelected] = useState(230)
    const theme = useThemeStore(state=>state.theme) 
    const { primary, variant } = useThemeStore(state=>state.theme) 
    const changeTheme = useThemeStore(state=>state.changeTheme) 

    let num = 357
    let numArray = []
    for (let i = 0; i < num; i++){
        numArray.push(i)
    }

    const handleTheme = (num) => {
        changeTheme({...theme, ["primary"] : `hsl(${num}, 77%, 56%)`})
        setColor(`hsl(${num}, 77%, 56%)`)
        setSelected(num)
        let selector = document.querySelectorAll('.color-select')
        for(let i = 0; i < selector.length; i++){
            selector[i].classList.remove('border')
        }
        selector[num].classList.add('border')
        
    }

    const toggleColorSelector = () => {
        let selector = document.getElementById('selector')
        selector.classList.toggle('hidden')
    }

    const closeColorSelector = () => {
        let selector = document.getElementById('selector')
        selector.classList.add('hidden')
    }

    useComponentVisible('#selector_btn', '#selector', ()=>{closeColorSelector()})



  return (
    <div className='relative w-fit h-fit cursor-pointer text-theme-text-color'>
        <div className='p-1 bg-gray-200 w-fit h-fit flex items-center justify-center'>
            <button id='selector_btn' onClick={toggleColorSelector} className='h-5 w-12 bg-primary-color focus-within:'></button>
        </div>
        <div id='selector' className={`hidden absolute top-10 right-0 rounded-lg border ${variant == 'light' ? 'bg-white' : 'bg-black'} z-40 shadow-lg px-4 py-4`}>
            <div className='grid grid-cols-51 auto-cols-max auto-rows-fr w-60 gap-y-0 gap-x-0 max-h-fit'>
                {numArray.map((num, index)=>{
                    return <div className={`color-select ${selected == num && 'border'} `}>
                        <button onClick={()=>{handleTheme(num)}} className='w-full h-full' title={`hsl(${num}, 77%, 56%)`} key={index} style={{background:`hsl(${num}, 77%, 56%)`}}></button>
                    </div>
                })}
            </div>
            <div className='py-3 text-center flex items-center px-5 gap-4'>
                <div className='w-5 h-5 rounded-[50%] bg-primary-color'></div>
                <p className="whitespace-nowrap">{color}</p>
            </div>
            <div>
                <input type="range" name="chooseColor" id="" defaultValue={selected} className='accent-primary-color w-full' max={357} onChange={(e)=>handleTheme(e.target.value)}/>
            </div>
        </div>
    </div>
  )
}

export default Colors