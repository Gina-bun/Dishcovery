import { useState } from 'react'
import { Link } from 'react-router'
import './Navbar.css'
import { Menu, X, Search, Bookmark } from 'lucide-react'

export function Navbar(){
    const [open, setOpen] = useState(false)

    return (
        <header className="navbar">
            <div className="nav-inner">
                <div className="brand">Dishcovery</div>

                <button
                    className="nav-toggle"
                    aria-label={open ? 'Close menu' : 'Open menu'}
                    aria-expanded={open}
                    onClick={() => setOpen(v => !v)}
                >
                    {open ? <X size={20} /> : <Menu size={20} />}
                </button>

                <nav className={`nav-links ${open ? 'open' : ''}`} aria-hidden={!open && true}>
                    <Link to="/" className="nav-link" >Home</Link>
                    <Link to="/categories" className="nav-link">Categories</Link>
                     <Link className="nav-link" to="meal-list">Meal list</Link>
                    <Link className="nav-link" to="recipe-detail">Recipe Detail</Link>
                    <Link className="nav-link" to="saved"><Bookmark size={16} style={{marginRight:8}}/>Saved</Link>
                    <div className="nav-search">
                        <Search size={16} />
                        <input className="search-input" type="search" placeholder="Search meals" />
                    </div>
                </nav>
            </div>
        </header>
    )
}

export default Navbar