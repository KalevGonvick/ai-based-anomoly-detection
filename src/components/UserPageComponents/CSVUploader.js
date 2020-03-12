import React, {Component} from 'react';

/*
 * This is the CSV file uploader componenet for User Page
 * Takes a CSV file and saves it in the state as an array
*/

export class FileUploader extends Component {
    constructor(props) {
        super(props);
        this.state = {
            fileArray: null,
            errorVisability: false,
            errorMessage: "",
        };
    }

    fileValidation(file) {
        const fileTypes = ['csv'];
        let isValid = false;

        if (file) {
            let extension = file.name.split('.').pop().toLowerCase()
            isValid = fileTypes.indexOf(extension) > -1;
        }
        return isValid;
    }

    csvToArray(fileText) {
        let rowArray = fileText.split('\n');
        let csvArray = [];

        rowArray.forEach(row => {
          csvArray.push(row.split(','));
        });
        return csvArray;
      }

      displayError() {
        this.setState({
          errorVisability: true,
          errorMessage: "Invalid file type",
        });
      }

      onSubmit(e) {
        e.preventDefault();
        let csvFile = e.target[0].files[0];
        // Save CSV file to state as an array
        if (this.fileValidation(csvFile)) {
          let reader = new FileReader();
          reader.readAsText(csvFile);
          reader.onload=(e)=> {
            let csvArray = this.csvToArray(e.target.result)
            this.setState({
              fileArray: csvArray,
              errorVisability: false,
            });
          }
        // Display Error message if file is not a CSV
        } else {
          this.displayError();
        }
        // Clear file input
        e.target[0].value = '';
      }
  
      render() {
        let alertVisible = this.state.errorVisability ? 'visible' : 'hidden';
        console.log(this.state);

        return (
          <div>
            <form onSubmit={(e)=> this.onSubmit(e)}>
              <input type='file' id='file' />
              <button>Upload</button>
              <div className="alert alert-danger" style={{visibility:alertVisible}}>
                <strong>Error!</strong> {this.state.errorMessage}
              </div>
            </form>
          </div>

        );
      }
}
