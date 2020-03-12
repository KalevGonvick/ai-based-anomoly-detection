import React, { Component } from 'react';
import {FileUploader} from '../components/UserPageComponents/CSVUploader';
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
        User Upload Stuff goes here
        <FileUploader />
      </div>
    );
  }
}

export default UserPage;
