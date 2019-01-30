import React, { Component } from "react";
import { View } from 'react-native';
import { connect } from 'react-redux';
import { authUser } from '../actions/authentication';
import { closeErrDialog } from '../actions/dialog';
import SignInForm from '../components/Signinform';
import ErrorDialog from "../components/ErrorDialog";


class SignInScreen extends Component {
   
    static navigationOptions = {
        title: 'Please sign in'
    }

    handleAuth = (credentials) => {
        this.props.getAuth(credentials); 
        
      }
    
    handleClose = () => {
        console.log('inside handle close')
        this.props.closeErrDialog();
    }  

     
    render() {
        const { auth, dialog } = this.props;
        return (
            <View testId="signinScreen" style={{ flex: 1, justifyContent: 'center'}}>
                
                <ErrorDialog errMessage={auth} dialog={dialog} onClose={this.handleClose}/>
                <SignInForm onAuth={this.handleAuth}/>
                
            </View>
        )
    }
}

const mapDispatchToProps = dispatch => {
    return {
      getAuth: (credentials) => {
        dispatch(authUser(credentials))
      },
      closeErrDialog: () => {
          dispatch(closeErrDialog())
      }
    }
  }

const mapStateToProps = state => {
    return {
        auth: state.authentication,
        dialog: state.dialog
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SignInScreen);