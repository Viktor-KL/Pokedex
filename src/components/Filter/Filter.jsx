import React, { useState, useEffect } from "react";
import styles from "./Filter.module.scss";

export default function Filter({ handleTypesClick }) {
  const [types, setTypes] = useState([]);
  const [selectedTypes, setSelectedTypes] = useState([]);

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

  const handleChange = (value) => {
    let oldSelectedTypes = [...selectedTypes];
    if (selectedTypes.includes(value)) {
      oldSelectedTypes = oldSelectedTypes.filter((item) => item !== value);
    } else {
      oldSelectedTypes.push(value);
    }
    setSelectedTypes(oldSelectedTypes);
  };

  return (
    <section className={styles.wrapper}>
      {types.map((item, key) => (
        <div
          key={key}
          style={
            selectedTypes.includes(item.name)
              ? { background: "#6C6A73", borderRadius: "8px", color: "#fff" }
              : {}
          }
        >
          <input
            type="checkbox"
            hidden
            value={item.name}
            onChange={(e) => handleChange(e.target.value)}
            id={`checkbox_${item.name}`}
          />
          <label htmlFor={`checkbox_${item.name}`} className={styles.type}>
            {item.name}
          </label>
        </div>
      ))}
      <button
        className={styles.button}
        onClick={() => handleTypesClick(selectedTypes)}
      >
        search type
      </button>
    </section>
  );
}
