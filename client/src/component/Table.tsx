import { useEffect, useState } from 'react';
import '../App.css';





type Row
    = {
        username: string
        score: number
        position: number// | undefined
        top: string// | undefined
    }
// const initTable: Row[] = []

type Props = {
    pTable: Row[]
    nbScore: number
}


const LeaderboardTable = ({ pTable, nbScore }: Props) => {

    const [table, setTable] = useState(pTable)

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
                    arrondi = 5
                    //10?
                }

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
            setTable(newTable)

        }
    }
        , [table, nbScore])





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

        <div className='lb-container'>
            {
                table.length ? <table className='leaderboard-table'>
                    <thead>
                        <tr>
                            <th className='leaderboard-head'>JOUEUR</th>
                            <th className='leaderboard-head'>SCORE</th>
                            <th className='leaderboard-head'>POSITION</th>
                            <th className='leaderboard-head'>TOP</th>
                        </tr>
                    </thead>
                    <tbody>
                        {table.map((row: Row) => {
                            const cellClass = getCellClass(row.position);
                            return (
                                <tr key={row.position}>
                                    <td className={cellClass}>{row.username}</td>
                                    <td className={cellClass}>{row.score}</td>
                                    <td className={cellClass}>{row.position}</td>
                                    <td className={cellClass}>{row.top}</td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
                    : <>
                        <tbody></tbody>
                        <div>aucun joueur trouvé pour cette date</div>
                    </>
            }
        </div>


    )
}

export default LeaderboardTable;
