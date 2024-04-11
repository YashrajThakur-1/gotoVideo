import React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
const TableUi = () => {
  const rows = [
    {
      actions: "created",
      destinationUrl:
        "https://www.youtube.com/watch?v=3pEorfqO8n4&list=RD3pEorfqO8n4&start_radio=1",
      activeDates: "Oct 9, 2023 - Today",
    },

    {
      actions: "created",
      destinationUrl:
        "https://www.youtube.com/watch?v=3pEorfqO8n4&list=RD3pEorfqO8n4&start_radio=1",
      activeDates: "Oct 8, 2023 - yesterday",
    },
    {
      actions: "created",
      destinationUrl:
        "https://www.youtube.com/watch?v=3pEorfqO8n4&list=RD3pEorfqO8n4&start_radio=1",
      activeDates: "Oct 1, 2023 ",
    },
  ];
  return (
    <div className="flex flex-col gap-3">
      <div className="text-[23px] font-bold">
        Changes to go2.video/test_youtube
      </div>
      <div>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell style={{ fontWeight: "bold" }}>Actions</TableCell>
                <TableCell style={{ fontWeight: "bold" }}>
                  Destination URL
                </TableCell>
                <TableCell style={{ fontWeight: "bold" }}>
                  Dates active
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row) => (
                <TableRow
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell>{row.actions}</TableCell>
                  <TableCell>{row.destinationUrl}</TableCell>
                  <TableCell>{row.activeDates}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </div>
  );
};

export default TableUi;
