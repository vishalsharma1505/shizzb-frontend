import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { useRouter } from "next/router";
import Link from "next/link";

// internal
import { CloseEye, OpenEye } from "@/svg";
import ErrorMsg from "../common/error-msg";
import { useLoginUserMutation } from "@/redux/features/auth/authApi";
import { notifyError, notifySuccess } from "@/utils/toast";

// schema
const schema = Yup.object().shape({
  email: Yup.string().required().email().label("Email"),
  password: Yup.string().required().min(6).label("Password"),
});

const LoginForm = () => {
  const [showPass, setShowPass] = useState(false);

  const [loginUser, { isLoading }] = useLoginUserMutation();

  const router = useRouter();

  const { redirect } = router.query;

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(schema),
  });

  // ===========================
  // LOGIN
  // ===========================

  const onSubmit = async (formData) => {
    try {
      const res = await loginUser({
        email: formData.email,
        password: formData.password,
      }).unwrap();

      console.log("LOGIN SUCCESS =>", res);

      notifySuccess("Login Successfully");

      reset();

      if (redirect) {
        router.push(redirect);
      } else {
        router.push("/");
      }
    } catch (err) {
      console.log("LOGIN ERROR =>", err);

      notifyError(
        err?.data?.error ||
          err?.data?.message ||
          "Login Failed"
      );
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="tp-login-input-wrapper">

        <div className="tp-login-input-box">

          <div className="tp-login-input">
            <input
              {...register("email")}
              id="email"
              type="email"
              placeholder="contact@shizzb.in"
            />
          </div>

          <div className="tp-login-input-title">
            <label htmlFor="email">Your Email</label>
          </div>

          <ErrorMsg msg={errors.email?.message} />

        </div>

        <div className="tp-login-input-box">

          <div className="p-relative">

            <div className="tp-login-input">
              <input
                {...register("password")}
                id="password"
                type={showPass ? "text" : "password"}
                placeholder="Min. 6 character"
              />
            </div>

            <div className="tp-login-input-eye">
              <span onClick={() => setShowPass(!showPass)}>
                {showPass ? <CloseEye /> : <OpenEye />}
              </span>
            </div>

            <div className="tp-login-input-title">
              <label htmlFor="password">Password</label>
            </div>

          </div>

          <ErrorMsg msg={errors.password?.message} />

        </div>

      </div>

      <div className="tp-login-suggetions d-sm-flex align-items-center justify-content-between mb-20">

        <div className="tp-login-remeber">
          <input id="remember" type="checkbox" />
          <label htmlFor="remember">Remember me</label>
        </div>

        <div className="tp-login-forgot">
          <Link href="/forgot">Forgot Password?</Link>
        </div>

      </div>

      <div className="tp-login-bottom">
        <button
          type="submit"
          className="tp-login-btn w-100"
          disabled={isLoading}
        >
          {isLoading ? "Logging in..." : "Login"}
        </button>
      </div>
    </form>
  );
};

export default LoginForm;