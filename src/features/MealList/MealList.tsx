
import { useSearchParams } from "react-router"
import type { Meal } from "../../types/types"
import useFetch from "../../hooks/useFetch"
import { MealCard } from "../../components/MealCard/MealCard"
import { Spinner } from "../../components/Spinner/Spinner"

interface MealListResponse {
    meals: Meal[] | null
}


export function MealList(){
    const [searchParams] = useSearchParams()
    const category = searchParams.get("category")
    const search = searchParams.get("search")

    const url = category
    ?  `https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`
    : search
    ? `https://www.themealdb.com/api/json/v1/1/search.php?s=${search}`
    : null
    const {data, loading, error} = useFetch<MealListResponse>(url) 

    const title = category ? category : search ? `Results for "${search}"` : "Meals"

    if (loading) return <Spinner />
    if (error) return <p>Something went wrong: {error}</p>

    return (
        <>
        <h1 className="font-medium py-3 pb-5 text-rose-600 sm:text-xl">{title}</h1>
        {
            !data?.meals ? (
                <p>No meals found. try something else.</p>
            ) : (
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 pb-12">
                    {data.meals.map((meal) => (
                        <MealCard key={meal.idMeal} meal={meal} />
                    ))}
                </div>
            )
        }
        </>
    )
}