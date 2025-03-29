import { ReactElement } from "react"

interface HeaderProps {
  children: ReactElement;
}

export function Header({ children }: HeaderProps) {
    return (
      <div className="bg-base-300">
        <div className="navbar container mx-auto">
          <h1 className="text-xl">
            {children}
          </h1>
        </div>
       </div>
    )
}