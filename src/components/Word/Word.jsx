import React, { useEffect,  useState, useLayoutEffect } from 'react'
import  { AiOutlineSearch, AiOutlineHistory } from 'react-icons/ai'
import axios from 'axios'
import { NavLink, useLocation, useNavigate  } from 'react-router-dom'
import useSearchHistory from '../../hooks/stores/useSearchHistory'
import Treasure from '../../components/Undraw/Treasure'
import QAEngineer from '../Undraw/QAEngineer'
import FilteredSearch from '../Elements/Modals/FilteredSearch'
import useModalStore from '../../hooks/useModalStore'
import {useDocTitle} from '../../hooks/DocumentTitle'
import DictionaryBody from '../Elements/Sections/DictionaryBody'


const Word = () => {
    const location = useLocation()
    useModalStore()
    const navigate = useNavigate();
    const [searchLoading, setSearchLoading] = useState(false)
    const [searchResults, setSearchResults] = useState([])
    const [query, setQuery] = useState(location.pathname.split('/')[2])
    const searchHistory = useSearchHistory(state=>state.searchHistory)
    const setSearchHistory = useSearchHistory(state=>state.setSearchHistory)
    useDocTitle(`Wordive | Meaning`)
    const [error, setError] = useState(
        {
            "isError": false,
            "title":"",
            "message":"",
            "resolution":""
        }
    )

    const handleChange = (e) => {
        setQuery(e.target.value)
    }

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
          handleSearch();
          navigate(`/word/${query}`);
        }
    }



    // console.log(location.pathname.split('/')[2]);
    // console.log("query: " + query);

    // prevent pushing if word has been searched before
    // setSearchHistory(prevHistory => {
    //     // Check if the query already exists in the array
    //     const queryExists = prevHistory.some(item => item.query === val);
      
    //     // If the query already exists, return the previous history array
    //     if (queryExists) {
    //       return prevHistory;
    //     }
      
    //     // If the query doesn't exist, add it to the history array and return the new array
    //     return [...prevHistory, {query: val}];
    //   });
      
    
    const handleSearch = () => {
        setSearchLoading(true)
        axios.get(`https://api.dictionaryapi.dev/api/v2/entries/en/${location.pathname.split('/')[2]}`)
        .then((response)=>{
            setSearchLoading(false)
            setSearchResults([response.data[0]])
            console.log(response.data[0]);
            setSearchHistory(query);
            setError({...error, 'isError': false})
            // console.log(response.data.message);
           
        })
        .catch((err)=>{
            console.log(err.response.data.title);
                setError(
                    {
                        "isError": true,
                        "title": err.response.data.title,
                        "message": err.response.data.message,
                        "resolution": err.response.data.resolution
                    }
                )
                setSearchLoading(false)
        })
    }

    useEffect(() => {
        handleSearch()
    }, [location.pathname])

    useEffect(() => {
        handleSearch()
    }, [])

    

    useLayoutEffect(() => {
        window.scrollTo(0, 0);
      }, [location.pathname]);
    

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
            {/* <p>{query}</p>
            <p>{JSON.stringify(searchResults)}</p> */}
            {/* {error.isError ? 'Error' : 'Hi'} */}
        </div>
        {
            searchLoading
            ?
            <div className='space-y-10'>
                <Treasure />
                <div>
                    <div className='text-primary-color text-2xl font-bold text-center space-x-2'>
                        <p className='inline-block'>Loading</p>
                        <div className='rounded-[50%] w-2 h-2 bg-primary-color inline-block animate-pulse'></div>
                        <div className='rounded-[50%] w-2 h-2 bg-primary-color inline-block animate-pulse delay-500'></div>
                        <div className='rounded-[50%] w-2 h-2 bg-primary-color inline-block animate-pulse delay-1000'></div>
                    </div>
                </div>
            </div>
            :
            <div>
                {
                    error.isError 
                    ?
                    <div className='space-y-10'>
                        <QAEngineer />
                        <div className='text-center space-y-2 text-xs'>
                            <p className='text-lg font-bold'>{error.title}</p>
                            <p>{error.message}</p>
                            <p>{error.resolution}</p>
                        </div>
                    </div>
                    :
                    <DictionaryBody searchResults={searchResults} />
                }
            </div>
        }
    </div>
  )
}

export default Word