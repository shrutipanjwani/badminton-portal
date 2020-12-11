import React, {Fragment} from "react";
import ReactDOM from "react-dom";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Input from "@material-ui/core/Input";
import Paper from "@material-ui/core/Paper";
import IconButton from "@material-ui/core/IconButton";
// Icons
import EditIcon from "@material-ui/icons/EditOutlined";
import DoneIcon from "@material-ui/icons/DoneAllTwoTone";
import RevertIcon from "@material-ui/icons/NotInterestedOutlined";

const useStyles = makeStyles(theme => ({
  root: {
    width: "100%",
    overflowX: "auto"
  },
  title: {
    flexGrow: 1,
  },
  table: {
    width: 550,
    margin: 'auto',
  },
  selectTableCell: {
    width: 60
  },
  tableCell: {
    width: 130,
    height: 40,
  },
  input: {
    width: 130,
    height: 40
  }
}));

const createData = (start, end) => ({
  id: start.replace(" ", "_"),
  start,
  end,
  isEditMode: false
});

const CustomTableCell = ({ row, name, onChange }) => {
  const classes = useStyles();
  const { isEditMode } = row;
  return (
    <TableCell align="left" className={classes.tableCell}>
      {isEditMode ? (
        <Input
          value={row[name]}
          name={name}
          onChange={e => onChange(e, row)}
          className={classes.input}
        />
      ) : (
        row[name]
      )}
    </TableCell>
  );
};

export default function EditTime() {
  const [rows, setRows] = React.useState([
    createData("6:00AM", "7:00AM"),
    createData("7:00AM", "8:00AM"),
    createData("8:00AM", "9:00AM"),
    createData("9:00AM", "10:00AM"),
    createData("10:00AM", "11:00AM"),
    createData("11:00AM", "12:00PM"),
    createData("12:00PM", "1:00PM"),
    createData("1:00PM", "2:00PM"),
    createData("2:00PM", "3:00PM"),
    createData("3:00PM", "4:00PM"),
    createData("4:00PM", "5:00PM"),
    createData("5:00PM", "6:00PM"),
    createData("6:00PM", "7:00PM"),
    createData("7:00PM", "8:00PM"),
    createData("8:00PM", "9:00PM"),
    createData("9:00PM", "10:00PM"),
    createData("10:00PM", "11:00PM"),
    createData("11:00PM", "12:00PM")
  ]);
  const [previous, setPrevious] = React.useState({});
  const classes = useStyles();

  const onToggleEditMode = id => {
    setRows(state => {
      return rows.map(row => {
        if (row.id === id) {
          return { ...row, isEditMode: !row.isEditMode };
        }
        return row;
      });
    });
  };

  const onChange = (e, row) => {
    if (!previous[row.id]) {
      setPrevious(state => ({ ...state, [row.id]: row }));
    }
    const value = e.target.value;
    const name = e.target.name;
    const { id } = row;
    const newRows = rows.map(row => {
      if (row.id === id) {
        return { ...row, [name]: value };
      }
      return row;
    });
    setRows(newRows);
  };

  const onRevert = id => {
    const newRows = rows.map(row => {
      if (row.id === id) {
        return previous[id] ? previous[id] : row;
      }
      return row;
    });
    setRows(newRows);
    setPrevious(state => {
      delete state[id];
      return state;
    });
    onToggleEditMode(id);
  };

  return (
    <Fragment>
      <div className={classes.root}>
      <AppBar position="static">
          <Toolbar>
            <Typography variant="h6" className={classes.title}>
            Admin Portal
            </Typography>
          </Toolbar>
      </AppBar>
    </div>
      <Paper className={classes.root}>
      <br />
        <Table className={classes.table} id="table" aria-label="caption table">
          <TableHead>
        <TableRow>
          <TableCell></TableCell>
            <TableCell>Start Time</TableCell>
            <TableCell>End Time</TableCell>
        </TableRow>
      </TableHead>
          <TableBody>
            {rows.map(row => (
              <TableRow key={row.id}>
                <TableCell className={classes.selectTableCell} id="table-no-highlight">
                  {row.isEditMode ? (
                    <>
                      <IconButton
                        aria-label="done"
                        onClick={() => onToggleEditMode(row.id)}
                      >
                        <DoneIcon />
                      </IconButton>
                      <IconButton
                        aria-label="revert"
                        onClick={() => onRevert(row.id)}
                      >
                        <RevertIcon />
                      </IconButton>
                    </>
                  ) : (
                    <IconButton
                      aria-label="delete"
                      onClick={() => onToggleEditMode(row.id)}
                    >
                      <EditIcon />
                    </IconButton>
                  )}
                </TableCell>
                <CustomTableCell {...{ row, name: "start", onChange }} />
                <CustomTableCell {...{ row, name: "end", onChange }} />
                <TableCell>
                  <Button size="small"
                  style={{backgroundColor: '#6200EE', color: '#ffffff'}}>
                  Add a Break
                </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Paper>
  </Fragment>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<EditTime />, rootElement);
