import React from 'react';
import ReactDOM from 'react-dom';

import { shallow, render, mount, configure } from 'enzyme';
import ProductInfo from '../client/Components/Description'
import Adapter from 'enzyme-adapter-react-16';
// React 16 Enzyme adapter
require('jest-fetch-mock').enableMocks()
configure({ adapter: new Adapter() });
fetch = jest.fn(() => Promise.resolve({
  json:() =>Promise.resolve(
  {
    productId:1,
    productInfo:{
      answerKeyIncluded: "not included",
      pageLength: 150,
      productDescription: "test test",
      standards:["CCRA.SL.4.4", "CCRA.SL.4.5"],
      standardsDescription: ['test', 'test'],
      teachingDuration: "1 year"
  }
})
})
  );


describe('ProductInfo', () => {
  const productId = window.location.pathname.slice(1).split(':')[0]*1
  test('should render', () => {
    return fetch().then(el=>{
    let wrapper = shallow(
      <ProductInfo />
    )
        var productInfo = {
      answerKeyIncluded: "not included",
      pageLength: 150,
      productDescription: "test test",
      standards:["CCRA.SL.4.4", "CCRA.SL.4.5"],
      standardsDescription: ['test', 'test'],
      teachingDuration: "1 year"
  }
    wrapper.setState({ productId: 1, productInfo: productInfo  })


    expect(wrapper.exists()).toBeTruthy()
    console.log(wrapper.state())
  //   var productInfo = {
  //     answerKeyIncluded: "not included",
  //     pageLength: 150,
  //     productDescription: "test test",
  //     standards:["CCRA.SL.4.4", "CCRA.SL.4.5"],
  //     standardsDescription: ['test', 'test'],
  //     teachingDuration: "1 year"
  // }
  //
    })
  })
})
