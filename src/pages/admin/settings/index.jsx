import { useEffect, useState } from "react";
import axios from "axios";
import AdminLayout from "../../../components/admin/AdminLayout";

const Settings = () => {
  // ==========================
  // Website Settings
  // ==========================

  const [mobile, setMobile] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");

  // ==========================
  // Change Password
  // ==========================

  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  useEffect(() => {
    loadSettings();
  }, []);

  // ==========================
  // Load Footer Settings
  // ==========================

  const loadSettings = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/api/settings`
      );

      if (data.success) {
        setMobile(data.data.mobile || "");
        setEmail(data.data.email || "");
        setAddress(data.data.address || "");
      }
    } catch (err) {
      console.log(err);
    }
  };

  // ==========================
  // Save Footer Settings
  // ==========================

  const saveSettings = async (e) => {
    e.preventDefault();

    try {
      const { data } = await axios.put(
        `${process.env.NEXT_PUBLIC_API_URL}/api/settings`,
        {
          mobile,
          email,
          address,
        }
      );

      if (data.success) {
        alert("Settings Updated Successfully");
      }
    } catch (err) {
      console.log(err);
      alert("Unable to update settings");
    }
  };

  // ==========================
  // Change Password
  // ==========================

  const changePassword = async (e) => {
    e.preventDefault();

    if (newPassword !== confirmPassword) {
      alert("New Password and Confirm Password do not match");
      return;
    }

    try {
      const { data } = await axios.patch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/user/admin/change-password`,
        {
          currentPassword,
          newPassword,
        }
      );

      if (data.success) {
        alert(data.message);

        setCurrentPassword("");
        setNewPassword("");
        setConfirmPassword("");
      }
    } catch (err) {
      alert(
        err.response?.data?.message ||
          "Unable to change password"
      );
    }
  };

  return (
    <AdminLayout>

      {/* ==========================
          Website Settings
      ========================== */}

      <div className="page-title">
        <div>
          <h2>Website Settings</h2>
          <small>
            Manage Footer Information
          </small>
        </div>
      </div>

      <form onSubmit={saveSettings}>

        <div className="admin-card">

          <div className="form-grid">

            <div className="form-group">
              <label>Mobile Number</label>

              <input
                type="text"
                value={mobile}
                onChange={(e) =>
                  setMobile(e.target.value)
                }
              />
            </div>

            <div className="form-group">
              <label>Email</label>

              <input
                type="email"
                value={email}
                onChange={(e) =>
                  setEmail(e.target.value)
                }
              />
            </div>

            <div className="form-group full">
              <label>Address</label>

              <textarea
                rows="5"
                value={address}
                onChange={(e) =>
                  setAddress(e.target.value)
                }
              />
            </div>

          </div>

        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "flex-end",
            marginTop: "30px",
          }}
        >
          <button
            type="submit"
            className="save-btn"
          >
            Save Settings
          </button>
        </div>

      </form>

      {/* ==========================
          Change Password
      ========================== */}

      <div
        className="admin-card"
        style={{ marginTop: "50px" }}
      >

        <h3
          style={{
            marginBottom: "25px",
          }}
        >
          Change Admin Password
        </h3>

        <form onSubmit={changePassword}>

          <div className="form-grid">

            <div className="form-group">

              <label>Current Password</label>

              <input
                type="password"
                value={currentPassword}
                onChange={(e) =>
                  setCurrentPassword(
                    e.target.value
                  )
                }
              />

            </div>

            <div className="form-group">

              <label>New Password</label>

              <input
                type="password"
                value={newPassword}
                onChange={(e) =>
                  setNewPassword(
                    e.target.value
                  )
                }
              />

            </div>

            <div className="form-group">

              <label>Confirm Password</label>

              <input
                type="password"
                value={confirmPassword}
                onChange={(e) =>
                  setConfirmPassword(
                    e.target.value
                  )
                }
              />

            </div>

          </div>

          <div
            style={{
              display: "flex",
              justifyContent: "flex-end",
              marginTop: "25px",
            }}
          >

            <button
              type="submit"
              className="save-btn"
            >
              Change Password
            </button>

          </div>

        </form>

      </div>

    </AdminLayout>
  );
};

export default Settings;