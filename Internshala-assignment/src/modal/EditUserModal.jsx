import { useForm } from "react-hook-form";
import { useSelector, useDispatch } from "react-redux";
import { updateUser } from "../features/usersSlice";
import { useState } from "react";

const EditUserModal = ({ isOpen, onClose }) => {
  const selectedUser = useSelector((state) => state?.users?.selectedUser);
  const { register, handleSubmit, setValue } = useForm();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  if (selectedUser) {
    setValue("first_name", selectedUser.first_name);
    setValue("last_name", selectedUser.last_name);
    setValue("email", selectedUser.email);
  }

  const onSubmit = (data) => {
    setLoading(true);
    dispatch(updateUser({ ...selectedUser, ...data }));
    setLoading(false);
    onClose();
  };


  return (
    <div
      className="modal fade show"
      tabIndex="-1"
      role="dialog"
      style={{ display: "block" }}
    >
      <div className="modal-dialog" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Edit User</h5>
          </div>
          <div className="modal-body">
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="form-group">
                <label htmlFor="first_name">First Name</label>
                <input
                  {...register("first_name")}
                  className="form-control"
                  id="first_name"
                  placeholder="First Name"
                />
              </div>
              <div className="form-group">
                <label htmlFor="last_name">Last Name</label>
                <input
                  {...register("last_name")}
                  className="form-control"
                  id="last_name"
                  placeholder="Last Name"
                />
              </div>
              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input
                  {...register("email")}
                  className="form-control"
                  id="email"
                  placeholder="Email"
                />
              </div>
            </form>
          </div>
          <div className="modal-footer">
            <button
              type="button"
              className="py-1 px-3 bg-red-500 text-white rounded-xl"
              onClick={onClose}
            >
              Close
            </button>
            <button
              type="submit"
              className="py-1 px-3 bg-blue-500 text-white rounded-xl"
              onClick={handleSubmit(onSubmit)}
            >
              {loading ? "updating..." : "Update User"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditUserModal;
