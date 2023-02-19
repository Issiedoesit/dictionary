import React, { useEffect, useRef, useState } from 'react'
import  { AiOutlineSearch, AiOutlineHistory, AiOutlineAudio } from 'react-icons/ai'
import  { BiSpeaker, BiVolumeFull } from 'react-icons/bi'
import axios from 'axios'
import Hello from '../../data/Hello'
import { NavLink } from 'react-router-dom'

const Home = () => {
    const [searchLoading, setSearchLoading] = useState(false)
    const [searchResults, setSearchResults] = useState(Hello)
    const [query, setQuery] = useState('hello')
    const [searchFor, setSearchFor] = useState('hello')
    const [searchHistory, setSearchHistory] = useState([])
    const audioRef = useRef()

    const handleChange = (e) => {
        setQuery(e.target.value)
    }


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
        setSearchFor(query)
        setSearchHistory(prevHistory => {
            // Remove the previous search history items that match the new query
            const newHistory = prevHistory.filter(item => item.query !== query);
          
            // Add the new query to the beginning of the history array
            newHistory.unshift({query: query});
          
            // Return the new history array
            return newHistory;
          });
        axios.get(`https://api.dictionaryapi.dev/api/v2/entries/en/${searchFor}`)
        .then((response)=>{
            setSearchLoading(false)
            setSearchResults([response.data[0]])
            console.log(response.data[0]);
        })
        .catch((err)=>{
            console.log(err);
        })
    }

    const handleSynonyms = (val) =>{   
        setSearchLoading(true)
        setSearchHistory(prevHistory => {
            // Remove the previous search history items that match the new query
            const newHistory = prevHistory.filter(item => item.query !== val);
          
            // Add the new query to the beginning of the history array
            newHistory.unshift({query: val});
          
            // Return the new history array
            return newHistory;
          });          
        axios.get(`https://api.dictionaryapi.dev/api/v2/entries/en/${val}`)
        .then((response)=>{
            setSearchLoading(false)
            setSearchResults([response.data[0]])
            console.log(response.data[0]);
        })
        .catch((err)=>{
            console.log(err);
        })
    }


    useEffect(() => {
      handleSearch()
    }, [searchFor])
    
    

  return (
    <div className='text-primary-color px-5 sm:px-10 lg:px-20 py-10 md:py-14 w-full raleway'>
        <div className='flex gap-10'>
            <label htmlFor="search" className='w-[90%] mx-auto flex gap-4 px-4 py-2 rounded-lg border'>
                <input onChange={handleChange} type="search" name='search' id='search' className='focus:outline-none focus:ring-0 w-full' placeholder='Begin Searching ...' />
                <NavLink  to={`/word/${query}`} className='flex px-4 py-4 bg-primary-color rounded-lg'>
                    <AiOutlineSearch  color='white' size="20px" />
                </NavLink>
            </label>
            <div className='group relative z-30'>
                <button className='flex gap-3 items-center w-fit rounded-lg bg-primary-color text-white px-4 py-2 text-sm font-semibold relative'>
                    <p className='whitespace-nowrap'>View History</p>
                    <AiOutlineHistory size="28px" />
                </button>
                <ul className='z-30 bg-white group-focus-within:block hidden absolute top-hundredPercent right-0 px-4 py-4 space-y-3 text-left text-sm font-medium shadow-lg w-full rounded-bl-lg'>
                    {searchHistory.map((history, index)=>{
                        return <li key={index}> <button onClick={()=>handleSynonyms(history.query)}>{history.query}</button></li>
                    })}
                </ul>
            </div>
        </div>
        
        <div className='py-7'>
            <p>{query}</p>
            {/* <p>{JSON.stringify(searchResults)}</p> */}
        </div>
       {searchResults.map((result, index)=>{
           return  <div className='space-y-10'>
               <div className='flex justify-between gap-10 items-start'>
                    <div className='space-y-2'>
                        <h2 className='font-bold first-letter:uppercase text-2xl'>{result.word}</h2>
                        {
                        result.phonetics.map((item) => item.text).some(Boolean)
                        &&
                        <div className=''>{result.phonetics.filter((item) => item.text).length > 1 
                            ? 
                            <p>{result.phonetics[1].text}</p>
                            :
                            <p>{result.phonetics[0].text}</p>
                             }
                        </div>
                    }
                    </div>
                    <button className='' onClick={()=>{audioRef.current.play()}}>
                        <BiVolumeFull className='' size="28px" />
                    </button>
                    {
                        result.phonetics.map((item) => item.audio).some(Boolean)
                        &&
                        <div className='hidden'>{result.phonetics.filter((item) => item.audio).length > 1 
                            ? 
                            <audio ref={audioRef} controls src={result.phonetics[1].audio} className="hidden"></audio>
                            :
                            <audio ref={audioRef} controls src={result.phonetics[0].audio} className="hidden"></audio>
                             }
                        </div>
                    }
               </div>
               {result.meanings.map((meaning, index)=>{
                   return <div className='space-y-3'>
                        <p className='text-sm' key={index}>{meaning.partOfSpeech}</p>
                        <div>
                            {meaning.definitions.map((definition, index)=>{
                                return <p key={index}>{definition.definition}</p>
                            })}
                        </div>
                        <div>
                            {meaning.synonyms.length !=  0 &&
                                <div>
                                <h2 className='text-base font-semibold'>Synonyms</h2>
                                {meaning.synonyms.map((synonym, index)=>{
                                    return <p key={index} className="space-x-2"><span>{index+1}. </span> <button onClick={()=>{handleSynonyms(synonym)}} className="hover:underline">{synonym}</button></p>
                                })}
                            </div>
                            }
                        </div>
                        <div>
                            {meaning.antonyms.length != 0 &&
                                    <div>
                                    <h2 className='text-base font-semibold'>Antonyms</h2>
                                        {meaning.antonyms.map((antonym, index)=>{
                                            return <p key={index} className="space-x-2"><span>{index+1}. </span> <button onClick={()=>{handleSynonyms(antonym)}} className="hover:underline">{antonym}</button></p>
                                        })}
                                </div>
                            }
                        </div>
                    </div>
               })}
           </div>
       })}
    </div>
  )
}

export default Home