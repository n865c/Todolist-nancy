import React from 'react'
import {Link} from 'react-router-dom'
export const Header = () => {
  return (
    <div>
      <header>
        <nav>
            <ul>
                <li>
               <Link to="/login">Login</Link>
                </li>
                <li>
                    <Link to='/'>Home</Link>
                </li>
            </ul>
        </nav>
      </header>
    </div>
  )
}
