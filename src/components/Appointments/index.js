import {Component} from 'react'

import {v4} from 'uuid'

import {format} from 'date-fns'

import AppointmentItem from '../AppointmentItem'

import './index.css'

class Appointments extends Component {
  state = {
    titleInput: '',
    dateInput: '',
    appointmentsList: [],
    isFilterApplied: false,
  }

  onChangeTitle = event => {
    this.setState({titleInput: event.target.value})
  }

  onChangeDate = event => {
    this.setState({dateInput: event.target.value})
  }

  onAddAppointment = event => {
    event.preventDefault()
    const {titleInput, dateInput} = this.state
    const formateDate = dateInput
      ? format(new Date(dateInput), 'dd MMMM yyyy,EEEE')
      : ''
    const newAppointment = {
      id: v4(),
      title: titleInput,
      date: formateDate,
      isStarred: false,
    }
    this.setState(prevState => ({
      appointmentsList: [...prevState.appointmentsList, newAppointment],
      titleInput: '',
      dateInput: '',
    }))
  }

  toggleStarBtn = id => {
    this.setState(prevState => ({
      appointmentsList: prevState.appointmentsList.map(i => {
        if (id === i.id) {
          return {...i, isStarred: !i.isStarred}
        }
        return i
      }),
    }))
  }

  starredBtn = () => {
    const {isFilterApplied} = this.state
    this.setState({isFilterApplied: !isFilterApplied})
  }

  getFilteredApplicationList = () => {
    const {appointmentsList, isFilterApplied} = this.state
    if (isFilterApplied) {
      return appointmentsList.filter(i => i.isStarred === true)
    }
    return appointmentsList
  }

  render() {
    const {
      titleInput,
      dateInput,

      isFilterApplied,
    } = this.state
    const filterClassName = isFilterApplied ? 'black' : 'blue'
    const filteredApplicationList = this.getFilteredApplicationList()
    return (
      <div className="d4">
        <div className="d5">
          <div className="d6">
            <form onSubmit={this.onAddAppointment}>
              <div className="d7">
                <h1>Add Appointment</h1>
                <label htmlFor="xx">TITLE</label>
                <input
                  type="text"
                  id="xx"
                  value={titleInput}
                  onChange={this.onChangeTitle}
                  className="t1"
                />
                <label htmlFor="yy">DATE</label>
                <input
                  type="date"
                  id="yy"
                  value={dateInput}
                  onChange={this.onChangeDate}
                  className="d1"
                />
                <button type="submit" className="btnbtn">
                  Add
                </button>
              </div>
            </form>

            <div>
              <img
                src="https://assets.ccbp.in/frontend/react-js/appointments-app/appointments-img.png"
                alt="img"
                className="img2"
              />
            </div>
          </div>
          <hr />
          <div>
            <div className="d3">
              <p className="p3">Appointments</p>
              <button
                type="button"
                className={`${filterClassName} www`}
                onClick={this.starredBtn}
              >
                Starred
              </button>
            </div>
          </div>

          <ul className="ul1">
            {filteredApplicationList.map(i => (
              <AppointmentItem
                details={i}
                key={i.id}
                toggleStarBtn={this.toggleStarBtn}
              />
            ))}
          </ul>
        </div>
      </div>
    )
  }
}
export default Appointments
