import React, { useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import  { AiOutlineSearch } from 'react-icons/ai'
import ModalBodyWrap from './ModalBodyWrap'
import useThemeStore from '../../../hooks/stores/useThemeStore'
import useModalState from '../../../hooks/stores/useModalState'
import useModalStore from '../../../hooks/useModalStore'


const FilteredSearch = ({ query, searchHistory, modalId  }) => {
    const [filters, setFilters] = useState('')
    const {variant} = useThemeStore(state=>state.theme)
    const navigate = useNavigate()
    const changeModalOpen = useModalState(state=>state.changeModalOpen)

    const handleFilter = (e) => {
        setFilters(e.target.value)
    }
    const goTo = (place) => {
        navigate(`/word/${place}`)
        let current_modal = 'filteredSearch'
        $(`#${current_modal}`).addClass('hidden')
        $(`#${current_modal}`).removeClass('flex')
        changeModalOpen(false)
    }
    // useModalStore()

  return (
    
    <ModalBodyWrap modalId={'filteredSearch'}>
        <div className={`w-ninetyPercent sm:w-seventyPercent md:w-sixtyPercent lg:w-fiftyPercent h-ninetyPercent grid grid-rows-6 overflow-hidden z-50 rounded-lg py-4 ${variant === 'light' ? 'bg-white' : 'bg-black border'} m-auto`}>
            <div className='row-span-1 px-6'>
                <label htmlFor="filterSearch" className='focus-within:border-primary-color w-full mx-auto flex  gap-4 px-4 py-2 rounded-lg border'>
                    <input onChange={handleFilter}  type="search" name='filterSearch' defaultValue={filters} id='filterSearch' className='focus:outline-none focus:ring-0 w-full px-2 rounded-lg bg-transparent text-theme-text-color' placeholder='Browse Your History ...' />
                    <NavLink to={`/word/${query}`} className='flex px-4 py-4 bg-primary-color rounded-lg'>
                        <AiOutlineSearch  color='white' size="20px" />
                    </NavLink>
                </label>
            </div>
            <div className='py-4 px-6 row-span-5'>
                <ul className='py-4 h-full space-y-3 overflow-y-auto'>
                    {searchHistory
                    .filter(history => filters === "" || history.query.toLowerCase().includes(filters.toLowerCase()))
                    .map((history, index)=>{
                        return <li key={index} className="w-full flex filtered-search" > <NavLink to={`/word/${history.query}`} className="py-2 border-b border-b-primary-color w-full" >{history.query}</NavLink></li>
                    })}
                </ul>
            </div>
        </div>
    </ModalBodyWrap>
  )
}

export default FilteredSearch