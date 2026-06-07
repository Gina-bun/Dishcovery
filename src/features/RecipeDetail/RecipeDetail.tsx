import { useParams } from "react-router";
import type { Meal } from "../../types/types";
import { Heart, Star} from "lucide-react";
import useFetch from "../../hooks/useFetch";
import { useSavedMeals } from "../../context/SavedMealsContext";
import { Spinner } from "../../components/Spinner/Spinner";
import { useEffect } from "react";
import "./RecipeDetail.css"
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
      <div className="recipe-container h-fit pb-5 md:grid grid-cols-2 md:gap-5">
        <div className="md:bg-amber-100 flex flex-col justify-center">
            <img src={meal.strMealThumb} alt={meal.strMeal} className="sm:w-160 sm:p-2 sm:m-auto md:self-start md:m-auto" />
             <h1 className="recipe-name md:text-4xl md:text-center md:m-auto md:-mt-3">{meal.strMeal}</h1>
        </div>
        
        
        <div>
           
       <div className="sm:flex justify-between">
         <p className="flex gap-1">
          {meal.strCategory} <Star size={12} style={{ fontWeight: "bold", marginTop: "auto", marginBottom: "auto", fill: "black"}}/> {meal.strArea}
        </p>

        <button
        className="w-fit"
          onClick={() => (saved ? removeMeal(meal.idMeal) : saveMeal(meal))}
        >
          {saved ? (
            <div className="unsave-btn">
              <Heart  style={{marginRight: ".4rem",fill: "red"}}/> <span>Saved</span>
            </div>
          ) : (
            <div className="save-btn">
              <Heart style={{marginRight: ".4rem"}}/> <span>Save Recipe</span>
            </div>
          )}
        </button>
       </div>

        <h2 className="text-lg font-medium text-orange-500">Ingredients</h2>
        <ul className="pb-2">
          {getIngredients().map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>

        <h2 className="text-lg font-medium text-orange-500">Instructions</h2>
        <p className="pb-2">{meal.strInstructions}</p>

        {meal.strYoutube && (
          <div>
            <h2 className="text-lg font-medium">Video Tutorial</h2>
            <iframe
              width="350"
              height="315"
              className="sm:w-170"
              src={getYouTubeEmbedUrl(meal.strYoutube)}
              allowFullScreen
            ></iframe>
          </div>
        )}
        </div>
      </div>
    </>
  );
}
