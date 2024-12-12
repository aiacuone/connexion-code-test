import { Button } from '../components/ui/button'
import Link from 'next/link'

export default function Home() {
  return (
    <div className="">
      <Link href="/code-test">
        <Button>Go to code Test</Button>
      </Link>
    </div>
  )
}
