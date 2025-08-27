import Link from "next/link";

const AboutLayout = ({children}: {children: React.ReactNode}) => {
  return (
    <div>
      <nav className="fixed top-18 left-0 z-10 h-screen w-64 bg-gray-100">
        <ul className="flex flex-col items-start p-4 space-y-2">
          <li><Link href="/">Home</Link></li>
          <li><Link href="/about">About</Link></li>
          <li><Link href="/about/profile">Profile</Link></li>
        </ul>
      </nav>
      <div className="ml-64 p-4">
        {children}
      </div>
    </div>
  )
}

export default AboutLayout;