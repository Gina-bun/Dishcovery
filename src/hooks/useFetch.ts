import {useState, useEffect} from "react"

const useFetch = <T>(url: string | null) => {
    const [data, setData] = useState<T | null>(null)
    const [loading, setLoading] = useState<boolean>(true)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        if(!url) {
            setLoading(false)
            return
        }

        setLoading(true)
        setError(null)

        fetch(url)
         .then((res) => {
            if(!res.ok) throw new Error("Something went wrong")
            return res.json()
         })
         .then((json: T) => setData(json))
         .catch((err: Error) => setError(err.message))
         .finally(() => setLoading(false))
    }, [url])

    return {data, loading, error}
}

export default useFetch