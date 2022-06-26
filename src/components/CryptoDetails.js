import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getBinanceTickerDetailsData } from "../service/exchange-api";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

import Loading from "./Loading";

import { roundPrice } from "../utils/helper";

const CryptoDetails = () => {
  const { search } = useParams();
  const [data, setData] = useState();
  const [showLoading, setShowLoading] = useState(false);

  const initData = async () => {
    setShowLoading(true);

    const result = await getBinanceTickerDetailsData(search);

    setShowLoading(false);
    setData(result);
  };

  useEffect(() => {
    initData();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 400 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Current Price</TableCell>
              <TableCell>Price change %</TableCell>
              <TableCell>Lowest price</TableCell>
              <TableCell>Highest price</TableCell>
              <TableCell>Volume</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell>{roundPrice(data?.lastPrice)}</TableCell>
              <TableCell>{roundPrice(data?.priceChangePercent)}</TableCell>
              <TableCell>{roundPrice(data?.lowPrice)}</TableCell>
              <TableCell>{roundPrice(data?.highPrice)}</TableCell>
              <TableCell>{data?.volume}</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
      <Loading show={showLoading} />
    </>
  );
};

export default CryptoDetails;
