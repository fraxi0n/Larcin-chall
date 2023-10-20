import React, { useEffect, useState } from 'react';
import Navbar from '../Navbar';
import '../../App.css';

type Row
  = {
    username: string
    score: number
    position: number// | undefined
    top: string// | undefined
  }
const initTable: Row[] = []
const apiRoute = "http://127.0.0.1:8000/"

const Leaderboard = () => {

  function convertISOToCustomFormat(isoDateString: string | number | Date) {
    const date = new Date(isoDateString);
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear().toString().slice(2);
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');

    return `${day}/${month}/${year}  //  ${hours}:${minutes}`;
  }


  const [mapID, setMapID] = useState(0)
  const [mapDate, setMapDate] = useState("")

  const [mapFetchedID, setMapFetchedID] = useState(0)


  const [table, setTable] = useState(initTable)
  const [nbScore, setNbScore] = useState(1)


  useEffect(() => {

    if (mapID) {

      fetch(apiRoute + 'leaderboard?MapID=' + mapID)
        .then(response => {
          console.log(response)
          return response.json() // Convert response to JSON
        })
        .then(response => {

          setNbScore(response.countResults[0].total_rows)
          // setTable([])
          setTable(response.results)


        })
    }

  }, [mapID])


  useEffect(() => {

    const calculateTop = (pPos: number) => {

      let top = Math.floor((pPos - 0.51) / nbScore * 100)

      let arrondi: number

      if (top <= 5) {
        arrondi = 1
      } else
        if (top <= 25) {
          arrondi = 5
        } else {
          arrondi = 10
        }

      // const a = top % arrondi
      // console.log(a, top)

      return top - top % arrondi + arrondi + "%"


    }



    if (table.length && !table[0].position) {
      const newTable: Row[] = []


      for (let i = 0; i < table.length; i++) {


        newTable[i] = {
          username: table[i].username,
          score: table[i].score,
          position: i + 1,
          top: calculateTop(i + 1)
        }


      }
      console.log(table)

      setTable(newTable)




    }
  }
    , [table, nbScore])




  useEffect((
  ) => {
    fetch(apiRoute + 'map?numMap=' + mapFetchedID)
      .then(response => {
        console.log("404", response)
        if (response.status === 400) {
          setMapFetchedID(prev => prev - 1)
          alert("aucune donnée antérieure à cette date")
        }
        else if (response.status === 200) {
          return response.json()
        }

      }
      )
      .then(data => {
        console.log(data)

        if (data) {

          setMapID(data.id)
          setMapDate(convertISOToCustomFormat(data.date))
        }

      })




  }, [mapFetchedID])


  const playSeedButton = <button style={{ backgroundColor: "#ada997" }}
    onClick={ }> Jouer </button>

  const mapDateDiv = () => {

    if (!mapID) {
      return ""
    }

    if (!mapFetchedID) {
      return <div className='date-displayer' style={{ padding: ".9rem 0" }} >{mapDate} </div>

    }
    return <div className='date-displayer' style={{ padding: ".35rem 0", fontSize: "1rem" }}  ><div>{mapDate} </div> {playSeedButton}</div>
    // background - color: #22211d;

  }

  const getCellClass = (pPos: number) => {
    let classReturned = "leaderboard-cell"
    if (pPos === 1) {
      classReturned += " ld-first"
    }
    if (pPos === 2) {
      classReturned += " ld-second"
    }
    if (pPos === 3) {
      classReturned += " ld-third"
    }
    return classReturned
  }


  return (
    <div className="App">
      <header className="App-header">

        <Navbar></Navbar>
      </header>

      {mapID ? (<div className='date-container'>
        <button className='button'
          onClick={() => setMapFetchedID(prev => prev + 1)}
        > {"<"} </button>
        {mapDateDiv()}
        <button className='button'
          disabled={!mapFetchedID}
          onClick={() => setMapFetchedID(prev => prev - 1)}
        > {">"} </button>
      </div>) : <> wait</>
      }
      <div className='lb-container'>
        {
          table.length ? <table className='leaderboard-table'  >
            <thead>
              <th className='leaderboard-head'>JOUEUR</th>
              <th className='leaderboard-head'>SCORE</th>
              <th className='leaderboard-head'>POSITION</th>
              <th className='leaderboard-head'>TOP </th>
            </thead>
            <tbody>

              {table.map((row: Row) => {

                const cellClass = getCellClass(row.position)


                return <tr>
                  <td className={cellClass}  >{row.username}</td>
                  <td className={cellClass}  >{row.score}</td>
                  <td className={cellClass} >{row.position} </td>
                  <td className={cellClass}>{row.top} </td>
                </tr>
              })}
            </tbody>
          </table>

            : <>
              <tbody></tbody>

              <div>aucun joueur trouvé pour cette date</div>

            </>
        }
      </div>
    </div >

  );

}

export default Leaderboard;
