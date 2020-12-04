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


   var productId = window.location.pathname.split('/')[2]*1
   console.log('productID', productId)
    this.setState({
      productId: productId
    }, function(){
      console.log(this.state.productId)
      //https://localhost:3001/products/:${this.state.productId}/description-and-standards
      fetch(`http://localhost:3002/products/${this.state.productId}/description-and-standards`,{
        headers : {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
         }
        }).then(res=>{
          console.log('here')
          return res.json()
        }).then(data=>this.setState({
          productInfo: data
        })).catch(err=>console.log(err))

    }.bind(this))
    }


  render() {

    if (this.state.productInfo.standards !== undefined && !this.state.productInfo.standards["N/A"]) {

    var standards = Object.keys(this.state.productInfo.standards).map((standard)=>{
      console.log('key', this.state.productInfo.standards[standard])
      return(
        <div >
        <div className = 'standardsContainer'>
      <div className = 'CCSS'>CCSS</div>
      <div  className = 'standards'>{standard}</div>
      </div>
       <div className = 'standardsDescription'>{this.state.productInfo.standards[standard]}</div>
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