import React, { useState, useEffect } from "react";
import styles from "./Filter.module.scss";

export default function Filter() {
  const [types, setTypes] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("https://pokeapi.co/api/v2/type");
        const data = await response.json();
        setTypes(data.results);
        console.log(data);
      } catch (error) {
        console.log("Error fetching data: ", error);
      }
    };

    fetchData();
  }, []);


  return (
    <section className={styles.wrapper}>
      {types.map((item, key) => (
        <div className={styles.type} key={key}>
          {item.name}
        </div>
      ))}
    </section>
  );
}
