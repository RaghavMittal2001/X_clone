import React from "react";
import { AiOutlineLike, AiOutlineRetweet } from "react-icons/ai";
import { BsDot, BsShare, BsThreeDots } from "react-icons/bs";
import { FaRegComment } from "react-icons/fa";
import { IoStatsChartSharp } from "react-icons/io5";

const Main_Timeline = () => {
    return (
        <>
            <main className="ml-[275px] p-2 mx-2 flex w-[600px] h-full min-h-screen flex-col border-l-[0.5px] border-r-[0.5px] border-gray-600">
                <h1 className="text-xl font-bold p-2 backdrop-blur bg-black/10 sticky top-0">
                    Home
                </h1>
                <div className=" border-t-[0.5px]  border-b-[0.5px] flex items-stretch py-4 space-x-2 border-gray-600 relative">
                    <div className="w-14 h-14 bg-slate-400 rounded-full flex-none "></div>
                    <form className="flex flex-col w-full text-3xl-">
                        <input
                            type="text"
                            title="tweet"
                            className="w-full h-full bg-transparent outline-none border-none border-b-[0.5px] border-gray-600 p-2 text-2xl"
                            placeholder="what's happening ?"
                        />
                        <div className="flex justify-between items-center w-full ">
                            <div></div>
                            <div className="w-full max-w-[100px] ">
                                <button
                                    type="button"
                                    className="bg-primary rounded-full font-bold  px-4 py-2 w-full  text-lg text-center hover:bg-primary-hover transition duration-200"
                                >
                                    POST
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
                <div className="flex flex-col">
                    {Array.from({ length: 10 }, (_, i) => (
                        <div
                            key={i}
                            className="flex items-stretch space-x-2 border-b-[0.5px]  border-gray-600 p-2"
                        >
                            <div>
                                <div className="w-14 h-14 bg-slate-200 rounded-full flex-none "></div>
                            </div>
                            <div className="flex flex-col w-full">
                                <div className="flex flex-row w-full">
                                    <div className="text-xl font-bold mx-2">UserName</div>
                                    <div className="text-gray-500 "> @user</div>
                                    <div className="text-gray-500">
                                        <BsDot />
                                    </div>
                                    <div className="text-gray-500">1 hour ago</div>
                                    <div className="text-gray-500 ml-auto mr-3  text-2xl">
                                        <BsThreeDots />
                                    </div>
                                </div>
                                <div className="flex flex-col w-full">
                                    <div className="text-sm mx-2">
                                        Lorem ipsum dolor sit amet consectetur adipisicing elit.
                                        Quisquam, voluptatibus Lorem ipsum dolor sit amet,
                                        consectetur adipisicing elit. Ratione magnam repellat
                                        temporibus provident ab? Explicabo voluptatum dignissimos
                                        eum quae veniam, natus eaque autem harum ad debitis ea,
                                        voluptatibus fugiat laudantium.
                                    </div>
                                    <div className="text-gray-500 aspect-auto bg-slate-400  w-full h-80 rounded-xl mt-2"></div>
                                    <div className="flex items-center justify-start space-x-20 mt-2 p-1 w-full">
                                        <button
                                            title="Comment"
                                            type="button"
                                            className="text-gray-500 flex  cursor-pointer rounded-full hover:text-primary transition duration-200"
                                        >
                                            <FaRegComment />
                                        </button>
                                        <button
                                            title="Repost"
                                            type="button"
                                            className="text-gray-500 flex cursor-pointer rounded-full hover:text-primary transition duration-200"
                                        >
                                            <AiOutlineRetweet />
                                        </button>
                                        <button
                                            title="Like"
                                            type="button"
                                            className="text-gray-500 cursor-pointer rounded-full hover:text-primary transition duration-200"
                                        >
                                            <AiOutlineLike />
                                        </button>
                                        <button
                                            title="Views"
                                            type="button"
                                            className="text-gray-500 cursor-pointer rounded-full hover:text-primary transition duration-200"
                                        >
                                            <IoStatsChartSharp />
                                        </button>
                                        <button
                                            title="Share"
                                            type="button"
                                            className="text-gray-500 cursor-pointer rounded-full hover:text-primary transition duration-200"
                                        >
                                            <BsShare />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </main>
        </>
    );
};

export default Main_Timeline;
