import './index.css'

const AppointmentItem = props => {
  const {details, toggleStarBtn} = props
  const {title, date, isStarred, id} = details
  const startImgUrl = isStarred
    ? 'https://assets.ccbp.in/frontend/react-js/appointments-app/filled-star-img.png'
    : 'https://assets.ccbp.in/frontend/react-js/appointments-app/star-img.png'
  const starBtn = () => {
    toggleStarBtn(id)
  }
  return (
    <li className="list1">
      <div className="d2">
        <div className="d1">
          <p className="p1">{title}</p>
          <button type="button" className="btn1">
            <img src={startImgUrl} alt="img" onClick={starBtn} />
          </button>
        </div>
        <p className="p2">{date}</p>
      </div>
    </li>
  )
}
export default AppointmentItem
