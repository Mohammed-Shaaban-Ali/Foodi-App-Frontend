import React, { useContext } from "react";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";

import { AuthContext } from "../../contexts/AuthProvider";
import { useLocation, useNavigate } from "react-router-dom";
import request from "../../axios/axios";

const UpdateUser = () => {
  const { updateUserProfile, user } = useContext(AuthContext);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const location = useLocation();
  const navigate = useNavigate();
  const from = location.state?.from?.pathname || "/";

  // upload image
  const image_hosting_api = `https://api.imgbb.com/1/upload?key=f41682ac2d92cb34d7e0a66808d86636`;

  const onSubmit = async (data) => {
    const imageFile = { image: data.image[0] };
    const hostingImg = await request.post(image_hosting_api, imageFile, {
      headers: {
        "content-type": "multipart/form-data",
      },
    });

    if (hostingImg.data.success) {
      const name = data.name;
      // console.log(name);
      const photoURL = hostingImg.data.data.display_url;
      // console.log(photoURL);
      updateUserProfile(name, photoURL)
        .then((res) => {
          // Profile updated!

          Swal.fire({
            position: "top-end",
            icon: "success",
            title: "updated profile successfully",
            showConfirmButton: false,
            timer: 1500,
          });
          setTimeout(() => {
            navigate(from, { replace: true });
          }, 1500);
          // ...
        })
        .catch((error) => {
          console.log({ error });
          Swal.fire({
            position: "top-end",
            icon: "error",
            title: error.message,
            showConfirmButton: false,
            timer: 5000,
          });
        });
    }
  };

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="card shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
        <form className="card-body" onSubmit={handleSubmit(onSubmit)}>
          <h3 className="font-bold">Update Your Profile</h3>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Name</span>
            </label>
            <input
              {...register("name")}
              defaultValue={user?.displayName}
              type="text"
              placeholder="your name"
              className="input input-bordered"
              required
            />
          </div>
          <div className="form-control w-full my-6">
            <input
              {...register("image", { required: true })}
              type="file"
              className="file-input w-full max-w-xs"
            />
          </div>
          <div className="form-control mt-6">
            <button className="btn bg-green text-white">Update</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateUser;
