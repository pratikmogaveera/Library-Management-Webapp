import { useState, useEffect } from 'react'
import styles from '../styles'
import Navbar from '../components/Navbar'
import axios from 'axios'
import { useNavigate, useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { selectCurrentToken } from '../features/auth/authSlice'
import { useUpdateBookMutation } from '../features/books/booksApiSlice'

const EditBook = () => {
    const { id } = useParams()
    const [data, setData] = useState([])
    const [errMsg, setErrMsg] = useState('')
    const navigate = useNavigate()
    const token = useSelector(selectCurrentToken)

    const [book, setBook] = useState({
        title: '',
        author: '',
        bookType: '',
        publishedYear: '',
        tags: '',
        isIssued: false,
    })

    useEffect(() => {
        getBook(id)
    }, [])

    const getBook = async (id) => {
        const res = await axios.get(`http://localhost:3001/books/id/${id}`, { headers: { "Authorization": `Bearer ${token}` } })
            .then((res) => setBook({ ...res.data, tags: res.data.tags.join(' ') }))
    }

    // Keep the data in state always updated.
    const handleChange = (e) => {
        const { name, value } = e.target
        setBook({ ...book, [name]: value })
    }

    const [updateBook] = useUpdateBookMutation()

    const editBook = async (e) => {
        e.preventDefault()
        const { data, error: err } = await updateBook({ ...book, tags: book.tags.split(' ') })
        if (!data)
            navigate('/home')
        if (err) {
            if (!err?.originalStatus) {
                setErrMsg('No Server Response')
            } else if (err.originalStatus === 400) {
                setErrMsg('Missing Details about book')
            } else if (err.originalStatus === 404) {
                setErrMsg('Wrong id.')
            } else if (err.originalStatus === 401 || err.originalStatus === 403) {
                setErrMsg('You are unauthorized.')
            } else {
                setErrMsg('Edit Failed')
            }
        }
    }
    return (
        <div className={`${styles.fullScreen} overflow-x-hidden`}>
            <Navbar options={true} />
            <div className={`${styles.flexCenter} h-full pt-14 p-4`}>
                <form className="bg-[#5F50a9] w-full lg:w-[450px] h-fit rounded-lg p-4 flex flex-col justify-center gap-4 drop-shadow-2xl">
                    {errMsg && <p className="errmsg">{errMsg}</p>}
                    <h1 className="text-[#ededed] font-bold text-[40px] mb-2">Edit Book</h1>

                    <div className="flex flex-col gap-1">
                        <label className="form-label">Title:</label>
                        <input className="form-input2" placeholder='Title' name="title" value={book.title} onChange={(e) => handleChange(e)}></input>
                    </div>
                    <div className="flex flex-col gap-1">
                        <label className="form-label">Author:</label>
                        <input className="form-input2" placeholder='Author' name="author" value={book.author} onChange={(e) => handleChange(e)}></input>
                    </div>
                    <div className="flex flex-row gap-2">
                        <div className="flex flex-col gap-1">
                            <label className="form-label">Published In:</label>
                            <input className="form-input2" placeholder='Published In' name="publishedYear" value={book.publishedYear} onChange={(e) => handleChange(e)}></input>
                        </div>
                        <div className="flex flex-col gap-1">
                            <label className="form-label">Book Type:</label>
                            <input className="form-input2" placeholder='Book Type' name="bookType" value={book.bookType} onChange={(e) => handleChange(e)}></input>
                        </div>
                    </div>
                    <div className="flex flex-col gap-1">
                        <label className="form-label">Tags: <span className="font-light5">{"( Separated by spaces )"}</span></label>
                        <input className="form-input2" placeholder='Tags' name="tags" value={book.tags} onChange={(e) => handleChange(e)}></input>
                    </div>
                    <div className="flex flex-col gap-1">
                        <label className="form-label">Status:</label>
                        <select name="isIssued" value={book.isIssued} className="w-full h-fit p-2 rounded-lg text-black" onChange={(e) => handleChange(e)}>
                            <option value={true}>Issued</option>
                            <option value={false}>Available</option>
                        </select>
                    </div>
                    <button className="p-2 rounded-lg h-fit w-full bg-pink-600 mb-4" onClick={(e) => editBook(e)}>Edit Book</button>
                </form>
            </div>
        </div>
    )
}

export default EditBook