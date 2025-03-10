import { useQuery } from "@tanstack/react-query";
import { getCategories } from "../api/categories";
export const useCategories = () => {
  const {
    data,
    isLoading: isFetching,
    isError: errorMessage,
    error: fetchError,
  } = useQuery({ queryKey: ["categories"], queryFn: getCategories });

  return {
    data: data || [],
    isFetching,
    errorMessage,
    fetchError,
  };
};
