import { TableCell, TableContainer } from '@mui/material';
import { styled } from '@mui/material/styles';

export const MyTableContainer = styled(TableContainer)({
  backgroundColor: '#202124',
  color: '#fff',
});

export const MyTableCell = styled(TableCell)({
  color: '#fff',
  borderTop: '1px solid #414144',
  borderBottom: 'none',
  width: '400px',
});

export const MyTableHeadCellLeft = styled(TableCell)({
  color: '#bbb',
  fontWeight: 'bold',
  textAlign: 'left',
  borderBottom: '1px solid #444',
});

export const MyTableHeadCell = styled(TableCell)({
  color: '#bbb',
  fontWeight: 'bold',
  textAlign: 'right',
  borderBottom: '1px solid #444',
});

export const StyledInput = styled('input')({
  backgroundColor: '#202124',
  boxSizing: 'border-box',
  color: '#fff',
  padding: '5px',
  outline: '1px solid #444',
  borderRadius: '5px',
  fontSize: '14px',
  border: 'none',
  '&:focus': {
    outline: '1px solid white',
  },
});