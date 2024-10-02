import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { useState } from 'react';

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
}


const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

function createData(
  id: string,
  payee: string,
  description: string,
  dueDate: string,
  amount: number,
  paid: boolean
) {
  return { id, payee, description, dueDate, amount, paid };
}

const rows = [
  createData('1','Amazon', "Purchases", "5/12/2025", 100.25, false),
  createData('2', 'Costco', "Purchases", "7/12/2025", 500, true),
  createData('3','Home Depot', "Rental", "7/12/2025", 225.75, false),
  createData('4','US Foods', "Purchases", "8/12/2025", 465, true),
  createData('5','Walmart', "Purchases", "8/12/2025", 100.25, false),
  createData('6','Target', "Purchases", "8/12/2025", 100.25, false),
];

export default function CustomizedTables() {

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [details, setDetails] = useState({payee: '', description: '', dueDate: '', amount: 0, paid: false});

  function handleClick(payee: string, description: string, dueDate: string, amount: number, paid: boolean) {
    setDetails({payee, description, dueDate, amount, paid});
    handleOpen();
  }

  return (
  <>
    <TableContainer sx={{ my: 5 }} component={Paper}>
      <Table sx={{ minWidth: 700 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell align="left">Payee</StyledTableCell>
            <StyledTableCell align="left">Description</StyledTableCell>
            <StyledTableCell align="left">Due Date</StyledTableCell>
            <StyledTableCell align="left">Amount</StyledTableCell>
            <StyledTableCell align="left">Paid</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <StyledTableRow key={row.id} onClick={()=>handleClick(row.payee, row.description, row.dueDate, row.amount, row.paid)}>
                <StyledTableCell component="th" scope="row">
                  {row.payee}
                </StyledTableCell>
                <StyledTableCell align="left">{row.description}</StyledTableCell>
                <StyledTableCell align="left">{row.dueDate}</StyledTableCell>
                <StyledTableCell align="left">{`$${row.amount}`}</StyledTableCell>
                <StyledTableCell align="left">{row.paid.toString()}</StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            {details.payee}
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            Description: {details.description}
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            Due Date: {details.dueDate}
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            Amount: ${details.amount}
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            Paid: {details.paid.toString()}
          </Typography>
        </Box>
      </Modal>
    </div>
  </>
    
  );
}
