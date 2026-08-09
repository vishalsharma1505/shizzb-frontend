import React, { useEffect } from 'react';
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import * as Yup from "yup";

// internal
import ErrorMsg from '../common/error-msg';
import { EmailTwo, LocationTwo, PhoneThree, UserThree } from '@/svg';
import { useUpdateProfileMutation } from '@/redux/features/auth/authApi';
import { notifyError, notifySuccess } from '@/utils/toast';

// yup schema
const schema = Yup.object().shape({
  name: Yup.string().required().label("Name"),
  email: Yup.string().required().email().label("Email"),
  phone: Yup.string().required().min(11).label("Phone"),
  address: Yup.string().required().label("Address"),
  bio: Yup.string().required().min(20).label("Bio"),
});

const ProfileInfo = () => {
  const { user } = useSelector((state) => state.auth);

  const [updateProfile] = useUpdateProfileMutation();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      address: "",
      bio: "",
    }
  });

  // ✅ FIX: sync Redux user to form
  useEffect(() => {
  if (user?._id) {
    reset({
      name: user.name || "",
      email: user.email || "",
      phone: user.phone || "",
      address: user.address || "",
      bio: user.bio || "",
    });
  }
}, [user?._id, reset]);

  // submit
  const onSubmit = async (data) => {
    try {
      const res = await updateProfile({
        id: user?._id,
        ...data
      }).unwrap();

      notifySuccess(res?.message || "Profile updated successfully");
    } catch (err) {
      notifyError(err?.data?.message || "Update failed");
    }
  };

  return (
    <div className="profile__info">
      <h3 className="profile__info-title">Personal Details</h3>

      <div className="profile__info-content">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="row">

            {/* NAME */}
            <div className="col-xxl-6 col-md-6">
              <div className="profile__input-box">
                <div className="profile__input">
                  <input
                    {...register("name")}
                    type="text"
                    placeholder="Enter your username"
                  />
                  <span><UserThree /></span>
                  <ErrorMsg msg={errors.name?.message} />
                </div>
              </div>
            </div>

            {/* EMAIL */}
            <div className="col-xxl-6 col-md-6">
              <div className="profile__input-box">
                <div className="profile__input">
                  <input
                    {...register("email")}
                    type="email"
                    placeholder="Enter your email"
                  />
                  <span><EmailTwo /></span>
                  <ErrorMsg msg={errors.email?.message} />
                </div>
              </div>
            </div>

            {/* PHONE */}
            <div className="col-xxl-12">
              <div className="profile__input-box">
                <div className="profile__input">
                  <input
                    {...register("phone")}
                    type="text"
                    placeholder="Enter your number"
                  />
                  <span><PhoneThree /></span>
                  <ErrorMsg msg={errors.phone?.message} />
                </div>
              </div>
            </div>

            {/* ADDRESS */}
            <div className="col-xxl-12">
              <div className="profile__input-box">
                <div className="profile__input">
                  <input
                    {...register("address")}
                    type="text"
                    placeholder="Enter your address"
                  />
                  <span><LocationTwo /></span>
                  <ErrorMsg msg={errors.address?.message} />
                </div>
              </div>
            </div>

            {/* BIO */}
            <div className="col-xxl-12">
              <div className="profile__input-box">
                <div className="profile__input">
                  <textarea
                    {...register("bio")}
                    placeholder="Enter your bio"
                  />
                  <ErrorMsg msg={errors.bio?.message} />
                </div>
              </div>
            </div>

            {/* BUTTON */}
            <div className="col-xxl-12">
              <div className="profile__btn">
                <button type="submit" className="tp-btn">
                  Update Profile
                </button>
              </div>
            </div>

          </div>
        </form>
      </div>
    </div>
  );
};

export default ProfileInfo;