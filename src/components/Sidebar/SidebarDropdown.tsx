import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const SidebarDropdown = ({ item }: any) => {
  const pathname = usePathname();

  return (
    <>
      <ul className="mb-5.5 mt-4 flex flex-col gap-2.5 pl-6">
        {item.map((item: any, index: number) => (
          <li key={index} className="">
            <Link
              href={item.route}
              className={`group relative flex items-center gap-2.5 px-4 font-medium text-white duration-300 ease-in-out hover:text-white hover:bg-graydark p-2 ${
                pathname === item.route ? "text-white" : ""
              }`}
            >
              {item.icon}
              {item.label}
            </Link>
          </li>
        ))}
      </ul>
    </>
  );
};

export default SidebarDropdown;
