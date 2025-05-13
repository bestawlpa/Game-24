import { Link } from "react-router";
import { useGetJwtUser } from "../utils/getJwtUser";

export function HomePage() {
  useGetJwtUser("/game", "authenticated");

  const test = 12;

  console.log(test);

  return (
    <div className="w-screen h-screen flex justify-center items-center bg-[#F2D2F4]">
      <div className=" w-[400px] h-[250px] flex flex-col justify-between ">
        <div className=" flex w-full h-[160px] items-center justify-around ">
          <img
            src="./home/game-space-svgrepo-com.svg"
            alt=""
            className=" w-44 h-44 "
          />
          <div className=" flex flex-col w-[220px] h-[180px] px-2.5 justify-center items-center">
            <div className=" w-full h-[90px] flex items-end">
              <h1 className=" pl-3 text-6xl font-bold mb-2.5 text-black">
                2<span className=" text-red-600">4</span>
              </h1>
            </div>
            <div className=" w-full h-[90px] border-t-4 flex justify-end">
              <h1 className=" pr-2.5 text-5xl mt-2.5 text-red-600 font-bold">
                G<span className=" text-black">a</span>m
                <span className=" text-black">e</span>
              </h1>
            </div>
          </div>
        </div>

        <div className=" mt-4 w-full h-[90px] flex items-center justify-center ">
          <Link to={"/login"} className=" mr-1">
            <div className=" px-8 py-2 flex justify-center font-extrabold items-center rounded-4xl bg-[#393E46]">
              Login
            </div>
          </Link>
          <Link to={"/register"} className=" ml-1">
            <div className=" px-8 py-2 flex justify-center font-extrabold items-center rounded-4xl text-[#393E46] bg-[#F5F5F5]">
              Register
            </div>
          </Link>
        </div>

        <div className=" mt-8 w-full h-[90px] flex items-center justify-center ">
          <Link to={"/game"}>
            <div>
              <img
                src="/home/play-svgrepo-com (1).svg"
                alt=""
                className=" w-10 h-10"
              />
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}
