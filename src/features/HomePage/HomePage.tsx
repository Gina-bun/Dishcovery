import { useNavigate } from "react-router";
import type { Meal } from "../../types/types";
import type { Category } from "../../types/types";
import useFetch from "../../hooks/useFetch";
import { UtensilsCrossed } from "lucide-react";
import { Searchbar } from "../../components/SearchBar/Searchbar";
import "./HomePage.css"
import { useEffect } from "react";
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

      <div className="flex justify-center p-5">
        <button onClick={handleRandom} className="flex bg-teal-300 p-2">
          <UtensilsCrossed />
          Surprise Me!
        </button>
      </div>

      <h1 className="text-2xl pb-2 pl-5">Browse by Category</h1>
      {categoriesLoading && <p>Loading categories...</p>}

      <div className="grid grid-cols-3 text-center">
        {categoriesData?.categories.slice(0, 6).map((category) => (
          <div
            key={category.idCategory}
            onClick={() => navigate(`/meals?category=${category.strCategory}`)}
            style={{ cursor: "pointer" }}
          >
            <img src={category.strCategoryThumb} alt={category.strCategory} />
            <p>{category.strCategory}</p>
          </div>
        ))}
      </div>
    </>
  );
}
