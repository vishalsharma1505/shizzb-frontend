import Head from "next/head";
import LoginForm from "../../components/admin/LoginForm";

const AdminLogin = () => {
  return (
    <>
      <Head>
        <title>Admin Login | ShizzB Cosmetics</title>
      </Head>

      <div className="admin-login-page">
        <div className="admin-login-box">

          <div className="admin-login-logo">
            <img src="/assets/img/logo/logo.png" alt="ShizzB" />
          </div>

          <h2>Admin Panel</h2>

          <p>Please login to continue</p>

          <LoginForm />

        </div>
      </div>
    </>
  );
};

export default AdminLogin;