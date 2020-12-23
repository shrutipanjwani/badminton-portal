import React, { Fragment } from 'react';
import axios from "axios";

class UserVerification extends React.Component {

    async  getData(){
        try {
          var useremail = this.props.match.params.email
          var token = this.props.match.params.token

          const res = await axios.get('/users/verify', {
            params: {
              email: useremail,
              key: token
            }
          });
          this.props.history.replace( "/signin/true"  )
            
        } catch(err) {
          
          console.log(err.response);
          this.props.history.replace( "/signin/false" )
        }
    }
    
    componentDidMount(){
        this.getData();
    }
  
    render() {
        return (
            <Fragment></Fragment>
        );
    };
};

export default UserVerification;