import { initializeApp } from 'firebase/app'

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBJObMc01f-O2KaNxhhQE_lV16j7wn0Lfk",
    authDomain: "app-eadd4.firebaseapp.com",
    projectId: "app-eadd4",
    storageBucket: "app-eadd4.appspot.com",
    messagingSenderId: "555867116292",
    appId: "1:555867116292:web:7e7b6a5f866c4f0f8df651",
    databaseURL : "https://app-eadd4-default-rtdb.firebaseio.com"
  };

  // Initialize Firebase
export const app = initializeApp(firebaseConfig);