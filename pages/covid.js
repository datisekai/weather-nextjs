import axios from "axios";
import styles from "../styles/Home.module.css";

const Covid = ({ data }) => {
  console.log(data);
  return (
    <div className={styles.bgCovid}>
      {data?.map((item) => (
        <div className={styles.itemGrid}>
          <h3> Country": {item.Country},</h3>
          <h3> "CountryCode": {item.CountryCode}</h3>

          <h3> "Lat": {item.Lat},</h3>
          <h3>"Lon": {item.Lon},</h3>
          <h3>"Cases": {item.Cases},</h3>
          <h3>"Status": {item.Status},</h3>
          <h3> "Date": {item.Date}</h3>
        </div>
      ))}
    </div>
  );
};

export default Covid;

export async function getStaticProps(context) {
  const res = await axios.get(
    `https://api.covid19api.com/dayone/country/VietNam/status/confirmed`
  );
  return {
    props: {
      data: res.data,
    }, // will be passed to the page component as props
  };
}
