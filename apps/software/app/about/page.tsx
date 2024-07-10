'use client';
'use strict';
import { AgGridReact } from 'ag-grid-react'; // React Data Grid Component
import 'ag-grid-community/styles/ag-grid.css'; // Mandatory CSS required by the Data Grid
import 'ag-grid-community/styles/ag-theme-quartz.css'; // O
// import 'ag-grid-community/styles/ag-theme-alpine.css'; // 1
import { useState, useMemo } from 'react';
interface IRow {
  make: string;
  model: string;
  price: number;
  electric: boolean;
}
const GridExample = () => {
  // Row Data: The data to be displayed.
  const defaultColDef = useMemo(() => {
    console.log("useMemo")
    return {
      filter: true, // Enable filtering on all columns
    };
  }, []);
  const [rowData, setRowData] = useState<IRow[]>([
    { make: 'Tesla', model: 'Model Y', price: 64950, electric: true },
    { make: 'Ford', model: 'F-Series', price: 33850, electric: false },
    { make: 'Toyota', model: 'Corolla', price: 29600, electric: false },
  ]);
  const CustomButtonComponent = (props: any) => {
    return <button onClick={() => window.alert('clicked')}>Push Me!</button>;
  };
  // Column Definitions: Defines the columns to be displayed.
  const [columnDefs] = useState<any[]>([
    // { headerName: "Make & Model", valueGetter: (p:any):any =>{
    //     console.log("first",p);
    //     return p.data.make + ' ' + p.data.model}},
    {
      headerName: 'Make & Model',
      valueFormatter: (p: any): any => {
        console.log('first', p);
        return p.data.make + ' ' + p.data.model;
      },
      flex: 4,
    },
    {
      field: 'make',
      flex: 2,
      filter: true,
      floatingFilter: true,
      editable: true,
      cellEditor: 'agSelectCellEditor',
      cellEditorParams: {
        values: ['Tesla', 'Ford', 'Toyota'],
      },
      checkboxSelection: true,
    },
    { field: 'model', flex: 3 },
    {
      field: 'price',
      valueFormatter: (p: any): string => {
        console.log('s:', p);
        return '£' + p.value.toLocaleString();
      },
    },
    {
      field: 'electric',
      cellClassRules: {
        'rag-green': (p: any) => p.value === true,
      },
    },
    { field: 'button', cellRenderer: CustomButtonComponent },
  ]);
  const rowSelection = 'multiple';
  const pagination = true;
  const paginationPageSize = 2;
  const paginationPageSizeSelector = [1, 2, 3];
  const paginationNumberFormatter = useMemo(() => {
    return (params:any) => {
      const currentPage = params.api.paginationGetCurrentPage() + 1;
      const totalPages = params.api.paginationGetTotalPages();
      const pageSize = params.api.paginationGetPageSize();
      const totalRecords = params.api.paginationGetRowCount();
      const startRow = (currentPage - 1) * pageSize + 1;
      const endRow = Math.min(currentPage * pageSize, totalRecords);
      return `共${totalRecords}条记录，每页记录数：${pageSize}。${currentPage}/${totalPages}`;
    };
  }, []);

  const rowClassRules = {
    'rag-red': (params: any) => {
      console.log('Checking row class rule:', params.data.make);
      return params.data.make === 'Ford';
    },
  };

  return (
    // wrapping container with theme & size
    <div
      className="ag-theme-quartz" // applying the Data Grid theme
      style={{ height: 500 }} // the Data Grid will fill the size of the parent container
    >
      <AgGridReact
        rowData={rowData}
        defaultColDef={defaultColDef}
        columnDefs={columnDefs}
        rowClassRules={rowClassRules}
        rowSelection={rowSelection}
        pagination={pagination}
        paginationPageSize={paginationPageSize}
        paginationPageSizeSelector={paginationPageSizeSelector}
        paginationNumberFormatter={paginationNumberFormatter}
      />
    </div>
  );
};
export default GridExample;
