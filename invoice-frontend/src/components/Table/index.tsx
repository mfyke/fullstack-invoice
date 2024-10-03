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
import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useGetInvoicesQuery } from '../../app/services/invoiceService';

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

function formatDate(date: Date): string {
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  const year = date.getFullYear();

  return `${month}/${day}/${year}`;
}

export default function CustomizedTables() {
  interface Invoice {
    id: string;
    vendor_name: string;
    description: string;
    due_date: string;
    amount: number;
    paid: boolean;
  }

  const [invoices, setInvoices] = useState<Invoice[]>([]);

  const { userToken }  = useSelector((state: any) => state.auth);

  const { data = [], error, isLoading } = useGetInvoicesQuery(userToken);

  useEffect(() => {
    if (data) {
      setInvoices(data);
    }
  }, [data]);

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [details, setDetails] = useState({vendor_name: '', description: '', due_date: '', amount: 0, paid: false, id: ''});

  function handleClick(vendor_name: string, description: string, due_date: string, amount: number, paid: boolean, id: string) {
    setDetails({vendor_name, description, due_date, amount, paid, id});
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
          {invoices && invoices.map((row) => (
            <StyledTableRow key={row.id} onClick={()=>handleClick(row.vendor_name, row.description, row.due_date, row.amount, row.paid, row.id)}>
                <StyledTableCell component="th" scope="row">
                  {row.vendor_name}
                </StyledTableCell>
                <StyledTableCell align="left">{row.description}</StyledTableCell>
                <StyledTableCell align="left">{formatDate(new Date(row.due_date))}</StyledTableCell>
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
            {details.vendor_name}
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            Id: {details.id}
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            Description: {details.description}
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            Due Date: {formatDate(new Date(details.due_date))}
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
