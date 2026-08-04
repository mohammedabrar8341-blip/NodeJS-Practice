import { useState, useEffect } from "react";
import axios from "axios";

const Profile = ({ token }) => {
  const [profileData, setProfileData] = useState(null);

  async function fetchProfile() {
    if (!token) {
      setProfileData(null);
      return;
    }

    try {
      const response = await axios.get("http://localhost:8080/todo", {
        headers: {
          token,
        },
      });

      setProfileData(response.data.data);
    } catch (error) {
      console.log("Profile fetch error", error.response?.data || error.message);
      setProfileData(null);
    }
  }

  useEffect(() => {
    fetchProfile();
  }, [token]);

  return (
    <div>
      <h2>Profile</h2>
      <button onClick={fetchProfile}>Fetch Profile Data</button>

      {profileData ? (
        <div>
          <p>Username: {profileData.username}</p>
          <p>Email: {profileData.email}</p>
        </div>
      ) : (
        <div>loading...</div>
      )}
    </div>
  );
};

export default Profile;
