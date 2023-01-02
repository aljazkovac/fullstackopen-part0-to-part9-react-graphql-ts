import BlogRow from './BlogRow'

const BlogList = ({blogs}) => {
    return(
        blogs.map(blog =>
        <BlogRow key={blog.id} blog={blog} />
        )
    )
}

export default BlogList