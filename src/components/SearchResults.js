import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import PropTypes from "prop-types";
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableSortLabel from "@mui/material/TableSortLabel";
import Paper from "@mui/material/Paper";
import { visuallyHidden } from "@mui/utils";

import Modal from "../components/Modal";
import CryptoDetails from "../components/CryptoDetails";

import {
  getBinanceTickerData,
  getKrakenTickerData,
  getHuobiTickerData,
  // fetchBitfinexData,
} from "../service/exchange-api";

const descendingComparator = (a, b, orderBy) => {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
};

const getComparator = (order, orderBy) => {
  return order === "desc"
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
};

const headCells = [
  {
    id: "exchange",
    label: "Exchange",
  },
  {
    id: "price",
    label: "Price",
  },
];

const EnhancedTableHead = (props) => {
  const { order, orderBy, onRequestSort } = props;
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={"left"}
            padding={"normal"}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : "asc"}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <Box component="span" sx={visuallyHidden}>
                  {order === "desc" ? "sorted descending" : "sorted ascending"}
                </Box>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
};

EnhancedTableHead.propTypes = {
  onRequestSort: PropTypes.func.isRequired,
  order: PropTypes.oneOf(["asc", "desc"]).isRequired,
  orderBy: PropTypes.string.isRequired,
};

const EnhancedTable = (props) => {
  const [order, setOrder] = useState("asc");
  const [orderBy, setOrderBy] = useState("exchange");
  const [searchResult, setSearchResult] = useState([]);
  const [showCryptoDetailModal, setShowCryptoDetailModal] = useState(false);
  const [exchange, setExchange] = useState();

  const { search } = useParams();

  const getCryptoPriceData = async (search) => {
    // setIsLoading(true);

    // CORS ERROR
    // fetchBitfinexData();
    const binanceData = await getBinanceTickerData(search);
    const krakenData = await getKrakenTickerData(search);
    const huobiData = await getHuobiTickerData(search);

    // setIsLoading(false);
    return [binanceData, krakenData, huobiData];
  };

  const initData = async () => {
    const removeCryptoPairSlash = search.replace("/", "");
    const res = await getCryptoPriceData(removeCryptoPairSlash);
    setSearchResult([...res]);
  };

  // TODO: fix rendering too many times
  useEffect(() => {
    initData();
  }, [search]);

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  return (
    <>
      <Box sx={{ width: "100%" }}>
        <Paper sx={{ width: "100%", mb: 2 }}>
          <TableContainer>
            <Table
              sx={{ minWidth: 750 }}
              aria-labelledby="tableTitle"
              size={"medium"}
            >
              <EnhancedTableHead
                order={order}
                orderBy={orderBy}
                onRequestSort={handleRequestSort}
              />
              <TableBody>
                {searchResult
                  .slice()
                  .sort(getComparator(order, orderBy))
                  .map((row, index) => {
                    return (
                      <TableRow
                        hover
                        onClick={() => {
                          setExchange(row.exchange);
                          setShowCryptoDetailModal(true);
                        }}
                        tabIndex={-1}
                        key={row.exchange}
                        style={{ cursor: "pointer" }}
                      >
                        <TableCell align="left">{row.exchange}</TableCell>
                        <TableCell align="left">{row.price}</TableCell>
                      </TableRow>
                    );
                  })}
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>
      </Box>
      <Modal
        open={showCryptoDetailModal}
        onClose={() => setShowCryptoDetailModal(false)}
      >
        <CryptoDetails exchange={exchange} search={search}/>
      </Modal>
    </>
  );
};

export default EnhancedTable;
