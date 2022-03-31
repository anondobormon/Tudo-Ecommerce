import { TableBody } from "@mui/material";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { Link } from "react-router-dom";
import "./Tables.scss";

const Tables = ({ data }) => {
  console.log(data);
  return (
    <TableContainer component={Paper} className="table">
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell align="left">S/L</TableCell>
            <TableCell>Truck Id</TableCell>
            <TableCell align="left">Quantity</TableCell>
            <TableCell align="left">Status</TableCell>
            <TableCell align="left">Payment Status</TableCell>
            <TableCell align="left">Total Price</TableCell>
            <TableCell align="left">Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data &&
            data.map((row, index) => (
              <TableRow
                key={row._id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {index + 1}
                </TableCell>
                <TableCell component="th" scope="row">
                  {row._id}
                </TableCell>
                <TableCell component="th" align="left" scope="row">
                  {row.orderItems.length}
                </TableCell>
                <TableCell component="th" align="left" scope="row">
                  <span
                    className={
                      row.orderStatus === "Processing"
                        ? "processing"
                        : "success"
                    }
                  >
                    {row.orderStatus}
                  </span>
                </TableCell>
                <TableCell component="th" align="left" scope="row">
                  <span
                    className={
                      row.paymentInfo.status === "Processing"
                        ? "processing"
                        : "success"
                    }
                  >
                    {row.paymentInfo.status}
                  </span>
                </TableCell>
                <TableCell component="th" align="left" scope="row">
                  {row.totalPrice}
                </TableCell>
                <TableCell component="th" align="middle" scope="row">
                  <div className="actions">
                    <Link to={`/order/${row._id}`} className="view">
                      View
                    </Link>
                    <span className="edit">Edit</span>
                  </div>
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default Tables;
