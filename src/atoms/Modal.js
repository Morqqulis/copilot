export default function Modal({ children, closeModal, showModal }) {
  return (
    <div
      className={`fixed top-0 right-0 w-screen h-screen flex justify-center items-center isolate z-20 ${
        showModal ? "" : "hidden"
      }`}
    >
      {children}
      <div
        className="absolute w-full h-full bg-black bg-opacity-80 -z-10"
        onClick={closeModal}
      ></div>
    </div>
  );
}
