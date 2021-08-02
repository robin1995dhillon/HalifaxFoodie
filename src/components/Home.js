import React, { useEffect, useState } from "react";
import "bootstrap";
import "react-bootstrap";
import { Alert } from "bootstrap";
import { useHistory } from "react-router-dom";

function Home() {
  const [restaurant, setRestaurant] = useState("HF");
  const [status, setStatus] = useState(false);
  const [itemsArray, setItemsArray] = useState([]);
  const history = useHistory();
  let name = "";
  useEffect(() => {
    onLoad();
  }, []);

  async function onLoad() {
    if (!localStorage.getItem("idToken")) {
      history.push("/login");
    }
  }
  const handleChange = (event) => {
    setRestaurant(event.target.value);
    setStatus(true);
  };

  const handleSubmit = (event) => {
    //event.preventDefault();
    console.log("Your favorite restaurant is: ", restaurant);

    alert("Your Order is placed succesfully");
  };

  const handleselect = (event) => {
    console.log("The food item selected is: ");
    name = event.target.value;
    console.log("The food Item is:", name);
    setItemsArray([...itemsArray, name]);
  };

  console.log("The items are:", itemsArray);

  return (
    <div>
      {status ? (
        <>
          <form onSubmit={handleSubmit}>
            <label>
              Pick your favorite Restaurant:
              <br />
              <br />
              <select name="rest" id="rest" onChange={handleChange}>
                <option value="HF">HF Restaurant</option> {" "}
                <option value="NS">NS Restaurant</option>
              </select>
            </label>
            <input type="submit" value="Submit" />
            <br />
            <br />
            <input
              type="checkbox"
              id="Item3"
              name="Item3"
              value="Chicken Roll"
              onChange={handleselect}
            />
            <label htmlFor="Item3"> Chicken Roll</label>
            <br />
            <input
              type="checkbox"
              id="Item1"
              name="Item1"
              value="Burger"
              onChange={handleselect}
            />
            <label htmlFor="Item1"> Burger</label>
            <br />
            <input
              type="checkbox"
              id="Item2"
              name="Item2"
              value="Pizza"
              onChange={handleselect}
            />
            <label htmlFor="Item2"> Pizza</label>
            <br />
          </form>
        </>
      ) : (
        <div>
          <form onSubmit={handleSubmit}>
            <label>
              Pick your favorite Restaurant:
              <br />
              <br />
              <select name="rest" id="rest" onChange={handleChange}>
                <option value="HF">HF Restaurant</option> {" "}
                <option value="NS">NS Restaurant</option>
              </select>
            </label>
            <input type="submit" value="Submit" />
            <br />
            <br />
          </form>
        </div>
      )}
    </div>
  );
}

export default Home;
