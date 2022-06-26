import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import PropTypes from "prop-types";

import {
  getBinanceTradesData,
  getKrakenTradesData,
  getHuobiTradesData,
} from "../service/exchange-api";

import { Exchanges } from "../utils/enums";

const CryptoDetails = () => {
  const { search } = useParams();

  const [data, setData] = useState([]);

  const getCryptoTradesDetails = async (exchange, search) => {
    let res = [];
    switch (exchange) {
      case Exchanges.Binance:
        res = await getBinanceTradesData(search);
        break;
      case Exchanges.Kraken:
        res = await getKrakenTradesData(search);
        break;
      case Exchanges.Huobi:
        res = await getHuobiTradesData(search);
        break;
      default:
        res = [];
        break;
    }

    setData([...res]);
  };
  useEffect(() => {
    // setIsLoading(true);
    
    // TODO: Exhange ????
    getCryptoTradesDetails('Binance', search);
    
    // setIsLoading(false);
    // setShowCryptoDetailModal(true);
  }, []);

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 400 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Amount</TableCell>
            <TableCell>Price</TableCell>
            <TableCell>Sell/Buy</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((row, index) => (
            <TableRow
              key={index}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell>{row.amount}</TableCell>
              <TableCell>{row.price}</TableCell>
              <TableCell>{row.direction}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

CryptoDetails.propTypes = {
  data: PropTypes.array.isRequired,
};

export default CryptoDetails;
