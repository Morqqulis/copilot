import { useRef } from "react";

export default function EmailForm({ inputsData, toggleRegister, onSubmit }) {
  const emailInputRef = useRef();
  const passwordInputRef = useRef();

  function submitHandle(e) {
    e.preventDefault();
    const email = emailInputRef.current.value;
    const passwrd = passwordInputRef.current.value;
    onSubmit(email, passwrd);
  }

  return (
    <div className="text-sm md:text-base w-full">
      <form onSubmit={submitHandle} className="mb-6 md:mb-3">
        {inputsData.map(({ type, placeholder }) => {
          return (
            <div key={type} className="relative z-0 w-full mb-5 group">
              <input
                ref={type == "email" ? emailInputRef : passwordInputRef}
                autoComplete={type}
                type={type}
                className="block py-2.5 px-0 w-full text-sm bg-transparent border-0 border-b-2 appearance-none text-white border-gray-600 focus:border-blue-400 outline-none transition duration-300 "
                placeholder={placeholder}
                required
              />
            </div>
          );
        })}

        <div className="flex w-full items-center md:justify-between flex-col md:flex-row gap-3">
          <button
            // disabled={loading}
            type="submit"
            className="border border-gray-800 hover:border-gray-700 py-2 px-6 md:px-16 rounded-sm font-light w-full md:w-auto"
          >
            Login
          </button>

          <button type="button" className="text-blue-300 font-light text-sm">
            forgot password ?
          </button>
        </div>
      </form>
      <p className="text-center text-sm text-gray-400">
        Not a member?{" "}
        <button
          onClick={toggleRegister}
          className="font-semibold leading-6 text-blue-300 hover:text-blue-200"
        >
          register
        </button>
      </p>
    </div>
  );
}
