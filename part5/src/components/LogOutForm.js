const LogOutForm = () => {
    const handleLogout = () => {
        window.localStorage.removeItem('loggedBlogappUser')
    }
    return(
        <form onSubmit={handleLogout}>
            <button type='submit'>Log out</button>
        </form>
    )
}
export default LogOutForm