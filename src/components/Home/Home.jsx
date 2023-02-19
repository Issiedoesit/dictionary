import React, { useEffect, useRef, useState } from 'react'
import  { AiOutlineSearch, AiOutlineHistory, AiOutlineAudio } from 'react-icons/ai'
import  { BiVolumeFull } from 'react-icons/bi'
import axios from 'axios'
import Hello from '../../data/Hello'
import { NavLink, useNavigate } from 'react-router-dom'
import FilteredSearch from '../Elements/Modals/FilteredSearch'
import DictionaryBody from '../Elements/Sections/DictionaryBody'
import useModalStore from '../../hooks/useModalStore'
import useSearchHistory from '../../hooks/stores/useSearchHistory'

const Home = () => {
    const navigate = useNavigate()
    useModalStore()
    const [searchResults] = useState(Hello)
    const [query, setQuery] = useState('hello')
    const searchHistory = useSearchHistory(state=>state.searchHistory)

    const handleChange = (e) => {
        setQuery(e.target.value)
    }

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
          navigate(`/word/${query}`);
        }
    }

  return (
    <div className='relative z-10 text-primary-color px-5 sm:px-10 lg:px-20 py-10 md:py-14 w-full raleway'>
        <div className='flex flex-col sm:flex-row gap-10'>
            <label htmlFor="search" className='focus-within:border-primary-color w-full sm:w-[90%] mx-auto flex  gap-4 px-4 py-2 rounded-lg border'>
                <input onChange={handleChange} onKeyDown={handleKeyDown} type="search" name='search' id='search' className='focus:outline-none focus:ring-0 w-full px-2 rounded-lg bg-transparent text-theme-text-color' placeholder='Begin Searching ...' />
                <NavLink to={`/word/${query}`} className='flex px-4 py-4 bg-primary-color rounded-lg'>
                    <AiOutlineSearch  color='white' size="20px" />
                </NavLink>
            </label>
            <div className='group relative self-end sm:self-start'>
                <button onClick={()=>{document.getElementById('history').classList.toggle('hidden')}} className='flex gap-3 items-center w-fit rounded-lg bg-primary-color text-white px-4 py-2 text-sm font-semibold'>
                    <p className='whitespace-nowrap'>View History</p>
                    <AiOutlineHistory size="28px" />
                </button>
                <ul id="history" className='bg-white hidden absolute top-hundredPercent right-0 px-4 py-4 space-y-3 text-left text-sm font-medium shadow-lg w-full rounded-bl-lg'>
                    {searchHistory.slice(0,5).map((history, index)=>{
                        return <li key={index}> <NavLink to={`/word/${history.query}`}>{history.query}</NavLink></li>
                    })}
                    <li><button data-modal="filteredSearch" className='view-more modal-opener'>View more ...</button></li>
                </ul>
            </div>
        </div>
        <FilteredSearch query={query} searchHistory={searchHistory} />
        <div className='py-7'>
            {/* <p>{query}</p> */}
            {/* <p>{JSON.stringify(searchResults)}</p> */}
        </div>
        <DictionaryBody searchResults={searchResults} />
    </div>
  )
}

export default Home