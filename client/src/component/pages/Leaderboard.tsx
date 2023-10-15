import React, { useEffect, useState } from 'react';
import Navbar from '../Navbar';
import '../../App.css';

// let MapID: number

// fetch('http://127.0.0.1:8000/daily')
//   .then(response => response.json()) // Convert response to JSON
//   .then(data => {

//     // const jsonString = JSON.stringify(data);
//     MapID = data.id
//   }).then(() =>
//     fetch('http://127.0.0.1:8000/leaderboard?MapID=' + MapID)
//       .then(response => response.json()) // Convert response to JSON
//       .then(response => {

//         console.log(response)

//         // console.table()
//         // const jsonString = JSON.stringify(data);
//       })
//   )


const Leaderboard = () => {

  function convertISOToCustomFormat(isoDateString: string | number | Date) {
    const date = new Date(isoDateString);
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear().toString().slice(2);
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');

    return `${day}/${month}/${year} ${hours}:${minutes}`;
  }



  const [mapID, setMapID] = useState(0)
  const [mapDate, setMapDate] = useState("")


  const [table, setTable] = useState([])


  useEffect(() => {

    if (mapID) {

      fetch('http://127.0.0.1:8000/leaderboard?MapID=' + mapID)
        .then(response => response.json()) // Convert response to JSON
        .then(response => {
          console.log(response)
          // console.table()
          // const jsonString = JSON.stringify(data);
        })
    }

  }, [mapID])




  useEffect(() => {

    if (mapID) {

      fetch('http://127.0.0.1:8000/leaderboard?MapID=' + mapID)
        .then(response => response.json()) // Convert response to JSON
        .then(response => {
          console.log(response)
          // console.table()
          // const jsonString = JSON.stringify(data);
        })
    }

  }, [mapID])

  // const fetchDate = (pMapID) => { }


  fetch('http://127.0.0.1:8000/daily')
    .then(response => response.json()) // Convert response to JSON
    .then(data => {
      setMapID(data.id)
      setMapDate(convertISOToCustomFormat(data.date))
    })






  return (
    <div className="App">
      <header className="App-header">

        <Navbar></Navbar>

        {mapID ? (<div className='date-container'>
          <button> {"<"} </button>
          <>{mapID ? mapDate : ""} </>
          <button> {">"} </button>

        </div>) : <> wait</>

        }

        <table className='leaderboard-table'  >
          <thead>
            <th>JOUEUR</th>
            <th>SCORE</th>
            <th>POSITION</th>
            <th>TOP </th>
          </thead>
          <tbody>
            <tr>
              <td className='leaderboard-cell'  >Row 1, Cell 1</td>
              <td className='leaderboard-cell' >Row 1, Cell 2</td>
              <td className='leaderboard-cell'>Row 1, Cell 3</td>
            </tr>
            <tr>
              <td className='leaderboard-cell'>Row 2, Cell 1</td>
              <td className='leaderboard-cell'>Row 2, Cell 2</td>
              <td className='leaderboard-cell'>Row 2, Cell 3</td>
            </tr>
            <tr>
              <td>Row 3, Cell 1</td>
              <td>Row 3, Cell 2</td>
              <td>Row 3, Cell 3</td>
            </tr>
            <tr>
              <td>Row 4, Cell 1</td>
              <td>Row 4, Cell 2</td>
              <td>Row 4, Cell 3</td>
            </tr>
          </tbody>
        </table>



      </header>
    </div>
  );
}

export default Leaderboard;
