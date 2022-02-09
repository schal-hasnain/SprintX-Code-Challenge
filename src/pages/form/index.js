import axios from 'axios';
import Container from 'components/container';
import Input from 'components/input';
import Select from 'components/select';
import {React, useState, useEffect} from 'react';

import style from './form.module.scss';

const Form = () => {

  const initialValues = {name:"",email:"",phone:""}
  const [formValues, setFormValues]=useState(initialValues);
  const [formErrorName, setFormErrorName]=useState(false);
  const [formErrorEmail, setFormErrorEmail]=useState(false);
  
  const HandleSubmit =(e)=>{
    Validate(formValues);
    e.preventDefault();
    if (formValues.name && formValues.email  != "")
    {
      fetch("https://react-coding-challenge-dev.herokuapp.com/api/users",{
        method:'POST',
        body: JSON.stringify(formValues).then(result =>{
          console.log(result)
        })
      })
      alert("Submitted")
      window.location.reload();
    }
    
    
    
  }
  const HandleChange =(e)=>{
    const {name, value} = e.target;
    setFormValues({...formValues, [name]: value});
  }
  const Validate = (values) =>{
    if(!values.name)
    {
      setFormErrorName(true);
    }
    if(!values.email)
    {
      setFormErrorEmail(true)
    }
    if(values.name.length <= 3 )
    {
      setFormErrorName(true)
    }
    if(values.name != "")
    {
      setFormErrorName(false);
    }
    if(values.email != "")
    {
      setFormErrorEmail(false);
    }
    
  }

  return (
   
    <Container>
      <pre>{JSON.stringify(formValues, undefined, 1)}</pre>
      <form onSubmit={HandleSubmit}>
        <div className={style.grid}>
          
          <Input
            className="name" 
            label="Name"
            error={formErrorName}
            errorMessage={'This field is required'}
            name="name"
            type="text"
            placeholder="name"
            value={formValues.name}
            onChange={HandleChange}
            
          />
          <Input label="Email" name="email" type="email" placeholder="email" error={formErrorEmail}
            errorMessage={'This field is required'}value={formValues.email} onChange={HandleChange}/>
          <Select
            label="Gender"
            name="gender"
            placeHolder="Gender"
            options={options}
            
          />
          <Input
            name="phone"
            type="number"
            label="Phone"
            placeholder="3007689786"
            value={formValues.phone}
            onChange={HandleChange}
          />
        </div>
        <div className={style.button}>
          <button>Submit</button>
        </div>
      </form>
    </Container>
  );
};
export default Form;

const options = ['Male', 'Female'];
