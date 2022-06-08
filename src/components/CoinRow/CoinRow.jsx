import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { selectCrypto, DELETE_CRYPTO } from "../../features/cryptoSlice";

import { accounting } from "accounting";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import { styled } from "@mui/material/styles";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import {
  ArrowDropDownOutlined,
  ArrowDropUpOutlined,
  BarChartOutlined,
} from "@mui/icons-material";
import { Paper, Table, TableContainer } from "@mui/material";

const CoinRow = ({
  data: {
    id,
    image,
    symbol,
    current_price,
    market_cap_rank,
    price_change_percentage_24h,
  },
}) => {
  const crypto = useSelector(selectCrypto);
  const dispatch = useDispatch();
  const deleteCrypto = (e, id) => {
    e.preventDefault();
    const _crypto = crypto.filter((items) => items !== id);
    dispatch(DELETE_CRYPTO(_crypto));
  };
  return (
    <div>
      <TableRow className="table-row">
        <TableCell>
          {<img src={image} alt="Imagen de la Crypto Moneda" />}
        </TableCell>
        <TableCell>{symbol}</TableCell>
        <TableCell>{market_cap_rank}</TableCell>
        <TableCell>{accounting.formatMoney(current_price, "$")}</TableCell>
        <TableCell>
          <Link to={`/crypto/${id}`}>
            <BarChartOutlined />
          </Link>
        </TableCell>
        <TableCell className="table">
          <div className="map">
            {price_change_percentage_24h > 0 ? (
              <div>
                <ArrowDropUpOutlined className="positivo" />
                <span className="positivo">{price_change_percentage_24h}</span>
              </div>
            ) : price_change_percentage_24h === 0 ? (
              <div>{price_change_percentage_24h}</div>
            ) : (
              <div>
                <ArrowDropDownOutlined className="negativo" />
                <span className="negativo">{price_change_percentage_24h}</span>
              </div>
            )}
            <span
              className="eliminar"
              onClick={(e) => {
                deleteCrypto(e, id);
              }}
            >
              <DeleteForeverIcon />
            </span>
          </div>
        </TableCell>
      </TableRow>
    </div>
  );
};

export default CoinRow;
