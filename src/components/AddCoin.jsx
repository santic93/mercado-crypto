import { useState, useEffect } from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import baseEndPoint from '../apis/coinGecko';
import { AddCircle } from '@mui/icons-material';
import { useSelector, useDispatch } from 'react-redux';
import { selectCrypto, ADD_CRYPTO } from '../features/cryptoSlice';

export default function AddCoin() {
  const [selected, setSelected] = useState('');
  const [list, setList] = useState([]);
  const dispatch = useDispatch();
  const crypto = useSelector(selectCrypto);
  useEffect(() => {
    const fetchData = async () => {
      const response = await baseEndPoint.get('/coins/list', {
        params: {
          include_platform: false,
        },
      });
      setList(response.data);
    };
    fetchData();
  }, []);

  return (
    <div>
      <FormControl variant='filled' sx={{ m: 3, minWidth: 250 }}>
        <InputLabel id='demo-simple-select-filled-label'>
          <AddCircle /> Agregar CryptoMoneda
        </InputLabel>
        <Select
          labelId='demo-simple-select-filled-label'
          id='demo-simple-select-filled'
          value={selected}
          onChange={(e) => {
            if (crypto.indexOf(e.target.value) === -1) {
              dispatch(ADD_CRYPTO([...crypto, e.target.value]));
            }
          }}
        >
          <MenuItem value=''>
            <em>None</em>
          </MenuItem>
          {list.slice(0, 100).map((item) => (
            <MenuItem key={item.id} value={item.id}>
              {item.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
}
