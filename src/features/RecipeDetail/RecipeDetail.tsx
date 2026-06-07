import { useParams } from "react-router";
import type { Meal } from "../../types/types";
import { Clover, Heart, HeartOff } from "lucide-react";
import useFetch from "../../hooks/useFetch";
import { useSavedMeals } from "../../context/SavedMealsContext";
import { Spinner } from "../../components/Spinner/Spinner";
import { useEffect } from "react";

interface RecipeDetailResponse {
  meals: Meal[];
}

export function RecipeDetail() {
  const { id } = useParams<{ id: string }>();
  const { data, loading, error } = useFetch<RecipeDetailResponse>(
    `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`,
  );

  const { saveMeal, removeMeal, isSaved } = useSavedMeals();

  const meal = data?.meals[0];

  useEffect(() => {
    if (meal) document.title = `Dishcovery | ${meal.strMeal}`;
  }, [meal]);

  if (loading) return <Spinner />;
  if (error) return <p>Something went wrong: {error}</p>;

  if (!meal) return <p>Meal not found.</p>;

  const saved = isSaved(meal.idMeal);

  const getIngredients = () => {
    const ingredients: string[] = [];
    for (let i = 1; i <= 20; i++) {
      const ingredient = meal[`strIngredient${i}`];
      const measure = meal[`strMeasure${i}`];

      if (ingredient && ingredient.trim()) {
        ingredients.push(`${measure?.trim()} ${ingredient.trim()}`);
      }
    }

    return ingredients;
  };

  const getYouTubeEmbedUrl = (url: string) => {
    const videoId = url.split(`v=`)[1];
    return `https://www.youtube.com/embed/${videoId}`;
  };

  return (
    <>
      <div>
        <img src={meal.strMealThumb} alt={meal.strMeal} />
        <h1>{meal.strMeal}</h1>
        <p>
          {meal.strCategory} <Clover /> {meal.strArea}
        </p>

        <button
          onClick={() => (saved ? removeMeal(meal.idMeal) : saveMeal(meal))}
        >
          {saved ? (
            <div>
              <HeartOff /> <span>Remove from Saved</span>
            </div>
          ) : (
            <div>
              <Heart /> <span>Save Recipe</span>
            </div>
          )}
        </button>

        <h2>Ingredients</h2>
        <ul>
          {getIngredients().map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>

        <h2>Instructions</h2>
        <p>{meal.strInstructions}</p>

        {meal.strYoutube && (
          <div>
            <h2>Video Tutorial</h2>
            <iframe
              width="560"
              height="315"
              src={getYouTubeEmbedUrl(meal.strYoutube)}
              allowFullScreen
            ></iframe>
          </div>
        )}
      </div>
    </>
  );
}
