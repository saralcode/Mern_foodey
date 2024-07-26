import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Card from "../components/Card";
// import Carousel from "../components/Carousel";

export default function Home() {
  const [search,setsearch]= useState("");
  const [fooditem, setfooditem] = useState([]);
  const [foodcat, setfoodcat] = useState([]);

  const loadData = async () => {
    let response = await fetch("http://localhost:5000/api/foodData", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });

    response = await response.json();

    // console.log(response[0],response[1]);
    setfooditem(response[0]);
    setfoodcat(response[1]);
  };

  useEffect(() => {
    loadData();
  }, []);

  return (
    <div>
      <div>
        <Navbar />
      </div>
      <div>
      <div
        id="carouselExampleFade"
        className="carousel slide carousel-fade"
        data-bs-ride="carousel"
          style={{objectFit: "contain !important"}}
        //   style={{background: "contain", backgroundPosition: "center"}}
        >
        <div className="carousel-inner" id="carousel" >
          <div className="carousel-caption" style={{ zIndex: "10"}}  >
            <div className="d-flex justify-content-center">
              <input
                className="form-control me-2"
                type="search"
                placeholder="Search"
                aria-label="Search"
                value={search}
                onChange={(e)=>{
                  setsearch(e.target.value)
                }}


              />
              {/* <button
                className="btn btn-outline-success text-white"
                type="submit"
              >
                Search
              </button> */}
            </div>
          </div>
          <div className="carousel-item active" >
            <img
              src="https://source.unsplash.com/random/250×250/?pizza"
              style={{ filter: "brightness(30%)" , height: "500px", objectFit:"cover"}}
              className="d-block w-100"
              alt="..."
            />
          </div>
          <div className="carousel-item" >
            <img
              src="https://source.unsplash.com/random/250×250/?burger"
              style={{ filter: "brightness(30%)" , height: "500px", objectFit:"cover"}}
              className="d-block w-100"
              alt="..."
            />
          </div>
          <div className="carousel-item">
            <img
              src="https://source.unsplash.com/random/250×250/?pastry"
              style={{ filter: "brightness(30%)" , height: "500px", objectFit:"cover"}}
              className="d-block w-100"
              alt="..."
            />
          </div>
        </div>
        <button
          className="carousel-control-prev"
          type="button"
          data-bs-target="#carouselExampleFade"
          data-bs-slide="prev"
        >
          <span
            className="carousel-control-prev-icon"
            aria-hidden="true"
          ></span>
          <span className="visually-hidden">Previous</span>
        </button>
        <button
          className="carousel-control-next"
          type="button"
          data-bs-target="#carouselExampleFade"
          data-bs-slide="next"
        >
          <span
            className="carousel-control-next-icon"
            aria-hidden="true"
          ></span>
          <span className="visually-hidden">Next</span>
        </button>
      </div>
      </div>

      <div className="container">
        {(foodcat !== []) ? (
          foodcat.map((data) => {
            return (
              <div className="row mb-3">
                <div key={data._id} className="fs-3 m-3">
                  {data.CategoryName}
                </div>
                <hr />
                {fooditem !== [] ? (
                  fooditem
                    .filter((item) => item.CategoryName === data.CategoryName && item.name.toLowerCase().includes(search))
                    .map((filteritems) => {
                      return (
                        <div
                          key={filteritems._id}
                          className="col-12 col-md-6 col-lg-3"
                        >
                          <Card
                            fooditem={filteritems}
                            options={filteritems.options[0]}
                            // foodname={filteritems.name}
                            // imgsrc={filteritems.img}
                          ></Card>
                        </div>
                      );
                    })
                ) : (
                  <div>""""""</div>
                )}
              </div>
            );
          })
        ) : (
          <div>""""""""</div>
        )}
      </div>
      <div>
        <Footer />
      </div>
    </div>
  );
}