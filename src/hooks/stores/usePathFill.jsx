import React, { useEffect } from 'react'

const usePathFill = () => {

    const pathFill = () => {
        let paths = document.querySelectorAll('path')
        paths.forEach((path)=>{
          path.getAttribute('fill') == '#6c63ff' && path.classList.add('fill-primary-color')
        })
      }
  
  
      useEffect(() => {
          pathFill()
      }, [])
}

export default usePathFill