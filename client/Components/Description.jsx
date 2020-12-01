import React from 'react';
import ReactDOM from 'react-dom';
class ProductInfo extends React.Component {
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
      fetch(`http://localhost:3002/${this.state.productId}:Id/description-and-standards`,{
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
    if (this.state.productInfo.standards !== undefined && this.state.productInfo.standards[0] !== 'N/A') {
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
  }else {
    var standards =<div className = 'standardsDescription'>N/A</div>

  }
    return (
      <div className = 'productService'>
         <div className = 'additionalInfo'></div>
<h3 className = 'DescriptionTitle'>Description</h3>
<div className='standardsDescription'>{this.state.productInfo.productDescription}</div>
      <div className = 'additionalInfoBox'>
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

    <div className = 'standardsDescription'>{standards}</div>
    </div>


    );
  }
}




export default ProductInfo