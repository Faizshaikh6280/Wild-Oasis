import Filter from "../../ui/Filter";
function CabinTableOperations() {
  return (
    <div>
      <Filter
        filterField={"discount"}
        options={[
          { value: "all", label: "All" },
          { value: "no-discount", label: "No discount" },
          { value: "with-discount", label: "With discount" },
        ]}
      />
    </div>
  );
}

export default CabinTableOperations;
