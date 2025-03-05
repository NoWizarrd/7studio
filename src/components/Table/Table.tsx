import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { styled } from '@mui/material/styles';
import AddIcon from '../../assets/TableAdd.png'
import DeleteIcon from '../../assets/TrashFill.png'


const MyTableContainer = styled(TableContainer)({
  backgroundColor: '#202124',
  color: '#fff',
});

const MyTableCell = styled(TableCell)({
  color: '#fff',
  borderTop: '1px solid #414144',
  borderBottom: 'none',
});

const MyTableHeadCell = styled(TableCell)({
  color: '#bbb',
  fontWeight: 'bold',
  borderBottom: '1px solid #444',
});

function createData(
  level: string,
  name: string,
  salary: number,
  equipment: number,
  overhead: number,
  profit: number
) {
  return { level, name, salary, equipment, overhead, profit };
}

const rows = [
  createData(AddIcon, 'Южная строительная площадка', 20348, 1750, 108.07, 1209122.5),
  createData(DeleteIcon, 'Фундаментальные работы', 20348, 1750, 108.07, 1209122.5),
  createData(DeleteIcon, 'Статья работы №1', 20348, 1750, 108.07, 189122.5),
  createData(DeleteIcon, 'Статья работы №2', 38200, 1200, 850, 1020000),
];

export function StyledTable() {
  return (
    <MyTableContainer>
      <Table>
        <TableHead>
          <TableRow>
            <MyTableHeadCell>Уровень</MyTableHeadCell>
            <MyTableHeadCell>Наименование работ</MyTableHeadCell>
            <MyTableHeadCell align="right">Основная з/п</MyTableHeadCell>
            <MyTableHeadCell align="right">Оборудование</MyTableHeadCell>
            <MyTableHeadCell align="right">Накладные расходы</MyTableHeadCell>
            <MyTableHeadCell align="right">Сметная прибыль</MyTableHeadCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row, index) => (
            <TableRow key={index}>
              <MyTableCell><img src={row.level} alt='addIcon'/></MyTableCell>
              <MyTableCell>{row.name}</MyTableCell>
              <MyTableCell align="right">{row.salary.toLocaleString()}</MyTableCell>
              <MyTableCell align="right">{row.equipment.toLocaleString()}</MyTableCell>
              <MyTableCell align="right">{row.overhead.toLocaleString()}</MyTableCell>
              <MyTableCell align="right">{row.profit.toLocaleString()}</MyTableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </MyTableContainer>
  );
}
