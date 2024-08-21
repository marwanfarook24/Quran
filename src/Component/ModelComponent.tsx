import React, { useState } from 'react'
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    useDisclosure,
    Button,
    FormControl,

    Box,
    Popover,
    PopoverTrigger,
    PopoverContent,
    PopoverArrow,
    PopoverCloseButton,
    PopoverHeader,
    PopoverBody,
} from '@chakra-ui/react'
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../ReduxSystem/Store/Store';
import { userdataOwnList } from '../ReduxSystem/userSlice';
const ModelComponent = () => {
    const { language } = useSelector((state: RootState) => state.Settings);
    const { userobjecttype } = useSelector((state: RootState) => state.userslogindata);
    const { isOpen, onOpen, onClose } = useDisclosure()
    const initialRef = React.useRef(null)
    const finalRef = React.useRef(null)
    const dispatch = useDispatch<AppDispatch>()
    const [description, setdescription] = useState("")
    const [Title, setTitle] = useState("")

    return (
        <>
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
                    onClick={onOpen}
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


            <Modal
                initialFocusRef={initialRef}
                finalFocusRef={finalRef}
                isOpen={isOpen}
                onClose={onClose}
            >
                <ModalOverlay />
                <ModalContent bg={'#212121'} color={'white'} >
                    <ModalHeader>{language === "en" ? "New playlist" : "قائمة تشغيل جديدة"}</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody pb={10}>
                        <FormControl>
                            <div>
                                <div>
                                    <input
                                        onChange={(e) => setTitle(e.target.value)}
                                        id="username"
                                        name="username"
                                        type="text"
                                        className="border-b  w-[100%] border-gray-300 py-1 focus:border-b-2 focus:border-blue-700 transition-colors focus:outline-none peer bg-inherit"
                                    />
                                    <label
                                        className="absolute left-0 top-1 cursor-text peer-focus:text-xs peer-focus:-top-4 transition-all peer-focus:text-blue-700">{language === "en" ? "title" : "العنوان"}</label>
                                </div>
                            </div>
                        </FormControl>
                        <FormControl mt={10}>
                            {/* <FormLabel>Last name</FormLabel> */}
                            <div>
                                <div>
                                    <input
                                        onChange={(e) => setdescription(e.target.value)}
                                        id="username"
                                        name="username"
                                        type="text"
                                        className="border-b w-[100%] border-gray-300 py-1 focus:border-b-2 focus:border-blue-700 transition-colors focus:outline-none peer bg-inherit"
                                    />
                                    <label
                                        className="absolute left-0 top-1 cursor-text peer-focus:text-xs peer-focus:-top-4 transition-all peer-focus:text-blue-700">{language === "en" ? "Description" : "الوصف"}</label>
                                </div>
                            </div>

                        </FormControl>
                    </ModalBody>

                    <ModalFooter>
                        {Title ? <Button
                            onClick={() => dispatch(userdataOwnList({ Title, id: userobjecttype?.id, description, userobjecttype }))}
                            bg='white' color={'black'} mr={3}>
                            {language === "en" ? "Create" : "انشاء"}
                        </Button> :
                            <Popover>
                                <PopoverTrigger>
                                    <Button>
                                        {language === "en" ? "Create" : "انشاء"}
                                    </Button>
                                </PopoverTrigger>
                                <PopoverContent>
                                    <PopoverArrow />
                                    <PopoverCloseButton />
                                    <PopoverHeader bg={'black'} color={"red"} >Eroor</PopoverHeader>
                                    <PopoverBody bg={'black'} >Make Sure You Fill Title </PopoverBody>
                                </PopoverContent>
                            </Popover>}
                        <Button bg='transparent' _hover={{
                            bg: "red"
                        }} color={'black'} onClick={onClose}>Cancel</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    )
}

export default ModelComponent