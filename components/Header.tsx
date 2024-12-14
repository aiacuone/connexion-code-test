import Link from 'next/link'

export const Header = () => {
  const links = [
    { href: '/', label: 'HOME' },
    { href: '/robot', label: 'ROBOT' },
    { href: '/links', label: 'LINKS' },
  ]

  return (
    <div className="hstack bg-blue-600 h-14 items-center justify-end px-2 text-gray-100 gap-3">
      {links.map(({ href, label }) => (
        <Link key={href} href={href} className="text-gray-100 text-sm">
          {label}
        </Link>
      ))}
    </div>
  )
}
