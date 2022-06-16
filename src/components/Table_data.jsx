import React,{useState,useMemo} from 'react'
import {
  useTable,
  useGlobalFilter,
  useAsyncDebounce,
  useSortBy,
  usePagination,
} from "react-table";



function Table_data({category,data2}) {

  const GlobalFilter = ({
    preGlobalFilteredRows,
    globalFilter,
    setGlobalFilter,
  }) => {
    const count = preGlobalFilteredRows.length;
    const [value, setValue] = useState(globalFilter);
    const onChange = useAsyncDebounce((value) => {
      setGlobalFilter(value || undefined);
    }, 200);
    return(
    <>
    
<span className="">
          Search:{" "}
        </span>
        <input
          type="text"
          value={value}
          onKeyDown={(e)=>{
            if(e.key==="Enter"){
              onChange(e.target.value);
            }
          }}
          onChange={(e) => {
            setValue(e.target.value);
          }}
          placeholder={`${count} records...`}
        />
        </>
    );
  }
  const data = useMemo(() => data2.slice(1), [data2]);

  const columns = useMemo(() => {
    if (data.length > 0) {
      return Object.keys(data2[0]).map((key) => {
        const result = data2[0][key]
          .replace(/([A-Z]+)/g, " $1")
          .replace(/([A-Z][a-z])/g, " $1").toUpperCase();

        return {
          Header: result,
          accessor: key,
        };
      });
    }
  }, [data]);

   const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    page,
    prepareRow,
    previousPage,
    nextPage,
    canPreviousPage,
    canNextPage,
    state,
    setPageSize,
    pageOptions,
    gotoPage,
    rows,
    pageCount,
    setGlobalFilter,
    preGlobalFilteredRows,
  } = useTable(
    {
      columns,
      data,
    },
    useGlobalFilter,
    useSortBy,
    usePagination
  );

  return (
    <>
    
     <GlobalFilter
          preGlobalFilteredRows={preGlobalFilteredRows}
          globalFilter={state.globalFilter}
          setGlobalFilter={setGlobalFilter}
        />
         <div className='table-cont'> 
    <table {...getTableProps()} style={{ padding:"20px" }}>
      <thead>
        {headerGroups.map(headerGroup => (
          <tr {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map(column => (
                         <th
                         {...column.getHeaderProps(column.getSortByToggleProps())}
                style={{
paddingTop:"1rem",
paddingBottom:"1rem", 
paddingLeft: "1.5rem",
paddingRight: "1.5rem", 
color: "#ffffff", 
fontSize: "0.75rem",
lineHeight: "1rem", 
fontWeight: "500", 
letterSpacing: "0.05em", 
textAlign: "left", 
textTransform: "uppercase", 
backgroundColor:"#004a7c",
cursor:"pointer",
               
                  
                }}
              >
                {column.render('Header')}
                <span>
                      {column.isSorted
                        ? column.isSortedDesc
                          ? " ▼"
                          : " ▲"
                        : ""}
                    </span>
              </th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody {...getTableBodyProps()}>
        {rows.map(row => {
  
          prepareRow(row)
          return (
            <tr {...row.getRowProps()}>
              {row.cells.map(cell => {
                return (
                  <td
                    {...cell.getCellProps()}
                    style={{
                      padding: '10px',
                      border: 'solid 1px grey',
                      background: 'white',
                    }}
                  >
                    {cell.render('Cell')}
                  </td>
                )
              })}
            </tr>
          )
        })}
      </tbody>
    </table>

    </div>
    <div id="focus"></div>
    </>
  )
  }

export default Table_data;