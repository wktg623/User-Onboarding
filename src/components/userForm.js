import React, { useState, useEffect } from "react";
import { withFormik, Form, Field } from "formik";
import * as Yup from 'yup';
import axios from "axios";
import styled from 'styled-components';

const Card = styled.div`
color: white;
box-sizing: border-box;
width: 100%;
border: solid black 1px;
margin-top: 10px;
padding: 3px;
background: navy;
border-radius: 15px;
`;

const UserForm = ({values, errors, touched, status }) =>{
 console.log(values)
 
const [users, setUsers] = useState([]);

useEffect(()=>{
status && setUsers(users=> [...users, status])
}, [status])



    return(
        <div>
         
            <Form>
              
 <label>Name:</label>  <br/>    
<Field
type = "text"
name = "name"/>
{touched.name && errors.name && (<p>{errors.name}</p>)}

<br/>
<label>E-mail:</label>   <br/>   
<Field
type = "text"
name = "email"/>
{touched.email && errors.email && <p>{errors.email}</p>}
<br/>
<label>Password:</label>   <br/>   
<Field
type = "text"
name = "password"/> <br /><br />

<label>Role:</label>     
<Field

as = "select"
name = "role">
<option>Please choose your role with your company:</option>
<option value= "senior">Senior Engineer</option>
<option value = "junior">Junior Engineer</option>
<option value = "internt">Intern</option>
</Field>
<br/><br />
<label>Job Description:</label><br/>
<Field as = "textarea" type = "text"
name = "comment"/>
<br/>
<label>Terms of Use:</label>     
<Field
type = "checkbox"
name = "terms"/>

<br/>


<button>Submit</button>

</Form>

{users.map(user=> 
<Card> <ul key = {user.kd}>
    
    <li>Name: {user.name}</li>
    <li>Email: {user.email}</li>
  </ul></Card>
  )}

        </div>
    )
   
}

const FormikForm = withFormik({
    mapPropsToValues({name, email, password, role, comments, terms}){
        return {
         name: name || "",
         email: email || "",
        password: password || "",
         terms: terms || false,
         comments: comments|| "",
         role: role || ""

        }
    },
    validationSchema: Yup.object().shape({
      name: Yup.string().required(),
      email: Yup.string().required("Please enter your email")
    }),
    handleSubmit(values, {setStatus}){
      axios
      .post("https://reqres.in/api/users_", values)
      .then(response=> {
        setStatus(response.data);
      })
      .catch(error=>console.log(error.response))
    }
}
)(UserForm);

export default FormikForm;