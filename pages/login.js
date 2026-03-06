import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { auth } from "../firebase/firebaseConfig";

export default function Login() {

  const loginWithGoogle = async () => {
    const provider = new GoogleAuthProvider();
    await signInWithPopup(auth, provider);
  };

  return (
    <div style={{textAlign:"center", marginTop:"100px"}}>
      <h1>Salty Sisters Login</h1>
      <button onClick={loginWithGoogle}>
        Login with Google
      </button>
    </div>
  );
}