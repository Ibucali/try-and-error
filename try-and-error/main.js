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

const $addPregunta = document.createElement("div"); //$addPreguntaという変数を代入してcreateElement()メソッド(関数)を使って新しいdiv要素を作成
$addPregunta.setAttribute("id", "pregunta");
$addPregunta.innerText = "Una alerta primaria simple: ¡échale un vistazo!";
$addPregunta.style.textAlign = "center";
$addPregunta.style.width = "100%";
$addPregunta.style.padding = "10px";
$addPregunta.style.margin = "20px";
$addPregunta.style.borderRadius = "5px";
$addPregunta.style.fontSize = "20px";
$addPregunta.style.fontWeight = "bold";
$addPregunta.style.backgroundColor = "#cce5ff";

const $addPregunta2 = document.createElement("div"); // $addPregunta2という変数を代入してcreateElement()メソッド(関数)を使って新しいdiv要素を作成
$addPregunta2.setAttribute("class", "hola2");
$addPregunta2.style.display = "flex";
$addPregunta2.style.justifyContent = "center";

const $crear = document.querySelector(".agregarPregunta");
$crear.appendChild($addPregunta);
$crear.appendChild($addPregunta2);

// ボタンを4つ作って .hola の中に入れる
const $contenedor = document.querySelector(".hola2");

for (let i = 1; i <= 4; i++) {
    const $boton = document.createElement("button"); // ← divではなくbuttonに
    $boton.classList.add("btn", "btn-primary"); // class名を追加
    $boton.innerText = "Botón " + i;
    $boton.style.marginLeft = "10px";
    $boton.style.borderRadius = "5px";
    $boton.style.fontSize = "18px";
    $boton.style.padding = "12px 24px"; // paddingでボタンのサイズを広げる
    $boton.style.backgroundColor = "#146ce0ff";
    $boton.style.color = "#ffffff";
    $boton.style.cursor = "pointer"; // マウスオーバー時にカーソルをポインターに変更
    $boton.style.opacity = "1.8"; // ボタンの透明度を設定
    $boton.style.transition = "opacity 0.3s"; // ホバー時の透明度変化をスムーズにする

    $contenedor.appendChild($boton);
}

const quiz = [
  {
    question: '旅行先、最も人気の場所は次のうちどれ？',
    answers: [
      'インド', 
      'パラグアイ', 
      'ネパール', 
      'フランス'
    ],
    correct: 'パラグアイ'
  }, {
    question: '北海道で流氷が見れる場所は次のうちどれ？',
    answers: [
      '室蘭', 
      '札幌', 
      '紋別', 
      '函館'
    ],
    correct: '紋別'
  }, {
    question: '世界三大美食国の一つで次のうちどれ？',
    answers: [
      'ペルー', 
      'カナダ', 
      'マダガスカル', 
      '日本'
    ],
    correct: 'ペルー'
  }
];

const quizLength = quiz.length;
let quizIndex = 0;
let score = 0;

const $button = document.querySelectorAll('.btn.btn-primary');
const buttonLength = $button.length;

//クイズの問題文、選択肢を定義
const setupQuiz = () => {
  document.getElementById("pregunta").textContent = quiz[quizIndex].question;
  let buttonIndex = 0;
  while(buttonIndex < buttonLength){
    $button[buttonIndex].textContent = quiz[quizIndex].answers[buttonIndex];
    buttonIndex++;
  }
}
setupQuiz();

const clickHandler = (e) => {
  if(quiz[quizIndex].correct === e.target.textContent){
    window.alert('正解');
    score++;
  } else {
    window.alert('残念')
  }

  quizIndex++;

  if(quizIndex < quizLength){
    //問題数があればこちらを実行
    setupQuiz();
  } else {
    //問題数がなければこちらを実行
    window.alert('終わり!Your score is' + score + '/' + quizLength + 'です');
  }

};

//ボタンをクリックしたら正誤判定
let handlerIndex = 0;
while (handlerIndex < buttonLength) {
  $button[handlerIndex].addEventListener('click', (e) => {
    clickHandler(e);
  });
  handlerIndex++;
}

document.getElementById('multi_line_input').addEventListener('input', function() {
    const textAreaContent = this.value;
    console.log("テキストエリアの内容: " + textAreaContent);
});