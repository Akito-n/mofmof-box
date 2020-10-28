import { useEffect } from 'react'
import { firebase } from '@firebase/app'
import { atom, useRecoilState } from 'recoil'

type User = {
  uid: string,
  isAnonymous: boolean
}

const userState = atom<User>({
  key: 'userState',
  default: null
})

export const authenticate = () => {

  const [user, setUser] = useRecoilState(userState)

  useEffect(() => {
    if (user) return 

    firebase
      .auth()
      .signInAnonymously()
      .catch((e) => {
        console.log(e.message)
      })

    firebase.auth().onAuthStateChanged((u) => {
      if (u) {
        console.log(u)
        setUser({uid: u.uid, isAnonymous: u.isAnonymous})
      } else {
        setUser(null)
      }
    })
  }, [])

  return user
}
