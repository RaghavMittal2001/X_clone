import React from "react";
import { BsSearch } from "react-icons/bs";

const Right_Sidebar = () => {
    return (
        <>
            <section className="w-full fixed overflow-y-scroll scrollbar-hide ml-[900px] flex flex-col space-y-4 p-1 h-full bg-background-secondary ">
                <div>
                    <div className="relative w-full h-[40px] ">

                        <input
                            type="text"
                            placeholder="Search Twitter "
                            className=" w-[350px] pl-12  h-full rounded-full p-4 text-start outline-none border border-gray-400 peer focus:border-primary focus:border "
                        />
                        <div className="absolute top-0 h-full flex items-center mx-4 peer-focus:text-primary-hover">
                            <BsSearch className="w-5 h-5" />
                        </div>
                    </div>
                </div>
                <div className="border w-[360px] border-gray-600 rounded-4xl p-4 ">
                    <div className="text-2xl font-bold ">Treading Topics</div>
                    <div className="w-[350px] ">
                    {Array.from({ length: 5 }, (_, i) => (
                        <div
                        key={i}
                        className="flex flex-col w-full  border-gray-600 p-2"
                        >
                            <div className="text-sm text-gray-500">
                                Area of discussion  .  Trending
                            </div>
                            <div className="text-sm font-bold">#Topic {i + 1}</div>
                            <div className="text-sm text-gray-500">50.6 posts</div>
                        </div>
                    ))}
                    </div>
                </div>
                <div className="border w-[360px] border-gray-600 rounded-4xl p-4 ">
                    <div className="text-2xl font-bold">Who to follow</div>
                    <div className="w-[350px] ">
                    {Array.from({ length: 5 }, (_, i) => (
                        <div
                        key={i}
                        className="flex flex-row w-full  p-2"
                        >
                            <div className="w-12 h-12 bg-neutral-600 rounded-full "></div>
                            <div className="flex flex-col space-y-1 mx-2">
                                <div className="text-sm font-bold">User Name {i + 1}</div>
                                <div className="text-sm text-gray-500">@user_name</div>
                            </div>
                            <div className="ml-auto flex items-center">
                                <button type='button' title="follow" className="rounded-full px-6 py-2 mx-4 bg-white text-neutral-950 hover:bg-primary-hover cursor-pointer transition duration-200">
                                    Follow
                                </button>
                            </div>
                        </div>
                    ))}
                    </div>
                </div>
                <footer className="text-xs w-full px-4">
                    <div className="w-1/6 flex flex-wrap ">

                        <div className="w-1/3 hover:text-primary-hover"  >Terms of service  |</div>
                        <div className="w-1/3 hover:text-primary-hover">Privacy Policy  | </div>
                        <div className="w-1/3 hover:text-primary-hover">Cookie Policy  </div>

                        <div className="w-1/3 hover:text-primary-hover">Accessibility | </div>
                        <div className="w-1/3 hover:text-primary-hover">Ads info  | </div>
                        <div className="w-1/3 ">More... @2025X Corps</div>
                    </div>
                </footer>
            </section>
        </>
    );
};

export default Right_Sidebar;
