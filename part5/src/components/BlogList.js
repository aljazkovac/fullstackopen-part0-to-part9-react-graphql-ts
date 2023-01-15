import React, {useMemo} from 'react'
import { useTable, useSortBy } from 'react-table'

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
      } = useTable({ columns, data },
        useSortBy
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
     </>
    )
}

export default BlogList

