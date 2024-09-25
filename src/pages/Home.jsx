import Banner from "../components/Banner"
import Header from "../components/Header"
import Specialitymenu from "../components/Specialitymenu"
import TopDoctors from "../components/TopDoctors"
import Welcome from "../components/Welcome"

const Home = () => {
  return (
    <div>
      <Welcome />
      <Header />
      <Specialitymenu />
      <TopDoctors />
      <Banner />
    </div>
  )
}

export default Home