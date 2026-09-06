import { redirect } from 'next/navigation'
import Level1Page from '@/components/levels/Level1Page'
import Level2Page from '@/components/levels/Level2Page'
import Level3Page from '@/components/levels/Level3Page'
import Level4Page from '@/components/levels/Level4Page'

interface Props {
  params: { id: string }
}

export default function LevelPage({ params }: Props) {
  const id = parseInt(params.id, 10)

  if (id === 1) return <Level1Page />
  if (id === 2) return <Level2Page />
  if (id === 3) return <Level3Page />
  if (id === 4) return <Level4Page />

  redirect('/')
}

export function generateStaticParams() {
  return [{ id: '1' }, { id: '2' }, { id: '3' }, { id: '4' }]
}
