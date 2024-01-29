import { initializeApp } from "firebase/app";

import { getFirestore } from '@firebase/firestore'

const firebaseConfig = {
  apiKey: "AIzaSyDbzd4N7V5ndQFgOvZQ1EfjPoc8qgbhkT8",
  authDomain: "crud-fire-react-4d947.firebaseapp.com",
  projectId: "crud-fire-react-4d947",
  storageBucket: "crud-fire-react-4d947.appspot.com",
  messagingSenderId: "530270089479",
  appId: "1:530270089479:web:a55e692a673aaaf183d5a2"
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app)

