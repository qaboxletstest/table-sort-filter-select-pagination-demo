import React, { useState, useRef } from 'react';
import { AgGridColumn, AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';
import "./App.css"

const App = () => {
  const [rowData, setRowData] = useState([]);
  const gridRef = useRef(null);
  const [gridApi, setGridApi] = useState(null);
  const [gridColumnApi, setGridColumnApi] = useState(null);

  const pagination = true;
  const paginationPageSize = 10

  const defaultColDef = {
    // make every column editable
    editable: true,
    // make every column use 'text' filter by default
    filter: 'agTextColumnFilter',
    sortable: true,
    resizable: true,
    headerHeight: 150,
  };

  const onGridReady = (params) => {
    setGridApi(params.api);
    setGridColumnApi(params.columnApi);

    const updateData = (data) => {
      setRowData(data);
    };

    fetch('https://reqres.in/api/users?page=2')
      .then(result => result.json())
      .then(rowData => setRowData(rowData.data))
  };

  const onButtonClick = e => {
    const selectedNodes = gridRef.current.api.getSelectedNodes()
    const selectedData = selectedNodes.map(node => node.data)
    const selectedDataStringPresentation = selectedData.map(node => `${node.first_name} ${node.last_name}`).join(', ')
    alert(`Selected User(s): ${selectedDataStringPresentation}`)
  }

  return (
    <div id="app" className="App-header">
      <h1>QA BOX LET'S TEST</h1>
      <div id="grid" className="ag-theme-alpine" style={{ height: 350, width: '100%', marginTop: '2%' }} >
        <button onClick={onButtonClick} style={{ backgroundColor: 'burlywood', borderRadius: '5px', fontSize: '20px' }}>Get selected users</button>
        <AgGridReact
          pagination={pagination}
          paginationPageSize={paginationPageSize}
          rowData={rowData}
          rowDragManaged={true}
          defaultColDef={defaultColDef}
          ref={gridRef}
          rowSelection="multiple"
          suppressDragLeaveHidesColumns={true}
          onGridReady={onGridReady}>
          <AgGridColumn field="id" checkboxSelection={true} rowDrag={true}></AgGridColumn>
          <AgGridColumn field="email"></AgGridColumn>
          <AgGridColumn field="first_name"></AgGridColumn>
          <AgGridColumn field="last_name" sr></AgGridColumn>
          <AgGridColumn field="avatar"></AgGridColumn>
        </AgGridReact>
      </div>
    </div>
  );
};

export default App;