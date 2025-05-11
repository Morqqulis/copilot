"use client";
import React, { useEffect, useState } from "react";
import Nav from "./Nav";
import Footer from "./Footer";
import ArticleGrid from "../molecules/ArticleGrid";
import BackToTopButton from "../atoms/BackToTopButton";
import ArticleOptionsContext from "@/contexts/ArticleOptionsContext";
import ActiveCategoriesContext from "@/contexts/ActiveCategoriesContext";
import getStoredLocalData from "@/methods/getStoredLocalData";
import { Toaster } from "react-hot-toast";

const defaultCategoryStates = {
  world: true,
  nation: true,
  business: true,
  technology: true,
  entertainment: true,
  sports: true,
  science: true,
  health: true,
  crypto: true,
};

const defaultArticleOpions = {
  selectedEdition: "us",
  showImages: false,
  headerTop: false,
  mode: "grid",
  itemsPerCategory: 10,
  newTab: true,
};

export default function Main() {
  const [activeCategories, setActiveCategories] = React.useState(
    defaultCategoryStates
  );
  const [articlesOptions, setArticlesOptions] =
    React.useState(defaultArticleOpions);

  useEffect(() => {
    getStoredLocalData("activeCategories", setActiveCategories);
    getStoredLocalData("articlesOptions", setArticlesOptions);
  }, []);

  /**
   *
   * @param {string} param
   * @param {*} value
   */
  function updateOptions(param, value) {
    setArticlesOptions((prev) => {
      if (typeof window !== "undefined")
        localStorage.setItem(
          "articlesOptions",
          JSON.stringify({ ...prev, [param]: value })
        );
      return { ...prev, [param]: value };
    });
  }

  /**
   * @param {string} category
   */
  function changeCategoryState(category, all = false) {
    if (!all)
      setActiveCategories((prev) => {
        const prevCopy = JSON.parse(JSON.stringify(prev));
        prevCopy[category] = !prevCopy[category];
        if (typeof window !== "undefined")
          localStorage.setItem("activeCategories", JSON.stringify(prevCopy));
        return { ...prevCopy };
      });
    else
      setActiveCategories((prev) => {
        for (const [key] of Object.entries(prev)) {
          if (key === category) prev[key] = true;
          else prev[key] = false;
        }
        if (typeof window !== "undefined")
          localStorage.setItem("activeCategories", JSON.stringify(prev));
        return { ...prev };
      });
  }

  return (
    <main className="w-full min-h-screen bg-[#181A1B] text-white flex flex-col justify-between relative">
      <ArticleOptionsContext.Provider
        value={{ articlesOptions, updateOptions }}
      >
        <ActiveCategoriesContext.Provider
          value={{ activeCategories, changeCategoryState }}
        >
          <Nav />
          <ArticleGrid />
          <BackToTopButton />
          <Footer />
          <Toaster />
        </ActiveCategoriesContext.Provider>
      </ArticleOptionsContext.Provider>
    </main>
  );
}
