import React from 'react';

class UserData extends React.Component{
   
    state =  {
            userData :  [],
            errorName : null,
            errorMobile : null,
            errorEmail: null,
            action:0,
            editIndex:null
        }

onFormSubmit = (e) => {
    e.preventDefault();
    let userList = this.state.userData;
    let name = this.refs.name.value;
    let mobile = this.refs.mobile.value;
    let email = this.refs.email.value;
    
    this.validateName();
    this.validateMobile();
    this.validateEmail();

    if(this.state.action===0){
        let User = {name,mobile,email};
        userList.push(User); 
    }
    else{
        let index =  this.state.editIndex;
        userList[index].name = name;
        userList[index].mobile = mobile;
        userList[index].email = email;
    }
    
    if(!this.state.errorName && !this.state.errorMobile && !this.state.errorEmail)
         this.setState({userData : userList, action : 0});

    this.refs.UserForm.reset();
}

handleUserEdit = (id) =>{
    let data = this.state.userData;
    this.refs.name.value = data[id].name;
    this.refs.mobile.value = data[id].mobile;
    this.refs.email.value = data[id].email;
    this.setState({action:1,editIndex:id});
    
}

handleUserDelete = (id) =>{
    let data = this.state.userData;
    data.splice(id,1);
    this.setState({userData : data});    
}

renderUserInTable = () => this.state.userData.map((user,id) =>  
                <tr key={id}> 
                  <td> {user.name}</td> 
                  <td> {user.mobile}</td>
                  <td> {user.email}</td>  
                  <td> <button type='button' onClick={() =>{this.handleUserEdit(id)}} className='btn btn-warning'>Edit</button></td>
                  <td> <button type='button' onClick={() => {this.handleUserDelete(id)}} className='btn btn-danger'>Delete</button></td>
                </tr>     
              );

validateName = () => {
    let name = this.refs.name.value;
    if(!name.match(/^[a-zA-Z]+$/) || name.length ===0)
        this.setState({errorName : "Invalid User Name"});
    else
        this.setState({errorName : null});
    }

validateMobile = () => {
    let mobile = this.refs.mobile.value;
    mobile.match(/^[\d]{10}$/) || mobile.length ? this.setState({errorMobile: null}) : this.setState({errorMobile: "Error: Invalid Mobile number"})
}

validateEmail = () => {
    let email = this.refs.email.value;
    email.match(/^([\w].)+@([\w])+\.([A-Za-z]{2,3})$/) || null ? this.setState({errorEmail: null}) : this.setState({errorEmail: "Error: Invalid Email address"})
}


render(){
       return(
        <div className='container'>
             <form onSubmit={this.onFormSubmit} ref='UserForm' className='form'>
                <div className='form-group'>
                    <input 
                        type='text' 
                        ref='name'
                        onBlur={this.validateName} 
                        className='form-control'  
                        placeholder='Enter Your Name'/>
                    <h4 className='text-danger'>{this.state.errorName}</h4>
                </div>

                <div className='form-group'>
                    <input 
                        type='text' 
                        ref='mobile'
                        onBlur={this.validateMobile}  
                        className='form-control'
                        placeholder='Enter Your Mobile number'/>
                    <h4 className='text-danger'>{this.state.errorMobile}</h4>
                </div>
                <div className='form-group'>
                    <input 
                        type='email ' 
                        ref='email' 
                        onBlur={this.validateEmail} 
                        className='form-control' 
                        placeholder='Enter Your Email Id'/>
                    <h4 className='text-danger'>{this.state.errorEmail}</h4>
                </div>
                <div>
                    <button type='submit' className='m-3 btn btn-primary'>Submit</button>
                    <button type='reset' onClick={()=>{this.refs.UserForm.reset()}} className='my-3 btn btn-secondary'>Cancel</button>
    
                </div>
            </form> 
            
            <div className='container my-   5'>
                <table className='table table-hover'>
                    <thead>
                       <tr> 
                        <th>User Name</th>
                        <th>Mobile no</th>
                        <th>Email address</th>
                        <th>Edit User</th>
                        <th>Delete User</th>
                       </tr>
                    </thead>
                    <tbody>
                       {   
                                    this.renderUserInTable()
                       }
                  </tbody>
                </table>
            </div>
        </div>);
    }
}

export default UserData;