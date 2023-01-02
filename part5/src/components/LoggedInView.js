import { useEffect, useState } from 'react'
import BlogList from './BlogList'
import BlogAddForm from './BlogAddForm'
import blogService from '../services/blogs'
import LogOutForm from './LogOutForm'

const LoggedInView = ({user, setMessage}) => {
    const [blogs, setBlogs] = useState([])
    useEffect(() => {
        blogService.getAll().then(initialBlogs =>
        setBlogs( initialBlogs )
        )  
    }, [])
    return (
        <div>
            <p>{user.name} logged in</p>
            <LogOutForm />
            <h3>All blogs(title, author, likes)</h3>
            <BlogList blogs={blogs} />
            <h4>Add a blog</h4>
            <BlogAddForm blogs={blogs} setBlogs={setBlogs} setMessage={setMessage} />
        </div>
    )
}
export default LoggedInView