import { Navbar } from "@material-tailwind/react";
import {
  Avatar,
  AvatarBadge,
  Button,

  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList,
  useToast,
} from "@chakra-ui/react";
import "../App.css";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa6";
import { IoHomeSharp, IoSettingsOutline } from "react-icons/io5";
import { FaMagnifyingGlass } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../ReduxSystem/Store/Store";
import React, { useEffect, useState } from "react";
import { unsetobj, userdatalogin } from "../ReduxSystem/userSlice";
import { RiLogoutCircleLine } from "react-icons/ri";
import { CgProfile } from "react-icons/cg";
import { unsetid } from "../ReduxSystem/RememberSlice";
import Material from "./MaterialTailwind/Material";
import { Collapse, Typography, IconButton } from "@material-tailwind/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { useHomeDataQuery } from "../ReduxSystem/RTkQuery/HomeApi";
import { SearchBar } from "../ReduxSystem/recitersData";
const NavBar = () => {
  const toast = useToast();
  const [openNav, setOpenNav] = React.useState(false);
  const dispatch = useDispatch<AppDispatch>();
  const [search, setSearch] = useState<string>("");
  const { RemeberMe, id } = useSelector(
    (state: RootState) => state.RememberSlice
  );
  const { userobjecttype, loading } = useSelector(
    (state: RootState) => state.userslogindata
  );
  const { language } = useSelector((state: RootState) => state.Settings);
  const { data } = useHomeDataQuery({
    language: language === "ar" ? "ar" : "eng",
  });
  useEffect(() => {
    RemeberMe && dispatch(userdatalogin(id));
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
  }, [unsetobj, search]);

  const navigate = useNavigate();
  const logoutfun = () => {
    const examplePromise = new Promise((resolve) => {
      setTimeout(() => resolve(200), 1500);
    });

    {
      language === "ar"
        ? toast.promise(examplePromise, {
          success: {
            position: "top",
            title: "",
            description: "لقد تم تسجيل خروج",
          },
          error: {
            title: "Promise rejected",
            description: "Something wrong",
          },
          loading: {
            position: "top",
            title: "تحميل",
            description: "اننتظر من فضلك",
          },
        })
        : toast.promise(examplePromise, {
          success: {
            position: "top",
            title: "",
            description: "you have Login Out",
          },
          error: {
            title: "Promise rejected",
            description: "Something wrong",
          },
          loading: {
            position: "top",
            title: "loading",
            description: "Please wait",
          },
        });
    }
    setTimeout(() => {
      dispatch(unsetid()), dispatch(unsetobj());
    }, 1700);
  };

  function NavList() {
    return (
      <ul className="my-2 flex flex-col gap-2 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center lg:gap-6">
        {userobjecttype ? (
          <Typography
            as="li"
            variant="small"
            color="white"
            className="p-1 font-medium"
          >
            <Menu isLazy={true}>
              <MenuButton>
                <Avatar size="sm">
                  <AvatarBadge boxSize="1em" bg="green.500" />
                </Avatar>
              </MenuButton>
              <MenuList bg={"black"} border={0}>
                <Button
                  size="md"
                  height="48px"
                  width="100%"
                  bg={"black"}
                  color={"white"}
                  _hover={{ bg: "#8e8b8b" }}
                >
                  <CgProfile className="m-2" />
                  {language === "ar" ? "الملف الشخصي" : "Profile"}
                </Button>
                <Button
                  size="md"
                  height="48px"
                  width="100%"
                  bg={"black"}
                  color={"white"}
                  _hover={{ bg: "#8e8b8b" }}
                >
                  <IoSettingsOutline className="m-3" />
                  {language === "ar" ? "الاعدادات" : "settings"}
                </Button>
                <MenuDivider />
                <MenuItem
                  _hover={{ bg: "Red", textColor: "black" }}
                  onClick={() => {
                    dispatch(unsetid()), dispatch(unsetobj());
                  }}
                  color={"red"}
                  bg={"black"}
                  icon={<RiLogoutCircleLine />}
                >
                  {language === "ar" ? "تسجيل الخروج  " : "LogOut"}


                </MenuItem>

              </MenuList>

            </Menu>

          </Typography>
        ) : (
          <div>
            <div className="flex flex-col justify-center items-center gap-2">
              <Button
                onClick={() => navigate("/signuppage")}
                colorScheme="teal"
                variant="Button"
                color={"gray"}
                className="hover:text-white text-base font-bold    hover:text-[17px] duration-150"
              >
                {language === "ar" ? "اشترك الان" : "Sign up"}
              </Button>
              <Button
                onClick={() => navigate("/loginpage")}
                bg={"white"}
                color={"black"}
                className="font-extrabold hover:scale-105   "
                padding={6}
                borderRadius={20}
              >
                {language === "ar" ? "تسجيل دخول" : "Log in"}
              </Button>
              <Typography
                as="li"
                variant="small"
                color="white"
                className="p-1 font-medium"
              >
                <Material />
              </Typography>
            </div>
          </div>
        )}
      </ul>
    );
  }
  return (
    <Navbar
      variant="gradient"
      className=" max-w-full bg-gradient-to-b from-[#101010] to-[#101010] sticky top-0 z-10  rounded-none border-0"
    >
      <div className="flex laptop:flex-wrap tablet:flex-nowrap items-start justify-between gap-y-4 text-white">
        {/* Arrows */}
        {language === "ar" ? (
          <div className="flex gap-3 items-center cursor-pointer ">
            <div className="bg-black rounded-2xl p-1 ">
              <FaChevronRight
                onClick={() => navigate(+1)}
                className="text-2xl text-gray-500 "
              />
            </div>
            <div className="bg-black rounded-2xl p-1 ">
              <FaChevronLeft
                onClick={() => navigate(-1)}
                className="text-2xl text-gray-500   "
              />
            </div>
          </div>
        ) : (
          <div className="flex gap-3 items-center cursor-pointer ">
            <div className="bg-black rounded-2xl p-1 ">
              <FaChevronLeft
                onClick={() => navigate(-1)}
                className="text-2xl text-gray-500 "
              />
            </div>
            <div className="bg-black rounded-2xl p-1 ">
              <FaChevronRight
                onClick={() => navigate(+1)}
                className="text-2xl text-gray-500 "
              />
            </div>
          </div>
        )}
        {/* Arrows */}
        {/* InputSearch */}

        <div className="flex items-center gap-3">
          <div className="bg-[#242424] rounded-2xl p-1  ">
            <IoHomeSharp
              onClick={() => {
                navigate("/");
              }}
              className="text-2xl hover:cursor-pointer text-white"
            />
          </div>
          <div className="relative mobile:hidden tablet:block  ">
            <input
              onChange={(e) => {
                setSearch(e.target.value);
              }}
              placeholder={`${language === "ar"
                ? "ماذا تريد ان تستمع"
                : " What do you want to play?"
                }`}
              className="input shadow-lg ps-[2em]  text-[#9D9D9D]  bg-[#242424]  px-5 py-1 rounded-full laptop:w-80 tablet:w-60 "
              name="search"
              type="search"
            />
            <FaMagnifyingGlass className="absolute top-[0.3em] hover:cursor-pointer text-[#9D9D9D] ms-1 text-xl" />
          </div>
        </div>
        {/* InputSearch */}
        {/* Buttons */}
        <div className=" flex gap-4 items-center ">
          <div>
            {loading ? (
              <div className="flex flex-row gap-2">
                <div className="w-2 h-4 rounded-full bg-gray-600 animate-bounce [animation-delay:.7s]"></div>
                <div className="w-2 h-4 rounded-full bg-gray-600 animate-bounce [animation-delay:.3s]"></div>
                <div className="w-2 h-4 rounded-full bg-gray-600 animate-bounce [animation-delay:.7s]"></div>
              </div>
            ) : (
              <div>
                <div className="hidden tablet:block">
                  {userobjecttype ? (
                    <Menu isLazy={true}>
                      <MenuButton>
                        <Avatar size="sm">
                          <AvatarBadge boxSize="1em" bg="green.500" />
                        </Avatar>
                      </MenuButton>
                      <MenuList bg={"black"} border={0}>
                        <Button
                          size="md"
                          height="48px"
                          width="100%"
                          bg={"black"}
                          color={"white"}
                          _hover={{ bg: "#8e8b8b" }}
                        >
                          <CgProfile className="m-2" />
                          {language === "ar" ? "الملف الشخصي" : "Profile"}
                        </Button>
                        <Button
                          size="md"
                          height="48px"
                          width="100%"
                          bg={"black"}
                          color={"white"}
                          _hover={{ bg: "#8e8b8b" }}
                        >
                          <IoSettingsOutline className="m-3" />
                          {language === "ar" ? "الاعدادات" : "settings"}
                        </Button>
                        <MenuDivider />
                        <MenuItem
                          _hover={{ bg: "Red", textColor: "black" }}
                          onClick={() => {
                            logoutfun();
                          }}
                          color={"red"}
                          bg={"black"}
                          icon={<RiLogoutCircleLine />}
                        >
                          {language === "ar" ? "تسجيل الخروج  " : "LogOut"}
                        </MenuItem>
                      </MenuList>
                    </Menu>
                  ) : (
                    <div className="flex items-center gap-3">
                      <Material />
                      <Button
                        onClick={() => navigate("/signuppage")}
                        colorScheme="teal"
                        variant="Button"
                        color={"gray"}
                        className="hover:text-white text-base font-bold mobile:w-14 tablet:w-20  hover:text-[17px] duration-150"
                      >
                        {language === "ar" ? "اشترك الان" : "Sign up"}
                      </Button>
                      <Button
                        onClick={() => navigate("/loginpage")}
                        bg={"white"}
                        color={"black"}
                        className="font-extrabold hover:scale-105 mobile:w-[5rem] tablet:w-28 "
                        padding={6}
                        borderRadius={20}
                      >
                        {language === "ar" ? "تسجيل دخول" : "Log in"}
                      </Button>
                    </div>
                  )}
                </div>
                <div className="flex flex-row-reverse  gap-2">
                  <IconButton
                    variant="text"
                    className="ml-auto h-6 w-6 text-inherit hover:bg-transparent focus:bg-transparent active:bg-transparent tablet:hidden"
                    onClick={() => setOpenNav(!openNav)}
                  >
                    {openNav ? (
                      <XMarkIcon className="h-6 w-6" strokeWidth={2} />
                    ) : (
                      <Bars3Icon className="h-6 w-6" strokeWidth={2} />
                    )}
                  </IconButton>
                  <Collapse open={openNav}>
                    <NavList />
                  </Collapse>
                </div>
              </div>
            )}
          </div>
        </div>
        {/* Buttons */}
      </div>
    </Navbar>
  );
};

export default NavBar;
