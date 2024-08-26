import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  InputGroup,
  InputRightElement,
} from "@chakra-ui/react";
import { useState } from "react";
import "../index.css";
import { Input } from "@chakra-ui/react";
import { RiLoginCircleFill } from "react-icons/ri";
import logo from "../../public/—Pngtree—al quran is in an_6147358.png";
import { Typography } from "@material-tailwind/react";
import { useNavigate } from "react-router-dom";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa6";
import { useForm, SubmitHandler } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useDispatch, useSelector } from "react-redux";
import { pushdata, userdata } from "../ReduxSystem/SignSlice";
import { AppDispatch, RootState } from "../ReduxSystem/Store/Store";
import {
  NotifyEroorServer,
  notifysuccess,
  Toster,
  NotifyEroorEmail,
  toastId,
  dismis,
} from "../Component/Alert";

const SignUpPage = () => {
  const { language } = useSelector((state: RootState) => state.Settings);
  type data = {
    email?: string;
  };
  const navigition = useNavigate();
  // Navigition
  const { usersrespones } = useSelector(
    (state: RootState) => state.initialData
  );
  const dispatch = useDispatch<AppDispatch>();
  // Zod valuduition
  const schema = z
    .object({
      username: z
        .string()
        .includes("#", {
          message: `${
            language === "ar"
              ? "يجب ان يكون يحتوي علي # "
              : "Invalid input: must include #"
          }`,
        })
        .min(2, {
          message: `${
            language
              ? "يجب ان يكون 2 عنصر او اكثر"
              : "Must be 2 or more characters long"
          }`,
        }),
      firstname: z
        .string()
        .min(3, {
          message: `${
            language === "ar"
              ? "يجب ان يكون 3 عنصر او اكثر"
              : "Must be 3 or more characters long"
          }`,
        })
        .refine(
          (val) => !/[1-9]/g.test(val),
          (_val) => ({
            message: `${
              language === "ar"
                ? " لا يمكن ان تضع هنا رقم"
                : "can not put number here"
            }`,
          })
        ),
      lastname: z
        .string()
        .min(3, {
          message: `${
            language === "ar"
              ? "يجب ان يكون 3 عنصر او اكثر"
              : "Must be 3 or more characters long"
          }`,
        })
        .refine(
          (val) => !/[1-9]/g.test(val),
          (val) => ({
            message: `${val}${
              language === "ar"
                ? " لا يمكن ان تضع هنا رقم"
                : "can not put number here"
            } `,
          })
        ),
      email: z.string().email({
        message: `${
          language === "ar"
            ? "الايميل الايكتروني غير صحيح"
            : "Invalid email address"
        }`,
      }),
      password: z
        .string()
        .min(5, {
          message: `${
            language === "ar"
              ? "يجب ان يكون 5 عنصر او اكثر"
              : "Must be 5 or more characters long"
          }`,
        })
        .max(10, {
          message: `${
            language === "ar"
              ? "يجب ان يكون اقل من  10  عنصر "
              : "Must be less 10  characters"
          }`,
        }),
      confirmpassword: z
        .string()
        .min(5, {
          message: `${
            language === "ar"
              ? "يجب ان يكون 5 عنصر او اكثر"
              : "Must be 5 or more characters long"
          }`,
        })
        .max(10, {
          message: `${
            language === "ar"
              ? "يجب ان يكون اقل من  10  عنصر "
              : "Must be less 10  characters"
          }`,
        }),
    })
    .refine((data) => data.password === data.confirmpassword, {
      message: `${
        language === "ar" ? "كلمه المرور غير متطابقه " : "Password is not Match"
      }`,
      path: ["confirmpassword"],
    });

  type formhandeler = z.infer<typeof schema>;
  // formhook-valuduition
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<formhandeler>({
    resolver: zodResolver(schema),
  });
  // formhook-valuduition
  const onSubmit: SubmitHandler<formhandeler> = async (data: formhandeler) => {
    toastId();
    try {
      const usergetdata = await dispatch(userdata()).unwrap();
      if (usergetdata) {
        dismis();
        let emailexists = usersrespones.some(myFunction);
        function myFunction({ email }: data) {
          return email == data.email;
        }
        if (emailexists) {
          dismis();
          NotifyEroorEmail();
          throw new Error();
        } else {
          notifysuccess();
          const pushtest = await dispatch(
            pushdata({
              username: data.username,
              firstname: data.firstname,
              lastname: data.lastname,
              email: data.email,
              password: data.password,
              favList: [],
              OwnPlaylist: [],
              Lastplayed: [],
            })
          ).unwrap();

          if (pushtest) {
            setTimeout(() => {
              navigition("/loginpage");
            }, 2000);
          }
        }
      } else {
        dismis();
        NotifyEroorServer();
        setError("root", {
          message: `${
            language === "ar"
              ? "الخدام غير متاح الان!"
              : "Server is Down Now Try Agin Later!"
          }`,
        });
      }
    } catch (e) {
      setError("root", {
        message: `${
          language === "ar"
            ? "الايميل مضاف بالفعل من قبل"
            : "**email is already exists**"
        }`,
      });
    }
  };
  // SubmitFuncition
  // ShowPassowrd
  const [show, setShow] = useState(false);
  const [showconfirm, setconfirmShow] = useState(false);
  // ShowPassowrd

  return (
    <div className="h-[100vh]" id="backgroundcolor">
      <div className="flex justify-center ">
        <h1>{Toster}</h1>
        <Card className="my-10" bg={"black"} align="center">
          <img src={logo} alt="" width={90} />
          <CardHeader>
            <h1 className="text-4xl text-center mx-6 font-bold text-white ">
              {language === "ar"
                ? "اشتراك الان للاستماع"
                : `Sign up to start  listening`}
            </h1>
          </CardHeader>
          <CardBody className="grid laptop:grid-cols-2 laptop:gap-7 mobile:grid-cols-1">
            {/* UserName */}
            <div className="w-72">
              <label htmlFor="" className="mb-2 text-white">
                {language === "ar" ? "اسم المستخدم" : ` User Name`}
              </label>
              <Input
                {...register("username", {})}
                color={"white"}
                focusBorderColor={`${errors.username ? "Red" : "Green"}`}
                placeholder={`${
                  language === "ar" ? "ادخل اسم المستخدم" : "EnterUserName..."
                }`}
              />
              {errors.username && (
                <p className="text-red-400">{errors.username?.message}</p>
              )}
            </div>
            {/* FirstName */}
            <div className="w-72">
              <label htmlFor="" className="mb-2 text-white">
                {language === "ar" ? "اسم الاول" : ` First Name`}
              </label>
              <Input
                {...register("firstname", {})}
                color={"white"}
                focusBorderColor={`${errors.firstname ? "Red" : "Green"}`}
                placeholder={`${
                  language === "ar" ? "ادخل اسم الاول" : "YourFirtsName..."
                }`}
              />
              {errors.firstname && (
                <p className="text-red-400 text-[1em] mt-1 ">
                  {errors.firstname.message}
                </p>
              )}
            </div>
            {/* LastName */}
            <div className="w-72">
              <label htmlFor="" className="mb-2 text-white">
                {language === "ar" ? "اسم الاخير" : `Last Name`}
              </label>
              <Input
                {...register("lastname", {})}
                color={"white"}
                focusBorderColor={`${errors.lastname ? "Red" : "Green"}`}
                placeholder={`${
                  language === "ar" ? "ادخل اسم الاخير" : "YourLastName..."
                }`}
              />
              {errors.lastname && (
                <p className="text-red-400 text-[1em] mt-1 ">
                  {errors.lastname.message}
                </p>
              )}
            </div>
            {/* email */}
            <div className="w-72">
              <label htmlFor="" className="mb-2 text-white">
                {language === "ar" ? "البريد الايكتروني" : `Email`}
              </label>
              <Input
                {...register("email", {})}
                color={"white"}
                focusBorderColor={`${errors.email ? "Red" : "Green"}`}
                placeholder="Domin@gmail.com"
              />
              {errors.email && (
                <p className="text-red-400">{errors.email.message}</p>
              )}
            </div>
            {/* password */}
            <div className="w-72">
              <label htmlFor="" className="mb-2 text-white">
                {language === "ar" ? "كلمه المرور" : `Password`}
              </label>
              <InputGroup size="md">
                <Input
                  {...register("password", {})}
                  color={"white"}
                  pr="4.5rem"
                  type={show ? "text" : "password"}
                  placeholder={`${
                    language === "ar" ? "ادخل كلمه المرور" : "Enter password..."
                  }`}
                  focusBorderColor={`${errors.password ? "Red" : "Green"}`}
                />
                <InputRightElement width="4.5rem">
                  {show ? (
                    <FaRegEye
                      className="text-white"
                      onClick={() => setShow(!show)}
                    />
                  ) : (
                    <FaRegEyeSlash
                      className="text-white"
                      onClick={() => setShow(!show)}
                    />
                  )}
                </InputRightElement>
              </InputGroup>
              {!errors.password ? (
                <Typography
                  variant="small"
                  color="white"
                  className="mt-2 flex items-center gap-1 font-normal"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="-mt-px h-4 w-4"
                  >
                    <path
                      fillRule="evenodd"
                      d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm8.706-1.442c1.146-.573 2.437.463 2.126 1.706l-.709 2.836.042-.02a.75.75 0 01.67 1.34l-.04.022c-1.147.573-2.438-.463-2.127-1.706l.71-2.836-.042.02a.75.75 0 11-.671-1.34l.041-.022zM12 9a.75.75 0 100-1.5.75.75 0 000 1.5z"
                      clipRule="evenodd"
                    />
                  </svg>

                  {language === "ar"
                    ? "استخدم ما لا يقل عن 8 أحرف، حرف كبير واحد وحرف صغير واحد و رقم واحد."
                    : `Use at least 8 characters, one uppercase, one lowercase and
                  one number.`}
                </Typography>
              ) : (
                <h1 className="text-red-400 text-sm">
                  {errors.password.message}
                </h1>
              )}
            </div>

            {/* ConfirmPassword */}
            <div className="w-72">
              <label htmlFor="" className="mb-2 text-white">
                {language === "ar"
                  ? "تاكيد كلمه المرور"
                  : `
                ConfirmPassword
                `}
              </label>
              <InputGroup size="md">
                <Input
                  {...register("confirmpassword", {})}
                  color={"white"}
                  pr="4.5rem"
                  type={showconfirm ? "text" : "password"}
                  placeholder={`${
                    language === "ar"
                      ? "ادخل تاكيد كلمه المرور"
                      : "ConfirmPassword..."
                  }`}
                  focusBorderColor={`${
                    errors.confirmpassword ? "Red" : "Green"
                  }`}
                />
                <InputRightElement width="4.5rem">
                  {showconfirm ? (
                    <FaRegEye
                      className="text-white"
                      onClick={() => setconfirmShow(!showconfirm)}
                    />
                  ) : (
                    <FaRegEyeSlash
                      className="text-white"
                      onClick={() => setconfirmShow(!showconfirm)}
                    />
                  )}
                </InputRightElement>
              </InputGroup>
              {errors.confirmpassword && (
                <h1 className="text-red-400 ">
                  {errors.confirmpassword.message}
                </h1>
              )}
            </div>
          </CardBody>
          {/* Submit button */}
          {!isSubmitting ? (
            <Button
              onClick={handleSubmit(onSubmit)}
              type="submit"
              className="!rounded-full laptop:w-96 tablet:w-96 mobile:w-72 !my -4 "
              bg={"#1ED760"}
              color={"black"}
              size="lg"
            >
              {language === "ar" ? "التالي" : "Next"}
            </Button>
          ) : (
            <Button px={20} py={6} isLoading bg={"#1ED760"} variant="solid">
              Email
            </Button>
          )}

          {errors.root && (
            <h1 className="text-red-500 mt-5 text-[1.2em]">
              {errors.root.message}
            </h1>
          )}
          {/* Submit tbutton */}
          {/* line */}
          <div className="flex items-center gap-4 my-6 ">
            <hr className="bg-blue-gray-300 h-[0.2] w-28" />
            <h1 className="text-gray-500">{language === "ar" ? "او" : "or"}</h1>
            <hr className="bg-blue-gray-300 h-[0.2] w-28" />
          </div>
          {/* line */}
          <CardFooter className="w-[100%]">
            <Button
              onClick={() => navigition("/loginpage")}
              className="!rounded-full w-[100%] border-2 !border-white "
              colorScheme="white"
              size="lg"
            >
              <RiLoginCircleFill className="text-white" />
              {language === "ar" ? "تسجيل الدخول" : "Log in"}
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default SignUpPage;
