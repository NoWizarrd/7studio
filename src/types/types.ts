export interface OutlayRowRequest {
    equipmentCosts: number;
    estimatedProfit: number;
    machineOperatorSalary: number;
    mainCosts: number;
    materials: number;
    mimExploitation: number;
    overheads: number;
    parentId: number | null;
    rowName: string;
    salary: number;
    supportCosts: number;
  }
  
//   export interface OutlayRowUpdateRequest extends Omit<OutlayRowRequest, 'parentId'> {}
  
  export interface RowResponse {
    id: number;
    equipmentCosts: number;
    estimatedProfit: number;
    machineOperatorSalary: number;
    mainCosts: number;
    materials: number;
    mimExploitation: number;
    overheads: number;
    rowName: string;
    salary: number;
    supportCosts: number;
    total: number;
    child?: RowResponse[];
  }
  
  export interface TreeResponse extends RowResponse {
    child: RowResponse[];
  }
  