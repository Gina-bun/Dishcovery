import { useNavigate } from "react-router";
import { useEffect } from "react";
import type { Category } from "../../types/types";
import useFetch from "../../hooks/useFetch";
import { Spinner } from "../../components/Spinner/Spinner";

interface CategoriesResponse {
  categories: Category[];
}

export function Categories() {
  const navigate = useNavigate();
  const { data, loading, error } = useFetch<CategoriesResponse>(
    `https://www.themealdb.com/api/json/v1/1/categories.php`,
  );

   useEffect(() => {
    document.title = "Dishcovery | Browse";
  }, []);

  if (loading) return <Spinner />;
  if (error) return <p>Something went wrong: {error}</p>;

 

  return (
    <>
      <h1 className="font-medium py-3 pb-5 text-rose-600 sm:text-xl">All Categories</h1>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 pb-12">
        {data?.categories.map((category) => (
          <div
            key={category.idCategory}
            onClick={() => navigate(`/meals?category=${category.strCategory}`)}
            style={{ cursor: "pointer" }}
            className="meal-category flex flex-col bg-gray-200 p-2"
          >
            <img className="m-auto" src={category.strCategoryThumb} alt={category.strCategory} />
            <h2 className="font-medium py-1 sm:py-3 text-mauve-800">{category.strCategory}</h2>
            <p className="text-sm">{category.strCategoryDescription.slice(0, 54)}...</p>
          </div>
        ))}
      </div>
    </>
  );
}
