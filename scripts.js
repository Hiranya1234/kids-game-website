// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getFirestore, setDoc, updateDoc, doc, collection } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA5O5u9lr9ZMZ5EL16UdOG0CLtXuuehvmU",
  authDomain: "pre-demo-f3dbe.firebaseapp.com",
  databaseURL: "https://pre-demo-f3dbe-default-rtdb.firebaseio.com",
  projectId: "pre-demo-f3dbe",
  storageBucket: "pre-demo-f3dbe.appspot.com",
  messagingSenderId: "284956869892",
  appId: "1:284956869892:web:1a1f3dd516cf59036dbc51"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

// Function to show messages
function showMessage(message, divId) {
  const messageDiv = document.getElementById(divId);
  if (messageDiv) {
    messageDiv.style.display = "block";
    messageDiv.innerHTML = message;
    messageDiv.style.opacity = 1;
    setTimeout(function() {
      messageDiv.style.opacity = 0;
    }, 5000);
  } else {
    console.error('Message div not found:', divId);
  }
}

// Sign up event listener
const signupForm = document.getElementById('registrationForm');
if (signupForm) {
  signupForm.addEventListener('submit', async (event) => {
    event.preventDefault();
    const fullName = document.getElementById('fullName').value;
    const username = document.getElementById('username').value;
    const age = document.getElementById('age').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      const userData = {
        email: email,
        fullName: fullName,
        username: username,
        age: age,
      };

      const userDocRef = doc(db, "users", user.uid);
      await setDoc(userDocRef, userData);

      // Create 'activity' collection for the user
      const activityCollectionRef = collection(db, 'users', user.uid, 'activity');

      // Initial activities
      const initialActivities = {
        activity1: { name: 'easy', completed: false },
        activity2: { name: 'medium', completed: false },
        activity3: { name: 'hard', completed: false }
      };

      // Add initial activities
      for (const [key, activity] of Object.entries(initialActivities)) {
        const docRef = doc(activityCollectionRef, key);
        await setDoc(docRef, activity);
      }

      showMessage('Account Created Successfully', 'signUpMessage');
      window.location.href = '6.html';
    } catch (error) {
      const errorCode = error.code;
      if (errorCode === 'auth/email-already-in-use') {
        showMessage('Email Address Already Exists !!', 'signUpMessage');
      } else {
        showMessage('Unable to create User', 'signUpMessage');
      }
      console.error('Error creating user:', error);
    }
  });
} else {
  console.error('Signup form not found');
}

// Login event listener
const loginForm = document.getElementById('loginForm');
if (loginForm) {
  loginForm.addEventListener('submit', async (event) => {
    event.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      showMessage('Login is successful', 'signInMessage');
      const user = userCredential.user;
      localStorage.setItem('loggedInUserId', user.uid);
      window.location.href = 'new.home1.html';
    } catch (error) {
      const errorCode = error.code;
      if (errorCode === 'auth/wrong-password') {
        showMessage('Incorrect Email or Password', 'signInMessage');
      } else {
        showMessage('Account does not exist', 'signInMessage');
      }
      console.error('Error logging in:', error);
    }
  });
} else {
  console.error('Login form not found');
}

// Function to update specific activity in Firestore
async function updateActivity(activityId) {
  const user = auth.currentUser;
  if (user) {
    try {
      const activityDocRef = doc(db, 'users', user.uid, 'activity', activityId);
      await updateDoc(activityDocRef, { completed: true });
      showMessage(`${activityId} updated successfully!`, 'completionMessage');
    } catch (error) {
      console.error(`Error updating ${activityId}:`, error);
      showMessage(`Error updating ${activityId}`, 'completionMessage');
    }
  } else {
    console.error('No user is currently logged in.');
    showMessage('No user is currently logged in', 'completionMessage');
  }
}

// Add event listeners for the buttons
const easyButton = document.getElementById('easy');
if (easyButton) {
  easyButton.addEventListener('click', () => updateActivity('activity1'));
}

const mediumButton = document.getElementById('medium');
if (mediumButton) {
  mediumButton.addEventListener('click', () => updateActivity('activity2'));
}

// If you need to add a hard activity button, uncomment and use the following:
const hardButton = document.getElementById('hard');
if (hardButton) {
  hardButton.addEventListener('click', async () => {
    await updateActivity('activity3');
    showMessage('Successfully submitted!', 'completionMessage');
  });
}




