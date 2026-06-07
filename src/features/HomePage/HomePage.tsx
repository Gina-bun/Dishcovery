import { useNavigate } from "react-router";
import type { Meal } from "../../types/types";
import type { Category } from "../../types/types";
import useFetch from "../../hooks/useFetch";
import { UtensilsCrossed } from "lucide-react";
import { Searchbar } from "../../components/SearchBar/Searchbar";
import "./HomePage.css";
import { useEffect } from "react";
import { Spinner } from "../../components/Spinner/Spinner";
interface RandomMealResponse {
  meals: Meal[];
}

interface CategoriesResponse {
  categories: Category[];
}

export function HomePage() {
  const navigate = useNavigate();

  useEffect(() => {
    document.title = "Dishcovery | Home";
  }, []);

  const { data: categoriesData, loading: categoriesLoading } =
    useFetch<CategoriesResponse>(
      `https://www.themealdb.com/api/json/v1/1/categories.php`,
    );

  const handleRandom = async () => {
    const res = await fetch(
      `https://www.themealdb.com/api/json/v1/1/random.php`,
    );

    const data: RandomMealResponse = await res.json();
    const randomMeal = data.meals[0];
    navigate(`/recipe/${randomMeal.idMeal}`);
  };

  return (
    <>
      <Searchbar />

      <div className="intro-message flex flex-col items-center md:gap-2">
        <h1 className="text-2xl text-rose-600 sm:text-3xl sm:pb-1">Step away from the takeout menu!</h1>
        <p className="text-lg text-center py-1 text-gray-900 md:w-[50%]">
          Welcome to your new kitchen happy place. We serve up foolproof recipes
          that are high on flavor and low on stress. No fancy chef hats
          required. Grab an apron, blast your favorite playlist, and let’s make
          something delicious!
        </p>
      </div>

      <div className="flex justify-center pb-3">
        <button
          onClick={handleRandom}
          className="flex gap-1 text-zinc-800 bg-rose-500 p-2.5 px-3 text-md font-medium"
        >
          <UtensilsCrossed
            size={20}
            style={{ marginBottom: "auto", marginTop: "auto" }}
          />
          Surprise Me!
        </button>
      </div>

      <h1 className="text-2xl py-2 pt-8 sm:text-3xl sm:py-5  pl-5 text-center text-orange-500">
        Browse by Category
      </h1>
      {categoriesLoading && <Spinner />}

      <div className="category-section grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2 text-center">
        {categoriesData?.categories.slice(0, 6).map((category) => (
          <div
            className="bg-zinc-200 p-2 meal-category"
            key={category.idCategory}
            onClick={() => navigate(`/meals?category=${category.strCategory}`)}
            style={{ cursor: "pointer" }}
          >
            <img src={category.strCategoryThumb} alt={category.strCategory} />
            <p className="font-medium py-1 sm:py-3 text-mauve-800">
              {category.strCategory}
            </p>
          </div>
        ))}
      </div>
    </>
  );
}
