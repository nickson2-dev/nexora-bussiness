import React, { useState } from "react";
import { auth, RecaptchaVerifier, signInWithPhoneNumber } from "./firebase";
import { useNavigate } from "react-router-dom";
import Button from "./components/Button";

declare global {
  interface Window {
    recaptchaVerifier?: RecaptchaVerifier;
  }
}

const PhoneLoginPage: React.FC = () => {
  const navigate = useNavigate();
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");
  const [confirmation, setConfirmation] = useState<any>(null);
  const [error, setError] = useState("");

  const setupRecaptcha = () => {
    if (!window.recaptchaVerifier) {
      window.recaptchaVerifier = new RecaptchaVerifier(
        auth,
        "recaptcha-container",
        {
          size: "invisible",
        }
      );
    }
  };

  const sendOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    try {
      setupRecaptcha();
      const appVerifier = window.recaptchaVerifier;
      const confirmationResult = await signInWithPhoneNumber(auth, phone, appVerifier);
      setConfirmation(confirmationResult);
      alert("OTP sent!");
    } catch (err: any) {
      setError(err.message);
    }
  };

  const verifyOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await confirmation.confirm(otp);
      navigate("/account");
    } catch (err: any) {
      setError("Invalid OTP");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-base-200">
      <div className="bg-base-100 p-8 rounded-xl shadow-md w-full max-w-md">
        <h2 className="text-3xl font-bold mb-6 text-center text-neutral">Phone Verification</h2>

        <div id="recaptcha-container"></div>

        {error && <p className="text-red-500 text-center mb-4">{error}</p>}

        {!confirmation ? (
          <form onSubmit={sendOtp} className="space-y-4">
            <input
              type="tel"
              className="w-full border rounded p-2"
              placeholder="+256700000000"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              required
            />
            <Button type="submit">Send OTP</Button>
          </form>
        ) : (
          <form onSubmit={verifyOtp} className="space-y-4">
            <input
              type="text"
              className="w-full border rounded p-2"
              placeholder="Enter OTP"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              required
            />
            <Button type="submit">Verify OTP</Button>
          </form>
        )}
      </div>
    </div>
  );
};

export default PhoneLoginPage;
