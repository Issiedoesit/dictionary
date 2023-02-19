import React from 'react'

const ModalBodyWrap = ( { children, modalId } ) => {
  return (
    <div id={modalId} className='modal z-60 w-full fixed top-0 left-0 h-screen hidden py-20'>
      <div data-modal-close={modalId} className='cursor-pointer modal-closer w-full h-screen fixed top-0 left-0 bg-black/30 backdrop-blur-sm z-50'></div>
      {children}
    </div>
  )
}

export default ModalBodyWrap