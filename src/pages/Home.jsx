import Banner from "../components/Banner"
import Header from "../components/Header"
import Specialitymenu from "../components/Specialitymenu"
import TopDoctors from "../components/TopDoctors"

const Home = () => {
  return (
    <div>
      <Header />
      <Specialitymenu />
      <TopDoctors />
      <Banner />
    </div>
  )
}

export default Home