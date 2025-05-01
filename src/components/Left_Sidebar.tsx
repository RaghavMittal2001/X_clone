import Link from "next/link";
import React from "react";
import { BiHomeCircle, BiUser } from "react-icons/bi";
import { BsBell, BsBookmark, BsEnvelope, BsThreeDots, BsTwitter } from "react-icons/bs";
import { HiOutlineHashtag } from "react-icons/hi";
const Navihation_items = [
  {
    title: "Twitter",
    icon: BsTwitter,
  },
  {
    title: "Home",
    icon: BiHomeCircle,
  },
  {
    title: "Explore",
    icon: HiOutlineHashtag,
  },
  {
    title: "Notifications",
    icon: BsBell,
  },
  {
    title: "Messages",
    icon: BsEnvelope,
  },
  {
    title: "Bookmarks",
    icon: BsBookmark,
  },
  {
    title: "profile",
    icon: BiUser,
  },
];
const Left_Sidebar = () => {
  return (
   <>
  <section className="fixed top-0  w-[275px] h-screen flex flex-col justify-between px-8 py-4">
          <div className="flex flex-col items-stretch space-y-4 mt-4 h-screen">
            {Navihation_items.map((item) => (
              <Link
                key={item.title}
                href={`/${item.title.toLowerCase()}`}
                className="space-x-2 hover:bg-white/10 transition duration-200 rounded-3xl text-2xl py-2 px-6 flex items-center justify-start w-fit "
              >
                <div>
                  <item.icon />
                </div>
                <div>{item.title === "Twitter" ? "" : item.title}</div>
              </Link>
            ))}
            <button
              type="button"
              className="bg-primary rounded-full m-4  p-4  text-2xl text-center hover:bg-primary-hover transition duration-200"
            >
              Tweet
            </button>
          </div>
          <button
            type="button"
            className="absolute bottom-0 left-0 w-full flex items-center justify-between px-4 py-4  rounded-3xl hover:bg-white/20 transition duration-200"
          >
            <div className="flex items-center space-x-2">
              <div className="w-10 h-10 rounded-full bg-gray-300"></div>
              <div className="flex flex-col items-start">
                <div className="text-lg font-semibold">User Name</div>
                <div className="text-sm text-gray-500">@username</div>
              </div>
            </div>

            <div className="flex items-center justify-center w-10 h-10 rounded-full bg-gray-500 hover:bg-gray-700 transition duration-200">
              <BsThreeDots />
            </div>
          </button>
        </section>
        </>
  )
}

export default Left_Sidebar
