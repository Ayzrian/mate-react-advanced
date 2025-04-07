import { ReactElement } from "react"
import { Link } from "react-router";

interface HeaderProps {
  children: ReactElement;
}

export function Header({ children }: HeaderProps) {
    return (
      <div className="bg-base-300">
        <div className="navbar container mx-auto flex justify-between">
          <h1 className="text-xl">
            {children}
          </h1>

          <ul className="menu menu-horizontal px-1">
            <li>
              <Link to="/shopping-lists">Shopping Lists</Link>
            </li>
          </ul>
        </div>
      </div>
    )
}