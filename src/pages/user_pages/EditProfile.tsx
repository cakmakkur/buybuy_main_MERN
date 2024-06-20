import { useState } from "react";
import { useAuthContext } from "../../global_variables/AuthContext";
import useAxiosPrivate from "../../utils/useAxiosPrivate";
import { useNavigate, useLocation } from "react-router-dom";
import toast from "react-hot-toast";
import toastConfigs from "../../utils/toastConfig";
import logout_icon from "../../assets/logout.svg";
import useLogout from "../../utils/useLogout";

export default function EditProfile() {
  const { auth, setAuth } = useAuthContext();
  const [name, setName] = useState<string | undefined>(auth?.name);
  const [familyName, setFamilyName] = useState<string | undefined>(
    auth?.familyName
  );
  const [address, setAddress] = useState<string | undefined>(auth?.address);
  const axiosPrivate = useAxiosPrivate();
  const navigate = useNavigate();
  const location = useLocation();
  const logout = useLogout();

  const handleLogout = () => {
    setAuth(undefined);
    localStorage.removeItem("persist");
    logout;
  };

  const handleEditName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(() => e.target.value);
  };

  const handleEditFamilyName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFamilyName(() => e.target.value);
  };

  const handleEditAddress = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAddress(() => e.target.value);
  };

  const payload = {
    name,
    familyName,
    address,
  };

  const handleSaveChanges = async () => {
    try {
      const response = await axiosPrivate.post(
        `/user_api/edit_profile/${auth?.username}`,
        payload
      );
      if (response !== undefined && response.status === 500)
        return toast.error("An error occured", toastConfigs);
      toast.success("Account updated successfully", toastConfigs);

      setAuth((prev) => {
        if (!prev) return undefined;
        return {
          ...prev,
          name: name || prev.name,
          familyName: familyName || prev.familyName,
          address: address || prev.address,
          username: prev.username,
          roles: prev.roles,
          accessToken: prev.accessToken,
        };
      });
    } catch (err) {
      console.log("Error saving the changes: " + err);
      navigate("/loginPage", { state: { from: location }, replace: true });
    }
  };
  return (
    <div className="edit_profile__main">
      <h1>
        <i>
          Edit Account Info for{" "}
          <span className="edit_profile__span">{auth?.username}</span>
        </i>
      </h1>
      <label className="edit_profile--label" htmlFor="name_input">
        Name
      </label>
      <input
        value={name}
        onChange={(e) => handleEditName(e)}
        type="text"
        name="name_input"
        id="name_input"
        placeholder="Name"
      />
      <label className="edit_profile--label" htmlFor="family_name_input">
        Family Name
      </label>
      <input
        value={familyName}
        onChange={(e) => handleEditFamilyName(e)}
        type="text"
        name="family_name_input"
        id="family_name_input"
        placeholder="Family Name"
      />
      <label className="edit_profile--label" htmlFor="address_input">
        Address
      </label>

      <input
        value={address}
        onChange={(e) => handleEditAddress(e)}
        type="text"
        name="address_input"
        id="address_input"
        placeholder="Address"
      />
      <button
        className="edit_account__save_changes"
        disabled={
          name !== auth?.name ||
          familyName !== auth?.familyName ||
          address !== auth?.address
            ? false
            : true
        }
        onClick={handleSaveChanges}
      >
        SAVE THE CHANGES
      </button>
      <button className="edit_account__logout" onClick={handleLogout}>
        <img src={logout_icon} alt="" />
      </button>
    </div>
  );
}
