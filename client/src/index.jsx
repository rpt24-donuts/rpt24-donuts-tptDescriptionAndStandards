class NameForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: '',
      productInfo: {}
    };
    this.getApiData = this.getApiData.bind(this)
  }

  getApiData() {
  fetch('http://localhost:3001/1:Id/DS',{
  headers : {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
   }
  }).then(res=>{return res.json()}).then(data=>this.setState({
    productInfo: data
  })).catch(err=>console.log(err))
  }



  render() {
    return (
      <form>
        <label>
          Name:
          <input type="text" value={this.state.value} onChange={this.getApiData} />
        </label>
        <input type="submit" value="Submit" />
      </form>
    );
  }
}


ReactDOM.render(
  <NameForm/>,
  document.getElementById('root')
);