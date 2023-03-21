import React from 'react'
import Html5QrcodePlugin from './Html5QrcodePlugin'
// import ResultContainerPlugin from './ResultContainerPlugin'
import './BarcodeScanner.scss'
import { redirect } from 'react-router-dom';

class BarcodeScanner extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        decodedResults: []
      }
  
      // This binding is necessary to make `this` work in the callback.
      this.onNewScanResult = this.onNewScanResult.bind(this);
    }

    componentDidMount(){
      document.getElementById('html5-qrcode-button-camera-permission').click();
    }
  
    render() {
      return (
        <div className="App">
          <section className="App-section">
            <div className="App-section-title"> Html5-qrcode React demo</div>
            <br />
            <br />
            <br />
            <Html5QrcodePlugin 
              fps={10}
              qrbox={250}
              disableFlip={false}
              qrCodeSuccessCallback={this.onNewScanResult}/>
          </section>
        </div>
      );
    }
  
    onNewScanResult(decodedText, decodedResult) {
        redirect('https://www.geeksforgeeks.org/javascript-redirect-a-url/');

      this.setState((state, props) => {
        state.decodedResults.push(decodedResult);
        return state;
      });
    }
  }
  
  export default BarcodeScanner;
