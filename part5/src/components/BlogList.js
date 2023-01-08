import React, {useMemo} from 'react'
import { useTable } from 'react-table'
import BlogRow from './BlogRow'

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
      } = useTable({ columns, data })
    return(
        //blogs.map(blog =>
        //<BlogRow key={blog.id} blog={blog} />
        //)
        <table {...getTableProps()} style={{ border: 'solid 1px blue' }}>
       <thead>
         {headerGroups.map(headerGroup => (
           <tr {...headerGroup.getHeaderGroupProps()}>
             {headerGroup.headers.map(column => (
               <th
                 {...column.getHeaderProps()}
                 style={{
                   borderBottom: 'solid 3px red',
                   background: 'aliceblue',
                   color: 'black',
                   fontWeight: 'bold',
                 }}
               >
                 {column.render('Header')}
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
    )
}

export default BlogList