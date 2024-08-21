import {
    Menu,
    MenuHandler,
    MenuList,
    MenuItem,
    Button,
} from "@material-tailwind/react"
import { IoLanguageSharp } from "react-icons/io5";
import { GrLanguage } from "react-icons/gr";
import { setArbicLanguage, setEnghlishLanguage } from "../../ReduxSystem/Settings";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../ReduxSystem/Store/Store";
import "../../index.css";
const Material = () => {
    const { language } = useSelector((state: RootState) => state.Settings)
    const dispatch = useDispatch<AppDispatch>()
    return (
        <Menu
            animate={{
                mount: { y: 0 },
                unmount: { y: 25 },
            }}

            placement="bottom">
            <MenuHandler>
                <Button className=" flex items-center gap-3 bg-transparent">
                    <IoLanguageSharp className="text-2xl" />
                    {language === "ar" ? <p>العربيه </p> : <p>English</p>}
                </Button>
            </MenuHandler>
            <MenuList className="bg-black text-white border-0" >
                <MenuItem onClick={() => dispatch(setEnghlishLanguage())} className="flex gap-2" >
                    <GrLanguage />
                    {language === "ar" ? "الانجليزيه" : "English"}
                </MenuItem>
                <MenuItem onClick={() => dispatch(setArbicLanguage())} className="flex gap-2" >
                    <GrLanguage />  {language === "ar" ? "العربيه" : "Arabic"}
                </MenuItem>

            </MenuList>
        </Menu >
    )
}

export default Material