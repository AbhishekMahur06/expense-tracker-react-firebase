import { auth, provider } from "../../config/firebase-config";
import { signInWithPopup } from "firebase/auth";
import { Navigate, useNavigate } from "react-router-dom";
import { useGetUserInfo } from "../../hooks/useGetUserInfo";
import "./style.css";

export const Auth = () => {
  const navigate = useNavigate();
  const { isAuth } = useGetUserInfo();

  const signInWithGoogleBtn = async () => {
    const result = await signInWithPopup(auth, provider);
    // console.log(result);

    const authInfo = {
      userId: result.user.uid,
      name: result.user.displayName,
      profilePhoto: result.user.photoURL,
      isAuth: true,
    };

    localStorage.setItem("auth", JSON.stringify(authInfo));

    navigate("/expense-tracker");
  };

  if (isAuth) {
    return <Navigate to="/expense-tracker" />;
  }

  return (
    <div className="login-page">
      <p>Sign In With Google to Continue</p>
      <button className="login-with-google-btn" onClick={signInWithGoogleBtn}>
        SignIn With Google
      </button>
    </div>
  );
};
