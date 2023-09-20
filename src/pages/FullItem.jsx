import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

const FullItem = () => {
  const [item, setItem] = useState();
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchItem() {
      try {
        const { data } = await axios.get(
          "https://64dc883ce64a8525a0f6a48c.mockapi.io/items/" + id
        );
        setItem(data);
      } catch (error) {
        alert("ошибка при получении товара");
        navigate("/");
      }
    }

    fetchItem();
  }, []);

  if (!item) {
    return "Загрузка товара...";
  }

  return (
    <div>
      <img src={item.imageUrl}></img>
      <h2>{item.title}</h2>
      <h4>{item.price} Р</h4>
    </div>
  );
};

export default FullItem;
