import axios from "axios";
import { useRouter } from "next/router";
import { useState } from "react";
import styles from "../styles/Home.module.css";
export default function Home({ data }) {
  console.log(data);
  const router = useRouter();
  const [text, setText] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (text.trim() !== "") {
      router.push(`?q=${text}`);
    }
  };
  return (
    <div className={styles.bg}>
      <div className={styles.box}>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            className={styles.input}
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder={"Enter your position..."}
          />
        </form>
        <h1 className={styles.textCenter}>{data?.name}</h1>
        <div className={styles.boxTemp}>
          {Math.round(data?.main?.temp - 273.15)} Độ C
        </div>
        <h2 className={styles.textCenter}>{data.weather[0].main}</h2>
        <div className={styles.flex}>
          <h3>{data?.visibility} (m)</h3>
          <h3>{data?.wind?.speed} (m/s)</h3>
          <h3>{data?.main?.humidity} (%)</h3>
        </div>
      </div>
    </div>
  );
}

const getWeather = async (position) => {
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${
    position || "HaNoi"
  }&appid=8d484d5d7bcce56b92573204d8f12c49`;
  try {
    const res = await axios.get(url);
    return res.data;
  } catch (err) {
    console.log(err);
  }
};

export async function getServerSideProps({ query }) {
  const { q } = query;
  const data = await getWeather(q); 

  if (!data) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      data: data,
    },
  };
}
