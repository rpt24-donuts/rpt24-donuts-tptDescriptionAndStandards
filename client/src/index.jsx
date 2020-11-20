
class NameForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      productId: "",
      value: '',
      productInfo: {}
    };


  }



  componentDidMount() {
   var productId = window.location.pathname.slice(1).split(':')[0]*1
    this.setState({
      productId: productId
    }, function(){
      console.log(this.state.productId)
      fetch(`http://localhost:3001/${this.state.productId}:Id/DS`,{
        headers : {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
         }
        }).then(res=>{return res.json()}).then(data=>this.setState({
          productInfo: data
        })).catch(err=>console.log(err))

    }.bind(this))
    }


  render() {
    if (this.state.productInfo.standards !== undefined) {
    var standards = this.state.productInfo.standards.map((standard,i)=>{
      return(
        <div >
        <div className = 'standardsContainer'>
      <div className = 'CCSS'>CCSS</div>
      <div  className = 'standards'>{standard}</div>


      </div>
       <div className = 'standardsDescription'>{this.state.productInfo.standardsDescription[i]}</div>
       </div>
      )
    })
  }
    return (
      <div className = 'productService'>
         <div className = 'additionalInfo'></div>
<h3 className = 'DescriptionTitle'>Description</h3>
<p>{this.state.productInfo.productDescriptions}</p>
      <div className = 'additionalInfo'>
        <div className = 'items1'>
        <div className = 'additionalInfoDesc'>Total Pages</div>
    <div className = 'additionalInfoItem'>{this.state.productInfo.pageLength}</div>
        </div>
        <div className = 'items2'>
        <div className = 'additionalInfoDesc'>Answer Key</div>
        <div className = 'additionalInfoItem'>{this.state.productInfo.answerKeyIncluded}</div>
        </div>
        <div className = 'items3'>
        <div className = 'additionalInfoDesc'>Teaching Duration</div>
        <div className = 'additionalInfoItem'>{this.state.productInfo.teachingDuration}</div>
        </div>
      </div>
      <div className = 'additionalInfo'>
      <h3 className ='DescriptionTitle' >Standards</h3>
      </div>

    <div>{standards || 'N/A'}</div>
    </div>
    </div>

    );
  }
}


ReactDOM.render(
  <NameForm/>,
  document.getElementById('root')
);