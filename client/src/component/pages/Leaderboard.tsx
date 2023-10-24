import React, { useEffect, useState } from 'react';
import Navbar from '../Navbar';
import '../../App.css';
import { Link } from 'react-router-dom';
import AdminModale from '../AdminModale';
import LeaderboardTable from '../Table';



const apiRoute = "http://127.0.0.1:8000/api/v0/"
const mapRoute = "maps/"
const scoreRoute = "scores/"

type Row
  = {
    username: string
    score: number
    position: number
    top: string
  }
const initTable: Row[] = []


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

  const [isModaleActive, setIsModaleActive] = useState(false)


  useEffect(() => {

    if (mapID) {

      fetch(apiRoute + scoreRoute + 'leaderboard?MapID=' + mapID)
        .then(response => {
          // console.log(response)
          return response.json() // Convert response to JSON
        })
        .then(response => {

          setNbScore(response.countResults[0].total_rows)
          // setTable([])
          setTable(response.results)


        })
    }

  }, [mapID])


  useEffect((
  ) => {

    if (!isModaleActive) {

      fetch(apiRoute + mapRoute + 'map_from_index?numMap=' + mapFetchedID)
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

          if (data) {

            setMapID(data.id)
            setMapDate(convertISOToCustomFormat(data.date))
          }

        })

    }

  }, [mapFetchedID, isModaleActive])


  const playSeedButton = <Link to={`/play?id=${mapID}`}>
    <button style={{ backgroundColor: "#ada997" }}
    >
      Jouer </button >

  </Link>


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


  return (
    <div className="app">

      <Navbar></Navbar>


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
          table.length ? <LeaderboardTable pTable={table} nbScore={nbScore} />
            : <>
              {/* <tbody></tbody> */}
              <div>aucun joueur trouvé pour cette date</div>
            </>
        }
      </div>

      {mapID && <>
        <button className='delete-map-button button' onClick={() => setIsModaleActive(true)}>
          ADMIN : <br></br>Supprimez map
        </button>
        <AdminModale isActive={isModaleActive} mapID={mapID} desactivation={() => setIsModaleActive(false)} ></AdminModale>
      </>

      }


    </div >

  );

}

export default Leaderboard;
