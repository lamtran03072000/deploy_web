import React from "react";

import { getShoeDetaiLById } from "@/app/service/shoeApi";
import { IShoeType } from "@/app/types/shoe";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ stt: string }>;
}) {
  const { stt } = await params;

  const shoeDetail: IShoeType = await getShoeDetaiLById(Number(stt));

  // thực hiện logic

  return {
    title: "Đây là " + shoeDetail.name,
    description:
      "Explore our wide range of shoes with the best prices and quality.",
  };
}

const DetailShoePage = async ({
  params,
}: {
  params: Promise<{ stt: string }>;
}) => {
  const { stt } = await params;
  console.log("id sản phẩm ", stt);

  const shoeDetail: IShoeType = await getShoeDetaiLById(Number(stt));

  return (
    <div key={shoeDetail?.id}>
      <div className="max-w-sm bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700">
        <a href="#">
          <img className="rounded-t-lg" src={shoeDetail?.image} alt="" />
        </a>
        <div className="p-5">
          <a href="#">
            <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
              {shoeDetail?.name}
            </h5>
          </a>
          <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
            {shoeDetail?.price}
          </p>
        </div>
      </div>
    </div>
  );
};

export default DetailShoePage;
