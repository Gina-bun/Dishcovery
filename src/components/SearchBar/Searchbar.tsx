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
        <div className="border w-fit pr-1">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Search for a recipe..."
            className="p-2 outline-none"
          />
          <button className="bg-teal-200 p-1" onClick={handleSearch}>Search</button>
        </div>
      </div>
    </>
  );
}
