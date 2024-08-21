import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Checkbox,
  FormControl,
  FormErrorMessage,
  FormLabel,
  InputGroup,
  InputRightElement,
} from "@chakra-ui/react";
import { useState } from "react";
import "../index.css";
import { Input } from "@chakra-ui/react";
import logo from "../../public/—Pngtree—al quran is in an_6147358.png";
import { useNavigate } from "react-router-dom";
import { FaRegEye } from "react-icons/fa";
import { FaRegEyeSlash } from "react-icons/fa6";
import { useForm, SubmitHandler } from "react-hook-form";
import { logintypes } from "../types/Logintypes";
import { useDispatch, useSelector } from "react-redux";
import { userdata } from "../ReduxSystem/SignSlice";
import { AppDispatch, RootState } from "../ReduxSystem/Store/Store";
import {
  dismis,
  NotifyEroorEmailSignIn,
  toastId,
  Toster,
  NotifyEroorPasswordSignIn,
  notifysuccess,
  NotifyEroorServer,
} from "../Component/Alert";
import { setid } from "../ReduxSystem/RememberSlice";
import { userdatalogin } from "../ReduxSystem/userSlice";

type data = {
  email?: string;
  password?: string;
};



const Loginpage = () => {
  const navigition = useNavigate();
  // const [remeber, setRemeber] = useState(false);
  const [show, setShow] = useState(false);
  const [inputEmailRequied, setinputEmailRequied] = useState(false);
  const [inputPasswordRequied, setinputPasswordRequied] = useState(false);
  const dispatch = useDispatch<AppDispatch>();
  const { language } = useSelector((state: RootState) => state.Settings);
  const {
    handleSubmit,
    register,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<logintypes>({
    defaultValues: {
      email: "Exampel@gmail.com",
      password: "******",
    },
  });


  const handleInputEmailChange = (e: string) => {
    e == "" ? setinputEmailRequied(true) : setinputEmailRequied(false);
  };
  const handleInputPasswordChange = (e: string) => {
    e == "" ? setinputPasswordRequied(true) : setinputPasswordRequied(false);
  };

  const onsubmit: SubmitHandler<logintypes> = async (data: logintypes) => {
    try {
      toastId();
      const usergetdata = await dispatch(userdata()).unwrap();
      if (usergetdata) {
        const EmailCheck = usergetdata.filter(({ email }: data) => {
          return email == data.email;
        });
        if (EmailCheck.length > 0) {
          const PasswordCheck = EmailCheck.some(({ password }: data) => {
            return password == data.password;
          });
          if (PasswordCheck) {
            dispatch(userdatalogin(EmailCheck[0].id));
            if (data.rememberme) {
              dispatch(setid(EmailCheck[0].id));
            }
            dismis();
            notifysuccess();

            navigition("/");
          } else {
            dismis(),
              NotifyEroorPasswordSignIn(),
              setError("root", {
                message: "Password is Not Correct",
              });
          }
        } else {
          throw new Error();
        }
      } else {
        dismis();
        NotifyEroorServer();
        setError("root", {
          message: "Server Is Down Now",
        });
      }
    } catch (e) {
      dismis();
      NotifyEroorEmailSignIn();
      setError("root", {
        message: "Email is Not Existing",
      });
    }
  };
  return (
    <div id="backgroundcolor">
      {Toster}
      <div className="flex justify-center">
        <Card className=" mobile:my:0 tablet:my-10" bg={"black"} align="center">
          <img src={logo} alt="" width={90} />
          <CardHeader>
            <h1 className="text-4xl text-center mx-6 font-bold text-white ">
              {language === "ar" ? "تسجيل الدخول" : "Log in to Quran"}
            </h1>
          </CardHeader>
          <CardBody className="flex justify-center flex-col gap-4 w-[100%]">
            <Button
              onClick={() => navigition("/signuppage")}
              className="!rounded-full w-[100%] border-2 !border-white "
              colorScheme="white"
              size="lg"
            >
              {language === "ar" ? `اشتراك الان` : `Sign up Now!`}
            </Button>
            <hr className="bg-blue-gray-300 h-[0.2] w-[100%] my-5" />
          </CardBody>
          <CardFooter>
            <div className="flex flex-col gap-7">
              {/* email */}
              <div className="w-72">
                <FormControl isInvalid={inputEmailRequied}>
                  {errors.email ? (
                    <FormLabel color={"Red"}>
                      {language === "ar"
                        ? "الايميل غير صحيح"
                        : "Email is Not Correct"}
                    </FormLabel>
                  ) : (
                    <FormLabel color={"gray.400"}>
                      {language === "ar" ? "البريد الالكتروني" : "EmailAddrees"}
                    </FormLabel>
                  )}
                  <Input
                    {...register("email", {
                      required: true,
                      pattern: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
                    })}
                    focusBorderColor={`${inputEmailRequied || errors.email ? "Red" : "Green"
                      }`}
                    color={"white"}
                    type="text"
                    onChange={(e) => handleInputEmailChange(e.target.value)}
                  />
                  {inputEmailRequied && (
                    <FormErrorMessage fontSize={16}>
                      {language === "ar"
                        ? "يجب ان تضيف الايميل "
                        : "Email is required."}
                    </FormErrorMessage>
                  )}
                </FormControl>
              </div>
              {/* password */}
              <div className="w-72">
                <FormControl isInvalid={inputPasswordRequied}>
                  {errors.password ? (
                    <FormLabel color={"Red"}>
                      {language === "ar"
                        ? `يجيب علي كلمه السر الخاص بيك ان تحتوي ما بين 5 عناصر او 10 عناصر`
                        : `Password must have at min:3 charchter max:10charchter`}
                    </FormLabel>
                  ) : (
                    <FormLabel color={"gray.400"}>
                      {language === "ar" ? "كمله المرور" : "Password"}
                    </FormLabel>
                  )}
                  <InputGroup size="md">
                    <Input
                      {...register("password", {
                        minLength: 4,
                        maxLength: 10,
                        required: true,
                      })}
                      color={"white"}
                      pr="4.5rem"
                      type={show ? "text" : "password"}
                      focusBorderColor={`${inputPasswordRequied || errors.password
                        ? "Red"
                        : "Green"
                        }`}
                      onChange={(e) =>
                        handleInputPasswordChange(e.target.value)
                      }
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
                  {inputPasswordRequied && (
                    <FormErrorMessage>
                      {language === "ar"
                        ? "يجيب وضع كلمه مرور خاصه بيك"
                        : "Eroor Password Is Required"}
                    </FormErrorMessage>
                  )}
                </FormControl>
              </div>
              <Checkbox
                {...register("rememberme", {})}
                color={"white"}
                colorScheme="green"
                defaultChecked={false}
              >
                {language === "ar" ? "تزكرني" : "Remember Me"}
              </Checkbox>
            </div>
          </CardFooter>
          {errors.root && (
            <h1 className="my-4 text-red-700 text-lg">{errors.root.message}</h1>
          )}
          {!isSubmitting ? (
            <Button
              onClick={handleSubmit(onsubmit)}
              type="submit"
              className="!rounded-full laptop:w-96 tablet:w-96 mobile:w-72 !m-6 "
              bg={"#1ED760"}
              color={"black"}
              size="lg"
            >
              {language === "ar" ? "تسجيل دخول" : "Sign In"}
            </Button>
          ) : (
            <Button px={20} py={6} isLoading bg={"#1ED760"} variant="solid">
              {language === "ar" ? "الايميل " : "Email"}
            </Button>
          )}
        </Card>
      </div>
    </div>
  );
};

export default Loginpage;
