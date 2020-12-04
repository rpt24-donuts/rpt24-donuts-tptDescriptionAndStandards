function Standards(props) {
  if (props.standardInfo !== undefined && !props.standardInfo["N/A"]) {
    var standards = Object.keys(props.standardInfo).map((standard)=>{
      return (
        <div className = 'standardsDescription'>
          <div className = 'standardsContainer'>
            <div className = 'CCSS'>CCSS</div>
            <div  className = 'standards'>{standard}</div>
          </div>
          <div className = 'standardsDescription'>{props.standardInfo[standard]}</div>
        </div>
      )
  })
  }else {
    return (
    <div className = 'standardsDescription'>N/A </div>
    )
  }
  return (
    standards
  )
}
export default Standards