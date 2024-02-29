"use client";

import { columns } from "./columns";
import { DataTable } from "./data-table";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import { getPostByUserIdAction } from "@/actions/getPostByUserId";
import { useEffect, useState } from "react";
import { GetPostByUserId } from "@/interfaces/post";
import { CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
dayjs.extend(utc);

const userId = "clsw831ey00007zx6054vdb2y";

// async function getData(): Promise<Post[]> {
//   // Fetch data from your API here.
//   return [
//     {
//       id: 1,
//       title:
//         "ไต้หวันยืนยัน ไม่ได้ส่งทหารไปเกาะแนวหน้าเพิ่ม หลังกระทบกระทั่งกับจีน",
//       published: false,
//       createdAt: dayjs().toISOString(),
//       updatedAt: dayjs().toISOString(),
//     },
//     {
//       id: 2,
//       title:
//         "ไต้หวันนอนยัน ไม่ได้ส่งทหารไปเกาะแนวหน้าเพิ่ม หลังกระทบกระทั่งกับจีน",
//       published: false,
//       createdAt: "2024-02-21T02:00:00.000Z",
//       updatedAt: dayjs().toISOString(),
//     },
//     {
//       id: 3,
//       title:
//         "ไต้หวันยืนยัน ไม่ได้ส่งทหารไปเกาะแนวหน้าเพิ่ม หลังกระทบกระทั่งกับจีน",
//       published: false,
//       createdAt: dayjs().toISOString(),
//       updatedAt: dayjs().toISOString(),
//     },
//     {
//       id: 4,
//       title:
//         "ไต้หวันยืนยัน ไม่ได้ส่งทหารไปเกาะแนวหน้าเพิ่ม หลังกระทบกระทั่งกับจีน",
//       published: false,
//       createdAt: dayjs().toISOString(),
//       updatedAt: dayjs().toISOString(),
//     },
//     {
//       id: 5,
//       title:
//         "ไต้หวันยืนยัน ไม่ได้ส่งทหารไปเกาะแนวหน้าเพิ่ม หลังกระทบกระทั่งกับจีน",
//       published: false,
//       createdAt: dayjs().toISOString(),
//       updatedAt: dayjs().toISOString(),
//     },
//     {
//       id: 6,
//       title:
//         "ไต้หวันยืนยัน ไม่ได้ส่งทหารไปเกาะแนวหน้าเพิ่ม หลังกระทบกระทั่งกับจีน",
//       published: false,
//       createdAt: dayjs().toISOString(),
//       updatedAt: dayjs().toISOString(),
//     },
//     {
//       id: 7,
//       title:
//         "ไต้หวันยืนยัน ไม่ได้ส่งทหารไปเกาะแนวหน้าเพิ่ม หลังกระทบกระทั่งกับจีน",
//       published: false,
//       createdAt: dayjs().toISOString(),
//       updatedAt: dayjs().toISOString(),
//     },
//     {
//       id: 8,
//       title:
//         "ไต้หวันยืนยัน ไม่ได้ส่งทหารไปเกาะแนวหน้าเพิ่ม หลังกระทบกระทั่งกับจีน",
//       published: false,
//       createdAt: dayjs().toISOString(),
//       updatedAt: dayjs().toISOString(),
//     },
//     {
//       id: 9,
//       title:
//         "ไต้หวันยืนยัน ไม่ได้ส่งทหารไปเกาะแนวหน้าเพิ่ม หลังกระทบกระทั่งกับจีน",
//       published: false,
//       createdAt: dayjs().toISOString(),
//       updatedAt: dayjs().toISOString(),
//     },
//     {
//       id: 10,
//       title:
//         "ไต้หวันยืนยัน ไม่ได้ส่งทหารไปเกาะแนวหน้าเพิ่ม หลังกระทบกระทั่งกับจีน",
//       published: false,
//       createdAt: dayjs().toISOString(),
//       updatedAt: dayjs().toISOString(),
//     },
//     {
//       id: 11,
//       title:
//         "ไต้หวันยืนยัน ไม่ได้ส่งทหารไปเกาะแนวหน้าเพิ่ม หลังกระทบกระทั่งกับจีน",
//       published: false,
//       createdAt: dayjs().toISOString(),
//       updatedAt: dayjs().toISOString(),
//     },
//   ];
// }

const PostsPage = () => {
  const [postData, setPostData] = useState<GetPostByUserId[]>([]);
  // console.log(data);

  useEffect(() => {
    const getData = async (userId: string) => {
      const data = await getPostByUserIdAction(userId);
      setPostData(data);
    };

    getData(userId);
  }, []);

  return (
    <div className="container flex justify-center mx-auto">
      {postData.length > 0 ? (
        <div className="w-[800px] py-10 space-y-6">
          <CardHeader>
            <h1 className="text-3xl font-semibold text-center">All My Posts</h1>
          </CardHeader>
          <DataTable columns={columns} data={postData} />
        </div>
      ) : (
        <div
          className={`h-screen w-[800px] flex flex-col justify-center space-y-2`}
        >
          <Skeleton className="h-4 w-[100%]" />
          <Skeleton className="h-4 w-[100%]" />
          <Skeleton className="h-4 w-80" />
        </div>
      )}
    </div>
  );
};

export default PostsPage;
