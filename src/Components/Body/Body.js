import React, { useEffect, useState } from "react";
import style from "./Body.module.css";
import { Card } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

function Body() {
  const [location, setLocation] = useState({
    loaded: false,
    coordinates: { lat: "", lng: "" },
});
  
const onSuccess = (location) => {
  setLocation({
      loaded: true,
      coordinates: {
          lat: location.coords.latitude,
          lng: location.coords.longitude,
      },
  });
};

const onError = (error) => {
  setLocation({
      loaded: true,
      error: {
          code: error.code,
          message: error.message,
      },
  });
};

  function getLocation(){
    navigator.geolocation.getCurrentPosition(onSuccess, onError);
  }
  
  return (
    <div className={`${style.Body} container`}>
      <div className={style.row}>
      <div className={`${style.text_area} col-12 col-md-3`}>
            
            <h1 className={style.text_bold}>
              Shop from your Near Store
            </h1>
          </div>
           
          <div className={style.location}>
                <i class="fas fa-map-marker-alt"></i>
               
                { location.loaded ?
                <input
                  class={style.input_icons}
                  type="text"
                  
                  name=""
                  id=""
                  value={`${JSON.stringify(location)}`}
                />
                :
                <input
                  class={style.input_icons}
                  type="text"
                  placeholder="Current Location"
                  name=""
                  id=""
                   onClick={getLocation}
                />
                }
            </div>
          <div className="col-12 col-md-9">
            <img className={`${style.image}`} src="/images/favpng.png" alt="" />
          </div>
      </div>
      <h1>&nbsp;</h1>
      <div className="row">
          <div className={style.feature}>
            <div className={style.titleOne}>
              <h1 className={style.titleTwo}>AMAZING FEATURES</h1>
            </div>
          </div>
          <div className= {`${style.cardIn} col-12 col-md-6`} style={{marginTop:"80px"}}>
          <Card style={{ border:"none" }}>
              <Card.Body style={{backgroundColor:"#e2e5e6"}}>
              <img src='/images/PikPng.png' style={{width:'121px',height:'96px',float:"left"}} alt='' />
                <Card.Title><h2>Find Local Stores</h2></Card.Title>
                <Card.Text>
               <h6> Based on your location,<br/> BuyNearby App shows local stores of various<br/> categories accepting orders and delivering around you.</h6>
                </Card.Text>
              </Card.Body>
            </Card> 
          </div>
          <div className={`${style.cardIn} col-12 col-md-6`} style={{marginTop:"80px"}}>
          <Card style={{ border:"none" }}>
              <Card.Body style={{backgroundColor:"#e2e5e6"}}>
              <img src='/images/PikPng.png' style={{width:'121px',height:'96px',float:"left"}} alt='' />
                <Card.Title><h2>Accept Substitutes</h2></Card.Title>
                <Card.Text>
                <h6>In case your specific item isn’t available,<br/> you can choose from the substitutes suggested <br/> by your merchant.</h6>
                </Card.Text>
              </Card.Body>
            </Card> 
          </div>
          <div className={`${style.cardIn} col-12 col-md-6`} style={{marginTop:"80px"}}>
          <Card style={{ border:"none" }}>
              <Card.Body style={{backgroundColor:"#e2e5e6"}}>
              <img src='/images/PikPng.png' style={{width:'121px',height:'96px',float:"left"}} alt='' />
                <Card.Title><h2>Schedule Your Deliveries</h2></Card.Title>
                <Card.Text>
               <h6>Receive your orders at your convenience. <br/> You can schedule your order delivery <br/>for up to next three days.</h6>
                </Card.Text>
              </Card.Body>
            </Card> 
          </div>
          <div className={`${style.cardIn} col-12 col-md-6`} style={{marginTop:"80px"}}>
          <Card style={{ border:"none" }}>
              <Card.Body style={{backgroundColor:"#e2e5e6"}}>
              <img src='/images/PikPng.png' style={{width:'121px',height:'96px',float:"left"}} alt='' />
                <Card.Title><h2>Pay Online On Delivery</h2></Card.Title>
                <Card.Text>
                <h6>Not just cash, you can now conveniently<br/>  pay online on delivery using credit card, debit  <br/> card or net banking.</h6>
                </Card.Text>
              </Card.Body>
            </Card> 
          </div>
          <div className={`${style.cardIn} col-12 col-md-6`} style={{marginTop:"80px"}}>
          <Card style={{ border:"none" }}>
              <Card.Body style={{backgroundColor:"#e2e5e6"}}>
              <img src='/images/PikPng.png' style={{width:'121px',height:'96px',float:"left"}} alt='' />
                <Card.Title><h2>Track Your Orders</h2></Card.Title>
                <Card.Text>
                <h6>Know when your order is going to be delivered.<br/> You can track order status right from <br/> order confirmation to home delivery.</h6>
                </Card.Text>
              </Card.Body>
            </Card> 
          </div>
          <div className={`${style.cardIn} col-12 col-md-6`} style={{marginTop:"80px"}}>
          <Card style={{ border:"none",display:"flex",justifyContent:"end" }}>
              <Card.Body style={{backgroundColor:"#e2e5e6"}}>
              <img src='/images/PikPng.png' style={{width:'121px',height:'96px',float:"left"}} alt='' />
                <Card.Title><h2>24X7 Order Placement</h2></Card.Title>
                <Card.Text style={{padding:"10px"}}>
                <h6>Now with 24x7 Order facility available,<br/> you can place your order on BuyNearby <br/>app anytime you want.</h6>
                </Card.Text>
              </Card.Body>
            </Card> 
          </div>
          <h1>&nbsp;</h1>
        </div>

      <div className="row">
        <div className={style.feature}>
          <div className={style.titleOne}>
            <h1 className={style.titleTwo}>AWESOME BENEFITS</h1>
          </div>
        </div>
        <div
          className={`${style.cardIn} col-12 col-md-4`}
          style={{
            display: "flex",
            justifyContent: "center",
            marginTop: "80px",
          }}
        >
          <Card
            style={{
              width: "28rem",
              backgroundColor: "#e2e5e6",
              border: "none",
            }}
          >
            <Card.Img
              variant="top"
              style={{ width: "51%", alignSelf: "center" }}
              src="/images/PikPng.png"
            />
            <Card.Body>
              <Card.Title>
                <h3>Order Anything You Want</h3>
              </Card.Title>
              <Card.Text>
                Conveniently order essentials, groceries and a whole variety of
                products – branded or unbranded – from your nearest stores. Find
                which store is known for what and order from the best.
              </Card.Text>
            </Card.Body>
          </Card>
        </div>
        <div
          className={`${style.cardIn} col-12 col-md-4`}
          style={{
            display: "flex",
            justifyContent: "center",
            marginTop: "80px",
          }}
        >
          <Card
            style={{
              width: "28rem",
              backgroundColor: "#e2e5e6",
              border: "none",
            }}
          >
            <Card.Img
              variant="top"
              style={{ width: "51%", alignSelf: "center" }}
              src="/images/PikPng.png"
            />
            <Card.Body>
              <Card.Title>
                <h3>Order Smartly.No Confusions</h3>
              </Card.Title>
              <Card.Text>
                Avoid the order confusions and mismatches that generally happen
                over a phone call. Now, confirm all order specifications and
                modifications on the app, and get only the perfect orders
                delivered.
              </Card.Text>
            </Card.Body>
          </Card>
        </div>

        <div
          className={`${style.cardIn} col-12 col-md-4`}
          style={{
            display: "flex",
            justifyContent: "center",
            marginTop: "80px",
          }}
        >
          <Card
            style={{
              width: "28rem",
              backgroundColor: "#e2e5e6",
              border: "none",
            }}
          >
            <Card.Img
              variant="top"
              style={{ width: "51%", alignSelf: "center" }}
              src="/images/PikPng.png"
            />
            <Card.Body>
              <Card.Title>
                <h3>Get Better Discounts & Offers</h3>
              </Card.Title>
              <Card.Text>
                Save more by easily checking which nearby store is offering
                relevant discounts and offers before you purchase your staples.
              </Card.Text>
            </Card.Body>
          </Card>
        </div>
        <h1>&nbsp;</h1>
      </div>
      <div className={style.feature}>
        <div className={style.titleOne}>
          <h1 className={`${style.titleTwo} col-12`}>HOW IT WORKS</h1>
        </div>
      </div>
      <h6 className={style.text}>
        Find your current location. enter the products you need to buy in the
        column given. The website automatically finds out the shops nearby your
        location which have the particular items in the shop. then it will show
        you some of the plan by which you can easily shop the items you
        required. this is how the shop near works for you.
      </h6>
    </div>
  );
}

export default Body;
