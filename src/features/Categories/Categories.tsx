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
      <h1>All Categories</h1>
      <div className="grid grid-cols-3 gap-3">
        {data?.categories.map((category) => (
          <div
            key={category.idCategory}
            onClick={() => navigate(`/meals?category=${category.strCategory}`)}
            style={{ cursor: "pointer" }}
          >
            <img src={category.strCategoryThumb} alt={category.strCategory} />
            <h2>{category.strCategory}</h2>
            <p>{category.strCategoryDescription.slice(0, 80)}...</p>
          </div>
        ))}
      </div>
    </>
  );
}
