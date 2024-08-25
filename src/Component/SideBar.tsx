import {
  Avatar,
  Box,
  Button,
  Card,
  HStack,
  SimpleGrid,
} from "@chakra-ui/react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../ReduxSystem/Store/Store";
import { useHomeDataQuery } from "../ReduxSystem/RTkQuery/HomeApi";
import { FaHeart, FaPlay } from "react-icons/fa6";
// import { BsPlayCircleFill } from "react-icons/bs";
import "../index.css";
import { LuLibrary } from "react-icons/lu";
import IMageQuran from "../../public/icons8-quran-64.png";
import Material from "./MaterialTailwind/Material";
import { useEffect, useState } from "react";
import { reciters } from "../types/data";
import { shiftLAstPlayed, UnshiftLastPlayed } from "../ReduxSystem/userSlice";
import { clickedSuwra } from "../ReduxSystem/recitersData";
import { useNavigate } from "react-router-dom";
import {
  Changestate,
  choosenRadioAudio,
  setChangestate,
} from "../ReduxSystem/RadioSlice";
import ModelComponent from "./ModelComponent";
// import { shiftLAstPlayed } from "../ReduxSystem/userSlice";
const SideBar = ({ isLoading }: { isLoading: boolean }) => {
  const { language } = useSelector((state: RootState) => state.Settings);
  const { userobjecttype, UserObject } = useSelector(
    (state: RootState) => state.userslogindata
  );
  const dispatch = useDispatch();
  const [_played, setplayed] = useState(false);
  const {} = useHomeDataQuery(language === "ar" ? "ar" : "eng");
  useEffect(() => {
    if (userobjecttype && userobjecttype.LastPlayed.length > 5) {
      dispatch(
        shiftLAstPlayed({
          userobjecttype: userobjecttype,
          lenght: userobjecttype.LastPlayed.length,
        })
      );
    } else {
      dispatch(UnshiftLastPlayed(userobjecttype));
    }
  }, [userobjecttype]);
  const navigition = useNavigate();
  return (
    <div className="">
      {isLoading ? (
        <Card className=" h-screen !bg-black !mobile:hidden !tablet:block w-[30rem]  !rounded-none  p-4">
          <div className="flex  gap-4 ">
            <h1 className="text-xl font-bold text-gray-500 hover:text-white duration-200   cursor-pointer ">
              {language === "ar" ? "المكتبه" : " Your Library"}
            </h1>
          </div>
          <SimpleGrid p={6} columns={2} gap={2}>
            <div className="flex animate-pulse flex-wrap items-center gap-8">
              <Box className=" flex flex-col justify-center items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={2}
                  stroke="currentColor"
                  className="h-12 w-12 text-gray-500"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 0 0 1.5-1.5V6a1.5 1.5 0 0 0-1.5-1.5H3.75A1.5 1.5 0 0 0 2.25 6v12a1.5 1.5 0 0 0 1.5 1.5Zm10.5-11.25h.008v.008h-.008V8.25Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"
                  />
                </svg>
                <div className="flex items-center justify-center mt-3">
                  <h1 className="text-white ">
                    {" "}
                    {language === "ar" ? "القراء المفضلين" : "Liked reciters"}
                  </h1>
                </div>
              </Box>
            </div>
          </SimpleGrid>
          <SimpleGrid className="animate-pulse" p={6} columns={2} spacing={24}>
            <Box className="flex justify-center" rounded={50}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
                className="h-12 w-12 text-gray-500"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 0 0 1.5-1.5V6a1.5 1.5 0 0 0-1.5-1.5H3.75A1.5 1.5 0 0 0 2.25 6v12a1.5 1.5 0 0 0 1.5 1.5Zm10.5-11.25h.008v.008h-.008V8.25Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"
                />
              </svg>
            </Box>
            <Box className="flex justify-center" rounded={50}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
                className="h-12 w-12 text-gray-500"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 0 0 1.5-1.5V6a1.5 1.5 0 0 0-1.5-1.5H3.75A1.5 1.5 0 0 0 2.25 6v12a1.5 1.5 0 0 0 1.5 1.5Zm10.5-11.25h.008v.008h-.008V8.25Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"
                />
              </svg>
            </Box>
            <Box className="flex justify-center" rounded={50}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
                className="h-12 w-12 text-gray-500"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 0 0 1.5-1.5V6a1.5 1.5 0 0 0-1.5-1.5H3.75A1.5 1.5 0 0 0 2.25 6v12a1.5 1.5 0 0 0 1.5 1.5Zm10.5-11.25h.008v.008h-.008V8.25Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"
                />
              </svg>
            </Box>
            <Box className="flex justify-center" rounded={50}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
                className="h-12 w-12 text-gray-500"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 0 0 1.5-1.5V6a1.5 1.5 0 0 0-1.5-1.5H3.75A1.5 1.5 0 0 0 2.25 6v12a1.5 1.5 0 0 0 1.5 1.5Zm10.5-11.25h.008v.008h-.008V8.25Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"
                />
              </svg>
            </Box>
          </SimpleGrid>
        </Card>
      ) : (
        <div>
          {!userobjecttype ? (
            <div className="">
              <Card className=" !bg-black  h-[200vh]  mobile:hidden tablet:block w-[30rem]   !rounded-none  p-4">
                <span className="flex items-center gap-1 p-5">
                  <img src={`${IMageQuran}`} alt="" width={40} />
                  <h1 className="text-white text-2xl">quranic</h1>
                </span>
                <div className="flex  gap-4 mt-10 ">
                  <h1 className="text-xl font-bold text-gray-500 hover:text-white duration-200   cursor-pointer ">
                    <span className="flex gap-3">
                      <LuLibrary className=" text-2xl" />
                      {language === "ar" ? "المكتبه" : " Your Library"}
                    </span>
                  </h1>
                </div>
                <SimpleGrid columns={1} spacing={10} className="mt-10">
                  <Box
                    bg="#1F1F1F"
                    p={7}
                    className="flex flex-col items-start gap-3"
                  >
                    <h1 className="text-white  text-xl font-extrabold ">
                      Make Sure To Log In
                    </h1>
                    <Button
                      onClick={() => navigition("/loginpage")}
                      bg={"white"}
                      color={"black"}
                      className="font-extrabold hover:scale-105   "
                      padding={6}
                      width="200px"
                      borderRadius={20}
                    >
                      {language === "ar" ? "تسجيل دخول" : "Log in"}
                    </Button>
                  </Box>
                </SimpleGrid>
              </Card>
            </div>
          ) : (
            <Card className=" !bg-black mobile:hidden tablet:block w-[30rem]    !rounded-none  p-4">
              <div>
                <span className="flex items-center justify-between gap-1">
                  <div className="flex">
                    <img src={`${IMageQuran}`} alt="" width={40} />
                    <h1 className="text-white text-2xl">quranic</h1>
                  </div>
                  <div className="">
                    <Material />
                  </div>
                </span>
                <div className="flex  mt-10 gap-4 ">
                  <h1 className="text-xl font-bold text-gray-500 hover:text-white duration-200   cursor-pointer ">
                    <span className="flex gap-3">
                      <LuLibrary className=" text-2xl" />
                      {language === "ar" ? "المكتبه" : " Your Library"}
                    </span>
                  </h1>
                </div>
                <div className="flex flex-col justify-between h-[70vh]">
                  <div>
                    <SimpleGrid p={6} columns={2} gap={2}>
                      <Box
                        onClick={() => navigition("/favlistpage")}
                        className="group hover:bg-[#58545485] p-6 cursor-pointer "
                      >
                        <div className="favlist h-36 flex justify-center items-center cursor-pointer relative ">
                          <FaHeart className="text-white text-5xl " />
                        </div>
                        <div className="flex items-center justify-center mt-3   ">
                          <h1 className="text-white ">
                            {language === "ar"
                              ? "القراء المفضلين"
                              : "Liked reciters"}
                          </h1>
                        </div>
                      </Box>
                    </SimpleGrid>
                    <ModelComponent />
                    <div className="flex flex-col p-3 ">
                      <h1 className="text-white"> Recently PLayed</h1>
                      <div className="">
                        {UserObject?.map(
                          (
                            {
                              currentplaylist,
                              recitersid,
                            }: {
                              currentplaylist: {
                                id: number;
                                writer: string;
                                name: string;
                                src: string;
                                url: string;
                                urlaudio: string;
                                nameAudio: string;
                                index: number;
                              };
                              recitersid: number;
                            },
                            index
                          ) => (
                            <Box
                              cursor={"pointer"}
                              key={index}
                              bg="transparent"
                              w="100%"
                              p={4}
                              color="white"
                              className="group hover:bg-[#58545485] "
                              onClick={() => {
                                dispatch(
                                  clickedSuwra({
                                    currentplaylist: [{ ...currentplaylist }],
                                    index: (index = 0),
                                    boolean: true,
                                  })
                                );
                                setplayed(true);
                                recitersid
                                  ? dispatch(setChangestate())
                                  : dispatch(Changestate()),
                                  dispatch(choosenRadioAudio(currentplaylist));
                              }}
                            >
                              <HStack spacing="24px">
                                <Box
                                  w="70px"
                                  className="text-center font-extrabold text-xl"
                                >
                                  <div className=" ms-20 flex flex-row-reverse items-center gap-5">
                                    {
                                      <Avatar
                                        src={reciters[recitersid]}
                                        name={`${
                                          currentplaylist.writer
                                            ? currentplaylist.writer
                                            : currentplaylist.name
                                        }`}
                                      />
                                    }
                                    <div className="group flex duration-150 cursor-pointer">
                                      <h1 className="group-hover:hidden text-gray-400">
                                        {index + 1}
                                      </h1>
                                      <FaPlay className=" hidden group-hover:block text-xl text-white " />
                                    </div>
                                  </div>
                                </Box>
                                <Box
                                  w="1170px"
                                  className={`text-center font-extrabold ${
                                    language === "ar"
                                      ? "mobile:text-[1.3em] tablet:text-[1.5] laptop:text-2xl"
                                      : "mobile:text-[0.7em] tablet:text-sm laptop:text-xl"
                                  } `}
                                >
                                  {currentplaylist.name}
                                </Box>
                                {currentplaylist.writer && (
                                  <Box
                                    w="1180px"
                                    className="text-center font-extrabold mobile:text-[0.8em]"
                                  >
                                    {currentplaylist.writer}
                                  </Box>
                                )}
                              </HStack>
                            </Box>
                          )
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          )}
        </div>
      )}
    </div>
  );
};

export default SideBar;
