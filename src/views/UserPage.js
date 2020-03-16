import React, { Component } from 'react';
import CSVDropzone from '../components/UserPageComponents/CSVDropzone';
class UserPage extends Component {
  constructor() {
    super();
    this.state = {
      page: "default"
    }
  }
  render() {
    return (
      <div>
        <p>User Upload Stuff goes here</p>
        <CSVDropzone />
      </div>
    );
  }
}

export default UserPage;
