import BlogAddForm from './BlogAddForm'
import LogOutForm from './LogOutForm'
import Togglable from './Togglable'

const LoggedInView = ({cancel, setCancel, user, blogs, setBlogs, setMessage, setError}) => {

    return (
        <div>
            <p>{user.name} logged in</p>
            <LogOutForm />
            <Togglable buttonLabel='Add a blog' cancel={cancel} setCancel={setCancel} >
                <BlogAddForm cancel={cancel} blogs={blogs} setBlogs={setBlogs} setMessage={setMessage} setError={setError} />
            </Togglable>
        </div>
    )
}

export default LoggedInView