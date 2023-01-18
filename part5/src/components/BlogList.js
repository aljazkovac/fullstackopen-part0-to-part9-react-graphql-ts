import React, {useMemo} from 'react'
import { useTable, useSortBy, useRowSelect } from 'react-table'

const BlogList = ({blogs}) => {
    const data = useMemo(
        () => blogs, [blogs]
      )
      const columns = useMemo(
        () => [
          {
            Header: 'Author',
            accessor: 'author', // accessor is the "key" in the data
          },
          {
            Header: 'Title',
            accessor: 'title',
          },
          {
            Header: 'Url',
            accessor: 'url',
          },
          {
            Header: 'Likes',
            accessor: 'likes',
          },
        ],
        []
      )
      const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        prepareRow,
        allColumns,
        getToggleHideAllColumnsProps,
        state: { selectedRowIds },
      } = useTable({ columns, data },
        useSortBy,
        useRowSelect,
        hooks => {
          hooks.visibleColumns.push(columns => [
            // Let's make a column for selection
            {
              id: 'selection',
              // The header can use the table's getToggleAllRowsSelectedProps method
              // to render a checkbox
              Header: ({ getToggleAllRowsSelectedProps }) => (
                <div>
                  <IndeterminateCheckbox {...getToggleAllRowsSelectedProps()} />
                </div>
              ),
              // The cell can use the individual row's getToggleRowSelectedProps method
              // to the render a checkbox
              Cell: ({ row }) => (
                <div>
                  <IndeterminateCheckbox {...row.getToggleRowSelectedProps()} />
                </div>
              ),
            },
            ...columns,
          ])
        }
        )
      const IndeterminateCheckbox = React.forwardRef(
        ({ indeterminate, ...rest }, ref) => {
          const defaultRef = React.useRef()
          const resolvedRef = ref || defaultRef

          React.useEffect(() => {
            resolvedRef.current.indeterminate = indeterminate
          }, [resolvedRef, indeterminate])

          return <input type="checkbox" ref={resolvedRef} {...rest} />
        }
      )

    return(
      <>
      <div>
        <div>
          <IndeterminateCheckbox { ... getToggleHideAllColumnsProps()} />  
          All
        </div>
        {allColumns.map(column => (
          <div key={column.id}>
            <label>
              <input type="checkbox" {...column.getToggleHiddenProps()} />{' '}
              {column.id}
            </label>
          </div>
        ))}
        <br />
      </div>
      <table {...getTableProps()} style={{ border: 'solid 1px blue' }}>
        <thead>
          {headerGroups.map(headerGroup => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map(column => (
                <th
                  {...column.getHeaderProps(column.getSortByToggleProps())}
                  style={{
                    borderBottom: 'solid 3px red',
                    background: 'aliceblue',
                    color: 'black',
                    fontWeight: 'bold',
                    cursor: 'pointer'
                  }}
                >
                  {column.render('Header')}
                  {/* Add a sort direction indicator */}
                  <span>
                    {column.isSorted
                      ? column.isSortedDesc
                        ? ' 🔽'
                        : ' 🔼'
                      : ''}
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
                        border: 'solid 1px gray',
                        background: 'papayawhip',
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
        <button type="submit" disabled={Object.keys(selectedRowIds).length === 0}>vote</button>
        <button type="submit" disabled={Object.keys(selectedRowIds).length === 0}>delete</button>
     </>
    )
}

export default BlogList

