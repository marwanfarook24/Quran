import {
  Avatar,
  Box,
  Grid,
  GridItem,
  HStack,
  Image,
  Menu,
  MenuButton,
  MenuGroup,
  MenuItem,
  MenuList,
  SimpleGrid,
  MenuDivider,
} from "@chakra-ui/react";
import { HiChevronDown } from "react-icons/hi2";
import { AiOutlineMenu } from "react-icons/ai";
import "../index.css";
import { AppDispatch, RootState } from "../ReduxSystem/Store/Store";
import { useDispatch, useSelector } from "react-redux";
import { BsPlayCircleFill } from "react-icons/bs";
import { Button } from "@chakra-ui/react";
import { Key, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { reciters } from "../types/data";
import { FaPlay } from "react-icons/fa";
import {
  useChoosenReciteirsQuery,
  useSuwarIdQuery,
} from "../ReduxSystem/RTkQuery/HomeApi";
import { IoMdAdd, IoMdDownload } from "react-icons/io";
import {
  clickedSuwra,
  currentdata,
  Searchsuwra,
} from "../ReduxSystem/recitersData";
import { CiPlay1 } from "react-icons/ci";
import { MdOutlinePauseCircleFilled } from "react-icons/md";
import image from "../../public/Social_Media_Chatting_Online_Blank_Profile_Picture_Head_And_Body_Icon_People_Standing_Icon_Grey_Background_generated.jpg";
import ClipLoader from "react-spinners/ClipLoader";
import { Card, Typography } from "@material-tailwind/react";
import { IoLibrary } from "react-icons/io5";
import SideBar from "../Component/SideBar";
import DrawerComponent from "../Component/Drawer";
import {
  userdataAddInOwnList,
  userdataFavList,
  userdatalastPLayed,
} from "../ReduxSystem/userSlice";
import { BsThreeDots } from "react-icons/bs";
import ListModel from "../Component/ListModel";
const ReciterisDetails = () => {
  const [recitersId, setrecitersId] = useState(0);
  const [Bollean, setBollean] = useState(false);
  const { language } = useSelector((state: RootState) => state.Settings);
  const [rewaya, setRewaya] = useState(0);
  const { currentplaylist, searchSwura } = useSelector(
    (state: RootState) => state.RecitersData
  );
  const { userobjecttype } = useSelector(
    (state: RootState) => state.userslogindata
  );
  const { id } = useParams<{ id?: string }>();
  const { data: choosendata, isLoading } = useChoosenReciteirsQuery({
    id: id,
    language: language === "ar" ? "ar" : "eng",
  });
  const { data: SuwarData } = useSuwarIdQuery(language === "ar" ? "ar" : "eng");
  const dispatch = useDispatch<AppDispatch>();
  const [open, setopen] = useState(false);
  const [loading, setloading] = useState(false);
  const [played, setplayed] = useState(false);
  const [Checked, setChecked] = useState<undefined | boolean>(false);
  useEffect(() => {
    choosendata?.reciters.map(({ id }: { id: number; name: string }) => {
      setrecitersId(id);
    });
    SuwarData &&
      choosendata &&
      dispatch(currentdata({ choosendata, SuwarData, rewaya }));
    setloading(false);
    const Checkreciters = userobjecttype?.favList.some(
      ({ currentreciters }: { currentreciters: { id: string } }) => {
        return currentreciters.id == id;
      }
    );
    setChecked(Checkreciters);
  }, [
    SuwarData,
    choosendata,
    reciters[recitersId],
    rewaya,
    userobjecttype?.LastPlayed.length,
    userobjecttype?.OwnPlaylist.length,
  ]);

  const rewayachoosen = () => {
    setloading(true);
  };

  const SerachSwura = (prop: string) => {
    const swuraSearch = currentplaylist?.filter(({ name }) => {
      const MatchName = name.match(prop);
      if (MatchName) {
        return name;
      }
    });
    dispatch(Searchsuwra(swuraSearch));
  };

  return (
    <div className="bg-black">
      {/* Unloaded */}
      {isLoading && (
        <Grid templateColumns="repeat(5, 1fr)" gap={0}>
          <GridItem bg={"black"} rowSpan={2} colSpan={1}>
            <div className="tablet:block mobile:hidden">
              <Card className=" h-screen !bg-black mobile:hidden tablet:block w-[30rem]  rounded-none  p-4">
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
                          {language === "ar"
                            ? "القراءالمفضلين"
                            : "Liked reciters"}
                        </h1>
                      </div>
                    </Box>
                  </div>
                </SimpleGrid>
                <SimpleGrid
                  className="animate-pulse"
                  p={6}
                  columns={2}
                  spacing={24}
                >
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
            </div>
          </GridItem>
          <GridItem id="backgroundcolor" colSpan={4} bg="papayawhip">
            <div className="flex justify-center animate-pulse flex-wrap items-center p-7 gap-8">
              <div className="grid h-36 w-60 place-items-center rounded-lg bg-gray-300">
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
              </div>
              <div className="w-max">
                <Typography
                  as="div"
                  variant="h1"
                  className="mb-4 h-3 w-56 rounded-full bg-gray-300"
                >
                  &nbsp;
                </Typography>
                <Typography
                  as="div"
                  variant="paragraph"
                  className="mb-2 h-2 w-72 rounded-full bg-gray-300"
                >
                  &nbsp;
                </Typography>
                <Typography
                  as="div"
                  variant="paragraph"
                  className="mb-2 h-2 w-72 rounded-full bg-gray-300"
                >
                  &nbsp;
                </Typography>
                <Typography
                  as="div"
                  variant="paragraph"
                  className="mb-2 h-2 w-72 rounded-full bg-gray-300"
                >
                  &nbsp;
                </Typography>
                <Typography
                  as="div"
                  variant="paragraph"
                  className="mb-2 h-2 w-72 rounded-full bg-gray-300"
                >
                  &nbsp;
                </Typography>
                <Typography
                  as="div"
                  variant="paragraph"
                  className="mb-2 h-2 w-72 rounded-full bg-gray-300"
                >
                  &nbsp;
                </Typography>
                <Typography
                  as="div"
                  variant="paragraph"
                  className="mb-2 h-2 w-72 rounded-full bg-gray-300"
                >
                  &nbsp;
                </Typography>
              </div>
            </div>
          </GridItem>
          <GridItem id="backgroundcolor" className="h-screen" colSpan={4}>
            <div className="flex items-center justify-center h-screen">
              <ClipLoader className="" color="#0cda0c" loading />
            </div>
          </GridItem>
        </Grid>
      )}
      {/* Loaded */}
      {!isLoading && (
        <Grid templateColumns="repeat(5, 1fr)">
          <GridItem bg={"black"} rowSpan={2} colSpan={1}>
            {/* SideNav */}
            <div className=" mobile:hidden tablet:block sticky overflow-y-scroll bg-black top-[5em]">
              <SideBar isLoading={isLoading} />
            </div>
            {/* SideNav */}

            <div className="mobile:block tablet:hidden p-[2em]   ">
              <IoLibrary
                onClick={() => setopen(true)}
                className="text-gray-500   hover:text-white text-3xl sticky top-0 cursor-pointer"
              />
            </div>
            <DrawerComponent onopen={open} setopen={setopen} />
          </GridItem>

          <GridItem id="backgroundcolor" colSpan={4} p={0}>
            <GridItem id="backgroundcolor" p={6} colSpan={4}>
              {choosendata?.reciters.map(
                (
                  { id, name }: { id: number; name: string },
                  index: Key | null | undefined
                ) => (
                  <div
                    key={index}
                    className="flex mobile:flex-wrap mobile:justify-center tablet:flex-nowrap items-center gap-7"
                  >
                    <Image
                      className="mobile:w-[50%]  tablet:w-[20%] "
                      pos={"relative"}
                      src={`${reciters[id] ? reciters[id] : image}`}
                      alt={`${name}`}
                    />
                    <div className="flex flex-col items-center">
                      <h1 className="laptop:text-5xl tablet:text-3xl mobile:text-2xl text-white font-bold text-center ">
                        {name}
                      </h1>
                      <p className="text-white">
                        ( {choosendata?.reciters[0].moshaf[rewaya].name} )
                      </p>
                    </div>
                  </div>
                )
              )}
            </GridItem>
            <div className="flex justify-between flex-wrap ">
              <div className="flex items-center gap-3 p-5 flex-wrap">
                {played ? (
                  <MdOutlinePauseCircleFilled
                    onClick={() => {
                      setplayed(false);
                      dispatch(
                        clickedSuwra({
                          currentplaylist: [
                            {
                              name: "",
                              src: "",
                              id: 0,
                              writer: "",
                            },
                          ],
                          index: 0,
                        })
                      );
                    }}
                    className="rounded-full  text-[#1DB954] bg-[#222222] duration-500  cursor-pointer hover:scale-110 text-5xl "
                  />
                ) : (
                  <BsPlayCircleFill
                    onClick={() => {
                      dispatch(
                        clickedSuwra({
                          currentplaylist,
                          index: 0,
                          boolean: true,
                        })
                      );
                      setplayed(true);
                    }}
                    className="rounded-full  text-[#1DB954] duration-500  cursor-pointer hover:scale-110 text-5xl "
                  />
                )}
                {Checked ? (
                  <Button
                    rounded={20}
                    color={"white"}
                    className="hover:scale-110 hover:bg-transparent hover:text-black"
                    variant="outline"
                    onClick={() => ""}
                  >
                    <h1>{language === "ar" ? "تتابعه" : "Following"}</h1>
                  </Button>
                ) : (
                  <Button
                    rounded={20}
                    color={"white"}
                    className="hover:scale-110 hover:bg-transparent hover:text-black"
                    variant="outline"
                    onClick={() => {
                      setChecked(true);
                      dispatch(
                        userdataFavList({
                          id: userobjecttype?.id,
                          arguments: {
                            username: userobjecttype?.username,
                            firstname: userobjecttype?.firstname,
                            lastname: userobjecttype?.lastname,
                            email: userobjecttype?.email,
                            password: userobjecttype?.password,
                            favList: [
                              ...(userobjecttype?.favList as []),
                              {
                                currentreciters: choosendata.reciters[0],
                                recitersid: choosendata.reciters[0].id,
                              },
                            ],
                            LastPlayed: userobjecttype?.LastPlayed,
                            id: userobjecttype?.id,
                          },
                        })
                      );
                    }}
                  >
                    <h1>{language === "ar" ? "متابعه" : "Follow"}</h1>
                  </Button>
                )}
              </div>
              <div className="flex gap-3 p-5 items-center flex-wrap justify-center  ">
                {/* inputSearch */}
                <div className="p-5 overflow-hidden w-[70px] h-[20px] mobile:hover:w-[250px] tablet:hover:w-[300px] bg-[#242424]  hover:outline-double outline-[#3E3C3C] rounded-full  flex group items-center hover:duration-300 duration-300">
                  <div className="flex items-center justify-center fill-white">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      id="Isolation_Mode"
                      data-name="Isolation Mode"
                      viewBox="0 0 24 24"
                      width="22"
                      height="22"
                    >
                      <path d="M18.9,16.776A10.539,10.539,0,1,0,16.776,18.9l5.1,5.1L24,21.88ZM10.5,18A7.5,7.5,0,1,1,18,10.5,7.507,7.507,0,0,1,10.5,18Z"></path>
                    </svg>
                  </div>
                  <input
                    placeholder={`${
                      language === "ar"
                        ? "ابحث في قائمة التشغيل"
                        : "Search in Playlist"
                    }`}
                    onChange={(e) => SerachSwura(e.target.value)}
                    type="text"
                    className="outline-none  bg-[#242424] w-full text-white   font-normal px-4"
                  />
                </div>
                {/* searchBar */}
                <Menu>
                  <MenuButton
                    cursor={"pointer"}
                    color={"gray"}
                    _hover={{
                      color: "white",
                    }}
                  >
                    {language === "ar" ? "طلبات متنوعه" : "Custom Order"}
                  </MenuButton>
                  <AiOutlineMenu className="text-white" />

                  <MenuList bg={"black"} border={0}>
                    <MenuGroup title="Rewayha" color={"white"}>
                      {choosendata?.reciters[0].moshaf.map(
                        ({ name }: { name: string }, index: number) => (
                          <MenuItem
                            bg={"black"}
                            _hover={{
                              background: "#3E3C3C",
                              color: "#1DB954",
                              cursor: "pointer",
                            }}
                            color={"white"}
                            onClick={() => {
                              setRewaya(index), rewayachoosen();
                            }}
                            key={index}
                          >
                            {name}
                          </MenuItem>
                        )
                      )}
                    </MenuGroup>
                  </MenuList>
                </Menu>
              </div>
            </div>

            <h1 className="text-3xl pt-8 font-extrabold text-white ps-4">
              {language === "ar" ? "جميع السور" : "All suwar"}
            </h1>
            <Grid templateColumns="repeat(3, 1fr)" gap={6}>
              <GridItem className="flex justify-end" w="90%" h="10" p={10}>
                <h1 className="text-white font-extrabold"> Surha</h1>
              </GridItem>
              <GridItem className="flex justify-end" w="90%" h="10" p={10}>
                <h1 className="text-white font-extrabold">Name </h1>
              </GridItem>
            </Grid>
            {loading ? (
              <div className="h-[100vh] flex justify-center items-center">
                <ClipLoader className="" color="#0cda0c" loading />
              </div>
            ) : (
              <div>
                {searchSwura?.length == 0 ? (
                  <div>
                    {currentplaylist?.map(
                      ({ name, writer, id, src }, index) => (
                        <Box
                          cursor={"pointer"}
                          key={index}
                          bg="transparent"
                          w="100%"
                          p={4}
                          color="white"
                          className="group hover:bg-[#58545485] "
                        >
                          <HStack spacing="24px">
                            <Box
                              w="70px"
                              className="text-center font-extrabold text-xl"
                            >
                              <div className=" ms-20 flex flex-row-reverse items-center gap-5">
                                {
                                  <Avatar
                                    src={reciters[recitersId]}
                                    name={`${writer}`}
                                  />
                                }
                                <div className="group flex duration-150 cursor-pointer">
                                  <h1 className="group-hover:hidden text-gray-400">
                                    {index + 1}
                                  </h1>
                                  <FaPlay
                                    onClick={() => {
                                      dispatch(
                                        clickedSuwra({
                                          currentplaylist,
                                          index,
                                          boolean: true,
                                        })
                                      );
                                      setplayed(true);
                                      // ____//
                                      setBollean(!Bollean);
                                      dispatch(
                                        userdatalastPLayed({
                                          id: userobjecttype?.id,
                                          arguments: {
                                            username: userobjecttype?.username,
                                            firstname:
                                              userobjecttype?.firstname,
                                            lastname: userobjecttype?.lastname,
                                            email: userobjecttype?.email,
                                            password: userobjecttype?.password,
                                            favList: [],
                                            LastPlayed: [
                                              ...(userobjecttype?.LastPlayed as []),
                                              {
                                                currentplaylist:
                                                  currentplaylist[index],
                                                recitersid: recitersId,
                                              },
                                            ],
                                            id: userobjecttype?.id,
                                          },
                                        })
                                      );
                                    }}
                                    className=" hidden group-hover:block text-xl text-white "
                                  />
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
                              {name}
                            </Box>
                            <Box
                              w="1180px"
                              className="text-center font-extrabold mobile:text-[0.8em] tablet:text-sm laptop:text-xl "
                            >
                              {writer}
                            </Box>
                            <Box w="80px">
                              <Menu>
                                <MenuButton
                                  bg={"transparent"}
                                  _hover={{
                                    bg: "transparent",
                                  }}
                                  className="group-hover:!text-white !text-2xl"
                                  as={Button}
                                  rightIcon={<BsThreeDots />}
                                ></MenuButton>
                                <MenuList
                                  border={0}
                                  color={"white"}
                                  bg={"#222222"}
                                >
                                  <Menu placement="left">
                                    <MenuButton
                                      w={"100%"}
                                      px={4}
                                      py={2}
                                      transition="all 0.2s"
                                      borderRadius="md"
                                      borderWidth="0px"
                                      _hover={{ bg: "#3E3C3C" }}
                                      _expanded={{ bg: "transparent" }}
                                      _focus={{ boxShadow: "none" }}
                                    >
                                      <h1 className="flex items-center justify-between ">
                                        {language === "ar"
                                          ? "وضع في قيمه خاصه"
                                          : "Add to playlist"}
                                        <HiChevronDown />
                                      </h1>
                                    </MenuButton>
                                    <MenuList borderWidth="0px" bg={"#222222"}>
                                      <MenuItem
                                        _hover={{ bg: "#3E3C3C" }}
                                        bg={"#222222"}
                                        gap={2}
                                      >
                                        <IoMdAdd className="text-xl" />
                                        <ListModel />
                                      </MenuItem>

                                      <MenuDivider />
                                      {userobjecttype?.OwnPlaylist.map(
                                        ({ title, Data }, index) => (
                                          <MenuItem
                                            key={index}
                                            _hover={{ bg: "#3E3C3C" }}
                                            bg={"#222222"}
                                            onClick={() =>
                                              dispatch(
                                                userdataAddInOwnList({
                                                  id: userobjecttype.id,
                                                  data: [
                                                    ...Data,
                                                    { name, writer, id, src },
                                                  ],
                                                })
                                              )
                                            }
                                          >
                                            {title}
                                          </MenuItem>
                                        )
                                      )}
                                    </MenuList>
                                  </Menu>

                                  <MenuItem
                                    _hover={{
                                      bg: "#3E3C3C",
                                    }}
                                    bg={"#222222"}
                                  >
                                    <div className="flex w-[100%] justify-between items-center">
                                      Download
                                      <IoMdDownload />
                                    </div>
                                  </MenuItem>
                                  <MenuItem
                                    onClick={() => {
                                      dispatch(
                                        clickedSuwra({
                                          currentplaylist,
                                          index,
                                          boolean: true,
                                        })
                                      );
                                      setplayed(true);
                                      // ____//
                                      setBollean(!Bollean);
                                      dispatch(
                                        userdatalastPLayed({
                                          id: userobjecttype?.id,
                                          arguments: {
                                            username: userobjecttype?.username,
                                            firstname:
                                              userobjecttype?.firstname,
                                            lastname: userobjecttype?.lastname,
                                            email: userobjecttype?.email,
                                            password: userobjecttype?.password,
                                            favList: [],
                                            LastPlayed: [
                                              ...(userobjecttype?.LastPlayed as []),
                                              {
                                                currentplaylist:
                                                  currentplaylist[index],
                                                recitersid: recitersId,
                                              },
                                            ],
                                            id: userobjecttype?.id,
                                          },
                                        })
                                      );
                                    }}
                                    _hover={{
                                      bg: "#3E3C3C",
                                    }}
                                    bg={"#222222"}
                                  >
                                    <div className="flex w-[100%] justify-between items-center">
                                      Play
                                      <CiPlay1 />
                                    </div>
                                  </MenuItem>
                                </MenuList>
                              </Menu>
                            </Box>
                          </HStack>
                        </Box>
                      )
                    )}
                  </div>
                ) : (
                  <div className="h-auto">
                    {searchSwura?.map(({ name, src, id, writer }, index) => (
                      <Box
                        cursor={"pointer"}
                        key={index}
                        bg="transparent"
                        w="100%"
                        p={4}
                        color="white"
                        className="group hover:bg-[#58545485]  "
                        onClick={() => {
                          dispatch(
                            clickedSuwra({
                              name: name,
                              writer: writer,
                              id: id,
                              src: src,
                            })
                          ),
                            setBollean(!Bollean);
                          dispatch(
                            userdatalastPLayed({
                              id: userobjecttype?.id,
                              arguments: {
                                username: userobjecttype?.username,
                                firstname: userobjecttype?.firstname,
                                lastname: userobjecttype?.lastname,
                                email: userobjecttype?.email,
                                password: userobjecttype?.password,
                                favList: [],
                                LastPlayed: [
                                  ...(userobjecttype?.LastPlayed as []),
                                  {
                                    currentplaylist: searchSwura[index],
                                    recitersid: recitersId,
                                  },
                                ],
                                id: userobjecttype?.id,
                              },
                            })
                          );
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
                                  src={reciters[recitersId]}
                                  name={`${writer}`}
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
                            }`}
                          >
                            {name}
                          </Box>
                          <Box
                            w="1180px"
                            className="text-center font-extrabold mobile:text-[0.8em] tablet:text-sm laptop:text-xl "
                          >
                            {writer}
                          </Box>
                        </HStack>
                      </Box>
                    ))}
                  </div>
                )}
              </div>
            )}
          </GridItem>
        </Grid>
      )}
    </div>
  );
};

export default ReciterisDetails;
