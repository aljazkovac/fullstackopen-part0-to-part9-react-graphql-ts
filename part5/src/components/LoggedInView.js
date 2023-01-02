import { useEffect, useState } from 'react'
import BlogRow from './BlogRow'
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
            {blogs.map(blog =>
            <BlogRow key={blog.id} blog={blog} />
            )}
        </div>
    )
}
export default LoggedInView