function Description(props) {
  console.log(props)
  return (
  <div>
    <div className = 'additionalInfo'></div>
    <h3 className = 'DescriptionTitle'>Description</h3>
    <div className='standardsDescription'>{props.descriptionInfo.productDescription}</div>
    <div className = 'additionalInfoBox'>
      <div className = 'items1'>
        <div className = 'additionalInfoDesc'>Total Pages</div>
        <div className = 'additionalInfoItem'>{props.descriptionInfo.pageLength}</div>
      </div>
      <div className = 'items2'>
        <div className = 'additionalInfoDesc'>Answer Key</div>
        <div className = 'additionalInfoItem'>{props.descriptionInfo.answerKeyIncluded}</div>
      </div>
      <div className = 'items3'>
        <div className = 'additionalInfoDesc'>Teaching Duration</div>
        <div className = 'additionalInfoItem'>{props.descriptionInfo.teachingDuration}</div>
      </div>
    </div>
    <div className = 'additionalInfo'>
      <h3 className ='DescriptionTitle' >Standards</h3>
    </div>
    </div>
  )

}
  export default Description