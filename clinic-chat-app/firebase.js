// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'
import { getStorage } from 'firebase/storage'
import { getAuth } from 'firebase/auth'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: 'AIzaSyDdlYHOphdSU2y3kwmyVJNWnzyqLP0Madg',
    authDomain: 'clinicare-chat.firebaseapp.com',
    projectId: 'clinicare-chat',
    storageBucket: 'clinicare-chat.appspot.com',
    messagingSenderId: '297017914246',
    appId: '1:297017914246:web:4049b436827ecca4e1b207',
}

// Initialize Firebase
export const app = initializeApp(firebaseConfig)
export const db = getFirestore()
export const storage = getStorage()
export const auth = getAuth()
