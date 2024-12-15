import { Button } from '../components/ui/button'
import Link from 'next/link'

export default function Home() {
  return (
    <div className="h-full center stack gap-3">
      <div className="container stack gap-3 center">
        <div className="stack gap-2">
          <p className="text-center font-bold">Hello!</p>
          <p className="text-center">
            Thank you for the opportunity to take on this task
          </p>
          <p className="text-center">
            I greatly appreciate your time and appreciate any critiques
          </p>
          <p className="text-center">
            Refer to the README for instructions on how to run the project{' '}
            <a
              href="
            https://github.com/aiacuone/connexion-code-test"
              target="_blank"
              className="font-bold underline">
              here
            </a>
          </p>
          <p className="text-center">
            If there are any questions, please feel free to ask. Refer to the{' '}
            <Link href="/contact" className="font-bold underline">
              contact page
            </Link>{' '}
            for details
          </p>
        </div>
        <Link href="/robot">
          <Button>Go to Robot</Button>
        </Link>
      </div>
    </div>
  )
}
