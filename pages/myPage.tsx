import Head from 'next/head'
import Link from 'next/link'
import { useAuthenticate } from '../hooks/auth'

export default function Home() {
  const user = useAuthenticate()

  return (
    <div>
      <Head>
        <title>MyPage</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <p>{user?.uid ?? 'まだログインしていない'}</p>
      <p>{user?.name ?? 'まだ名前がない' }</p>
      <Link href="/">
        <a>Go back</a>
      </Link>
    </div>
  )
}
