import React, { useEffect } from 'react'
import $ from 'jquery'
import useModalState from './stores/useModalState'

const useModalStore = () => {
    const changeModalOpen = useModalState(state=>state.changeModalOpen)

    
    const handleModal = () => {
        $('.modal-opener').each(function(){
            $(this).on('click', function(){
                let current_modal = $(this).attr('data-modal')
                $(`#${current_modal}`).removeClass('hidden')
                $(`#${current_modal}`).addClass('flex')
                changeModalOpen(true)
            })
        })
        $('.modal-closer').each(function(){
            $(this).on('click', function(){
                let current_modal = $(this).attr('data-modal-close')
                $(`#${current_modal}`).addClass('hidden')
                $(`#${current_modal}`).removeClass('flex')
                changeModalOpen(false)
            })
        })
    }


    useEffect(() => {
        document.addEventListener('click', handleModal())
      
        return () => {
          document.removeEventListener('click', handleModal())
        }
      }, [])
}

export default useModalStore