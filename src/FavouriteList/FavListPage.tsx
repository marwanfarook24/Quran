import { Avatar, Grid, GridItem, WrapItem } from '@chakra-ui/react';
import SideBar from '../Component/SideBar';
import { IoLibrary } from 'react-icons/io5';
import "../index.css"
import { FaHeart } from 'react-icons/fa6';
import ClipLoader from 'react-spinners/ClipLoader';
import { reciters } from '../types/data';
import { BsPlayCircleFill } from 'react-icons/bs';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../ReduxSystem/Store/Store';
import { useNavigate } from 'react-router-dom';
import { setChangestate } from '../ReduxSystem/RadioSlice';
import { getrecitersdetails } from '../ReduxSystem/recitersData';
import { useSuwarIdQuery } from '../ReduxSystem/RTkQuery/HomeApi';
import DrawerComponent from '../Component/Drawer';
const FavListPage = () => {
    const { userobjecttype } = useSelector((state: RootState) => state.userslogindata)
    const { language } = useSelector((state: RootState) => state.Settings)
    const { data: suwardata } = useSuwarIdQuery(language === "ar" ? "ar" : "eng");
    const navigator = useNavigate()
    const dispatch = useDispatch()
    const [open, setopen] = useState(false);
    const [openside, setopenside] = useState(false);
    useEffect(() => {
        userobjecttype?.favList ? setopenside(false) : setopenside(true)
    })
    return (
        <div className="bg-black">
            <Grid templateColumns="repeat(5, 1fr)">
                <GridItem bg={"black"} rowSpan={2} colSpan={1}>
                    {/* SideNav */}
                    <div className=" mobile:hidden tablet:block sticky overflow-y-scroll bg-black top-[5em]">
                        <SideBar isLoading={openside} />
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
                    <GridItem id="" className='favlistPage shadow-lg shadow-[#8778BC]' p={10} colSpan={4}>
                        <div className=' flex items-center w-[100%] justify-start gap-4  ' >
                            <div className="favlist h-36 w-[20%] flex justify-center items-center cursor-pointer  ">
                                <FaHeart className="text-white text-5xl " />
                            </div>
                            <div className='flex flex-col items-end '>
                                <h1 className='text-white laptop:text-6xl tablet:text-4xl mobile:text-2xl font-bold '>{language === "ar" ? "القراء المفضلين" : "Liked Reciters"}</h1>
                                <p className='text-gray-300' >{userobjecttype?.favList.length} Reciters</p>
                            </div>
                        </div>

                    </GridItem>
                    <div className="flex justify-between flex-wrap ">
                        <div className="flex items-center gap-3 p-5 flex-wrap">

                        </div>

                    </div>
                    {false ? (
                        <div className="h-[100vh] flex justify-center items-center">
                            <ClipLoader className="" color="#0cda0c" loading />
                        </div>
                    ) : (
                        <Grid className="grid desktop:grid-cols-4 laptop:grid-cols-3 tablet:grid-cols-2 tablet:mx-7 tablet:gap-6 mobile:grid-cols-2 1mobile:gap-0 !mobile:mx-0  p-4 ">
                            {userobjecttype?.favList.map(({ currentreciters }: {
                                currentreciters: {
                                    id: string | number, name: string, moshaf: [{
                                        id: string;
                                        server: string;
                                        moshaf_type: number;
                                        name: string;
                                        surah_list: string;
                                        surah_total: number;
                                    }]
                                }
                            }) => (
                                <GridItem key={currentreciters.id}  >
                                    <div className="tablet:p-5 mobile:p-3  transition ease-linear  !cursor-pointer group hover:bg-[#58545485]  ">
                                        <WrapItem className="group " position={"relative"}>
                                            <Avatar
                                                onClick={() => {
                                                    navigator(`/home/ReciterisDetails/${currentreciters.id}`);
                                                    dispatch(setChangestate());
                                                }}
                                                size="2xl"
                                                name={currentreciters.name}
                                                src={reciters[currentreciters.id]}
                                            />
                                            <BsPlayCircleFill
                                                onClick={() => {
                                                    dispatch(
                                                        getrecitersdetails({
                                                            moshaf: currentreciters.moshaf[0],
                                                            img: reciters[currentreciters.id],
                                                            writer: currentreciters.name,
                                                            name: suwardata.suwar,
                                                        }),
                                                        navigator(`/home/ReciterisDetails/${currentreciters.id}`)
                                                    ),
                                                        dispatch(setChangestate());
                                                }}
                                                className="rounded-full scale-0 group-hover:scale-110 text-[#1DB954] duration-500  absolute bottom-0    bg-[#000000] text-5xl "
                                            />
                                        </WrapItem>
                                        <div className="mt-4 flex flex-col gap-2">
                                            <h1 className="text-white">{currentreciters.name}</h1>
                                            <h2 className="text-gray-500">
                                                {language === "ar" ? "القراء" : " Reciters"}
                                            </h2>
                                        </div>
                                    </div>
                                </GridItem>
                            ))}

                        </Grid>

                    )}
                </GridItem>
            </Grid>
        </div >
    )
}

export default FavListPage