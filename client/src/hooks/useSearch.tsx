import { useMemo, useState } from "react";

function useSearch<T extends Record<K, string>, K extends keyof T>(
  data: T[],
  searchFields: K[]
) {
  const [query, setQuery] = useState("");

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value.toLowerCase());
  };

  const filteredData = useMemo(() => {
    if (!query) return data;
    return data.filter((item) =>
      searchFields.some((field) =>
        item[field].toString().toLowerCase().includes(query)
      )
    );
  }, [data, query, searchFields]);

  return { query, handleSearch, filteredData };
}

export default useSearch;
