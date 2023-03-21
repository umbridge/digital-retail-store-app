import React from 'react'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
// import { type } from 'os';
import './SizeChart.scss';

function createData(
    name: string,
    XS:string,
    S:string,
    M:string,
    L:string,
    XL:string,
    XXL:string
) {
    return { name, XS, S, M, L, XL, XXL };
}

const women = [
    createData("CHEST","34","36","39","42","46","48"),
    createData("HEIGHT","31","32","33","35","37","38"),
    createData("WAIST","31","32","33.5","35","37","38"),
    createData("HIPS","34","36.5","39","42.5","46","48")
]

const men = [
    createData("CHEST","44","46","49","42","46","48"),
    createData("HEIGHT","41","42","43","45","47","48"),
    createData("WAIST","41","42","4.5","45","47","48"),
    createData("HIPS","34","36.5","39","42.5","46","48")
]

export default function SizeChart(data:{type:string}) {
    return (
        <TableContainer sx={{marginTop:3}} component={Paper}>
            <p className='size-data-tag'style={{fontWeight:600}}>{data.type==="women"?"WOMEN":"MEN"}'S SIZE GUIDE</p>
            <Table sx={{ minWidth:300}} aria-label="simple table">
                <TableHead>
                    <TableRow sx={{fontWeight:600}}>
                        <TableCell className="size-data-tag" sx={{color:"#1C37C5"}}>SIZE</TableCell>
                        <TableCell className="data-tag" sx={{color:"#1C37C5"}} align="right">XS</TableCell>
                        <TableCell className="data-tag" sx={{color:"#1C37C5"}} align="right">S</TableCell>
                        <TableCell className="data-tag" sx={{color:"#1C37C5"}} align="right">M</TableCell>
                        <TableCell className="data-tag" sx={{color:"#1C37C5"}} align="right">L</TableCell>
                        <TableCell className="data-tag" sx={{color:"#1C37C5"}} align="right">XL</TableCell>
                        <TableCell className="data-tag" sx={{color:"#1C37C5"}} align="right">XXL</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {(data.type==="women"?women:men).map((row) => (
                        <TableRow
                            key={row.name}
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                            <TableCell component="th" scope="row">
                                {row.name}
                            </TableCell>
                            <TableCell align="right">{row.XS}</TableCell>
                            <TableCell align="right">{row.S}</TableCell>
                            <TableCell align="right">{row.M}</TableCell>
                            <TableCell align="right">{row.L}</TableCell>
                            <TableCell align="right">{row.XL}</TableCell>
                            <TableCell align="right">{row.XXL}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}