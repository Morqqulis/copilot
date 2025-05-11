"use client";

export default function DropdownCopilot({
  options,
  dropDownValue,
  updateDropdown,
}) {
  function changeHandle(e) {
    updateDropdown(e.target.value);
  }
  const isLoading = options.length < 1;

  return (
    <select
      onChange={changeHandle}
      id="countries"
      disabled={isLoading}
      value={isLoading ? "Loading..." : dropDownValue}
      className="w-full border cursor-pointer border-white bg-transparent text-sm rounded-lg block p-2.5 text-white focus:outline-none focus:shadow-none focus:ring-transparent"
    >
      {isLoading ? (
        <option className="bg-bigBg" value={"Loading..."}>
          Loading...
        </option>
      ) : (
        ""
      )}
      {options.map(({ name, code }) => {
        return (
          <option className="bg-bigBg" key={code} value={code}>
            {name}
          </option>
        );
      })}
    </select>
  );
}
