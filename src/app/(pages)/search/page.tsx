import SearchShoe from "@/app/components/SearchShoe";
import { getListProductByKeyWord } from "@/app/service/shoeApi";

const SearchPage = async ({
  searchParams,
}: {
  searchParams: Promise<{ tenGiay: string }>;
}) => {
  const { tenGiay } = await searchParams;
  console.log("tenGiay: ", tenGiay); // nike

  const listInitShoe = await getListProductByKeyWord(tenGiay);
  console.log("listInitShoe: ", listInitShoe);

  return (
    <div>
      <SearchShoe initDataListShoe={listInitShoe} />
    </div>
  );
};

export default SearchPage;
