import React from 'react'
import { AppBar, Toolbar, Button } from '@mui/material'
import { Link } from 'react-router-dom'
import { Routes, Route } from 'react-router-dom'
import LandingPage from './LandingPage'
import UsersTable from './UsersTable'
import User from './User'
import Blog from './Blog'

const Menu = ({ user }) => {
    return (
        <div>
            <AppBar
                position="static"
                sx={{ backgroundColor: '#f5f5f5', color: 'black' }}
            >
                <Toolbar>
                    <Button color="inherit" component={Link} to="/">
                        Blogs
                    </Button>
                    <Button color="inherit" component={Link} to="/users">
                        Users
                    </Button>
                </Toolbar>
            </AppBar>
            <Routes>
                <Route path="/" element={<LandingPage user={user} />} />
                <Route path="/users" element={<UsersTable />} />
                <Route path="/users/:userId" element={<User />} />
                <Route path="/users/:userId/:blogId" element={<Blog />} />
            </Routes>
        </div>
    )
}

export default Menu
