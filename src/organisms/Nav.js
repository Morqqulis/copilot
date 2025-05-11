"use client";
import React, { createContext, useState } from "react";
import logo from "../assets/logo.svg";
import Sidebar from "../molecules/Sidebar";
import OptionsModal from "../molecules/OptionsModal";
import DonateModal from "../molecules/DonateModal";
import SubmitNewModal from "../molecules/SubmitNewsModal";
import SignInModal from "../molecules/SignInModal";
import ActiveCategoriesContext from "@/contexts/ActiveCategoriesContext";
import UserModal from "@/molecules/UserModal";
import Link from "next/link";

export default function Nav() {
  const activeCategoriesContext = React.useContext(ActiveCategoriesContext);
  const [activeSideBar, setActiveSidebar] = React.useState(false);
  const [showOptions, setShowOptions] = React.useState(false);
  const [showDonate, setShowDonate] = React.useState(false);
  const [showSubmit, setShowSubmit] = React.useState(false);
  const [showSignIn, setShowSignIn] = React.useState(false);
  const [showUser, setShowUser] = useState(false);

  function toggleUser() {
    setShowUser((prev) => !prev);
  }

  /**
   * @param {React.MouseEvent<HTMLLIElement, MouseEvent>} e
   * @param {string} c
   */
  function filteringCategories(e, c) {
    e.preventDefault();
    if (e.nativeEvent.altKey)
      activeCategoriesContext.changeCategoryState(c, true);
    else activeCategoriesContext.changeCategoryState(c);
  }

  function toggleSidebar() {
    setActiveSidebar((prev) => !prev);
  }

  function toggleOptions() {
    setShowOptions((prev) => !prev);
  }

  function toggleDonate() {
    setShowDonate((prev) => !prev);
  }
  function toggleSubmit() {
    setShowSubmit((prev) => !prev);
  }
  function toggleSignIn() {
    setShowSignIn((prev) => !prev);
  }

  return (
    <nav className="mb-10 pt-6 relative">
      <SidemenuContext.Provider
        value={{
          activeSideBar,
          toggleSidebar,
          toggleOptions,
          toggleDonate,
          toggleSubmit,
          toggleSignIn,
          toggleUser,
        }}
      >
        <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
          <Link href="/">
            <img
              src={logo.src}
              className="content-center w-36 sm:w-48"
              alt="Flowbite Logo"
            />
          </Link>

          <div
            className="hidden w-full md:block md:w-auto capitalize font-medium"
            id="navbar-default"
          >
            <ul className="flex gap-5">
              {activeCategoriesContext.activeCategories != null
                ? Object.keys(activeCategoriesContext.activeCategories).map(
                    (c) => {
                      const textColor = activeCategoriesContext
                        .activeCategories[c.trim().toLocaleLowerCase()]
                        ? "text-white"
                        : "text-gray-500";

                      const liStyle = `${textColor} hover:text-gray-300 cursor-pointer`;

                      return (
                        <li key={c} onClick={(e) => filteringCategories(e, c)}>
                          <span className={liStyle}>{c}</span>
                        </li>
                      );
                    }
                  )
                : ""}
            </ul>
          </div>

          <button
            data-collapse-toggle="navbar-default"
            type="button"
            className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-white hover:text-gray-200"
            aria-controls="navbar-default"
            aria-expanded="false"
            onClick={toggleSidebar}
          >
            <span className="sr-only">Open main menu</span>
            <svg
              className="w-5 h-5"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 17 14"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M1 1h15M1 7h15M1 13h15"
              />
            </svg>
          </button>
        </div>

        <SubmitNewModal showSubmit={showSubmit} toggleSubmit={toggleSubmit} />
        <OptionsModal showOptions={showOptions} toggleOptions={toggleOptions} />
        <DonateModal showDonate={showDonate} toggleDonate={toggleDonate} />
        <SignInModal showSignIn={showSignIn} toggleSignIn={toggleSignIn} />
        <UserModal showUser={showUser} toggleUser={toggleUser} />
        <Sidebar />
      </SidemenuContext.Provider>
    </nav>
  );
}

const SidemenuContext = createContext({
  activeSideBar: false,
  toggleSidebar: () => {},
  toggleOptions: () => {},
  toggleDonate: () => {},
  toggleSubmit: () => {},
  toggleSignIn: () => {},
  toggleUser: () => {},
});
export { SidemenuContext };
