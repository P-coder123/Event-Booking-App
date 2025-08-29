import Home from "./components/Navbaar"
import Form from "./components/Footer"


function App() {
 

  return (
    <>
      <h1 className="flex justify-center bg-purple-500 font-sans font-extrabold text-4xl text-white">Event Booking App</h1>
      <Home/>
      <Form/>
    </>
  )
}

export default App
