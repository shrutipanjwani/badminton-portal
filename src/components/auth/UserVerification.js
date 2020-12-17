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
          const verify = res.data;
          this.props.history.push( "/signin/true"  )
            
        } catch(err) {
          
          console.log(err.response);
          this.props.history.push( "/signin/false" )
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