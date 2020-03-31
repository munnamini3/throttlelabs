import React from 'react';
import './App.css';
import Grid from '@material-ui/core/Grid';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import ActivityModal from './activityModal'
import {data} from './dataJson'
import * as moment from 'moment'
class App extends React.Component {
  state = {
    data: [],
    itemData: [],
    calendarData: [],
    open: false
  }
  componentDidMount = () => {
    this.setState({data})
  //   fetch(`https://fullthrottleapi.free.beeceptor.com/`, {
  //     method: 'GET',
  //     headers: {
  //       'Content-Type': 'application/json'
  //     }
  //   })
  //     .then(res => {
  //       if (res.status !== 200 && res.status !== 201) {
  //         throw new Error('Failed!');
  //       }
  //       return res.json();
  //     })
  //     .then(data => {
  //       console.log(data)
  //       if (data.ok === true) {
  //         this.setState({ data: data.members })
  //       }
  //     })
   }
  handleClick = (e, item) => {
    var calendarData = []
    for (var i = 0; i < item.activity_periods.length; i++) {
      var obj = {
        title: "ActPeriod" + (i + 1),
        start: new Date(moment(item.activity_periods[i].start_time, 'MMM DD YYYY hh:mmA').format('MMM DD YYYY HH:mm')),
        end: new Date(moment(item.activity_periods[i].end_time, 'MMM DD YYYY hh:mmA').format('MMM DD YYYY HH:mm'))
      }
      calendarData.push(obj)
    }

    this.setState({ open: true, itemData: item.activity_periods, calendarData })
  }
  handleClose = () => {
    this.setState({ open: false })
  }
  render() {
    const { data, open, itemData, calendarData } = this.state
    console.log(this.state)
    return (
      <Paper>
        <h1 style={{ textAlign: "center", color: "orange" }}><b>FullThrottle Labs</b></h1>
        <Grid container direction="row" justify="center">
          <ActivityModal handleClose={this.handleClose} open={open} itemdata={itemData} calendarData={calendarData} />
          <Grid item xs={10}>
            <div className="headerDiv">
              <h2 className="header"><b>USERS</b></h2>
              <TableContainer>
                <Table aria-label="simple table">
                  <TableHead>
                    <TableRow style={{ backgroundColor: "teal" }}>
                      <TableCell style={{ color: "white" }}>Sl. No</TableCell>
                      <TableCell style={{ color: "white" }}>User ID</TableCell>
                      <TableCell style={{ color: "white" }}>Name</TableCell>
                      <TableCell style={{ color: "white" }}>Time Zone</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {
                      data.map((item, i) => {
                        return (
                          <TableRow onClick={(e) => { this.handleClick(e, item) }} style={{ cursor: "pointer" }} className="rowCss">
                            <TableCell>{i + 1}</TableCell>
                            <TableCell>{item.id}</TableCell>
                            <TableCell>{item.real_name}</TableCell>
                            <TableCell>{item.tz}</TableCell>

                          </TableRow>
                        )
                      })
                    }

                  </TableBody>
                </Table>
              </TableContainer>
            </div>
          </Grid>
        </Grid>
      </Paper>
    );
  }
}
export default App

