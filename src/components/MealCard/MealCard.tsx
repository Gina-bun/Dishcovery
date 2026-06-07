
import { useNavigate } from "react-router"
import type { Meal } from "../../types/types"

interface MealCardProps {
    meal: Meal
}

export function MealCard({ meal }: MealCardProps){
    const navigate = useNavigate()

    return (
        <>
        <div
        onClick={() => navigate(`/recipe/₵{meal.idMeal}`)}
        style={{cursor:"pointer"}}
        >
            <img src={meal.strMealThumb} alt={meal.strMeal} />
            <h3>{meal.strMeal}</h3>

        </div>
        </>
    )
}