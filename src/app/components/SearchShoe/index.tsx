"use client";

import React, { useState } from "react";
import { getListProductByKeyWord } from "@/app/service/shoeApi";
import { IShoeType } from "@/app/types/shoe";
import { useRouter } from "next/navigation";
import _ from "lodash";

const SearchShoe = ({
  initDataListShoe,
}: {
  initDataListShoe: IShoeType[];
}) => {
  const [listShoe, setListShoe] = useState<IShoeType[]>(initDataListShoe);
  // const searchParams = useSearchParams(); //đọc dữ liệu từ url
  const router = useRouter(); //thay đổi dữ liệu trên url

  const handleRenderListShoe = _.debounce(async (keyWord: string) => {
    try {
      const dataListShoe = await getListProductByKeyWord(keyWord);
      setListShoe(dataListShoe);
      router.push(`?tenGiay=${keyWord}`);
    } catch (error) {
      console.log("error: ", error);
    }
  }, 500);

  const handleOnchangeSearch = async (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value = e.target.value;

    handleRenderListShoe(value);
  };

  return (
    <div>
      <div className="mb-6">
        <label
          htmlFor="large-input"
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >
          Nhập tên sản phẩm
        </label>
        <input
          onChange={handleOnchangeSearch}
          type="text"
          id="large-input"
          className="block w-full p-4 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-base focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        />
      </div>

      <div className="grid grid-cols-4 gap-4">
        {listShoe?.map((shoe) => (
          <div key={shoe.id}>
            <div className="max-w-sm bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700">
              <a href="#">
                <img className="rounded-t-lg" src={shoe.image} alt="" />
              </a>
              <div className="p-5">
                <a href="#">
                  <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                    {shoe.name}
                  </h5>
                </a>
                <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                  {shoe.price}
                </p>
                <a
                  href="#"
                  className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                  Read more
                  <svg
                    className="rtl:rotate-180 w-3.5 h-3.5 ms-2"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 14 10"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M1 5h12m0 0L9 1m4 4L9 9"
                    />
                  </svg>
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SearchShoe;
