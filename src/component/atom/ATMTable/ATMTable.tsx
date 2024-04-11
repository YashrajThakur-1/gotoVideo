import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";

// Define the ATMTableProps type
type ATMTableProps = {
  columns: TableColumn[];
  rows: Array<{ [key: string]: any }>;
};

type TableColumn = {
  label: string;
  key: string;
  render?: (data: any, row: any) => React.ReactNode;
};

const ATMTable = ({ columns, rows }: ATMTableProps) => {
  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            {columns.map((column, index) => (
              <TableCell key={index}>{column.label}</TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row, rowIndex) => (
            <TableRow key={rowIndex}>
              {columns.map((column, columnIndex) => (
                <TableCell key={columnIndex}>
                  {column.render
                    ? column.render(row[column.key], row)
                    : row[column.key]}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default ATMTable;
