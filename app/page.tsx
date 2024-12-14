import { Button } from '../components/ui/button'
import Link from 'next/link'

export default function Home() {
  return (
    <div className="h-full center stack gap-3">
      <div className="stack">
        <p>Hello, Thank you for the opportunity to take on this task</p>
        <p>I greatly appreciate your time and appreciate any critiques</p>
      </div>
      <Link href="/robot">
        <Button>Go to Robot</Button>
      </Link>
    </div>
  )
}
