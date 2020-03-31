import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
//calendar
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import listPlugin from '@fullcalendar/list'
import interactionPlugin, { Draggable } from '@fullcalendar/interaction' // needed for dayClick
import '@fullcalendar/core/main.css';
import '@fullcalendar/daygrid/main.css';
import '@fullcalendar/timegrid/main.css';
import '@fullcalendar/list/main.css';

const useStyles = makeStyles((theme) => ({
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    width: "60%"
  },
}));

export default function ActivityModal(props) {
  console.log(props)
  const classes = useStyles();
  const [value, setValue] = React.useState(0)
  const handleChangeTabs = (event, newValue) => {
    setValue(newValue);
  };
  return (
    <div>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={props.open}
        onClose={props.handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={props.open}>
          <div className={classes.paper}>
            <h2 id="transition-modal-title">Activity Periods</h2>
            <Tabs
              value={value}
              indicatorColor="primary"
              textColor="primary"
              onChange={handleChangeTabs}
              aria-label="disabled tabs example"
            >
              <Tab label="Table" />


              <Tab label="Calendar" />
            </Tabs>
            {value === 0 &&
              <>
                <br />
                <TableContainer>
                  <Table aria-label="simple table">
                    <TableHead>
                      <TableRow style={{ backgroundColor: "teal" }}>
                        <TableCell style={{ color: "white" }}>Sl. No</TableCell>
                        <TableCell style={{ color: "white" }}>Start Time</TableCell>
                        <TableCell style={{ color: "white" }}>End Time</TableCell>
                        ==
                    </TableRow>
                    </TableHead>
                    <TableBody>
                      {
                        (props.itemdata != undefined && props.itemdata.length > 0) ?
                          props.itemdata.map((item, i) => {
                            console.log(item)
                            return (
                              <TableRow>
                                <TableCell>{i + 1}</TableCell>
                                <TableCell>{item.start_time}</TableCell>
                                <TableCell>{item.end_time}</TableCell>

                              </TableRow>
                            )
                          }) : <TableRow><TableCell colSpan="3">No Data Found</TableCell></TableRow>
                      }

                    </TableBody>
                  </Table>
                </TableContainer>
              </>
            }
            {value === 1 &&
              <>
                <div style={{ height: '500pt' }}>
                  <FullCalendar
                    defaultView="dayGridMonth"
                    header={{
                      left: 'prevYear,prev,next,nextYear today',
                      center: 'title',
                      right: 'dayGridMonth,timeGridWeek,timeGridDay,listWeek'
                    }}
                    plugins={[dayGridPlugin, timeGridPlugin, listPlugin, interactionPlugin]}
                    // ref={this.calendarComponentRef}
                    weekends={true}
                    events={props.calendarData}
                  />
                </div>
              </>
            }
          </div>
        </Fade>
      </Modal>
    </div>
  );
}
