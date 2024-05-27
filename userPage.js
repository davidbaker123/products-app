import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
import { getFirestore, collection, getDocs } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";
import { getAuth, onAuthStateChanged, signOut } from "https://cdnjs.cloudflare.com/ajax/libs/firebase/10.12.0/firebase-auth.js";

const firebaseConfig = {
  apiKey: "AIzaSyBtVOA4eDFULv6ywkCNHqvFVp2stJjF3Jg",
  authDomain: "e-commerce-application-ba3ed.firebaseapp.com",
  projectId: "e-commerce-application-ba3ed",
  storageBucket: "e-commerce-application-ba3ed.appspot.com",
  messagingSenderId: "735737243082",
  appId: "1:735737243082:web:5999220a51be082945db33"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);
const signOutBtn = document.getElementById("signOutBtn");

async function populateProductList() {
    const productList = document.getElementById("productList");
    productList.innerHTML = "";

    const querySnapshot = await getDocs(collection(db, "products"));
    querySnapshot.forEach((doc) => {
        const productData = doc.data();
        const productItem = document.createElement("div");

        productItem.innerHTML = `
        <img src="${productData.image}" alt="${productData.name}" style="width:100px;height:100px;">
            <h3>${productData.name}</h3>
            <p>Price: $${productData.price}</p>
            <p>Description: ${productData.description}</p>
        `;

        productList.appendChild(productItem);
    });
}

async function userSignOut() {
    try {
        await signOut(auth);
        alert("User signed out successfully");
        window.location.href = 'sign-in.html';
    } catch (error) {
        console.error("Error signing out: ", error.message);
        alert("Error signing out: " + error.message);
    }
}

signOutBtn.addEventListener("click", userSignOut);

onAuthStateChanged(auth, (user) => {
    if (!user) {
        window.location.href = 'sign-in.html';
    } else {
        populateProductList();
    }
});