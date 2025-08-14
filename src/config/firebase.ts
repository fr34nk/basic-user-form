import { doc, disableNetwork, setDoc, enableNetwork } from 'firebase/firestore';
import { onAuthStateChanged, signInAnonymously } from "firebase/auth";
import "firebase/firestore";

// https://firebase.google.com/docs/web/setup#available-libraries

export const app = {}  as any;
export const auth = {} as any;
export const db = {} as any;

const DEBUG_TEST_CONNECTION = false;
const DEBUG_TEST_ANONYMOUS_LOGIN=false

if (DEBUG_TEST_CONNECTION) {
  (async () => {
    await signInAnonymously(auth);

    console.log('disabling network');
    await disableNetwork(db); // forces direct, fresh request

    console.log('enabling network');
    await enableNetwork(db);

    console.log('sending request');
    await setDoc(
      doc(db, "sidtest", "doc1"), 
      { test: true }
    );
    console.log('request sent!');
    console.log("✅ write done without streaming");
  })();
}

if (DEBUG_TEST_ANONYMOUS_LOGIN) {
  signInAnonymously(auth)
    .then(() => console.log("Signed in anonymously"))
    .catch((err) => console.error("Anonymous sign-in failed", err.message));


  // 3. Listen for sign-in
  onAuthStateChanged(auth, async (user) => {
    if (user) {
      console.log("✅ Signed in:", user.uid);

      try {
        // 4. Write test doc
        await setDoc(doc(db, "testCollection", "testDoc"), {
          name: "Hello Firestore",
          time: new Date().toISOString()
        });
        console.log("✅ Document written!");
      } catch (err) {
        console.error("❌ Write failed:", err);
      }

    } else {
      console.log("❌ Not signed in");
    }
  });

  // 5. Sign in anonymously
  signInAnonymously(auth).catch((err) => {
    console.error("❌ Anonymous sign-in failed:", err);
  });
}
