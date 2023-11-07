import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { blue, green, grey, red } from "@mui/material/colors";
import React from "react";
import { useOutletContext } from "react-router-dom";
import Buttonn from "./Buttonn";

const OrdersTable = () => {
  const [orderTable, setOrderTable] = useOutletContext();
  const status = {
    processed: { color: green[300], text: "انجام شده" },
    processing: { color: blue[300], text: "در حال انجام" },
    notProcess: { color: red[300], text: "انجام نشده" },
  };
  return (
    <TableContainer sx={{ borderRadius: "8px 8px 0 0" }}>
      <Table>
        <TableHead style={{ backgroundColor: grey[800] }}>
          <TableRow>
            <TableCell align="right">تاریخ سفارش</TableCell>
            <TableCell align="right">وضعیت</TableCell>
            <TableCell align="right">مجموع</TableCell>
            <TableCell align="center">جزئیات</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {orderTable &&
            orderTable.map((i) => (
              <TableRow key={i.id}>
                <TableCell>
                  <Typography>{i.date}</Typography>
                </TableCell>
                <TableCell>
                  <Typography color={status[i.status].color}>
                    {status[i.status].text}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Box display={"flex"}>
                    <Typography>{i.sumPrices}</Typography>
                    <Typography
                      fontWeight={200}
                      marginRight={1}
                      color={grey[400]}
                    >
                      {i.sumProducts}
                    </Typography>
                  </Box>
                </TableCell>
                <TableCell>
                  <Box sx={{ display: "flex", justifyContent: "center" }}>
                    <Buttonn variant="contained" color={"success"}>
                      نمایش
                    </Buttonn>
                  </Box>
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default OrdersTable;
