import HeadSwiper from "../components/HeadSwiper/HeadSwiper";
import GamesSection from "../components/GamesSection/GamesSection";
import styles from "./HomePage.module.css";
import Header from "../components/shared/Header";

const HomePage = () => {
  return (
    <div className={styles.homePage}>
        <Header />
        <HeadSwiper />
        <GamesSection />
    </div>
  );
};

export default HomePage;
