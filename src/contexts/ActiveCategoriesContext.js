import { createContext } from "react";

const ActiveCategoriesContext = createContext({
  activeCategories: {},
  changeCategoryState: (s, all = false) => {},
});

export default ActiveCategoriesContext;
