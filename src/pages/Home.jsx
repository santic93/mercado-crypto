import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { selectCrypto, DELETE_CRYPTO } from '../features/cryptoSlice.js';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import {
  ArrowDropDownOutlined,
  ArrowDropUpOutlined,
  BarChartOutlined,
} from '@mui/icons-material';
import baseEndPoint from '../apis/coinGecko';
//import CoinRow from '../components/CoinRow/CoinRow';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import Paper from '@mui/material/Paper';
//import AddCoin from '../components/AddCoin';

import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';

//import { Box } from '@mui/material';
import { accounting } from 'accounting';
//import DeleteForeverIcon from '@mui/icons-material/DeleteForever';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

export default function Home() {
  const dispatch = useDispatch();
  const [coins, setCoins] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const deleteCrypto = (e, id) => {
    e.preventDefault();
    const _crypto = crypto.filter((items) => items !== id);
    dispatch(DELETE_CRYPTO(_crypto));
  };
  const crypto = useSelector(selectCrypto);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const res = await baseEndPoint.get('/coins/markets', {
          params: {
            vs_currency: 'ars',
            ids: crypto.join(),
          },
        });
        setCoins(res.data);
        setIsLoading(false);
      } catch (err) {
        console.log(err);
      }
    };
    if (crypto.length) {
      fetchData();
    } else {
      setCoins([]);
    }
  }, [crypto]);
  return (
    <div>
      {isLoading ? (
        <div className='lds-roller'>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div>
      ) : (
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 700 }} aria-label='customized table'>
            <TableHead>
              <TableRow>
                <StyledTableCell>Imagen</StyledTableCell>
                <StyledTableCell align='right'>Nombre</StyledTableCell>
                <StyledTableCell align='right'>Ranking</StyledTableCell>
                <StyledTableCell align='right'>Precio actual</StyledTableCell>
                <StyledTableCell align='right'>Graficos</StyledTableCell>
                <StyledTableCell align='right'>
                  Porcentaje precio por dia
                </StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {coins.map((coin) => (
                <StyledTableRow key={coin.name} className='table-row'>
                  <StyledTableCell component='th' scope='row'>
                    {<img src={coin.image} alt='Imagen de la Crypto Moneda' />}
                  </StyledTableCell>
                  <StyledTableCell align='right'>
                    <b>{coin.name}</b>
                  </StyledTableCell>
                  <StyledTableCell align='right'>
                    {coin.market_cap_rank}
                  </StyledTableCell>
                  <StyledTableCell align='right'>
                    {accounting.formatMoney(coin.current_price, '$')}
                  </StyledTableCell>
                  <StyledTableCell align='right'>
                    {' '}
                    <Link to={`/crypto/${coin.id}`}>
                      <BarChartOutlined />
                    </Link>
                  </StyledTableCell>
                  <StyledTableCell className='table'>
                    <div className='map'>
                      {coin.price_change_percentage_24h > 0 ? (
                        <div>
                          <ArrowDropUpOutlined className='positivo' />
                          <span className='positivo'>
                            {coin.price_change_percentage_24h}
                          </span>
                        </div>
                      ) : coin.price_change_percentage_24h === 0 ? (
                        <div>{coin.price_change_percentage_24h}</div>
                      ) : (
                        <div>
                          <ArrowDropDownOutlined className='negativo' />
                          <span className='negativo'>
                            {coin.price_change_percentage_24h}
                          </span>
                        </div>
                      )}
                      <span
                        className='eliminar'
                        onClick={(e) => {
                          deleteCrypto(e, coin.id);
                        }}
                      >
                        <DeleteForeverIcon />
                      </span>
                    </div>
                  </StyledTableCell>
                </StyledTableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </div>
  );
}

// import React, { useEffect, useState } from 'react';
// import { useSelector } from 'react-redux';
// import { selectCrypto } from '../features/cryptoSlice';
// import baseEndPoint from '../apis/coinGecko';
// import CoinRow from '../components/CoinRow/CoinRow';
// import { styled } from '@mui/material/styles';
// import Table from '@mui/material/Table';
// import TableBody from '@mui/material/TableBody';
// import TableCell from '@mui/material/TableCell';
// import TableContainer from '@mui/material/TableContainer';
// import TableHead from '@mui/material/TableHead';
// import TableRow from '@mui/material/TableRow';
// import Paper from '@mui/material/Paper';
// import AddCoin from '../components/AddCoin';

// const HeaderCell = styled(TableCell)({
//   fontWeight: 800,
//   fontSize: '16px',
//   fontStyle: 'italic',
//   backgroundColor: 'black',
//   color: 'white',
//   textAlign: 'center',
// });

// export default function Home() {
//   const crypto = useSelector(selectCrypto);

//   const [coins, setCoins] = useState([]);
//   const [isLoading, setIsLoading] = useState(false);

//   useEffect(() => {
//     const fetchData = async () => {
//       setIsLoading(true);
//       try {
//         const res = await baseEndPoint.get('/coins/markets', {
//           params: {
//             vs_currency: 'ars',
//             ids: crypto.join(),
//           },
//         });
//         setCoins(res.data);
//         setIsLoading(false);
//       } catch (err) {
//         console.log(err);
//       }
//     };
//     if (crypto.length) {
//       fetchData();
//     } else {
//       setCoins([]);
//     }
//   }, [crypto]);

//   return (
//     <div>
//       {isLoading ? (
//         <div className='lds-roller'>
//           <div></div>
//           <div></div>
//           <div></div>
//           <div></div>
//           <div></div>
//           <div></div>
//           <div></div>
//           <div></div>
//         </div>
//       ) : (
//         <div>
//         <AddCoin />
//           <TableContainer component={Paper}>
//             <Table size='small' aria-label='a dense table'>
//               <TableHead>
//                 <TableRow>
//                   <HeaderCell>Imagen</HeaderCell>
//                   <HeaderCell>Simbolo</HeaderCell>
//                   <HeaderCell>Ranking</HeaderCell>
//                   <HeaderCell>Precio actual</HeaderCell>
//                   <HeaderCell>Graficos</HeaderCell>
//                   <HeaderCell>Porcentaje precio por dia</HeaderCell>
//                 </TableRow>
//               </TableHead>
//               <TableBody>
//                 {coins.map((coin) => (
//                   <CoinRow key={coin.id} data={coin} />
//                 ))}
//               </TableBody>
//             </Table>
//           </TableContainer>

//         </div>
//       )}
//     </div>
//   );
// }
