import loading from './loading.gif'
import React, { Component } from 'react'

export default class Spinner extends Component {
  render() {
    return (
      <div className='d-flex justify-content-center my-4'>
        < img src={loading} alt="" />
      </div>
    )
  }
}
