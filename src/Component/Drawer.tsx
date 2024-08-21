import {
  Avatar,
  Box,
  Button,
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  HStack,
  SimpleGrid,
  useDisclosure,
} from "@chakra-ui/react";
import { BsPlayCircleFill } from "react-icons/bs";
import { FaHeart, FaPlay } from "react-icons/fa6";
import { IoLibrary } from "react-icons/io5";
import { RootState } from "../ReduxSystem/Store/Store";
import { useHomeDataQuery } from "../ReduxSystem/RTkQuery/HomeApi";
import { useDispatch, useSelector } from "react-redux";
import IMageQuran from "../../public/icons8-quran-64.png";
import { useEffect, useState } from "react";
import { shiftLAstPlayed, UnshiftLastPlayed } from "../ReduxSystem/userSlice";
import { reciters } from "../types/data";
import { clickedSuwra } from "../ReduxSystem/recitersData";

const DrawerComponent = ({
  onopen,
  setopen,
}: {
  onopen: boolean;
  setopen: any;
}) => {
  const { language } = useSelector((state: RootState) => state.Settings);
  const { } = useHomeDataQuery(language === "ar" ? "ar" : "eng");
  const { onClose } = useDisclosure();
  const { userobjecttype, UserObject } = useSelector(
    (state: RootState) => state.userslogindata
  );
  const dispatch = useDispatch()
  const [_played, setplayed] = useState(false);

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
  return (
    <div>
      {!userobjecttype ? (
        <div className="mobile:block tablet:hidden ">
          <Drawer
            size={"sm"}
            placement={"left"}
            onClose={onClose}
            isOpen={onopen}
          >
            <DrawerOverlay />
            <DrawerContent>
              <DrawerHeader borderBottomWidth="1px">
                <span className="flex items-center gap-1">
                  <img src={`${IMageQuran}`} alt="" width={40} />
                  <h1 className="text-white text-2xl">quranic</h1>
                </span>
              </DrawerHeader>
              <div className="flex  gap-4 p-4 ">
                <IoLibrary
                  className="text-3xl cursor-pointer text-gray-500 hover:text-white duration-200 "
                  onClick={() => setopen()}
                />
                <h1 className="text-xl font-bold text-gray-500 hover:text-white duration-200   cursor-pointer ">
                  {language === "ar" ? "المكتبه" : " Your Library"}
                </h1>
              </div>
              <SimpleGrid columns={1} mt={10}>
                <Box
                  bg={"#1F1F1F"}
                  p={7}
                  className="flex flex-col items-center gap-3"
                >
                  <h1 className="text-white  text-xl font-extrabold ">
                    Make Sure To Log In
                  </h1>
                  <Button
                    // onClick={() => ("/loginpage")}
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
            </DrawerContent>
          </Drawer>
        </div>
      ) : (
        <div className="mobile:block tablet:hidden ">
          <Drawer
            size={"sm"}
            placement={"left"}
            onClose={onClose}
            isOpen={onopen}
          >
            <DrawerOverlay />
            <DrawerContent  >
              <DrawerHeader borderBottomWidth="1px">
                <span className="flex items-center gap-1">
                  <img src={`${IMageQuran}`} alt="" width={40} />
                  <h1 className="text-white text-2xl">quranic</h1>
                </span>
              </DrawerHeader>
              <div className="flex  gap-4  p-4">
                <IoLibrary
                  className="text-3xl cursor-pointer text-gray-500 hover:text-white duration-200 "
                  onClick={() => setopen()}
                />
                <h1 className="text-xl font-bold text-gray-500 hover:text-white duration-200   cursor-pointer ">
                  {language === "ar" ? "المكتبه" : " Your Library"}
                </h1>
              </div>
              <SimpleGrid
                className=""
                p={6}
                columns={2}
              >
                <Box className="group hover:bg-[#58545485] p-6 cursor-pointer ">
                  <div className="favlist h-36 flex justify-center items-center cursor-pointer relative ">
                    <FaHeart className="text-white text-5xl " />
                    <BsPlayCircleFill className="rounded-full scale-0 group-hover:scale-110 text-[#1DB954] duration-500  absolute bottom-0  left-3   bg-[#000000] text-5xl " />
                  </div>
                  <div className="flex items-center justify-center mt-3">
                    <h1 className="text-white ">
                      {language === "ar" ? "القراء المفضلين" : "Liked reciters"}
                    </h1>
                  </div>
                </Box>
              </SimpleGrid>
              <div className=" overflow-y-scroll">
                <Box
                  bg="#1F1F1F"
                  p={7}
                  className="flex flex-col items-start gap-3"
                >
                  <h1 className="text-white  text-xl font-extrabold ">
                    {language === "ar" ? " اصنع قائمة التشغيل الخاصه بك  " : "Create you own Playlist"}

                  </h1>
                  <p className="text-white  text-sm font-extrabold ">
                    {language === "ar" ? "هذه سهل سوف نساعدك" : "it,s easy we will help you"}

                  </p>
                  <Button
                    // onClick={() => ("/loginpage")}
                    bg={"white"}
                    color={"black"}
                    className="font-extrabold hover:scale-105   "
                    padding={6}
                    width="200px"
                    borderRadius={20}
                  >
                    {language === "ar" ? "اصنع قائمة التشغيل" : "Create Playlist"}
                  </Button>
                </Box>
                <div className="flex flex-col p-5 ">
                  <h1 className="text-white"> Recently PLayed</h1>
                  <div  >
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
                                index: index = 0,
                                boolean: true,
                              })
                            );
                            setplayed(true);
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
                                    name={`${currentplaylist.writer ? currentplaylist.writer : currentplaylist.name}`}
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
                              className={`text-center font-extrabold ${language === "ar"
                                ? "mobile:text-[1.3em] tablet:text-[1.5] laptop:text-2xl"
                                : "mobile:text-[0.7em] tablet:text-sm laptop:text-xl"
                                } `}
                            >
                              {currentplaylist.name}
                            </Box>
                            {currentplaylist.writer && <Box
                              w="1180px"
                              className="text-center font-extrabold mobile:text-[0.8em]"
                            >
                              {currentplaylist.writer}
                            </Box>}
                          </HStack>
                        </Box>
                      )
                    )}
                  </div>
                </div>
              </div>
            </DrawerContent>
          </Drawer>
        </div>
      )}
    </div>
  );
};

export default DrawerComponent;
