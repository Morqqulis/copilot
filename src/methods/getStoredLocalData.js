export default function getStoredLocalData(itemName, setValue) {
  let storedActiveCategories;
  storedActiveCategories = JSON.parse(localStorage.getItem(itemName));
  if (storedActiveCategories) setValue(storedActiveCategories);
}
