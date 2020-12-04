import React from 'react';
import ReactDOM from 'react-dom';
import Standards from './Standards.jsx'
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
    this.setState({
      productId: productId
    }, function() {
      fetch(`http://localhost:3002/products/${this.state.productId}/description-and-standards`, {
        headers : {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
         }
        }).then(res=> {return res.json()}).then(data=>this.setState({
          productInfo: data
        })).catch(err=>console.log(err))
        }.bind(this))
    }


  render() {
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
        <Standards standardInfo = {this.state.productInfo.standards}/>
      </div>
    );
  }
}




export default ProductInfo