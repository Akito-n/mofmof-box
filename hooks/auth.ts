import { useEffect } from 'react'
import firebase from 'firebase'
import { atom, useRecoilState } from 'recoil'

export type User = {
  uid: string
  isAnonymous: boolean
  name: string
}

const userState = atom<User>({
  key: 'userState',
  default: null
})

const registrationUser = async (user: User) => {
  const userRef = firebase.firestore().collection('users').doc(user.uid)
  const doc = await userRef.get()

  if (doc.exists) return

  await userRef.set({
    name: Math.random().toString(32).substring(2)
  })
}

export const useAuthenticate = () => {
  const [user, setUser] = useRecoilState(userState)

  useEffect(() => {
    if (user) return

    firebase
      .auth()
      .signInAnonymously()
      .catch((e) => {
        console.log('Error', e.message)
      })

    firebase.auth().onAuthStateChanged((u) => {
      if (u) {
        setUser({ uid: u.uid, isAnonymous: u.isAnonymous, name: u.displayName })
        registrationUser(u)
      } else {
        setUser(null)
      }
    })
  }, [])

  return user
}
