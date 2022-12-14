import * as React from 'react';
import Tab from "@mui/material/Tab";
import Tabs from "@mui/material/Tabs";
import { Alert } from '@mui/material';
import Modal from 'react-bootstrap/Modal';
import Avatar from '@mui/material/Avatar';
import Button from 'react-bootstrap/Button';
import Snackbar from '@mui/material/Snackbar';
import ListItem from '@mui/material/ListItem';
import 'bootstrap/dist/css/bootstrap.min.css';
import styles from '../styles/Home.module.css';
import TextField from "@mui/material/TextField";
import ImageIcon from '@mui/icons-material/Image';
import Autocomplete from "@mui/material/Autocomplete";
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import { FaCaretDown, FaCaretUp, FaEllipsisH, FaEye, FaPlus, FaPlusCircle } from "react-icons/fa";

export default function Home() {

  let allCoinList = []
  let mySelectedCoin = []
  const [show, setShow] = React.useState(false);
  const [coinQty, setCoinQty] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const [dataValue, setDataValue] = React.useState([]);
  const [inputValue, setInputValue] = React.useState('');
  const [openAlert, setOpenAlert] = React.useState(false);
  const [AlertMessage, setAlertMessage] = React.useState("");
  const [valueChartName, setValueChartName] = React.useState(0);
  const [AlertMessageBg, setAlertMessageBg] = React.useState("");
  const [valueChartLabel, setValueChartLabel] = React.useState(0);
  const [allDataSuggestions, setAllDataSuggestion] = React.useState([]);

  const handleShow = () => setShow(true);
  const handleClose = () => (setShow(false), setInputValue(""), setValue(""));
  const handleChangeChartName = (event) => { setValueChartName(event); };
  const handleChangeChartLabel = (event) => { setValueChartLabel(event); };
  const handleClickAlert = () => { setOpenAlert(true); };
  const handleCloseAlert = (reason) => { if (reason === 'clickaway') { return; } setOpenAlert(false); };

  {
    React.useEffect(() => {
      fetch(`https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd`)
        .then(response => response.json())
        .then(response => {
          setLoading(true)
          setAllDataSuggestion(response);
        })
        .catch(err => {
          setAlertMessageBg('danger')
          setAlertMessage(err)
        })
    }, []);
  }

  {
    allDataSuggestions.map((allDataSuggestions, i) =>
      <span style={{ display: "none" }}>{allCoinList.push(allDataSuggestions.name)}</span>
    )
  }

  {
    React.useEffect(() => {
      fetch(`http://127.0.0.1:5000/add-coin/`)
        .then(response => response.json())
        .then(response => {
          setDataValue(response);
        })
        .catch(err => {
          setAlertMessageBg('danger')
          setAlertMessage(err)
        })
    }, []);
  }

  let totalPriceList = []
  {
    dataValue.map((dataValue, i) =>
      <span style={{ display: "none" }}>{totalPriceList.push(dataValue.totalPrice)}</span>
    )
  }

  async function addCoinForm(e) {
    e.preventDefault()
    let coinName = inputValue
    let result = await fetch(`https://api.coingecko.com/api/v3/search?query=${coinName.toLowerCase()}`, {
      method: "GET"
    })
    let output = await result.json()
    let coinId = output.coins[0].id
    console.log(coinId)
    let result2 = await fetch(`https://api.coingecko.com/api/v3/coins/${coinId.replace(/\s+/g, '-').toLowerCase()}`, {
      method: "GET"
    })
    let output2 = await result2.json()
    let coinPrice = output2.market_data.current_price.usd
    let data = { coinId, coinName, coinPrice, coinQty }
    let result3 = await fetch(`http://127.0.0.1:5000/add-coin/`, {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      }
    })
    let output3 = await result3.json()
    if (output3.coinName === coinName) {
      setAlertMessageBg('success')
      setAlertMessage("Crypto Coin Added")
      handleClickAlert()
      setLoading(false)
      coinName = ""
      coinPrice = ""
      setCoinQty("")
      setInputValue("")
      setValue("")
      handleClose()
      fetch(`http://127.0.0.1:5000/add-coin`)
        .then(response => response.json())
        .then(response => {
          setLoading(true)
          setDataValue(response);
        })
        .catch(err => {
          setAlertMessageBg('danger')
          setAlertMessage(err)
        })
    } else {
      setAlertMessageBg('danger')
      setAlertMessage(output.message)
      handleClickAlert()
      coinName = ""
      coinPrice = ""
      setCoinQty("")
      setInputValue("")
      setValue("")
      handleClose()
    }
  }


  async function addCoinByPlus(coinId, coinName, coinPrice) {
    let coinQty = 1
    let data = { coinId, coinName, coinPrice, coinQty }
    let result = await fetch(`http://127.0.0.1:5000/add-coin/`, {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      }
    })
    let output = await result.json()
    if (output.coinName === coinName) {
      setAlertMessageBg('success')
      setAlertMessage("Crypto Coin Added")
      handleClickAlert()
      setLoading(false)
      fetch(`http://127.0.0.1:5000/add-coin/`)
        .then(response => response.json())
        .then(response => {
          setLoading(true)
          setDataValue(response);
        })
        .catch(err => {
          setAlertMessageBg('danger')
          setAlertMessage(err)
        })
    } else {
      setAlertMessageBg('danger')
      setAlertMessage(output.message)
      handleClickAlert()
    }
  }

  const [value, setValue] = React.useState(allCoinList[0]);


  function updatingPrice() {
    fetch(`https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd`)
      .then(response => response.json())
      .then(response => {
        setLoading(true)
        setAllDataSuggestion(response);
      })
      .catch(err => {
        setAlertMessageBg('danger')
        setAlertMessage(err)
      });
  }


  React.useEffect(() => {
    const updatingData = setInterval(() => {
      updatingPrice()
    }, 2000);
    return () => clearInterval(updatingData);
  },
    []);


  allDataSuggestions.map(cartItem => {
    return dataValue.map(item => {
      if (cartItem.name === item.coinName) {
        mySelectedCoin.push({ 'image': cartItem.image, 'name': cartItem.name, 'current_price': cartItem.current_price, 'holdings': item.coinQty, 'high24H': cartItem.high_24h, 'low24H': cartItem.low_24h })
      }
    });
  })

  return (
    <>
      <Snackbar openAlert={openAlert} autoHideDuration={5000} onClose={handleCloseAlert}>
        <Alert onClose={handleCloseAlert} className={`text-white bg-${AlertMessageBg}`}>
          {AlertMessage}
        </Alert>
      </Snackbar>
      <div className="row">
        <div className="col-xl-2 leftSidebar">
          <div className={`${styles.leftSideBarPosition}`}>
            <br />
            <ListItem className='px-0'>
              <ListItemAvatar>
                <Avatar>
                  <ImageIcon />
                </Avatar>
              </ListItemAvatar>
              <ListItemText primary="My Portfolio" style={{ marginTop: "-20px" }} />
            </ListItem>
            <h6 style={{ textAlign: "left", marginLeft: "55px", marginTop: "-28px", color: "#6D7281" }}>??? ${(totalPriceList.reduce((partialSum, a) => partialSum + a, 0))}</h6>
            <hr className='my-xl-5' />
            <h6><FaPlusCircle className="text-white mx-2" style={{ width: "20px", height: "20px" }} /> Create Portfolio</h6>
          </div>
        </div>
        <div className="col-xl-10 rightSidebar">
          <br />
          <h6 style={{ marginTop: '-10px' }}>Current Balance <FaEye className="text-white mx-2" style={{ width: "20px", height: "20px" }} /></h6>
          <div className="row">
            <div className="col-lg-6">
              <h2>${(totalPriceList.reduce((partialSum, a) => partialSum + a, 0))} <span class="text-white p-1" style={{ background: "#13C180", fontSize: "18px", borderRadius: "10px" }}><FaCaretUp className="text-white" style={{ marginTop: "-5px", fontSize: '16px' }} />0.63%</span></h2>
            </div>
            <div className="col-lg-6">
              <div className={`${styles.menuBtn}`}>
                <button class="btn btn-dark mx-1" type="button"><FaEllipsisH className="text-white mx-2" style={{ width: "20px", height: "20px" }} /> More</button>
                <button class="btn btn-primary mx-1" type="button" onClick={handleShow}><FaPlusCircle className="text-white mx-2" style={{ width: "20px", height: "20px" }} /> Add New</button>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-lg-6">
              <Tabs className='mt-4' style={{ background: "#222531", maxWidth: "320px", width: '100%', borderRadius: "10px" }}>
                <Tab label="Chart" style={{ background: `${valueChartName !== 0 ? "#222531" : "#323546"}`, color: `${valueChartName !== 0 ? "#8c8e9c" : "white"}`, borderRadius: "10px" }} onClick={() => handleChangeChartName(0)} />
                <Tab label="Allocation" style={{ background: `${valueChartName !== 1 ? "#222531" : "#323546"}`, color: `${valueChartName !== 1 ? "#8c8e9c" : "white"}`, borderRadius: "10px" }} onClick={() => handleChangeChartName(1)} />
                <Tab label="Statistic" style={{ background: `${valueChartName !== 2 ? "#222531" : "#323546"}`, color: `${valueChartName !== 2 ? "#8c8e9c" : "white"}`, borderRadius: "10px" }} onClick={() => handleChangeChartName(2)} />
              </Tabs>
            </div>
            <div className="col-lg-6">
              <div className={`${styles.graphLabelTabs}`}>
                <Tabs className='mt-4' style={{ background: "#222531", maxWidth: "450px", width: '100%', borderRadius: "10px" }}>
                  <Tab label="24H" style={{ background: `${valueChartLabel !== 0 ? "#222531" : "#323546"}`, color: `${valueChartLabel !== 0 ? "#8c8e9c" : "white"}`, borderRadius: "10px" }} onClick={() => handleChangeChartLabel(0)} />
                  <Tab label="7D" style={{ background: `${valueChartLabel !== 1 ? "#222531" : "#323546"}`, color: `${valueChartLabel !== 1 ? "#8c8e9c" : "white"}`, borderRadius: "10px" }} onClick={() => handleChangeChartLabel(1)} />
                  <Tab label="30D" style={{ background: `${valueChartLabel !== 2 ? "#222531" : "#323546"}`, color: `${valueChartLabel !== 2 ? "#8c8e9c" : "white"}`, borderRadius: "10px" }} onClick={() => handleChangeChartLabel(2)} />
                  <Tab label="90D" style={{ background: `${valueChartLabel !== 3 ? "#222531" : "#323546"}`, color: `${valueChartLabel !== 3 ? "#8c8e9c" : "white"}`, borderRadius: "10px" }} onClick={() => handleChangeChartLabel(3)} />
                  <Tab label="ALL" style={{ background: `${valueChartLabel !== 4 ? "#222531" : "#323546"}`, color: `${valueChartLabel !== 4 ? "#8c8e9c" : "white"}`, borderRadius: "10px" }} onClick={() => handleChangeChartLabel(4)} />
                </Tabs>
              </div>
            </div>
          </div>
          <img className='mt-3 img-fluid' src="https://cryptopotato.com/wp-content/uploads/2022/11/DOGEUSDT_2022-11-01_12-47-07.png" alt="#ImgNotFound" width='100%' style={{ maxHeight: '400px' }} />
          <h3 className='mt-3'>Your Assests</h3>
          {loading ?
            <>
              <table class="table" style={{ overflowY: "scroll" }}>
                <thead>
                  <tr className='text-white'>
                    <th scope="col" className={`${styles.tableColName}`}>Name</th>
                    <th scope="col" className={`${styles.tableColPrice}`}>Price ($)</th>
                    <th scope="col" className={`${styles.tableColHoldings}`}>Holdings</th>
                    <th scope="col" className={`${styles.tableColHigh24H}`}>High 24h ($)</th>
                    <th scope="col" className={`${styles.tableColLow24H}`}>Low 24h ($)</th>
                    <th scope="col" className={`${styles.tableColAction}`}>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {
                    (mySelectedCoin).map((mySelectedCoin, i) =>
                      <tr className='text-white'>
                        <td className={`${styles.tableColName}`}><img src={`${mySelectedCoin.image}`} alt="#ImgNotFound" width='30px' height="30px" />&ensp; {mySelectedCoin.name}</td>
                        <td className={`${styles.tableColPrice}`}>{mySelectedCoin.current_price.toFixed(2)}</td>
                        <td className={`${styles.tableColHoldings}`}>{mySelectedCoin.holdings}</td>
                        <td className={`${styles.tableColHigh24H} text-success`}><FaCaretUp style={{ marginTop: "-5px", fontSize: '16px' }} /> {mySelectedCoin.high24H.toFixed(2)}</td>
                        <td className={`${styles.tableColLow24H} text-danger`}><FaCaretDown style={{ marginTop: "-5px", fontSize: '16px' }} /> {mySelectedCoin.low24H.toFixed(2)}</td>
                        <td className={`${styles.tableColAction}`}><FaPlus className="text-white mx-2" style={{ width: "20px", height: "20px", cursor: "pointer" }} onClick={() => addCoinByPlus(`${mySelectedCoin.id}`, `${mySelectedCoin.name}`, `${mySelectedCoin.current_price.toFixed(2)}`)} /> </td>
                      </tr>
                    )
                  }
                </tbody>
              </table>
            </>
            :
            <>
              <div className="px-5 pt-5 text-center">
                <div class="spinner-border" role="status">
                  <span class="visually-hidden">Loading...</span>
                </div>
              </div>
            </>
          }
        </div>
      </div>

      <Modal show={show} onHide={handleClose} centered backdrop="static">
        <form onSubmit={(e) => addCoinForm(e)}>
          <Modal.Header closeButton>
            <Modal.Title>Add Coin</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Autocomplete value={value} onChange={(event, newValue) => { setValue(newValue); }} inputValue={inputValue} onInputChange={(event, newInputValue) => { setInputValue(newInputValue); }}
              id="controllable-states-demo" options={allCoinList} renderInput={(params) => <TextField {...params} label="Select Coin" required />} />
            <TextField id="outlined-basic" label="Coin Qty" variant="outlined" className='mt-3 w-100' type='number' inputProps={{ min: 1 }} onChange={(e) => setCoinQty(e.target.value)} required />
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button variant="primary" type='submit'>
              Add
            </Button>
          </Modal.Footer>
        </form>
      </Modal>
    </>
  )
}

