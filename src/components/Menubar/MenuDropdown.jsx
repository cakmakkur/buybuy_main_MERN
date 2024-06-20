import Account from "../Dropdown/Account";
import DdCart from "../Dropdown/DdCart";
import { useRef, useEffect } from "react";

export default function MenuDropdown({ dropdownOpen, setDropdownOpen }) {
  const dropdown = dropdownOpen;
  const modalRef = useRef();

  const style = {
    transition: "0.4s ease-in-out",
    top: dropdown !== "" ? "75px" : "-60vh",
  };

  useEffect(() => {
    const modal = modalRef.current;
    if (dropdownOpen !== "") {
      modal.classList.add("dropdown_modal--active");
      modal.classList.remove("dropdown_modal--inactive");
    } else {
      modal.classList.add("dropdown_modal--inactive");
      modal.classList.remove("dropdown_modal--active");
    }
  }, [dropdown]);

  useEffect(() => {
    const modal = modalRef.current;
    modal.addEventListener("click", () => {
      setDropdownOpen("");
    });
    return () =>
      modal.removeEventListener("click", () => {
        setDropdownOpen("");
      });
  }, []);

  return (
    <>
      <div
        data-testid="dd-modal"
        ref={modalRef}
        className={`dropdown_modal`}
      ></div>

      <div style={style} className="menu_dropdown_container">
        {dropdown === "account" ? (
          <Account setDropdownOpen={setDropdownOpen} />
        ) : dropdown === "cart" ? (
          <DdCart setDropdownOpen={setDropdownOpen} />
        ) : (
          ""
        )}
      </div>
    </>
  );
}
