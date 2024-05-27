
  import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
  import { getFirestore } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js"
  import {getAuth, signInWithEmailAndPassword} from "https://cdnjs.cloudflare.com/ajax/libs/firebase/10.12.0/firebase-auth.js";


  const firebaseConfig = {
    apiKey: "AIzaSyBtVOA4eDFULv6ywkCNHqvFVp2stJjF3Jg",
    authDomain: "e-commerce-application-ba3ed.firebaseapp.com",
    projectId: "e-commerce-application-ba3ed",
    storageBucket: "e-commerce-application-ba3ed.appspot.com",
    messagingSenderId: "735737243082",
    appId: "1:735737243082:web:5999220a51be082945db33"
  };

  const app = initializeApp(firebaseConfig);
  const auth = getAuth(app);

  const signInBtn = document.getElementById("signInBtn");

  signInBtn.addEventListener("click", signIn);
  
  async function signIn() {
      const email = document.getElementById("email").value;
      const password = document.getElementById("password").value;
      try {
          const userCredential = await signInWithEmailAndPassword(auth, email, password);
          const user = userCredential.user;
          alert("User signed in successfully!");
        
          
          window.location.href = 'userPage.html';
      } catch (error) {
          console.error("Error signing in:", error.message);
          alert("Error signing in: " + error.message);
      }
  }
