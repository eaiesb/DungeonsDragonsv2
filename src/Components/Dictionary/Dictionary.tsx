import "../DungeonsData/Dungeons.css";
import "../../App.css";
import * as React from "react";
import getAllRecords, { getNameRecords } from '../../Middleware/get-api';
import PreviewDialogue from "../PreviewDialogue/PreviewDialogue";
import { Button, Card, CardActions, CardContent, CardMedia, Typography } from "@mui/material";
import { CartContext } from "../Context/cartContext";
import { useContext } from "react";
import { red } from "@mui/material/colors";
import FavoriteIcon from '@mui/icons-material/Favorite';
import { Link } from "react-router-dom";
import BookmarksIcon from '@mui/icons-material/Bookmarks';

interface  Item {
  index : string,
  url : string,
  name : string;
};

export default function Dictionary() 
{

  const [items, setItems] = React.useState([]);

  const [rowsData,setRowsData]= React.useState([]); // For Payload to Dialog Rows

  const [errorMessage,setErrorMessage]= React.useState(""); // For the api error message
  
  const [expanded, setExpanded] = React.useState(false);

  const onExpand = () => {setExpanded(!expanded)};
  
  // For Error handling
  const onErrorClose = () => {setOnError(false);};
  const [onError,setOnError]= React.useState(false);
  const errorAlert = () => {setOnError(true)};

  // For Preview Dialoge
  const onClose = () => {setPreviewOpen(false)};
  const [previewOpen, setPreviewOpen] = React.useState(false);
  
  const onNameClick=(name : string)=>
  {
    getNameRecords(name).then(response =>
    {
      setRowsData(response.data)
      setPreviewOpen(true)
      }).catch((error)=>
      {
        errorAlert()
        setErrorMessage(error.message)
      });
  }
// Setting api response to the rows along with Error Response

  const resultData = React.useMemo(async () =>{
      const response = await getAllRecords();
      setItems(response.data.results);},[]).catch((error)=>
        {
          errorAlert()
          setErrorMessage(error.message)
        });

  const { cartItems, setCartItems } = useContext(CartContext);

  const addItemToCart = (item: Item) => {
      setCartItems([...cartItems, item]);
    };


  return (
    <div>
      <div className="header">
        <h1>The 5th Edition Dungeons and Dragons API / Cards</h1>
      </div>
      <div style={{width : 'auto', display: 'flex', alignContent: "flex-end"}}>
        <Link className="nav-link" style={{marginLeft : 'auto'}} to="/cart">
        <BookmarksIcon /> Go to Favorites
        </Link>
      </div>
        <div className="grid">
          {items.map((item:Item) => {
            return (
              <Card key={item.index} sx={{ minWidth: 275, border : red }}>
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
                <CardActions>
                  <Button size="small" onClick={()=>onNameClick(item.index)}>View</Button>
                  <Button size="large" onClick={() => addItemToCart(item)} > <FavoriteIcon /> </Button>
                </CardActions>
              </Card>
            );
          })}
      </div>
      <PreviewDialogue onError={onError} rowsData={rowsData} expanded={expanded} onExpand={onExpand} onClose={onClose} onErrorClose={onErrorClose} previewOpen={previewOpen} errorMessage={errorMessage} />
    </div>
  );
}
