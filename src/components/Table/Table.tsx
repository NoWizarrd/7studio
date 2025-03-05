import React, { useState } from 'react';
import { useFetchRows, useCreateRow, useDeleteRow, useUpdateRow } from '../../api/api';
import { RowResponse } from '../../types/types';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, IconButton } from '@mui/material';
import { styled } from '@mui/material/styles';
import AddIcon from '../../assets/TableAdd.png';
import DeleteIcon from '../../assets/TrashFill.png';

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
  textAlign: 'left',
  borderBottom: '1px solid #444',
});

const StyledInput = styled('input')({
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

export function StyledTable() {
  const { data: rows, isLoading, isError } = useFetchRows();
  const createRow = useCreateRow();
  const updateRow = useUpdateRow();
  const deleteRow = useDeleteRow();

  const firstRow = {
  id: Date.now(), 
  parentId: null,
  rowName: '',
  equipmentCosts: 0,
  estimatedProfit: 0,
  machineOperatorSalary: 0,
  mainCosts: 0,
  materials: 0,
  mimExploitation: 0,
  overheads: 0,
  salary: 0,
  supportCosts: 0,
  child: [],
} 

  const [newRow, setNewRow] = useState<RowResponse | null>(firstRow);
  const [error, setError] = useState<string | null>(null);
  const [editingRow, setEditingRow] = useState<RowResponse | null>(null);

  const handleChange = (field: keyof RowResponse, value: string) => {
    setNewRow((prev) => ({
      ...prev!,
      [field]: field === 'rowName' ? value : Number(value) || 0,
    }));
  };

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter' && newRow) {

      if (!newRow.rowName.trim()) {
        setError('Наименование работ не может быть пустым');
        return;
      }

      setError(null);
      createRow.mutate(newRow, {
        onSuccess: (updatedRows) => {
          setNewRow(null);
        },
      });
    }
  };

  const handleKeyDownEdit = (event: React.KeyboardEvent) => {
      if (event.key === 'Enter' && editingRow) {
        if (!editingRow.rowName.trim()) {
          setError('Наименование работ не может быть пустым');
          return;
        }
  
        setError(null);
        updateRow.mutate(editingRow, {
          onSuccess: (updatedRows) => {
            setEditingRow(null);
          },
        });
      }
  };

//   const handleAddRow = () => {
//     setNewRow({
//       id: Date.now(), 
//       parentId: null,
//       rowName: '',
//       equipmentCosts: 0,
//       estimatedProfit: 0,
//       machineOperatorSalary: 0,
//       mainCosts: 0,
//       materials: 0,
//       mimExploitation: 0,
//       overheads: 0,
//       salary: 0,
//       supportCosts: 0,
//       child: [],
//     });
//   };

  const handleDeleteRow = (id: number) => {
    deleteRow.mutate(id);

  };

  const handleRowDoubleClick = (row: RowResponse) => {
    setEditingRow(row);
  };

  const handleEditChange = (field: keyof RowResponse, value: string) => {
    setEditingRow((prev) => ({
      ...prev!,
      [field]: field === 'rowName' ? value : Number(value) || 0,
    }));
  };

  const renderRows = (rows: RowResponse[], level = 0) => {
    return rows.map((row) => {
        if(editingRow) {
            return(
                <React.Fragment key={row.id}>
            <TableRow>
              <MyTableCell>
              <IconButton disabled>
                  <img src={AddIcon} alt="Add" width={22} />
                </IconButton>
              </MyTableCell>
              <MyTableCell sx={{ width: '50vw' }}>
                <StyledInput
                  sx={{ width: '100%' }}
                  type="text"
                  placeholder={row.rowName}
                  onChange={(e) => handleEditChange('rowName', e.target.value)}
                  onKeyDown={handleKeyDownEdit}
                />
              </MyTableCell>
              <MyTableCell align="right">
                <StyledInput type="text" 
                onChange={(e) => handleEditChange('salary', e.target.value)}
                onKeyDown={handleKeyDownEdit} 
                placeholder={String(row.salary)}
                />
              </MyTableCell>
              <MyTableCell align="right">
                <StyledInput type="text" 
                onChange={(e) => handleEditChange('equipmentCosts', e.target.value)} 
                onKeyDown={handleKeyDownEdit} 
                placeholder={String(row.equipmentCosts)}
                />
              </MyTableCell>
              <MyTableCell align="right">
                <StyledInput type="text" 
                onChange={(e) => handleEditChange('overheads', e.target.value)} 
                onKeyDown={handleKeyDownEdit} 
                placeholder={String(row.overheads)}
                />
              </MyTableCell>
              <MyTableCell align="right">
                <StyledInput type="text" 
                onChange={(e) => handleEditChange('estimatedProfit', e.target.value)} 
                onKeyDown={handleKeyDownEdit} 
                placeholder={String(row.estimatedProfit)}
                />
              </MyTableCell>
            </TableRow>
            </React.Fragment>
            )
        } else {
            return(
                <React.Fragment key={row.id}>
                    <TableRow onDoubleClick={() => handleRowDoubleClick(row)}>
                    <MyTableCell style={{ paddingLeft: level * 20 }}>
                        <IconButton disabled={!!newRow || row.rowName === ''}>
                          <img src={AddIcon} alt="Add" width={22} />
                        </IconButton>
                        <IconButton onClick={() => handleDeleteRow(row.id)}>
                          <img src={DeleteIcon} alt="Delete" width={22} />
                        </IconButton>
                    </MyTableCell>
                    <MyTableCell sx={{ width: '50vw' }}>{row.rowName}</MyTableCell>
                    <MyTableCell align="right">{row.salary.toLocaleString()}</MyTableCell>
                    <MyTableCell align="right">{row.equipmentCosts.toLocaleString()}</MyTableCell>
                    <MyTableCell align="right">{row.overheads.toLocaleString()}</MyTableCell>
                    <MyTableCell align="right">{row.estimatedProfit.toLocaleString()}</MyTableCell>
                    </TableRow>
                    {row.child && row.child.length > 0 && renderRows(row.child, level + 1)}
                </React.Fragment>
                )
            }
        }
    );
  };

  return (
    <MyTableContainer>
      <Table>
        <TableHead>
          <TableRow>
            <MyTableHeadCell>Уровень</MyTableHeadCell>
            <MyTableHeadCell sx={{ width: '50vw' }}>Наименование работ</MyTableHeadCell>
            <MyTableHeadCell align="right">Основная з/п</MyTableHeadCell>
            <MyTableHeadCell align="right">Оборудование</MyTableHeadCell>
            <MyTableHeadCell align="right">Накладные расходы</MyTableHeadCell>
            <MyTableHeadCell align="right">Сметная прибыль</MyTableHeadCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {isLoading ? (
            <TableRow>
              <TableCell colSpan={6} align="center" style={{ color: 'white' }}>
                Загрузка...
              </TableCell>
            </TableRow>
          ) : isError ? (
            <TableRow>
              <TableCell colSpan={6} align="center" style={{ color: 'white' }}>
                Ошибка загрузки данных
              </TableCell>
            </TableRow>
          ) : rows?.length ? (
            renderRows(rows)
          ) : (
            <TableRow>
              <MyTableCell>
              <IconButton disabled>
                  <img src={AddIcon} alt="Add" width={22} />
                </IconButton>
              </MyTableCell>
              <MyTableCell sx={{ width: '50vw' }}>
                <StyledInput
                  sx={{ width: '100%' }}
                  type="text"
                  onChange={(e) => handleChange('rowName', e.target.value)}
                  onKeyDown={handleKeyDown}
                />
              </MyTableCell>
              <MyTableCell align="right">
                <StyledInput type="text" onChange={(e) => handleChange('salary', e.target.value)} onKeyDown={handleKeyDown} />
              </MyTableCell>
              <MyTableCell align="right">
                <StyledInput type="text" onChange={(e) => handleChange('equipmentCosts', e.target.value)} onKeyDown={handleKeyDown} />
              </MyTableCell>
              <MyTableCell align="right">
                <StyledInput type="text" onChange={(e) => handleChange('overheads', e.target.value)} onKeyDown={handleKeyDown} />
              </MyTableCell>
              <MyTableCell align="right">
                <StyledInput type="text" onChange={(e) => handleChange('estimatedProfit', e.target.value)} onKeyDown={handleKeyDown} />
              </MyTableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
      {error && <p style={{ color: 'red', textAlign: 'center' }}>{error}</p>}
    </MyTableContainer>
  );
}
