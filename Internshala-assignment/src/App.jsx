import { useState, useEffect } from "react";
import AddUserModal from "./modal/AddNewUserModal";
import EditUserModal from "./modal/EditUserModal";
import { useFetchUsersQuery } from "./features/usersApi";
import { useDispatch, useSelector } from "react-redux";
import { selectUser, setUsers } from "./features/usersSlice";

import "./App.css";
const App = () => {
  const dispatch = useDispatch();
  const { users } = useSelector((state) => state?.users);
  console.log("userssss", users);
  const [isAddModalOpen, setAddModalOpen] = useState(false);
  const [isEditModalOpen, setEditModalOpen] = useState(false);
  const openAddModal = () => setAddModalOpen(true);
  const closeAddModal = () => setAddModalOpen(false);
  const { data, isLoading } = useFetchUsersQuery();
  console.log("datatatata", data);
  const updateUser = (user) => {
    dispatch(selectUser(user));
    setEditModalOpen(true);
  };
  useEffect(() => {
    dispatch(setUsers(data));
  }, [data]);
  if (isLoading) return <p>Loading...</p>;
  return (
    <div className="grid grid-cols-1  m-4">
      <div className="flex justify-end">
        <button
          className="px-3 py-2 border-2 border-orange-300 bg-slate-500 rounded-xl text-white"
          onClick={openAddModal}
        >
          Add User
        </button>
      </div>
      {isAddModalOpen && (
        <AddUserModal isOpen={isAddModalOpen} onClose={closeAddModal} />
      )}
      {isEditModalOpen && (
        <EditUserModal
          isOpen={isEditModalOpen}
          onClose={() => setEditModalOpen(false)}
        />
      )}

      {/* User Cards */}
      <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mt-8 mx-2">
        {users?.map((user,index) => (
          <div
            key={index}
            className=" border-2 min-h-28 flex flex-col justify-evenly border-blue-600 p-3 rounded-2xl shadow-xl cursor-pointer"
            onClick={() => {
              updateUser(user);
            }}
          >
            <div className="flex flex-col items-center gap-y-4">
              <div>
                <img
                  class="w-16 h-16 rounded-full"
                  src={user?.avatar??"https://www.google.com/url?sa=i&url=https%3A%2F%2Fashallendesign.co.uk%2Fblog%2F13-placeholder-avatar-and-image-websites&psig=AOvVaw2M3NVn4e6eR-vqrk7LYt4_&ust=1726740220458000&source=images&cd=vfe&opi=89978449&ved=0CBQQjRxqFwoTCLj_juKezIgDFQAAAAAdAAAAABAE"}
                  alt="Rounded avatar"
                />
              </div>
              <div className="flex flex-col justify-between mt-4">
                <p>
                  Name: {user?.first_name} {user?.last_name}
                </p>
                <p>Email: {user?.email}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
export default App;
