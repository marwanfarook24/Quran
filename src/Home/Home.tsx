import {
  Grid,
  GridItem,
  Tab,
  TabIndicator,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  WrapItem,
} from "@chakra-ui/react";
import "../index.css";
import {
  useHomeDataQuery,
  useRewayaIdQuery,
  useSuwarIdQuery,
} from "../ReduxSystem/RTkQuery/HomeApi";
import {
  Avatar, Input,
  InputGroup,
  InputLeftElement,
} from "@chakra-ui/react";
import { reciters } from "../types/data";
import { BsPlayCircleFill } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../ReduxSystem/Store/Store";
import { Chip } from "@material-tailwind/react";
import userdata from "../types/HomeType";
import { useNavigate } from "react-router-dom";
import ClipLoader from "react-spinners/ClipLoader";
import { getrecitersdetails, SearchBar } from "../ReduxSystem/recitersData";
import { IoFilterCircle, IoLibrary } from "react-icons/io5";
import { Changestate, setChangestate } from "../ReduxSystem/RadioSlice";
import SideBar from "../Component/SideBar";
import DrawerComponent from "../Component/Drawer";
import { useEffect, useState } from "react";
import {
  Menu,
  MenuHandler,
  Button,
  MenuList,
  MenuItem,
} from "@material-tailwind/react";
import { setsuwraChossen } from "../ReduxSystem/filterReciters";
import { CiSearch } from "react-icons/ci";

