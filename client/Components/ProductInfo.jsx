import React from 'react';
import ReactDOM from 'react-dom';
import Standards from './Standards.jsx';
import Description from './Description.jsx';

export default class ProductInfo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      productId: '',
      searchTerm: '',
      value: '',
      productInfo: {},
    };
  }

  componentDidMount() {
    const param = [window.location.href.split('/')[4]];
    if (parseInt(param)) {
      this.setState({
        productId: param,
      }, () => {
        fetch(`http://localhost:3002/products/${this.state.productId}/description-and-standards`).then((res) => res.json()).then((data) => this.setState({
          productInfo: data,
        })).catch((err) => console.log(err));
      });
    } else {
      this.setState({
        searchTerm: param,
      }, () => {
        fetch(`http://localhost:3002/products/${this.state.searchTerm}/description`).then((res) => res.json()).then((data) => this.setState({
          productInfo: data,
        })).catch((err) => console.log(err));
      });
    }
  }

  render() {
    return (
      <div className="productService">
        <Description descriptionInfo={this.state.productInfo} />
        <Standards standardInfo={this.state.productInfo.standards} />
      </div>
    );
  }
}

// export default ProductInfo
