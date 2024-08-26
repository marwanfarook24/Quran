import {
  Avatar,
  Box,
  Button,
  Grid,
  GridItem,
  HStack,
  Image,
  Input,
  InputGroup,
  InputLeftElement,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  SimpleGrid,
} from "@chakra-ui/react";
import "../index.css";
import imageRadio from "../../public/Brown Minimalist World Radio Day Facebook Post.png";
import { AppDispatch, RootState } from "../ReduxSystem/Store/Store";
import { useDispatch, useSelector } from "react-redux";
import { BsPlayCircleFill } from "react-icons/bs";
import { useRadioPlaylistQuery } from "../ReduxSystem/RTkQuery/HomeApi";
import ClipLoader from "react-spinners/ClipLoader";
import { Card, Typography } from "@material-tailwind/react";
import { IoLibrary } from "react-icons/io5";
import { Changestate, choosenRadioAudio } from "../ReduxSystem/RadioSlice";
import SideBar from "../Component/SideBar";
import DrawerComponent from "../Component/Drawer";
import menu from "../../public/menu.png";
import { useState } from "react";
import { CiPlay1, CiSearch } from "react-icons/ci";
import { userdatalastPLayed } from "../ReduxSystem/userSlice";
import { MdAddCircleOutline } from "react-icons/md";
import { IoMdDownload } from "react-icons/io";
const radio = () => {
  const { language } = useSelector((state: RootState) => state.Settings);
  const { userobjecttype } = useSelector(
    (state: RootState) => state.userslogindata
  );
  const [search, setsearch] = useState<null | []>(null);
  const { data, isLoading } = useRadioPlaylistQuery(
    language === "ar" ? "ar" : "eng"
  );
  const dispatch = useDispatch<AppDispatch>();
  const [open, setopen] = useState(false);

  const SearchBar = (prop: string) => {
    const RadioSearch = data?.radios.filter(({ name }: { name: string }) => {
      const MatchName = name.match(prop);
      if (MatchName) {
        return name;
      }
    });
    setsearch(RadioSearch);
  };

  return (
    <div>
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
      {!isLoading && (
        <Grid templateColumns="repeat(5, 1fr)">
          <GridItem bg={"black"} rowSpan={2} colSpan={1}>
            <div className=" mobile:hidden tablet:block sticky top-[5em] overflow-y-scroll bg-black ">
              <SideBar isLoading={isLoading} />
            </div>
            <div>
              <div className="mobile:block tablet:hidden p-[2em]   ">
                <IoLibrary
                  onClick={() => setopen(true)}
                  className="text-gray-500    hover:text-white text-3xl sticky top-0 cursor-pointer"
                />
              </div>
              <DrawerComponent onopen={open} setopen={setopen} />
            </div>
          </GridItem>

          <GridItem id="backgroundcolor" colSpan={4} p={0}>
            <GridItem id="backgroundcolor" p={6} colSpan={4}>
              <div className="flex mobile:flex-wrap mobile:justify-center tablet:flex-nowrap items-center gap-7">
                <Image
                  className="mobile:w-[70%]  tablet:w-[70%] laptop:w-[40%] "
                  pos={"relative"}
                  src={imageRadio}
                />
              </div>
            </GridItem>
            <div className="flex justify-between items-center flex-wrap p-7 gap-7 ">
              <h1 className="tablet:text-3xl mobile:text-xl pt-8 font-extrabold text-white ps-4">
                {language === "ar" ? "جميع الاذاعات" : "All Radio"}
              </h1>
              <div>
                <InputGroup>
                  <InputLeftElement pointerEvents="none">
                    <CiSearch className="text-white" />
                  </InputLeftElement>
                  <Input
                    className="rounded-full"
                    focusBorderColor="#1DB954"
                    color={"white"}
                    onChange={(e) => {
                      SearchBar(e.target.value);
                    }}
                    type="text"
                    htmlSize={14}
                    width="auto"
                    placeholder={`${
                      language === "ar" ? "ابحث عن قاري" : " Search reciters ?"
                    }`}
                  />
                </InputGroup>
              </div>
            </div>
            {search ? (
              <div>
                <div className="h-[200vh]">
                  {search.map(
                    (
                      {
                        name,
                        url,
                        id,
                      }: { name: string; url: string; id: number },
                      index: number
                    ) => (
                      <Box
                        onClick={() => {
                          dispatch(
                            choosenRadioAudio({
                              urlaudio: url,
                              nameAudio: name,
                              id: id,
                              index: index,
                              url: "",
                            })
                          ),
                            dispatch(Changestate());
                        }}
                        cursor={"pointer"}
                        key={index}
                        bg="transparent"
                        w="100%"
                        p={4}
                        color="white"
                        className="group hover:bg-[#58545485] "
                      >
                        <HStack spacing="24px">
                          <Box className="group text-center font-extrabold text-xl">
                            <div className="flex laptop:items-end tablet:items-center tablet:justify-center">
                              <Avatar name={name} position={"relative"} />
                              <BsPlayCircleFill className="rounded-full scale-0 group-hover:scale-110 text-[#1DB954] duration-500  z-[999]   absolute  bg-[#000000] text-5xl  " />
                            </div>
                          </Box>

                          <Box
                            w="1180px"
                            className="text-center font-extrabold mobile:text-[1.4em] tablet:text-xl laptop:text-   xl "
                          >
                            {name}
                          </Box>
                        </HStack>
                      </Box>
                    )
                  )}
                </div>
              </div>
            ) : (
              <div>
                {data.radios.map(
                  (
                    {
                      name,
                      url,
                      id,
                    }: { name: string; url: string; id: number },
                    index: number
                  ) => (
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
                        <Box className="group text-center font-extrabold text-xl">
                          <div
                            onClick={() => {
                              dispatch(
                                choosenRadioAudio({
                                  urlaudio: url,
                                  nameAudio: name,
                                  id,
                                  index,
                                  url: "",
                                })
                              ),
                                dispatch(Changestate());
                              dispatch(
                                userdatalastPLayed({
                                  id: userobjecttype?.id,
                                  arguments: {
                                    username: userobjecttype?.username,
                                    firstname: userobjecttype?.firstname,
                                    lastname: userobjecttype?.lastname,
                                    email: userobjecttype?.email,
                                    password: userobjecttype?.password,
                                    OwnPlaylist: userobjecttype?.OwnPlaylist,
                                    favList: [],
                                    LastPlayed: [
                                      ...(userobjecttype?.LastPlayed as []),
                                      {
                                        currentplaylist: { name, id, url },
                                      },
                                    ],
                                    id: userobjecttype?.id,
                                  },
                                })
                              );
                            }}
                            className="flex laptop:items-end tablet:items-center tablet:justify-center"
                          >
                            <Avatar name={name} position={"relative"} />
                            <BsPlayCircleFill className="rounded-full scale-0 group-hover:scale-110 text-[#1DB954] duration-500  z-[999]   absolute  bg-[#000000] text-5xl  " />
                          </div>
                        </Box>

                        <Box
                          w="1180px"
                          className="text-center font-extrabold mobile:text-[1.4em] tablet:text-xl laptop:text-   xl "
                        >
                          {name}
                        </Box>
                        <Box w="180px">
                          <Menu>
                            <MenuButton
                              bg={"transparent"}
                              _hover={{
                                bg: "#1EBC4B",
                              }}
                              as={Button}
                              rightIcon={<img src={menu} width={20} alt="" />}
                            ></MenuButton>
                            <MenuList border={0} color={"white"} bg={"black"}>
                              <MenuItem
                                _hover={{
                                  bg: "#3E3C3C",
                                }}
                                bg={"black"}
                              >
                                <div className="flex w-[100%] justify-between items-center">
                                  Add To PlayList
                                  <MdAddCircleOutline />
                                </div>
                              </MenuItem>
                              <MenuItem
                                _hover={{
                                  bg: "#3E3C3C",
                                }}
                                bg={"black"}
                              >
                                <div className="flex w-[100%] justify-between items-center">
                                  Download
                                  <IoMdDownload />
                                </div>
                              </MenuItem>
                              <MenuItem
                                _hover={{
                                  bg: "#3E3C3C",
                                }}
                                bg={"black"}
                              >
                                <div
                                  onClick={() => {
                                    dispatch(
                                      choosenRadioAudio({
                                        urlaudio: url,
                                        nameAudio: name,
                                        id,
                                        index,
                                        url: "",
                                      })
                                    ),
                                      dispatch(Changestate());
                                    dispatch(
                                      userdatalastPLayed({
                                        id: userobjecttype?.id,
                                        arguments: {
                                          username: userobjecttype?.username,
                                          firstname: userobjecttype?.firstname,
                                          lastname: userobjecttype?.lastname,
                                          email: userobjecttype?.email,
                                          password: userobjecttype?.password,
                                          OwnPlaylist:
                                            userobjecttype?.OwnPlaylist,
                                          favList: [],
                                          LastPlayed: [
                                            ...(userobjecttype?.LastPlayed as []),
                                            {
                                              currentplaylist: {
                                                name,
                                                id,
                                                url,
                                              },
                                            },
                                          ],
                                          id: userobjecttype?.id,
                                        },
                                      })
                                    );
                                  }}
                                  className="flex w-[100%] justify-between items-center"
                                >
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
            )}
          </GridItem>
        </Grid>
      )}
    </div>
  );
};

export default radio;
