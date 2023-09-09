import { useSearchParams } from "react-router-dom";
import Select from "./Select";
function SortBy({ options, type }) {
  // getting default value.
  const [searchParams] = useSearchParams();
  const sortBy = searchParams.get("sortBy") || "";
  return <Select options={options} type={type} value={sortBy} />;
}

export default SortBy;
