import { Routes, Route, Link } from 'react-router-dom'
import LandingPage from './LandingPage'
import Users from './Users'

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
                <Route path="/users" element={<Users />} />
            </Routes>
        </div>
    )
}

export default Menu
