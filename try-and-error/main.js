import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs, addDoc } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_GOOGLE_API_KEY,
  authDomain: "try-and-error-b7dae.firebaseapp.com",
  projectId: "try-and-error-b7dae",
  storageBucket: "try-and-error-b7dae.appspot.com",
  messagingSenderId: "296247329140",
  appId: "1:296247329140:web:8079930e97dcd0c3a0ac21"
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

const wrappers = document.querySelectorAll(".wrapper");

let clickCount = 0;
let totalPoints = 0;

const pointsList = [10,20,30,40,50,60,70,80,90,100];

wrappers.forEach(wrapper => {
  wrapper.addEventListener("click", function(e) {
    
    if (!e.target.className.startsWith("box")) return;

    if (clickCount < 5) {
      const randomPoint = pointsList[Math.floor(Math.random() * pointsList.length)];
      totalPoints += randomPoint;
      clickCount++;

      alert(`${randomPoint} puntos！`);

      if (clickCount === 5) {
        alert(`Tu total es ${totalPoints} puntos \u{1F389}`);
      }
      if (totalPoints >= 300) {
        alert("\u{1F38A} Felicidades! Has alcanzado 300 puntos.");
      }
    }
  });
});

// ✅ Firestore にテストデータを追加して、読み込む関数
// async function testFirestore() {
//   try {
    // テスト用のデータを追加
    // const docRef = await addDoc(collection(db, "Test"), {
    //   name: "Test User",
    //   createdAt: new Date()
    // });
    // console.log("Document written with ID: ", docRef.id);

    // 追加されたデータを取得
    // const querySnapshot = await getDocs(collection(db, "Test"));
    // querySnapshot.forEach((doc) => {
    //   console.log("Fetched from Firestore:", doc.id, "=>", doc.data());
    // });

//   } catch (e) {
    // console.error("Error adding document: ", e);
//   }
// }

// ページ読み込み時にテスト実行
// testFirestore();

