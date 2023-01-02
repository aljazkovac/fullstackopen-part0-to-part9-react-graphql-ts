import { useEffect, useState } from 'react'
import BlogList from './BlogList'
import BlogAddForm from './BlogAddForm'
import blogService from '../services/blogs'

const LoggedInView = ({user}) => {
    const [blogs, setBlogs] = useState([])
    useEffect(() => {
        blogService.getAll().then(initialBlogs =>
        setBlogs( initialBlogs )
        )  
    }, [])
    return (
        <div>
            <p>{user.name} logged in</p>
            <BlogList blogs={blogs} />
            <BlogAddForm blogs={blogs} setBlogs={setBlogs}/>
        </div>
    )
}
export default LoggedInView