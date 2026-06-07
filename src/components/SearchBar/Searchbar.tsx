import { useState } from "react";
import { useNavigate } from "react-router";

export function Searchbar() {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  const handleSearch = () => {
    if (!query.trim()) return;
    navigate(`/meals?search=${query}`);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") handleSearch();
  };

  return (
    <>
      <div className="flex justify-center pt-5">
        <div className="flex border-2 border-zinc-600 border-solid w-fit sm:w-[50%] p-1">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Search for a recipe..."
            className="p-1 outline-none flex-1"
          />
          <button className="bg-orange-200 px-2 text-gray-700" onClick={handleSearch}>Search</button>
        </div>
      </div>
    </>
  );
}
