"use client";

import { ColumnDef } from "@tanstack/react-table";
import dayjs from "dayjs";
import { FaCheckCircle, FaTimesCircle } from "react-icons/fa";
// import { ArrowUpDown, MoreHorizontal } from "lucide-react";
import { LuArrowUpDown } from "react-icons/lu";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { GetPostByUserId } from "@/interfaces/post";

export const columns: ColumnDef<GetPostByUserId>[] = [
  {
    accessorKey: "id",
    header: "Id",
  },
  {
    accessorKey: "title",
    header: "Title",
    cell: ({ row }) => {
      return (
        <Link href={"/member/editor/" + row.getValue("id")}>
          {row.getValue("title")}
        </Link>
      );
    },
  },
  {
    accessorKey: "published",
    header: () => <div className="text-center">Published</div>,
    cell: ({ row }) => {
      const publishIcon = row.getValue("published") ? (
        <FaCheckCircle size={18} className="text-green-400" />
      ) : (
        <FaTimesCircle size={18} className="text-red-500" />
      );

      return (
        <div className="flex justify-center items-center">{publishIcon}</div>
      );
    },
  },
  {
    accessorKey: "createdAt",
    // header: "Created Date",
    header: ({ column }) => {
      return (
        <div className="flex justify-center">
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Created Date
            <LuArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        </div>
      );
    },
    cell: ({ row }) => {
      const textTime: string = dayjs(row.getValue("createdAt")).format(
        "MM-DD-YYYY hh:mm A"
      );

      return <p className="text-xs text-center">{textTime}</p>;
    },
  },
  {
    accessorKey: "updatedAt",
    // header: "Updated Date",
    header: ({ column }) => {
      return (
        <div className="flex justify-center">
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Updated Date
            <LuArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        </div>
      );
    },
    cell: ({ row }) => {
      const textTime: string = dayjs(row.getValue("updatedAt")).format(
        "MM-DD-YYYY hh:mm A"
      );

      return <p className="text-xs text-center">{textTime}</p>;
    },
  },
];
