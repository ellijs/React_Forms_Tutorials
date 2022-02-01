import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import "./App.css";

function App() {
  const { register, handleSubmit, errors, formState: {
    isDirty, dirtyFields, touchFields, isSumitted, isSubmitSuccessful, submitCount,
    isValid, // for isValid, you need to set the mode
    isSubmitting, //working with async function
    isValidating
  } } = useForm({
    mode: 'onChange', // for isValid, you need to set the mode
    defaultValues: {
      firstName: '',
      lastNaem: ''
  });
  const [userInfo, setUserInfo] = useState();
  const onSubmit = (data) => {
    setUserInfo(data);
    console.log(data);
  };
  console.log(errors);
  
  // UseEffect
  React.useEffect(()=> {
    console.log(formState.errors);
  }, [formState]);
  
  
  return (
    <div className="container">
      <pre>{JSON.stringify(userInfo, undefined, 2)}</pre>
      <form onSubmit={handleSubmit(onSubmit)}>
        <h1>Registration Form</h1>
        <div className="ui divider"></div>
        <div className="ui form">
          <div className="field">
            <label>Username</label>
            <input
              type="text"
              name="username"
              placeholder="Username"
              ref={register({ required: "Username is required",
                     validate: async () => {
                       await sleep(1000);
                       return true;   // for isValidating
                     })}
            />
          </div>
          <p>{errors.username?.message}</p>
          <div className="field">
            <label>Email</label>
            <input
              type="email"
              name="email"
              placeholder="Email"
              ref={register({
                required: "Email is required",
                pattern: {
                  value: /^\S+@\S+$/i,
                  message: "This is not a valid email",
                },
              })}
            />
          </div>
          <p>{errors.email?.message}</p>
          <div className="field">
            <label>Password</label>
            <input
              type="password"
              name="password"
              placeholder="Password"
              ref={register({
                required: "Password is required",
                minLength: {
                  value: 4,
                  message: "Password must be more than 4 characters",
                },
                maxLength: {
                  value: 10,
                  message: "Password cannot exceed more than 10 characters",
                },
              })}
            />
          </div>
          <p>{errors.password?.message}</p>
          <button className="fluid ui button blue">Submit</button>
        </div>
      </form>
    </div>
  );
}

export default App;
