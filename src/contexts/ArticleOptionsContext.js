import { createContext } from "react";

const ArticleOptionsContext = createContext({
  articlesOptions: {
    selectedEdition: "us",
    showImages: false,
    headerTop: false,
    mode: "grid",
    itemsPerCategory: 100,
    newTab: true,
  },
  updateOptions: (p, v) => {},
});

export default ArticleOptionsContext;
