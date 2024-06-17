import React from 'react'

const Searchuser = () => {
  return (
    <div className='fixed top-0 bottom-0 left-0 right-0 '>
      <div className='w-full max-w-md mx-auto mt-10'>
        <div>
            <input
            type='text' placeholder='Search user by name...'
            className='w-full py-2 px-4 outline-none'></input>
        </div>
      </div>
    </div>
  )
}

export default Searchuser
