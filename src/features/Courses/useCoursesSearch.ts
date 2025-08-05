import { useState } from "react";
import debounce from "lodash.debounce";

export const useCoursesSearch = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [debounced, setDebounced] = useState("");

  const debounceSearch = debounce((val: string) => {
    setDebounced(val);
  }, 500);

  const handleChange = (value: string) => {
    setSearchTerm(value);
    debounceSearch(value);
  };

  return { searchTerm, setSearchTerm: handleChange, debounced };
};
