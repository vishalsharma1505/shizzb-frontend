import { useState } from "react";
import { useRouter } from "next/router";
import { useDispatch } from "react-redux";
import axios from "axios";

const LoginForm = () => {
  const router = useRouter();
  const dispatch = useDispatch();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);
    setError("");

    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/api/user/login`,
        {
          email,
          password,
        }
      );

      console.log("LOGIN RESPONSE =>", response.data);

      const result = response.data;

      // Backend response:
      // {
      //   status: "success",
      //   message: "...",
      //   data: {
      //      user: {},
      //      token: "..."
      //   }
      // }

      if (result.status === "success") {
        // Allow only admin login
        if (result.data.user.role !== "admin") {
          setError("You are not authorized to access Admin Panel.");
          setLoading(false);
          return;
        }

        localStorage.setItem(
          "adminToken",
          result.data.token
        );

        localStorage.setItem(
          "adminUser",
          JSON.stringify(result.data.user)
        );

        dispatch({
          type: "USER_LOGIN_SUCCESS",
          payload: result.data.user,
        });

        router.push("/admin/dashboard");
      } else {
        setError(result.message || "Login Failed");
      }
    } catch (err) {
      console.log("LOGIN ERROR =>", err);

      setError(
        err?.response?.data?.error ||
          err?.response?.data?.message ||
          "Login Failed"
      );
    }

    setLoading(false);
  };

  return (
    <form onSubmit={handleSubmit}>
      {error && (
        <div className="alert alert-danger mb-3">
          {error}
        </div>
      )}

      <div className="form-group mb-3">
        <label>Email</label>

        <input
          type="email"
          className="form-control"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>

      <div className="form-group mb-4">
        <label>Password</label>

        <input
          type="password"
          className="form-control"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </div>

      <button
        type="submit"
        className="tp-btn w-100"
        disabled={loading}
      >
        {loading ? "Logging In..." : "Login"}
      </button>
    </form>
  );
};

export default LoginForm;