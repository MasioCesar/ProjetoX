import {
  Box,
  Button,
  Card,
  CardHeader,
  Popover,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from '@mui/material';

import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import { useContext, useEffect, useState } from 'react';
import { GetContext } from '../../contexts/getFirebaseContext';

export const Ranking = (props) => {

  const [time, setTime] = useState("Semanal");

  const [ranking, setRanking] = useState([])

  const getContext = useContext(GetContext);

  const allRanking = () => {
    getContext.getRanking(setRanking)
  }

  useEffect(() => {
    allRanking();
  }, []);

  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;

  if (ranking) {
    return (
      <Card {...props}>
        <CardHeader
          action={(
            <>
              <Button
                aria-describedby={id}
                onClick={handleClick}
                endIcon={<ArrowDropDownIcon fontSize="small" />}
                size="small"
              >
                {time}
              </Button>
              <Popover
                id={id}
                open={open}
                anchorEl={anchorEl}
                onClose={handleClose}
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'center',
                }}
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'center',
                }}
              >
                <Button onClick={() => setTime("Mensal")}
                  className='p-2 text-green-400'>Mensal</Button>
                <Button onClick={() => setTime("Semanal")}
                  className='p-2 text-green-400'>Semanal</Button>
              </Popover>
            </>
          )}
          title="Ranking"
        />
        <Box className='overflow-y-auto h-[38vh]'>
          <Table size='small'
            aria-label="a dense table">
            <TableHead sx={{ backgroundColor: 'background.dark' }}>
              <TableRow>
                <TableCell style={{ color: '#9b9ea3' }}>
                  Position
                </TableCell>
                <TableCell style={{ color: '#9b9ea3' }}>
                  Name
                </TableCell>
                <TableCell style={{ color: '#9b9ea3' }}>
                  Tasks
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {ranking.map((ranking, indice) => (
                <TableRow
                  key={indice}
                >
                  <TableCell>
                    {indice + 1}??
                  </TableCell>
                  <TableCell>
                    {ranking.userName}
                  </TableCell>
                  <TableCell style={{ color: '#9b9ea3' }}>
                    {ranking.score}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Box>
      </Card>
    );
  };
}