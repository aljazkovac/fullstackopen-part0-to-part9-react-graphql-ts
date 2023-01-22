import React, {useMemo} from 'react'
import { useTable, useSortBy, useRowSelect } from 'react-table'
import blogService from '../services/blogs'

const BlogList = ({user, blogs, setBlogs}) => {
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
    const allSelectedBlogsCanBeDeleted = () => {
      const usersBlogs = data.filter(blog => blog.userId.username === user.username)
      const selectedRows = rows.filter(row => Object.keys(selectedRowIds).includes(row.id))
      let canDeleteAll = true
      // Check if all selectedRows are included in usersBlogs. If even one selectedRow is not
      // included, return false. 
      selectedRows.forEach(row => {
        if (!usersBlogs.includes(row.original)) {
          canDeleteAll = false
        }
      })
      return canDeleteAll
    }
    
    const handleDelete = async (event) => {
        event.preventDefault()
        window.confirm(`Delete blog ${Object.keys(selectedRowIds)}?`)
    }
    
    const handleVote = async (event) => {
        event.preventDefault()
        const selectedRows = rows.filter(row => Object.keys(selectedRowIds).includes(row.id))
        const upvotedBlogs = selectedRows.map(row => {
          const blogObject = {
            id: row.original.id,
            author: row.original.author,
            title: row.original.title,
            url: row.original.url,
            likes: row.original.likes + 1,
          }
          return blogObject
        })
        const upvotedBlogsPromises = upvotedBlogs.map(blog => 
          blogService.update(blog.id, blog))
        const resolvedPromises = await Promise.all(upvotedBlogsPromises)
        // Update the blogs in the state, so we get a real-time change in the table.
        let blogsArray = Array.from(blogs)
        for (let i = 0; i < Object.keys(selectedRowIds).length; i++) {
          let idx = Object.keys(selectedRowIds)[i]
          blogsArray.splice(idx, 1, resolvedPromises[i])
        }
        setBlogs(blogsArray)
    }

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
        <button type="submit" disabled={Object.keys(selectedRowIds).length === 0} onClick={handleVote}>vote</button>
        <button type="submit" disabled={Object.keys(selectedRowIds).length === 0 || !allSelectedBlogsCanBeDeleted()} onClick={handleDelete}>delete</button>
     </>
    )
}

export default BlogList

