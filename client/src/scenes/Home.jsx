import { useState, useEffect, useMemo } from 'react'
import axios from 'axios'
import styles from '../styles'
import Navbar from '../components/Navbar'
import BookListItem from '../components/BookListItem'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { selectCurrentToken, selectCurrentAuths } from '../features/auth/authSlice'
import { useRemoveBookMutation } from '../features/books/booksApiSlice'


const Home = () => {
    const navigate = useNavigate()
    const token = useSelector(selectCurrentToken)
    const [data, setData] = useState([])
    const [search, setSearch] = useState('')
    const isAdmin = useSelector(state => state.auth.isAdmin)
    const isEditor = useSelector(state => state.auth.isEditor)

    useEffect(() => {
        getAllBooks()
    }, [search])

    const getAllBooks = async () => {
        const res = await axios.get('http://localhost:3001/books', { headers: { "Authorization": `Bearer ${token}` } })
            .then((res) => setData([...res.data]))
    }

    const [removeBook] = useRemoveBookMutation()

    const deleteBook = async (id) => {
        await removeBook(id)
        getAllBooks()
    }

    // Sort the list of books alphabetically
    const bookSortAlpha = () => {
        const newData = data.sort((a, b) => a.title.localeCompare(b.title))
        setData([...newData])
    }

    // Show only Issued Books.
    const bookSortIssued = async () => {
        const res = await axios.get('http://localhost:3001/books/issued', { headers: { "Authorization": `Bearer ${token}` } })
            .then((res) => setData([...res.data]))
    }

    // Show only Available Books.
    const bookSortAvailable = async () => {
        const res = await axios.get('http://localhost:3001/books/available', { headers: { "Authorization": `Bearer ${token}` } })
            .then((res) => setData([...res.data]))
    }

    // Search for a book.
    const searchData = async (search) => {
        if (search.length > 2) {
            const newData = data.filter(item => item.title.toLowerCase().includes(search.toLowerCase()) || item.author.toLowerCase().includes(search.toLowerCase()))
            setData([...newData])
        }
    }

    const content = data.length ? data.map(book => <BookListItem key={book.id} {...book} isAdmin={isAdmin} isEditor={isEditor} deleteBook={() => deleteBook(book.id)} />) : <p className="text-black w-full text-center">No Books Found.</p>

    return (
        <div className={`${styles.fullScreen}`}>
            <Navbar options={true} />
            <div className="h-full lg:px-8 pt-16 lg:pt-20">
                <div className="h-full w-full p-4">
                    <div className="w-full h-full flex flex-col bg-[white] rounded-lg">
                        <div className="w-full rounded-t-lg h-fit p-4 flex flex-col lg:flex-row gap-2 justify-between">
                            <div className="flex gap-2 w-fit">
                                <input
                                    className="bg-[#5f50a9] h-fit p-2 pl-4 rounded-lg w-[100%] max-w-[300px]"
                                    placeholder='Search...'
                                    value={search}
                                    onChange={(e) => setSearch(e.target.value)}
                                >
                                </input>
                                <button className="home-button" onClick={() => searchData(search)}>Search</button>
                            </div>
                            <div className="flex gap-2 w-fit flex-wrap xl:justify-center">
                                <button className="home-button" onClick={() => getAllBooks()}>All Books</button>
                                <button className="home-button" onClick={() => bookSortAlpha()}>Sort [A-Z]</button>
                                <button className="home-button" onClick={() => bookSortIssued()}>Issued</button>
                                <button className="home-button" onClick={() => bookSortAvailable()}>Available</button>
                                {isAdmin && <button className="w-fit font-semibold rounded-lg bg-pink-600 p-2" onClick={() => navigate('/add-book')}>Add Book</button>}
                            </div>
                        </div>
                        <div className="w-full h-fit p-4 flex flex-col gap-2">
                            {content}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Home