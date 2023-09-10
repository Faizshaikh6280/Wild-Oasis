import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getBookings } from "../../services/apiBookings";
import { useSearchParams } from "react-router-dom";
import { PAGE_SIZE } from "../../constants";

export function useBookings() {
  const [searchParams] = useSearchParams();
  const queryClient = useQueryClient();
  //1.FILTER
  const filterValue = searchParams.get("status");
  const filter =
    !filterValue || filterValue === "all"
      ? null
      : { field: "status", value: filterValue, method: "eq" };

  //2. Sorting
  const sortByRaw = searchParams.get("sortBy") || "startDate-desc";
  const [field, way] = sortByRaw.split("-");
  const sortBy = { field, way };
  //3. Pagination
  const curPage = +searchParams.get("page") || 1;

  const {
    data = {},
    isLoading,
    error,
  } = useQuery({
    queryKey: ["bookings", filter, sortBy, curPage],
    queryFn: () => getBookings({ filter, sortBy, curPage }),
  });
  const { data: bookings, count } = data;

  //4. Prefetching the pages.
  const pageCount = count / PAGE_SIZE;
  //for next page
  if (curPage < pageCount) {
    queryClient.prefetchQuery({
      queryKey: ["bookings", filter, sortBy, curPage + 1],
      queryFn: () => getBookings({ filter, sortBy, curPage: curPage + 1 }),
    });
  }
  //for prev page
  if (curPage > 1) {
    queryClient.prefetchQuery({
      queryKey: ["bookings", filter, sortBy, curPage - 1],
      queryFn: () => getBookings({ filter, sortBy, curPage: curPage - 1 }),
      retry: false,
    });
  }
  return { bookings, isLoading, error, count };
}
