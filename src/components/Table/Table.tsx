import React, { useState } from 'react';
import { useFetchRows, useCreateRow, useDeleteRow, useUpdateRow } from '../../api/api';
import { RowResponse } from '../../types/types';
import { Table, TableBody, TableHead, TableRow, IconButton } from '@mui/material';
import AddIcon from '../../assets/TableAdd.png';
import DeleteIcon from '../../assets/TrashFill.png';
import Sub from '../../assets/sub.png';
import { MyTableContainer, MyTableCell, MyTableHeadCellLeft, MyTableHeadCell, StyledInput } from './TableStyles/TableStyles';

export function StyledTable() {
  const { data: rows, isLoading, isError } = useFetchRows();
  const createRow = useCreateRow();
  const updateRow = useUpdateRow();
  const deleteRow = useDeleteRow();

  const firstRow = {
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
  // const [rows, setRows] = useState<RowResponse[] | null>(data!);
  const [newRow, setNewRow] = useState<RowResponse | null>(firstRow);
  const [error, setError] = useState<string | null>(null);
  const [addingRow, setAddingRow] = useState<number | null>(null);
  const [editRow, setEditRow] = useState<number | null>(null);
  const [editingRow, setEditingRow] = useState<RowResponse | null>(null);
  const [isHovered, setIsHovered] = useState<number | null>(null);


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
      setAddingRow(null)
      createRow.mutate(newRow, {
        onSuccess: () => {
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
          onSuccess: () => {
            setEditingRow(null);
            setEditRow(null)
          },
        });
      }
  };

  const handleAddRow = (id: number) => {
    setAddingRow(id)
    setNewRow({
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
    });
  };

  const handleAddSubRow = (id: number) => {
    setAddingRow(id)
    setNewRow({
      id: Date.now(), 
      parentId: id,
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
    });
  };
  

  const handleDeleteRow = (id: number) => {
    deleteRow.mutate(id);
  };

  const handleRowDoubleClick = (row: RowResponse) => {
    setEditingRow(row);
    setEditRow(row.id)
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
              editRow === row.id ?
                <React.Fragment key={row.id}>
            <TableRow>
              <MyTableCell>
              <IconButton onClick={()=> setEditingRow(null)}>
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
            </React.Fragment> : 
            <TableRow onDoubleClick={() => handleRowDoubleClick(row)}>
              <MyTableCell style={{ paddingLeft: level * 20,  }} >
                  <IconButton disabled>
                    <img src={AddIcon} alt="Add" width={22} />
                  </IconButton>
              </MyTableCell>
              <MyTableCell sx={{ width: '50vw' }}>{row.rowName}</MyTableCell>
              <MyTableCell align="right">{row.salary.toLocaleString()}</MyTableCell>
              <MyTableCell align="right">{row.equipmentCosts.toLocaleString()}</MyTableCell>
              <MyTableCell align="right">{row.overheads.toLocaleString()}</MyTableCell>
              <MyTableCell align="right">{row.estimatedProfit.toLocaleString()}</MyTableCell>
            </TableRow>
            )
        } else {
            return(
                <React.Fragment key={row.id}>
                    <TableRow onDoubleClick={() => handleRowDoubleClick(row)}>
                    <MyTableCell
                        style={{ paddingLeft: level * 20 }}
                      >
                        <div style={{ display: 'flex', alignItems: 'left', 
                          gap: '1px', background: isHovered === row.id ? '#414144' : 'transparent', 
                          padding: '1px', borderRadius: '4px', width: '115px', marginLeft: '10px' }}
                          onMouseEnter={() => setIsHovered(row.id)}
                          onMouseLeave={() => setIsHovered(null)}
                          >
                          <IconButton onClick={() => handleAddRow(row.id)}>
                            <img src={AddIcon} alt="Add" width={22} />
                          </IconButton>
                          {isHovered === row.id && (
                            <>
                              <IconButton onClick={() => handleAddSubRow(row.id)}>
                                <img src={Sub} alt="Add Sub" width={22} />
                              </IconButton>
                              <IconButton onClick={() => handleDeleteRow(row.id)}>
                                <img src={DeleteIcon} alt="Delete" width={22} />
                              </IconButton>
                            </>
                          )}
                        </div>
                      </MyTableCell>
                      <MyTableCell sx={{ width: '50vw' }}>{row.rowName}</MyTableCell>
                      <MyTableCell align="right">{row.salary.toLocaleString()}</MyTableCell>
                      <MyTableCell align="right">{row.equipmentCosts.toLocaleString()}</MyTableCell>
                      <MyTableCell align="right">{row.overheads.toLocaleString()}</MyTableCell>
                      <MyTableCell align="right">{row.estimatedProfit.toLocaleString()}</MyTableCell>
                    </TableRow>
                      {
                        addingRow === row.id ?
                        <TableRow>
                          <MyTableCell>
                          <IconButton  onClick={() => setAddingRow(null)}>
                              <img src={AddIcon} alt="Add" width={22} />
                            </IconButton>
                          </MyTableCell>
                          <MyTableCell>
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
                        </TableRow> : null
                      }
                    {row.child && row.child.length > 0 && renderRows(row.child, level + 1)}
                </React.Fragment>
                )
            }
        }
    );
  };

  return (
    isLoading ? (
      <p style={{ color: 'white' }}>
        Загрузка...
      </p>
    ) : isError ? (
      <p style={{ color: 'white' }}>
          Ошибка загрузки данных
      </p>
    ) : 
    <MyTableContainer>
      <Table>
        <TableHead>
          <TableRow>
            <MyTableHeadCellLeft sx={{ minWidth: '5vw'}}>Уровень</MyTableHeadCellLeft>
            <MyTableHeadCellLeft>Наименование работ</MyTableHeadCellLeft>
            <MyTableHeadCell align="right">Основная з/п</MyTableHeadCell>
            <MyTableHeadCell align="right">Оборудование</MyTableHeadCell>
            <MyTableHeadCell align="right">Накладные расходы</MyTableHeadCell>
            <MyTableHeadCell align="right">Сметная прибыль</MyTableHeadCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows?.length ? (
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
