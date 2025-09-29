import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs, addDoc } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBsR4D9tTTyqcuT0_Ho6WtsH1x4ZG6yVAQ",
  authDomain: "try-and-error-b7dae.firebaseapp.com",
  projectId: "try-and-error-b7dae",
  storageBucket: "try-and-error-b7dae.firebasestorage.app",
  messagingSenderId: "836968829",
  appId: "1:836968829:web:e19ce3d506b65f9adc6c14"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Cloud Firestoreの初期化
const db = getFirestore(app);

// Cloud Firestoreから取得したデータを表示する
const fetchHistoryData = async () => {
  let tags = "";

  // Testコレクションのデータを取得
  const querySnapshot = await getDocs(collection(db, "Test"));
  
  // データをテーブル表の形式に合わせてHTMLに挿入
  querySnapshot.forEach((doc) => {
    console.log(`${doc.id} => ${doc.data()}`);
    tags += `<tr><td>${doc.data().date}</td><td>${doc.data().name}</td><td>${doc.data().work}</td><td>${doc.data().comment}</td></tr>`;
  });
  document.getElementById("js-history").innerHTML = tags;
};

// Cloud Firestoreから取得したデータを表示する
if (document.getElementById("js-history")) {
  fetchHistoryData();
}

// Cloud Firestoreにデータを送信する
const submitData = async (e) => {
  e.preventDefault();
  const formData = new FormData(e.target);
  
  try {
    const docRef = await addDoc(collection(db, "Test"), {
      date: new Date(),
      name: formData.get("name"),
      work: formData.get("work"),
      comment: formData.get("comment"),
    });
    console.log("Document written with ID: ", docRef.id);
  } catch (e) {
    console.error("Error adding document: ", e);
  }
};

// Cloud Firestoreにデータを送信する
if (document.getElementById("js-form")) {
  document.getElementById("js-form").addEventListener("submit", (e) => submitData(e));
}