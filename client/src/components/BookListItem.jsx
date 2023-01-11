import React, { useState } from 'react'
import { AiFillCheckCircle, AiFillDelete } from 'react-icons/ai'
import { ImCross } from 'react-icons/im'
import { FiEdit } from 'react-icons/fi'
import { useNavigate } from 'react-router-dom'

// This the element being rendered in the homepage displaying details for each book.

const BookListItem = ({ id, title, author, isIssued, isAdmin, isEditor, deleteBook }) => {
    const navigate = useNavigate()
    return (
        <div className="flex flex-row w-full gap-2 ">
            <div className="flex gap-4 w-full h-fit p-2 px-4 justify-between items-center text-[#1a1a1a] bg-[#ededed] hover:bg-[#b1a7fc] cursor-pointer rounded-lg overflow-x-scroll no-scrollbar">
                <div className="flex flex-row gap-2 items-center whitespace-nowrap overflow-x-scroll no-scrollbar">
                    {isIssued ?
                        <span className="text-red-500"><ImCross /></span>
                        :
                        <span className="text-[20px] text-green-500"><AiFillCheckCircle /></span>}
                    <p className="font-semibold">{title}</p>
                </div>
                <p className="whitespace-nowrap overflow-x-scroll no-scrollbar">{"- " + author}</p>
            </div>
            {/* Show options based on user's role. */}
            <div className={`${isAdmin || isEditor ? "" : "hidden"} flex w-fit px-2 gap-1 justify-between items-center text-[#1a1a1a] bg-[#ededed] rounded-lg`}>
                {(isAdmin || isEditor) && <span className="cursor-pointer text-[18px] p-2 rounded-full hover:bg-[#1a1a1a] hover:bg-opacity-20" onClick={() => navigate(`/edit-book/${id}`)}><FiEdit /></span>}
                {isAdmin && <span className="cursor-pointer text-[20px] p-2 rounded-full hover:bg-[#1a1a1a] hover:bg-opacity-20" onClick={deleteBook}><AiFillDelete /></span>}
            </div>
        </div>
    )
}

export default BookListItem