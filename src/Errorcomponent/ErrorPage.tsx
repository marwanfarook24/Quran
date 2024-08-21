import { Button } from "@chakra-ui/react"
// import "../index.css"
import { useNavigate } from "react-router-dom"
// import { RootState } from "../ReduxSystem/Store"
const ErrorPage = () => {
  const Navigate = useNavigate()
  // const { RemeberMe, id } = useSelector((state: RootState) => state.RememberSlice)
  return (
    <section className=" h-screen bg-black">
      <div className="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6">
        <div className="mx-auto max-w-screen-sm text-center">
          <h1 className="mb-4 text-7xl tracking-tight font-extrabold lg:text-9xl text-blue-gray-400 dark:text-primary-500">404</h1>
          <p className="mb-4 text-3xl tracking-tight font-bold text-gray-300 md:text-4xl dark:text-white">Something's missing.</p>
          <p className="mb-4 text-lg font-light text-gray-500 dark:text-gray-400">Sorry, we can't find that page. You'll find lots to explore on the home page. </p>
          <Button
            onClick={() => Navigate("/")}
            colorScheme='green'>Back Home</Button>
        </div>
      </div>
    </section>
  )
}

export default ErrorPage