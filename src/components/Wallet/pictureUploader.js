import React from 'react';
import axios from "axios";
import icon from "../../img/user.png";

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
    this.upload(picture);
  }

 componentWillReceiveProps(nextProps) {
   console.log(nextProps.data);
  
		this.setState({ src: nextProps.data });  
 }

  async upload(picture) {
    try{
      var formData = new FormData();

      formData.append("avatar", picture);
      
      axios.post("/users/uploadfile",  formData).then(res => { })
    }catch(err){

    }
  }

  render() {
    return (
      <div style={{marginTop: "20px"}}>
        <div class="image-upload">
          <label for="file-input">
              <img src={this.state.src ? this.state.src : icon} className="rounded"/>
              <i className="fa fa-edit" style={{ fontSize: "22px", marginLeft: "-25px", zIndex: "99", backgroundColor: "#841e2d", borderRadius: "50%"}}></i>
          </label>
          <input id="file-input" type="file" onChange={this.handlePictureSelected.bind(this)}/>
        </div>
        <br/>
        {/* <button className="btn btn-primary" onClick={this.upload.bind(this)}>
         <i className="fa fa-camera"></i>
        </button> */}
      </div>
    );
  }
}