import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import VAPDesktop from "./VAPDesktop";
import VAPMobile from "./VAPMobile";
import { isMobile } from "../../helpers/deviceDetector";
import Loader from "../../components/Loader/Loader";

const VAP = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const { type, id } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await fetch(`https://api.jikan.moe/v4/${type}/${id}/full`);
        const result = await response.json();
        setData(result.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [type, id]);

  if (loading) return <Loader />;
  if (!data) return <div>No data available</div>;

  return isMobile() ? (
    <VAPMobile data={data} type={type} />
  ) : (
    <VAPDesktop data={data} type={type} />
  );
};

export default VAP;