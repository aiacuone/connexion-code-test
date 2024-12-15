import { Button } from '../components/ui/button'
import Link from 'next/link'

export default function Home() {
  const paragraphs = [
    'Hello!',
    'Thank you for the opportunity to take on this task',
    'I greatly appreciate your time and appreciate any critiques',
  ]
  return (
    <div className="h-full center stack gap-3">
      <div className="container stack gap-3 center">
        <div className="stack gap-2">
          {paragraphs.map((paragraph, index) => (
            <p
              key={index}
              className={`text-center ${index === 0 ? 'font-bold' : ''}`}>
              {paragraph}
            </p>
          ))}
        </div>
        <Link href="/robot">
          <Button>Go to Robot</Button>
        </Link>
      </div>
    </div>
  )
}
