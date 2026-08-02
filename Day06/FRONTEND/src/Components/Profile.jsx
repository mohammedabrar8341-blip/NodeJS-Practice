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

  return (
    <div>
      <h2>Profile</h2>
      <button onClick={fetchProfile}>Fetch Profile</button>
      <button onClick={handleLogout}>Logout</button>

      {profileData && profileData.data ? (
        <div>
          {profileData.data.username}, {profileData.data.email}
        </div>
      ) : (
        <div>loading......</div>
      )}
    </div>
  );
};

export default ProfileUser;
