import React, { useState } from "react";
import { useAuth } from "../AuthContext";
import { auth } from "../firebase";
import {
  updateProfile,
  sendEmailVerification,
  signOut,
} from "firebase/auth";
import Button from "../components/Button";

const AccountPage: React.FC = () => {
  const { user, loading } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [displayName, setDisplayName] = useState(user?.displayName || "");
  const [message, setMessage] = useState("");

  if (loading) return <p>Loading...</p>;

  if (!user)
    return (
      <div className="flex flex-col items-center justify-center py-20">
        <h2 className="text-2xl font-bold mb-4">
          Please sign in to view your account.
        </h2>
        <a href="/login" className="btn btn-primary">
          Go to Login
        </a>
      </div>
    );

  const handleLogout = async () => {
    await signOut(auth);
  };

  const handleSaveName = async () => {
    if (!user) return;
    try {
      await updateProfile(user, { displayName });
      setMessage("Profile updated successfully!");
      setIsEditing(false);
    } catch (error: any) {
      setMessage("Error updating profile: " + error.message);
    }
  };

  const handleVerifyEmail = async () => {
    if (!user) return;
    try {
      await sendEmailVerification(user);
      setMessage("Verification email sent! Check your inbox.");
    } catch (error: any) {
      setMessage("Error sending email: " + error.message);
    }
  };

  return (
    <div className="max-w-3xl mx-auto py-10 px-6 bg-base-100 rounded-xl shadow-lg">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-neutral">My Account</h1>
        <Button onClick={handleLogout} variant="ghost">
          Logout
        </Button>
      </div>

      {message && (
        <div className="p-3 mb-4 bg-success/10 text-success rounded-lg text-sm">
          {message}
        </div>
      )}

      <div className="space-y-6">
        {/* Email */}
        <div>
          <h2 className="text-lg font-semibold">Email</h2>
          <p className="text-gray-700">{user.email}</p>
          {!user.emailVerified && (
            <div className="mt-2">
              <Button onClick={handleVerifyEmail}>Verify Email</Button>
            </div>
          )}
          {user.emailVerified && (
            <p className="text-green-600 text-sm mt-1">Email Verified ✅</p>
          )}
        </div>

        {/* Display Name */}
        <div>
          <h2 className="text-lg font-semibold">Name</h2>
          {!isEditing ? (
            <div className="flex items-center space-x-4">
              <p className="text-gray-700">{user.displayName || "Not set"}</p>
              <Button onClick={() => setIsEditing(true)}>Edit</Button>
            </div>
          ) : (
            <div className="flex items-center space-x-4">
              <input
                type="text"
                value={displayName}
                onChange={(e) => setDisplayName(e.target.value)}
                className="border p-2 rounded w-full"
              />
              <Button onClick={handleSaveName}>Save</Button>
              <Button variant="ghost" onClick={() => setIsEditing(false)}>
                Cancel
              </Button>
            </div>
          )}
        </div>

        {/* UID */}
        <div>
          <h2 className="text-lg font-semibold">User ID</h2>
          <p className="text-gray-700 break-all">{user.uid}</p>
        </div>

        {/* Provider Info */}
        <div>
          <h2 className="text-lg font-semibold">Signed in with</h2>
          <ul className="list-disc ml-6 text-gray-700">
            {user.providerData.map((provider) => (
              <li key={provider.providerId}>{provider.providerId}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default AccountPage;
