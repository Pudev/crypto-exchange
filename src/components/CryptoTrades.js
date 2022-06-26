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

import Loading from "./Loading";

import {
  getBinanceTradesData,
  getKrakenTradesData,
  getHuobiTradesData,
} from "../service/exchange-api";

import { Exchanges } from "../utils/enums";

const CryptoTrades = ({ exchange, search }) => {
  const [data, setData] = useState([]);
  const [showLoading, setShowLoading] = useState(false);

  const getCryptoTrades = async (exchange, search) => {
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
    setShowLoading(true);

    getCryptoTrades(exchange, search);

    setShowLoading(false);
  }, []);

  return (
    <>
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
      <Loading show={showLoading} />
    </>
  );
};

CryptoTrades.propTypes = {
  exchange: PropTypes.string.isRequired,
  search: PropTypes.string.isRequired,
};

export default CryptoTrades;
