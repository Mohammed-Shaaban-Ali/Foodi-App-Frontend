import React from "react";
import { useLoaderData, useNavigate } from "react-router-dom";
import { FaUtensils } from "react-icons/fa";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import request from "../../axios/axios";

const UpdateMenu = () => {
  const item = useLoaderData();
  const navigate = useNavigate();

  const { register, handleSubmit, reset } = useForm();
  const axiosSecure = useAxiosSecure();

  // console.log(image_hosting_key)
  const image_hosting_api = `https://api.imgbb.com/1/upload?key=f41682ac2d92cb34d7e0a66808d86636`;
  const onSubmit = async (data) => {
    // console.log(data)
    const imageFile = { image: data.image[0] };
    const hostingImg = await request.post(image_hosting_api, imageFile, {
      headers: {
        "content-type": "multipart/form-data",
      },
    });
    // console.log(hostingImg.data);
    if (hostingImg.data.success) {
      const menuItem = {
        name: data.name,
        category: data.category,
        price: parseFloat(data.price),
        recipe: data.recipe,
        image: hostingImg.data.data.display_url,
      };

      // console.log(menuItem);
      const postMenuItem = axiosSecure.put(`/menu/${item.data._id}`, menuItem);
      if (postMenuItem) {
        reset();
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Your Item is Updated successfully!",
          showConfirmButton: false,
          timer: 1500,
        });
        navigate("/dashboard/manage-items");
      }
    }
  };
  return (
    <div className="w-full md:w-[870px] px-4 mx-auto">
      <h2 className="text-2xl font-semibold my-4">
        Update <span className="text-green">Menu Item</span>
      </h2>

      {/* form here */}
      <div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="form-control w-full">
            <label className="label">
              <span className="label-text">Recipe Name*</span>
            </label>
            <input
              defaultValue={item.data.name}
              type="text"
              {...register("name", { required: true })}
              placeholder="Recipe Name"
              className="input input-bordered w-full"
            />
          </div>

          {/* 2nd row */}
          <div className="flex items-center gap-4">
            {/* categories */}
            <div className="form-control w-full my-6">
              <label className="label">
                <span className="label-text">Category*</span>
              </label>
              <select
                {...register("category", { required: true })}
                className="select select-bordered"
                defaultValue={item.data.category}
              >
                <option disabled value="default">
                  Select a category
                </option>
                <option value="salad">Salad</option>
                <option value="pizza">Pizza</option>
                <option value="soup">Soup</option>
                <option value="dessert">dessert</option>
                <option value="drinks">Drinks</option>
                <option value="popular">Popular</option>
              </select>
            </div>

            {/* prices */}
            <div className="form-control w-full">
              <label className="label">
                <span className="label-text">Price*</span>
              </label>
              <input
                defaultValue={item.data.price}
                type="number"
                {...register("price", { required: true })}
                placeholder="Price"
                className="input input-bordered w-full"
              />
            </div>
          </div>

          {/* 3rd row */}
          <div className="form-control">
            <label className="label">
              <span className="label-text">Recipe Details</span>
            </label>
            <textarea
              defaultValue={item.data.recipe}
              {...register("recipe", { required: true })}
              className="textarea textarea-bordered h-24"
              placeholder="Tell the worlds about your recipe"
            ></textarea>
          </div>

          {/* 4th row */}
          <div className="form-control w-full my-6">
            <input
              //   defaultChecked={item.data.image}
              {...register("image", { required: true })}
              type="file"
              className="file-input w-full max-w-xs"
            />
          </div>

          <button className="btn bg-green text-white px-6">
            Update Item <FaUtensils />
          </button>
        </form>
      </div>
    </div>
  );
};

export default UpdateMenu;
