import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
import { getFirestore, collection, addDoc, getDocs, doc, updateDoc, deleteDoc } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";
import { getAuth, onAuthStateChanged } from "https://cdnjs.cloudflare.com/ajax/libs/firebase/10.12.0/firebase-auth.js";

// Firebase configuration
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

const addProductBtn = document.getElementById("addProductBtn");
addProductBtn.addEventListener("click", addProduct);

const backToProductPageBtn = document.getElementById("backToProductPageBtn");
backToProductPageBtn.addEventListener("click", () => {
    window.location.href = 'userPage.html'; // Change this to the actual URL of your product page
});

async function addProduct() {
    const name = document.getElementById("productName").value;
    const price = document.getElementById("productPrice").value;
    const description = document.getElementById("productDescription").value;
    const image = document.getElementById("productImage").value;

    try {
        await addDoc(collection(db, "products"), {
            name,
            price,
            description,
            image
        });
        alert("Product added successfully!");
        populateProductTable();
    } catch (error) {
        console.error("Error adding product: ", error.message);
        alert("Error adding product: " + error.message);
    }
}

async function populateProductTable() {
    const productTableBody = document.getElementById("productTableBody");
    productTableBody.innerHTML = "";

    const querySnapshot = await getDocs(collection(db, "products"));
    querySnapshot.forEach((doc) => {
        const productData = doc.data();
        const row = document.createElement("tr");

        row.innerHTML = `
            <td>${productData.name}</td>
            <td>${productData.price}</td>
            <td>${productData.description}</td>
            <td>${productData.image}</td>
            <td>
                <button onclick="editProduct('${doc.id}', '${productData.image}', '${productData.name}', ${productData.price}, '${productData.description}')">Edit</button>
                <button onclick="deleteProduct('${doc.id}')">Delete</button>
            </td>
        `;

        productTableBody.appendChild(row);
    });
}

window.editProduct = (id, image, name, price, description) => {
    document.getElementById("productImage").value = image;
    document.getElementById("productName").value = name;
    document.getElementById("productPrice").value = price;
    document.getElementById("productDescription").value = description;

    addProductBtn.removeEventListener("click", addProduct);
    addProductBtn.textContent = "Update Product";
    addProductBtn.onclick = () => updateProduct(id);
}

async function updateProduct(id) {
    const image = document.getElementById("productImage").value;
    const name = document.getElementById("productName").value;
    const price = document.getElementById("productPrice").value;
    const description = document.getElementById("productDescription").value;

    try {
        const productDoc = doc(db, "products", id);
        await updateDoc(productDoc, {
            image,
            name,
            price,
            description
        });
        alert("Product updated successfully!");
        populateProductTable();

        addProductBtn.textContent = "Add Product";
        addProductBtn.onclick = addProduct;
    } catch (error) {
        console.error("Error updating product: ", error.message);
        alert("Error updating product: " + error.message);
    }
}

async function deleteProduct(id) {
    try {
        await deleteDoc(doc(db, "products", id));
        alert("Product deleted successfully!");
        populateProductTable();
    } catch (error) {
        console.error("Error deleting product: ", error.message);
        alert("Error deleting product: " + error.message);
    }
}

onAuthStateChanged(auth, (user) => {
    if (!user) {
        window.location.href = 'sign-in.html';
    } else {
        populateProductTable();
    }
});