import React from 'react'

const Pagination = ({ currentPage }: { currentPage: any }) => {
  return (
    <>
        <p className="mx-2"> {currentPage} </p>
    </>
  )
}

export default Pagination