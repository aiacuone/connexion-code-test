import { MdOutlineEmail } from 'react-icons/md'
import { FaPhoneAlt } from 'react-icons/fa'
import { FaLinkedin } from 'react-icons/fa'
import { FaGithub } from 'react-icons/fa'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

const ContactPage = () => {
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
      label: 'Linkedin',
      icon: <FaLinkedin />,
      href: 'http://linkedin.com/in/adrian-iacuone/',
    },
    {
      label: 'GitHub',
      icon: <FaGithub />,
      href: 'http://github.com/aiacuone',
    },
    {
      label: 'GitHub (Code Test)',
      icon: <FaGithub />,
      href: 'https://github.com/aiacuone/connexion-code-test',
    },
  ]
  return (
    <div className="h-full center">
      <div className="stack gap-3 container">
        <p>Feel free to reach out to me on any of the following platforms:</p>
        <div className="stack gap-3 pl-8">
          <p>
            <b>Adrian Iacuone</b>, Fullstack Developer
          </p>
          {links.map(({ label, icon, href }, index) => (
            <div
              key={`${label} ${index}`}
              className="hstack gap-3 items-center">
              <Link href={href} target="_blank">
                <Button size="sm">{icon}</Button>
              </Link>
              <p>{label}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default ContactPage
