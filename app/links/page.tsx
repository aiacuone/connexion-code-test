import { MdOutlineEmail } from 'react-icons/md'
import { FaPhoneAlt } from 'react-icons/fa'
import { FaLinkedin } from 'react-icons/fa'
import { FaGithub } from 'react-icons/fa'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

const LinksPage = () => {
  const links = [
    {
      label: 'aiacuone@gmail.com',
      icon: <MdOutlineEmail />,
      href: 'mailto:aiacuone@gmail.com',
    },
    {
      label: '0494 184 811',
      icon: <FaPhoneAlt />,
      href: 'tel:0494184811',
    },
    {
      label: 'linkedin.com/in/adrian-iacuone/',
      icon: <FaLinkedin />,
      href: 'http://linkedin.com/in/adrian-iacuone/',
    },
    {
      label: 'github.com/aiacuone',
      icon: <FaGithub />,
      href: 'http://github.com/aiacuone',
    },
    {
      label: 'github.com/aiacuone/connexion-code-test',
      icon: <FaGithub />,
      href: 'https://github.com/aiacuone/connexion-code-test',
      subLabel: 'This code test GitHub link',
    },
  ]
  return (
    <div className="h-full center">
      <div className="stack gap-3">
        <p>Feel free to reach out to me on any of the following platforms</p>
        <div className="stack gap-3">
          {links.map(({ label, icon, href, subLabel }) => (
            <div key={label} className="hstack gap-3 items-center">
              <Link href={href} target="_blank">
                <Button size="sm">{icon}</Button>
              </Link>
              <p>{label}</p>
              {subLabel && `(${subLabel})`}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default LinksPage
