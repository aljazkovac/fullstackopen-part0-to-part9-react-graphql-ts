const BlogRow = ({ blog }) => (
  <div>
    {blog.title}, {blog.author}, {blog.likes}
  </div>
)

export default BlogRow