import React, { useState } from "react";
import { signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { auth, googleProvider } from "./firebase";
import { Route, Routes, useNavigate } from "react-router-dom";
import Button from "./components/Button";
import PhoneLoginPage from "./PhoneLoginPage";
import AccountPage from "./pages/AccountPage";

// Routing should be defined in your App component (e.g. App.tsx); removed top-level Routes from this file.


const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleGoogleLogin = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
      navigate("/account");
    } catch (err: any) {
      alert(err.message);
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/account");
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-base-200">
      <div className="bg-base-100 p-8 rounded-xl shadow-md w-full max-w-md">
        <h2 className="text-3xl font-bold mb-6 text-center text-neutral">Login</h2>

        {error && <p className="text-red-500 text-center mb-4">{error}</p>}

<form onSubmit={handleLogin} className="space-y-4">
  <div>
    <label className="block font-semibold mb-1">Email</label>
    <input
      type="email"
      className="w-full border rounded p-2"
      value={email}
      onChange={(e) => setEmail(e.target.value)}
      required
    />
  </div>

  <div>
    <label className="block font-semibold mb-1">Password</label>
    <input
      type="password"
      className="w-full border rounded p-2"
      value={password}
      onChange={(e) => setPassword(e.target.value)}
      required
    />
  </div>

  <div className="flex items-center justify-between">
    <Button type="submit" disabled={loading}>
      {loading ? "Logging in..." : "Login"}
    </Button>
    <button
      type="button"
      onClick={handleGoogleLogin}
      className="btn btn-outline"
    >
      Sign in with Google
    </button>
  </div>
</form>

<p className="text-center text-sm mt-4">
          Don’t have an account?{" "}
          <button
            onClick={() => navigate("/signup")}
            className="text-primary underline"
          >
            Sign up
          </button>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
