import { useState } from 'react'
import { NavLink } from 'react-router'
import './Navbar.css'
import { Menu, X, Bookmark, HandPlatter } from 'lucide-react'

export function Navbar(){
    const [open, setOpen] = useState(false)

    const closeMenu = () => setOpen(false)

    return (
        <header className="navbar">
            <div className="nav-inner">
                <NavLink to="/" className="brand flex" onClick={closeMenu}>
                    <HandPlatter style={{marginTop: "auto", marginBottom: "auto"}}/> Dischoverie
                </NavLink>

                <button
                    className="nav-toggle bg-amber-50"
                    aria-label={open ? 'Close menu' : 'Open menu'}
                    aria-expanded={open}
                    onClick={() => setOpen(v => !v)}
                >
                    {open ? <X size={20} /> : <Menu size={20} />}
                </button>

                <nav className={`nav-links ${open ? 'open' : ''}`}>
                  <NavLink to="/" className="nav-link" onClick={closeMenu} end> 
                    Home
                  </NavLink>
                  <NavLink to="/categories" className="nav-link" onClick={closeMenu}>
                    Browse
                  </NavLink>
                  <NavLink to="/saved" className="nav-link flex gap-1" onClick={closeMenu}>
                  <Bookmark size={16} style={{marginTop: "auto", marginBottom: "auto"}} />
                    Saved
                  </NavLink>
          
                
                </nav>
            </div>
        </header>
    )
}

export default Navbar