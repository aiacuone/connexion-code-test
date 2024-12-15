import Link from 'next/link'

export const Header = () => {
  const links = [
    { href: '/', label: 'HOME' },
    { href: '/robot', label: 'ROBOT' },
    { href: '/contact', label: 'CONTACT' },
  ]

  return (
    <div className="hstack bg-white bg-opacity-10 h-14 items-center justify-end px-2 text-gray-100 gap-3 backdrop-blur-sm">
      {links.map(({ href, label }) => (
        <Link key={href} href={href} className="text-gray-100 text-sm">
          {label}
        </Link>
      ))}
    </div>
  )
}
