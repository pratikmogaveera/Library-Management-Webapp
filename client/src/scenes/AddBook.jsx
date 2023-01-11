import { useState } from 'react'
import styles from '../styles'
import Navbar from '../components/Navbar'
import { useNavigate, useParams } from 'react-router-dom'
import { useAddBookMutation } from '../features/books/booksApiSlice'

const AddBook = () => {
    const [errMsg, setErrMsg] = useState('')
    const navigate = useNavigate()
    const [book, setBook] = useState({
        title: '',
        author: '',
        bookType: '',
        publishedYear: '',
        tags: '',
        isIssued: false,

    })

    // Keep the data in state always updated.
    const handleChange = (e) => {
        const { name, value } = e.target
        setBook({ ...book, [name]: value })
    }

    const [addBook] = useAddBookMutation()
    
    const addBookMethod = async (e) => {
        e.preventDefault()
        setErrMsg('')
        const { data, error: err } = await addBook({ ...book, tags: book.tags.split(' ') })

        // If Successful and sends back Data
        if (data)
            navigate('/home')

        // If failed and caused an error.
        if (err) {
            if (!err?.originalStatus) {
                setErrMsg('No Server Response')
            } else if (err.originalStatus === 400) {
                setErrMsg('Missing Details about book')
            } else if (err.originalStatus === 401 || err.originalStatus === 403) {
                setErrMsg('You are unauthorized.')
            } else {
                setErrMsg('Add Failed')
            }
        }
    }

    return (
        <div className={`${styles.fullScreen}`}>
            <Navbar options={true} />
            <div className={`${styles.flexCenter} h-full pt-14 p-4`}>
                <form className="bg-[#5F50a9] w-full lg:w-[450px] h-fit rounded-lg p-4 flex flex-col justify-center gap-4 drop-shadow-2xl">
                    {errMsg && <p className="errmsg">{errMsg}</p>}
                    <h1 className="text-[#ededed] font-bold text-[40px] mb-2 mt-5">Add Book</h1>

                    <div className="flex flex-col gap-1">
                        <label className="form-label">Title:</label>
                        <input className="form-input2" placeholder='Title' name="title" value={book.title} onChange={(e) => handleChange(e)}></input>
                    </div>
                    <div className="flex flex-col gap-1">
                        <label className="form-label">Author:</label>
                        <input className="form-input2" placeholder='Author' name="author" value={book.author} onChange={(e) => handleChange(e)}></input>
                    </div>
                    <div className="flex flex-col gap-1">
                        <label className="form-label">Published In:</label>
                        <input className="form-input2" placeholder='Published In' name="publishedYear" value={book.publishedYear} onChange={(e) => handleChange(e)}></input>
                    </div>
                    <div className="flex flex-col gap-1">
                        <label className="form-label">Book Type:</label>
                        <input className="form-input2" placeholder='Book Type' name="bookType" value={book.bookType} onChange={(e) => handleChange(e)}></input>
                    </div>
                    <div className="flex flex-col gap-1">
                        <label className="form-label">Tags: <span className="font-light5">{"( Separated by spaces )"}</span></label>
                        <input className="form-input2" placeholder='Tags' name="tags" value={book.tags} onChange={(e) => handleChange(e)}></input>
                    </div>
                    <button className="p-2 rounded-lg h-fit w-full bg-pink-600 mb-4" onClick={(e) => addBookMethod(e)}>Add Book</button>
                </form>
            </div>
        </div>
    )
}

export default AddBook