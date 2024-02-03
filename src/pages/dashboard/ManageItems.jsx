import { useQuery } from "@tanstack/react-query";
import React from "react";
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import MyImage from "../../lazyLoadImage/MyImage";

const ManageItems = () => {
  const axiosSecure = useAxiosSecure();
  const { refetch, data: menus = [] } = useQuery({
    queryKey: ["menu"],
    queryFn: async () => {
      const res = await axiosSecure.get("/menu");
      return res.data;
    },
  });
  // console.log(users);
  const handleMakeAdmin = (user) => {
    axiosSecure.patch(`/users/admin/${user._id}`).then((res) => {
      alert(`${user.name} is now admin`);
      refetch();
    });
  };

  const handleDeleteitem = (item) => {
    axiosSecure.delete(`/menu/${item._id}`).then((res) => {
      alert(`${item.name} is removed from database`);
      refetch();
    });
  };
  return (
    <div>
      <h2 className="text-2xl font-semibold my-4">
        Manage All <span className="text-green my-4 pt-8">Menu Item</span>
      </h2>

      {/* table */}
      <div>
        <div className="overflow-x-auto">
          <table className="table table-zebra md:w-[870px]">
            {/* head */}
            <thead className="bg-green text-white rounded-lg">
              <tr>
                <th>#</th>
                <th>Image</th>
                <th>Name</th>
                <th>Price</th>
                <th>Update</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {menus?.map((menu, index) => (
                <tr key={index}>
                  <th>{index + 1}</th>
                  <td>
                    <MyImage
                      src={menu.image}
                      alt={menu.name}
                      className="w-14"
                    />
                  </td>
                  <td>{menu.name}</td>
                  <td>{menu.price}</td>
                  <td>
                    {menu.role === "admin" ? (
                      "Admin"
                    ) : (
                      <button
                        // onClick={() => handleMakeAdmin(menu)}
                        className="btn btn-xs  bg-indigo-500 text-white"
                      >
                        <FaEdit className="text-sm" />
                      </button>
                    )}
                  </td>
                  <td>
                    <button
                      onClick={() => handleDeleteitem(menu)}
                      className="btn btn-xs bg-orange-500 text-white"
                    >
                      <FaTrashAlt />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ManageItems;
