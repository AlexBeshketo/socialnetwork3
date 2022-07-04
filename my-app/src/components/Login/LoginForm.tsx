import * as React from 'react';
import {useEffect, useState} from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Checkbox from '@mui/material/Checkbox';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import p from './Login.module.css'
import {Controller, useForm} from "react-hook-form";
import {LoginComponentType} from "./LoginComponent";
import {useNavigate} from "react-router";
import {FormLabel, IconButton, InputAdornment, InputLabel, OutlinedInput} from "@mui/material";
import {Visibility, VisibilityOff} from "@mui/icons-material";


type LoginUserModelType = {
    email: string,
    password: string,
    MyCheckbox: boolean
};


export default function LoginForm({loginTC, isAuth, errorLoginServer}: LoginComponentType) {

    console.log(isAuth)

    const [show, setShow] = useState<boolean>(false)
    let navigate = useNavigate();

    const {
        register,
        reset,
        handleSubmit,
        control,
        setError,
        formState: {errors, isDirty}
    } = useForm<LoginUserModelType>();

    const onSubmit = handleSubmit(data => {

        loginTC(data.email, data.password, data.MyCheckbox)
        reset()

    });

    useEffect(() => {
        debugger;
        if (isAuth) {
            return navigate("/profile");
        }

    }, [isAuth]);





    return (
        <div className={p.body}>
            <div style={{display:'flex' ,justifyContent: 'center'}}>
            <FormLabel >
                <p>To log in get registered
                    <a href={'https://social-network.samuraijs.com/'}
                       target={'_blank'}> here
                    </a>
                </p>
                <p>or use common test account credentials:</p>
                <p>Email: free@samuraijs.com</p>
                <p>Password: free</p>
            </FormLabel>
            </div>
            <Container component="main" maxWidth="xs">
                <CssBaseline/>
                <Box
                    sx={{
                        marginTop: 2,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    <Avatar sx={{m: 1, bgcolor: 'secondary.main'}}>
                        <LockOutlinedIcon/>
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Sign in
                    </Typography>
                    <form onSubmit={onSubmit}>

                        {/*<Box component="form" onSubmit={onSubmit} noValidate sx={{mt: 1}}>*/}

                        <TextField
                            {...register("email", {
                                required: "Field is required", maxLength: 30
                            })}

                            error={!!errors.email}
                            type='email'
                            margin="normal"
                            fullWidth
                            id="email"
                            label="Email Address"

                            autoComplete="email"
                            autoFocus
                        />
                        <div style={{color: 'red'}}>{errors.email?.message}</div>


                        <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
                        <OutlinedInput
                            {...register("password", {required: "Field is required", maxLength: 30})}
                            error={!!errors.password}

                            id="outlined-adornment-password"
                            type={show ? 'text' : 'password'}
                            endAdornment={
                                <InputAdornment position="end">
                                    <IconButton
                                        aria-label="toggle password visibility"
                                        onClick={() => setShow(!show)}
                                        onMouseDown={() => setShow(!show)}
                                        edge="end"
                                    >
                                        {show ? <VisibilityOff/> : <Visibility/>}
                                    </IconButton>
                                </InputAdornment>
                            }
                            label="Password"
                        />

                        <div
                            style={{color: 'red'}}> {errors.password?.message ? errors.password?.message : (!isDirty && errorLoginServer)}</div>
                        {/*<div style={{color:'red'}}>{errorLoginServer? errorLoginServer : ''}</div>*/}
                        <Controller

                            name="MyCheckbox"

                            control={control}
                            defaultValue={false}
                            // rules={{ required: true }}
                            render={({field}) => <Checkbox {...field} />}
                        />
                        <label>Remember Me</label>

                        <Button
                            style={{backgroundColor: '#6c7272'}}
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{mt: 3, mb: 2}}
                        >
                            Sign In
                        </Button>

                    </form>
                    {/*</Box>*/}
                </Box>

            </Container>

        </div>
    )
}

//
// import React, {FC, ReactElement, useState} from 'react';
// import {useForm} from "react-hook-form";
// import {Button, Paper, TextField} from '@mui/material';
//
// export type LoginUserModel = {
//     email: string;
//     password: string;
// };
//
// const LoginForm: FC<{}> = (): ReactElement => {
//
//     const [loading, setLoading] = useState(false);
//     const {register, handleSubmit, setError, formState: {errors}} = useForm<LoginUserModel>();
//
//     const onSubmit = handleSubmit(data => {
//
//         console.log('Hi')
//     });
//
//     return (
//         <form onSubmit={onSubmit}>
//             <Paper elevation={12} className="register-form">
//                 <h1>Login</h1>
//                 <TextField type={'email'} id="email" className="form-input" label="Email"
//                            variant="outlined"
//                            {...register("email", {required: true, maxLength: 30})}
//                            error={!!errors.email}
//                 />
//                 <TextField type={'password'} id="password" className="form-input" label="Password"
//                            variant="outlined"
//                            {...register("password", {required: true, maxLength: 20})}
//                            error={!!errors.password}
//                 />
//                 <Button type="submit" variant="contained" color="info">Sing IN</Button>
//             </Paper>
//         </form>
//     )
// }
//
// export default LoginForm;











