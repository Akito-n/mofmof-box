import { useRouter } from 'next/router'
import { type } from 'os'
import { useState, useEffect } from 'react'
import { User } from '../../hooks/auth'
import firebase from 'firebase'

type Query = {
  uid: string
}

const UserShow = () => {
  const router = useRouter()
  const [user, setUser] = useState<User>()
  const query = router.query as Query

  useEffect(() => {
    if (query.uid === undefined) {
      return
    }

    const fetchUser = async () => {
      console.log(query.uid)
      const doc = await firebase
        .firestore()
        .collection('users')
        .doc(query.uid)
        .get()

      if (!doc.exists) {
        console.log('該当なし')
        return
      } else {
        const fetchedUser = doc.data() as User
        setUser(fetchedUser)
      }
    }
    fetchUser()
  }, [query.uid])
  return (
    <div>
      <p>ここにuidがでる</p>
      <p>{router.query.uid}</p>
      <p>{user ? user.name : '読込中'}</p>
    </div>
  )
}
export default UserShow
