import "./index.css";
import useRouterElement from "./routes/useRouterElement";
function App() {
  // const [count, setCount] = useState(0)

  // const state = useSelector((state:RootState) =>state.user  )
  const routerElement = useRouterElement();
  return (

      
      <>
{ routerElement}
      </>



    )
}

export default App
