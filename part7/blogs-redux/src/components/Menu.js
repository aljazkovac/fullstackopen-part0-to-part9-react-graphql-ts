import { Routes, Route, Link } from 'react-router-dom'
import LandingPage from './LandingPage'
import UsersTable from './UsersTable'

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
                <Route exact path="/users" element={<UsersTable />} />
            </Routes>
        </div>
    )
}

export default Menu
