import { useRef } from "react";

export default function RegisterNewAccount({
  inputsData,
  toggleRegister,
  onSubmit,
}) {
  const emailInputRef = useRef();
  const passwordInputRef = useRef();

  function submitHandle(e) {
    e.preventDefault();
    const email = emailInputRef.current.value;
    const passwrd = passwordInputRef.current.value;
    onSubmit(email, passwrd);
  }

  return (
    <form onSubmit={submitHandle} className="w-full">
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

      <div className="flex w-full justify-center flex-col md:flex-row items-center md:justify-between mt-7 gap-4">
        <button
          type="submit"
          className="border border-gray-800 hover:border-gray-700 py-2 px-6 md:px-10 rounded-sm font-light w-full md:w-auto"
        >
          Register
        </button>

        <button
          onClick={toggleRegister}
          className="bg-gray-900 bg-opacity-50 hover:bg-gray-800 py-2 px-6 md:px-10 rounded-sm font-light w-full md:w-auto"
        >
          Back
        </button>
      </div>
    </form>
  );
}
