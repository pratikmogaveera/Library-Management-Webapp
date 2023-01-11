import { useState } from 'react'
import { Route, Routes, BrowserRouter as Router } from 'react-router-dom'
import { Provider } from 'react-redux'
import { store } from './app/store'
import SignUp from './scenes/SignUp'
import Login from './scenes/Login'
import Landing from './scenes/Landing'
import Home from './scenes/Home'
import AddBook from './scenes/AddBook'
import EditBook from './scenes/EditBook'

function App() {
    return (
        <Provider store={store}>
            <Router>
                <Routes>
                    <Route path="/" element={<Landing />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/sign-up" element={<SignUp />} />
                    <Route path="/home" element={<Home />} />
                    <Route path="/add-book" element={<AddBook />} />
                    <Route path="/edit-book/:id" element={<EditBook />} />
                </Routes>
            </Router>
        </Provider>
    )
}

export default App
