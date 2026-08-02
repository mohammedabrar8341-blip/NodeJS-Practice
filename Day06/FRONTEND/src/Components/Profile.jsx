import { useState } from "react";
import axios from "axios";

const ProfileUser = () => {
  const [profileData, setProfileData] = useState(null);

  async function fetchProfile() {
    const tokenFromBrowser = localStorage.getItem("token");
    console.log("got token from browser: ", tokenFromBrowser);

    if (!tokenFromBrowser) {
      alert("Please sign in first");
      return;
    }

    const response = await axios.get("http://localhost:8080/me", {
      headers: {
        token: tokenFromBrowser,
      },
    });
    setProfileData(response.data);
  }
//logging out the user by removing the token from local storage and resetting the profile data
  const handleLogout = () => {
    localStorage.removeItem("token");
    setProfileData(null);
    alert("Logged out successfully");
  };

  const hasToken = !!localStorage.getItem("token");

  return (
    <div className="profile-block">
      <h2 className="profile-title">Profile</h2>

      <div className="profile-actions">
        <button className="profile-button" onClick={fetchProfile}>Fetch Profile</button>
        <button className="profile-button" onClick={handleLogout}>Logout</button>
      </div>

      {!hasToken ? (
        <div className="profile-message">Please sign in first</div>
      ) : profileData && profileData.data ? (
        <div className="profile-info">
          {profileData.data.username}, {profileData.data.email}
        </div>
      ) : (
        <div className="profile-message">loading......</div>
      )}
    </div>
  );
};

export default ProfileUser;
