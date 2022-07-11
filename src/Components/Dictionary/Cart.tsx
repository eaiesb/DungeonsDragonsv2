import { Button, Card, CardContent, CardMedia, Typography } from "@mui/material";
import { useContext } from "react";
import { Link } from "react-router-dom";
import { CartContext } from "../Context/cartContext";

interface  Item {
    index : string,
    url : string,
    name : string;
  };
  
const Cart = () => {
    const { cartItems } = useContext(CartContext);

    return (
      <>
        <div style={{ marginLeft: "20px", marginRight: "20px" }}>
          <h1>Favorites</h1>
          <div style={{width : 'auto', display: 'flex', alignContent: "flex-end"}}>
            <Link className="nav-link" style={{marginLeft : 'auto'}} to="/dictionary"> <Button variant="contained">Back To Dictionary</Button>
            </Link>
          </div>
          <div className="grid">
            {cartItems.map((item : Item) => {
              return (
                <Card key={item.index} sx={{ minWidth: 275 }}>
                  <CardContent>
                  <CardMedia
                    component="img"
                    image="https://www.apkdownloadhunt.com/wp-content/uploads/2021/08/Oxford-Dictionary-App-Free-Download.png"
                    alt="green iguana"/>
                    <Typography variant="h5" component="div">
                      {item.name}
                    </Typography>
                    <Typography sx={{ mb: 1.5 }} color="text.secondary">
                      {item.url}
                    </Typography>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </>
    );
  };
  
  export default Cart;
  