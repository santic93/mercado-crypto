import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { selectCrypto } from "../features/cryptoSlice";
import baseEndPoint from "../apis/coinGecko";
import CoinRow from "../components/CoinRow/CoinRow";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

const HeaderCell = styled(TableCell)({
  fontWeight: 800,
  fontSize: "16px",
  fontStyle: "italic",
  backgroundColor: "black",
  color: "white",
  textAlign: "center",
});

export default function Home() {
  const crypto = useSelector(selectCrypto);

  const [coins, setCoins] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const res = await baseEndPoint.get("/coins/markets", {
          params: {
            vs_currency: "ars",
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
        <div className="lds-roller">
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
          <Table size="small" aria-label="a dense table">
            <TableHead>
              <TableRow>
                <HeaderCell>Imagen</HeaderCell>
                <HeaderCell>Simbolo</HeaderCell>
                <HeaderCell>Ranking</HeaderCell>
                <HeaderCell>Precio actual</HeaderCell>
                <HeaderCell>Graficos</HeaderCell>
                <HeaderCell>Porcentaje precio por dia</HeaderCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {coins.map((coin) => (
                <CoinRow key={coin.id} data={coin} />
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </div>
  );
}
