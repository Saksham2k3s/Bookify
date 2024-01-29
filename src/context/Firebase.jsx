import { createContext, useContext, useEffect, useState } from "react";
import { initializeApp } from "firebase/app";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  onAuthStateChanged,
  signOut
} from "firebase/auth";
import { getFirestore, collection, addDoc, getDocs, doc, getDoc, query, where } from 'firebase/firestore'
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage'
import { useNavigate } from "react-router-dom";
const FirebaseContext = createContext(null);

const firebaseConfig = {
  apiKey: "AIzaSyAdbmyQ1EHXWcBYRrYqykv28uS445X3EY8",
  authDomain: "bookifyyy.firebaseapp.com",
  projectId: "bookifyyy",
  storageBucket: "bookifyyy.appspot.com",
  messagingSenderId: "368511839133",
  appId: "1:368511839133:web:75b6c9c59f1607daba1d74",
};

const firebaseApp = initializeApp(firebaseConfig);
const firebaseAuth = getAuth(firebaseApp);
const googleProvider = new GoogleAuthProvider();
const firestore = getFirestore(firebaseApp)
const storage = getStorage(firebaseApp)
export const useFirebase = () => useContext(FirebaseContext);

export const FirebaseProvider = (props) => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null)
  useEffect(() => {
    onAuthStateChanged(firebaseAuth, (user) => {
      if(user) setUser(user);
      else setUser(null)
    })
  }, [])

  const signupUserWithEmailAndPassword = (email, password) => {
    createUserWithEmailAndPassword(firebaseAuth, email, password);
  };

  const singinUserWithEmailAndPass = (email, password) => {
    return signInWithEmailAndPassword(firebaseAuth, email, password);
  };

  const signinWithGoogle = () => {
    signInWithPopup(firebaseAuth, googleProvider);
  };

  

  const handleCreateNewListing = async (name, isbnNumber, price, coverPic) => {
          const myImgRef = ref(storage, `/uploads/images/${Date.now()}-${coverPic.name}`);
          const uploadResult = await uploadBytes(myImgRef, coverPic);
          await addDoc(collection(firestore, 'books'), {
            name, 
            isbnNumber,
            price,
            imageURL : uploadResult.ref.fullPath,
            userID : user.uid,
            userEmail : user.email,
            displayName : user.displayName,
            photoURL : user.photoURL 
          });
  }

  const listAllBooks = async () => {
           return getDocs(collection(firestore, 'books'))
  }

  const getImageURL = (path) => {
     return getDownloadURL(ref(storage, path))
  }

  const getBookById = async (id) => {
    console.log("this is id",id);
   const docRef = doc(firestore, 'books', id);
   const result = await getDoc(docRef);
   
   return result;
  }

  const placeOrder = async (bookId, qty) => {
      const collectionRef = collection(firestore, 'books', bookId, 'orders');
      const result = await addDoc(collectionRef, {
        userName : user.displayName,
        id : user.uid,
        email : user.email,
        photoURL : user.photoURL,
        qty : qty,

      });
      return result;
  }
 
  const fetchMyBooks = async () => {
    if(!user) return null;
    const collectionRef = collection(firestore, 'books');
    const q = query(collectionRef, where("userID", "==", user.uid));
    const result = await getDocs(q);
    
    return result;
  }

  const getOrders = async (bookId) => {
    const collectionRef = collection(firestore, 'books', bookId, 'orders');
    const result = await getDocs(collectionRef);
    return result;
  }

  const logout = async () => {
    await signOut(firebaseAuth);
    setUser(null);
    navigate('/login')
  };

  const isLoggedIn = user ? true : false;
  return (
    <FirebaseContext.Provider
      value={{
        signupUserWithEmailAndPassword,
        singinUserWithEmailAndPass,
        signinWithGoogle,
        isLoggedIn,
        handleCreateNewListing,
        listAllBooks,
        getImageURL,
        getBookById,
        placeOrder,
        fetchMyBooks,
        user,
        getOrders,
        logout
      }}
    >
      {props.children}
    </FirebaseContext.Provider>
  );
};
