import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs } from "firebase/firestore";

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