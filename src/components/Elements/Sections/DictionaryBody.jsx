import React, { useRef } from 'react'
import  { BiVolumeFull } from 'react-icons/bi'
import { NavLink } from 'react-router-dom'


const DictionaryBody = ({ searchResults }) => {

    const audioRef = useRef()

  return (
    <div>
        {searchResults.map((result, index)=>{
            return  <div className='space-y-10'>
                <div className='flex justify-between gap-10 items-start'>
                        <div className='space-y-2'>
                            <h2 className='font-bold first-letter:uppercase text-2xl sm:text-3xl'>{result.word}</h2>
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
                            <h3 className='text-sm font-bold' key={index}>{meaning.partOfSpeech}</h3>
                            <ul className='list-disc list-inside space-y-2 text-theme-text-color font-medium'>
                                {meaning.definitions.map((definition, index)=>{
                                    return <li key={index}>{definition.definition}</li>
                                })}
                            </ul>
                            <div>
                                {meaning.synonyms.length !=  0 &&
                                    <div>
                                    <h2 className='text-base font-semibold'>Synonyms</h2>
                                    {meaning.synonyms.map((synonym, index)=>{
                                        return <p key={index} className="space-x-2"><span>{index+1}. </span> <NavLink onClick={()=>setQuery(synonym)} to={`/word/${synonym}`} className="underline">{synonym}</NavLink></p>
                                    })}
                                </div>
                                }
                            </div>
                            <div>
                                {meaning.antonyms.length != 0 &&
                                        <div>
                                        <h2 className='text-base font-semibold'>Antonyms</h2>
                                            {meaning.antonyms.map((antonym, index)=>{
                                                return <p key={index} className="space-x-2"><span>{index+1}. </span> <NavLink onClick={()=>setQuery(antonym)} to={`/word/${antonym}`} className="underline">{antonym}</NavLink></p>
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

export default DictionaryBody