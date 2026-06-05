import {Routes, Route} from "react-router";
import LoginPage from "@/pages/public/LoginPage"

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<LoginPage />} />
    </Routes>
  )
}

export default App