const Home = () => {
  const [search, setSearch] = useState<string>("");
  const [arg, setarg] = useState<number | null>(null);
  const [sura, _setsura] = useState<number | null>(null);
  const { language } = useSelector((state: RootState) => state.Settings);
  const { searchResult } = useSelector(
    (state: RootState) => state.RecitersData
  );
  const { FilteredData } = useSelector(
    (state: RootState) => state.filterReciters
  );
  const { data: RewayaData } = useRewayaIdQuery(
    language === "ar" ? "ar" : "eng"
  );
  const { data, isLoading } = useHomeDataQuery({
    language: language === "ar" ? "ar" : "eng",
    arg: arg ? `rewaya=${arg}` : "",
    sura: sura ? `sura=${sura}` : "",
  });
  const { data: suwardata } = useSuwarIdQuery(language === "ar" ? "ar" : "eng");
  const navigator = useNavigate();
  const dispatch = useDispatch();
  const [open, setopen] = useState(false);
  useEffect(() => {
    if (search) {
      const result = data?.reciters.filter(({ name }: { name: string }) => {
        const MatchName = name.match(search);
        if (MatchName) {
          return name;
        }
      });
      dispatch(SearchBar(result));
    } else {
      dispatch(SearchBar(null));
    }
  }, [search])

  return (
    <div id="backgroundcolor">
      <Grid
        templateAreas={`"header header"
                    "nav main"
                    "nav footer"`}
        fontWeight="bold"
      >
        <GridItem area={"nav"}>
          <div className={` mobile:hidden tablet:block sticky overflow-x-hidden overflow-y-scroll bg-black top-[4em] ${isLoading ? "w-[60%]" : ""} `}>
            <SideBar isLoading={isLoading} />
          </div>
          <div>
            <DrawerComponent onopen={open} setopen={setopen} />
          </div>
        </GridItem>
        {/* main */}
        {isLoading ? (
          <GridItem pl="1" bg="transparent" area={"main"}>
            <div className="h-screen flex items-center ">
              <ClipLoader className="" color="#0cda0c" loading />
            </div>
          </GridItem>
        ) : (
          <GridItem pl="1" bg="transparent" area={"main"}>
            <div className="p-7 flex justify-between">
              <div className="flex items-center  gap-2 ">
                <div className=" mobile:block tablet:hidden laptop:hidden">
                  <IoLibrary
                    onClick={() => setopen(true)}
                    className="text-gray-500 hover:text-white text-3xl cursor-pointer "
                  />
                </div>

                <Chip
                  className={`${window.location.href == "http://localhost:5173/"
                    ? "bg-white text-black"
                    : "bg-gray-800"
                    }  cursor-pointer border-gray-200 rounded-[3em]`}
                  value="All"
                />

                <button
                  onClick={() => {
                    navigator("/radio"), dispatch(Changestate());
                  }}
                >
                  <Chip
                    className="bg-gray-800  cursor-pointer rounded-[2em]"
                    value="Radio"
                  />
                </button>
              </div>
              <div>
                <Menu placement="bottom-end">
                  <MenuHandler>
                    <Button>
                      <div className="flex items-center gap-4 ">
                        <h1>{language === "ar" ? "تصفيه" : "Filter"}</h1>
                        <IoFilterCircle className="text-xl text-[#1EBC4B] " />
                      </div>
                    </Button>
                  </MenuHandler>
                  <MenuList className="max-h-72 text-white text-sm bg-black border-0 shadow-md shadow-[#1EBC4B]">
                    <Tabs
                      position="relative"
                      variant="unstyled"
                      colorScheme="green"
                      className="hover:!border-0"
                    >
                      <TabList>
                        <Tab>{language === "ar" ? "رويات" : "Riwayat"}</Tab>
                        <Tab>{language === "ar" ? "سور" : "suwer"}</Tab>
                        <Tab className="mobile:!block tablet:!hidden">{language === "ar" ? "بحث" : "Search"}</Tab>
                      </TabList>
                      <TabIndicator
                        mt="-1.5px"
                        height="2px"
                        bg="green.500"
                        borderRadius="1px"
                      />

                      <TabPanels>
                        <TabPanel>
                          <MenuItem
                            onClick={() => {
                              setarg(null),
                                dispatch(
                                  setsuwraChossen({
                                    data: null,
                                    id: 0,
                                  })
                                );
                            }}
                          >
                            None
                          </MenuItem>
                          {RewayaData?.riwayat.map(
                            ({ name, id }: { name: string; id: number }) => (
                              <MenuItem
                                key={id}
                                onClick={() => {
                                  setarg(id),
                                    dispatch(
                                      setsuwraChossen({
                                        data: null,
                                        id: 0,
                                      })
                                    );
                                }}
                              >
                                {name}
                              </MenuItem>
                            )
                          )}
                        </TabPanel>
                        <TabPanel>
                          <MenuItem
                            onClick={() =>
                              dispatch(
                                setsuwraChossen({
                                  data: null,
                                  id: 0,
                                })
                              )
                            }
                          >
                            None
                          </MenuItem>
                          {suwardata.suwar.map(
                            ({ name, id }: { name: string; id: number }) => (
                              <MenuItem
                                key={id}
                                onClick={() =>
                                  dispatch(
                                    setsuwraChossen({
                                      data: data.reciters,
                                      id: id,
                                    })
                                  )
                                }
                              >
                                {name}
                              </MenuItem>
                            )
                          )}
                        </TabPanel>
                        <TabPanel className="" >

                        </TabPanel>

                      </TabPanels>
                    </Tabs>
                  </MenuList>
                </Menu>
              </div>

            </div>
            <div className="!flex !justify-center mobile:!block tablet:!hidden " >
              <div className="">
                <InputGroup  >
                  <InputLeftElement pointerEvents='none'>
                    <CiSearch className="text-white" />
                  </InputLeftElement>
                  <Input
                    focusBorderColor='#1DB954'
                    color={"white"}
                    onChange={(e) => {
                      setSearch(e.target.value);
                    }}
                    type='text' htmlSize={20} width='auto' placeholder={`${language === "ar"
                      ? "ابحث عن قاري"
                      : " Search reciters ?"
                      }`} />
                </InputGroup>
              </div>
            </div>

            {searchResult && searchResult?.length > 0 ? (
              <Grid className="grid desktop:grid-cols-4 laptop:grid-cols-3 tablet:grid-cols-2 tablet:mx-7 tablet:gap-6 mobile:grid-cols-2 1mobile:gap-0 !mobile:mx-0  p-4 ">
                {searchResult.map(
                  ({ name, id, moshaf }: userdata, index: number) => (
                    <div key={index}>
                      <div className="tablet:p-5 mobile:p-3  transition ease-linear  !cursor-pointer group hover:bg-[#58545485]  ">
                        <WrapItem className="group " position={"relative"}>
                          <Avatar
                            onClick={() => {
                              navigator(`/home/ReciterisDetails/${id}`);
                            }}
                            size="2xl"
                            name={name}
                            src={reciters[id]}
                          />
                          <BsPlayCircleFill
                            onClick={() => {
                              dispatch(
                                getrecitersdetails({
                                  moshaf: moshaf[0],
                                  img: reciters[id],
                                  writer: name,
                                  name: suwardata.suwar,
                                }),
                                navigator(`/home/ReciterisDetails/${id}`)
                              ),
                                dispatch(setChangestate());
                            }}
                            className="rounded-full scale-0 group-hover:scale-110 text-[#1DB954] duration-500  absolute bottom-0    bg-[#000000] text-5xl "
                          />
                        </WrapItem>
                        <div className="mt-4 flex flex-col gap-2">
                          <h1 className="text-white">{name}</h1>
                          <h2 className="text-gray-500">
                            {language === "ar" ? "القراء" : " Reciters"}
                          </h2>
                        </div>
                      </div>
                    </div>
                  )
                )}
              </Grid>
            ) : (
              <div>
                {FilteredData && FilteredData.length > 0 ? (
                  <Grid className="grid desktop:grid-cols-4 laptop:grid-cols-3 tablet:grid-cols-2 tablet:mx-7 tablet:gap-6 mobile:grid-cols-2 1mobile:gap-0 !mobile:mx-0  p-4 ">
                    {FilteredData.map(
                      ({ name, id, moshaf }: userdata, index: number) => (
                        <div key={index}>
                          <div className="tablet:p-5 mobile:p-3  transition ease-linear  !cursor-pointer group hover:bg-[#58545485]  ">
                            <WrapItem className="group " position={"relative"}>
                              <Avatar
                                onClick={() => {
                                  navigator(`/home/ReciterisDetails/${id}`);
                                  dispatch(setChangestate());
                                }}
                                size="2xl"
                                name={name}
                                src={reciters[id]}
                              />
                              <BsPlayCircleFill
                                onClick={() => {
                                  dispatch(
                                    getrecitersdetails({
                                      moshaf: moshaf[0],
                                      img: reciters[id],
                                      writer: name,
                                      name: suwardata.suwar,
                                    }),
                                    navigator(`/home/ReciterisDetails/${id}`)
                                  ),
                                    dispatch(setChangestate());
                                }}
                                className="rounded-full scale-0 group-hover:scale-110 text-[#1DB954] duration-500  absolute bottom-0    bg-[#000000] text-5xl "
                              />
                            </WrapItem>
                            <div className="mt-4 flex flex-col gap-2">
                              <h1 className="text-white">{name}</h1>
                              <h2 className="text-gray-500">
                                {language === "ar" ? "القراء" : " Reciters"}
                              </h2>
                            </div>
                          </div>
                        </div>
                      )
                    )}
                  </Grid>
                ) : (
                  <Grid className="grid desktop:grid-cols-4 laptop:grid-cols-3 tablet:grid-cols-2 tablet:mx-7 tablet:gap-6 mobile:grid-cols-2 1mobile:gap-0 !mobile:mx-0  p-4 ">
                    {data.reciters.map(
                      ({ name, id, moshaf }: userdata, index: number) => (
                        <div key={index}>
                          <div className="tablet:p-5 mobile:p-3  transition ease-linear  !cursor-pointer group hover:bg-[#58545485]  ">
                            <WrapItem className="group " position={"relative"}>
                              <Avatar
                                onClick={() => {
                                  navigator(`/home/ReciterisDetails/${id}`);
                                  dispatch(setChangestate());
                                }}
                                size="2xl"
                                name={name}
                                src={reciters[id]}
                              />
                              <BsPlayCircleFill
                                onClick={() => {
                                  dispatch(
                                    getrecitersdetails({
                                      moshaf: moshaf[0],
                                      img: reciters[id],
                                      writer: name,
                                      name: suwardata.suwar,
                                    }),
                                    navigator(`/home/ReciterisDetails/${id}`)
                                  ),
                                    dispatch(setChangestate());
                                }}
                                className="rounded-full scale-0 group-hover:scale-110 text-[#1DB954] duration-500  absolute bottom-0    bg-[#000000] text-5xl "
                              />
                            </WrapItem>
                            <div className="mt-4 flex flex-col gap-2">
                              <h1 className="text-white">{name}</h1>
                              <h2 className="text-gray-500">
                                {language === "ar" ? "القراء" : " Reciters"}
                              </h2>
                            </div>
                          </div>
                        </div>
                      )
                    )}
                  </Grid>
                )}
              </div>
            )}
          </GridItem>
        )}
      </Grid>
    </div>
  );
};
export default Home;
