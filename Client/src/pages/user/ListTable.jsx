import React from 'react';
import './ListTable.css';

function ListTable(props) {
  const { data } = props;

  return (
    <div style={{maxHeight:"800px", overflowY:"scroll", width:"100%"}}>
        <table className='tabel'>
          <thead>
            <tr>
              <th>Tanggal</th>
              <th>Check-in</th>
              <th>Check-Out</th>
              <th>image url in</th>
              <th>image url out</th>
            </tr>
          </thead>
          <tbody style={{marginTop:"100px"}}>
            {data.map((item) => (
              <tr key={item.id}>
                <td>{item.tanggal}</td>
                <td>{item.check_in}</td>
                <td>{item.check_out}</td>
                <td>{item.image_url_in}</td>
                <td>{item.image_url_out}</td>
              </tr>
            ))}
          </tbody>
        </table>
        </div>
  );
}

export default ListTable;