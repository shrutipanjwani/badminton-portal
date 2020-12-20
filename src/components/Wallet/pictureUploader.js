import React from 'react';
//import axios from "axios";
export default class PictureUploader extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      picture: false,
      src: false
    }
  }
  
  handlePictureSelected(event) {
    var picture = event.target.files[0];
    var src     = URL.createObjectURL(picture);

    this.setState({
      picture: picture,
      src: src
    });
  }
  
  renderPreview() {
    if(this.state.src) {
      return (
        <img  class="rounded" alt="Avatar" src={this.state.src}/>
      );
    } else {
      return (
        <p>
        No Preview
        </p>
      );
    }
  }

  async upload() {
    var formData = new FormData();

    await formData.append("file", this.state.picture);
  
    //const res = axios.post("users/uploadfile", formData); 
  }

  render() {
    return (
      <div>
        <h5>Picture Uploader</h5>

        <input
          type="file"
          onChange={this.handlePictureSelected.bind(this)}
        />
        <br/>
        <div>
          <p>
            {this.renderPreview()}
          </p>
        </div>
        <hr/>
        <button onClick={this.upload.bind(this)}>
          Upload
        </button>
      </div>
    );
  }
}