import React, { useState, useEffect } from "react";
import axios from "axios";
import Card from "../Card/Card";
import Carousel from "../Carousel/Carousel";
import styles from "./Section.module.css";

function Section({
  title,
  apiEndpoint,
  hasShowAll = true,
  type = "album",
  component,
  overrideData,
  filter, // <-- get filter from props
}) {
  const [data, setData] = useState([]);
  const [isCollapsed, setIsCollapsed] = useState(false);

  const filteredData =
  type === "song" && filter && filter !== "all"
    ? data.filter((item) => item.genre.key === filter)
    : data;

  useEffect(() => {
    if (overrideData) {
      setData(overrideData);
      return;
    }

    if (apiEndpoint) {
      async function fetchData() {
        try {
          const response = await axios.get(apiEndpoint);
          setData(response.data);
        } catch (error) {
          console.error(`Error fetching ${title} data:`, error);
        }
      }
      fetchData();
    }
  }, [apiEndpoint, title, overrideData]);

  const toggleView = () => {
    setIsCollapsed(!isCollapsed);
  };

  return (
    <div
      className={styles.section}
      style={type === "song" ? { backgroundColor: "black", color: "white", padding: "1rem" } : {}}
    >
      <div className={styles.header}>
        <h3 style={type === "song" ? { color: "white" } : {}}>{title}</h3>
        {hasShowAll && type !== "song" && (
          <button className={styles.collapseButton} onClick={toggleView}>
            {isCollapsed ? "Collapse" : "Show all"}
          </button>
        )}
      </div>

      {component}

      {type === "song" ? (
        <Carousel data={filteredData} type={type} />
      ) : isCollapsed ? (
        <div className={styles.cardGrid}>
          {filteredData.map((item) => (
            <Card key={item.id} data={item} isSong={false} />
          ))}
        </div>
      ) : (
        <Carousel data={filteredData} type={type} />
      )}
    </div>

  );
}


export default Section;
