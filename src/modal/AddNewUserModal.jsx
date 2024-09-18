import { useForm } from "react-hook-form";
import { useState } from "react";
import { setUsers } from "../features/usersSlice";
import { useDispatch } from "react-redux";
const AddUserModal = ({ isOpen, onClose }) => {
  const dispatch = useDispatch();
  const { register, handleSubmit } = useForm();
  const [loading, setLoading] = useState(false);

  const onSubmit = async (data) => {
    setLoading(true);
    let payload = {
      first_name: data.first_name,
      last_name: data?.last_name,
      email: data?.email,
    };
    dispatch(setUsers(payload))
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
            <h5 className="modal-title">Add User</h5>
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
              {loading ? "Processing..." : "Submit"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddUserModal;
