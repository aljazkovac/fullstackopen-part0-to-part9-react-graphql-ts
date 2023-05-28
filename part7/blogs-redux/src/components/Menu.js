import { Routes, Route, Link } from 'react-router-dom'
import LandingPage from './LandingPage'
import UsersTable from './UsersTable'
import User from './User'

const Menu = ({ user }) => {
    const padding = {
        paddingRight: 5,
    }
    return (
        <div>
            <div>
                <Link style={padding} to="/">
                    blogs
                </Link>
                <Link style={padding} to="/users">
                    users
                </Link>
            </div>
            <Routes>
                <Route path="/" element={<LandingPage user={user} />} />
                <Route path="/users" element={<UsersTable />} />
                <Route path="/users/:id" element={<User />} />
            </Routes>
        </div>
    )
}

export default Menu
