'use client';

import React from 'react'
import AuthMessageBlock from '../authMessageBlock'
import { Box, InputLabel, OutlinedInput } from '@mui/material';
import * as Yup from 'yup';
import { useRouter } from 'next/navigation';
import { Formik, useFormik } from 'formik';
import Link from 'next/link';
import { PATH } from '@/routes/PATH';
import { useRegisterUserMutation } from '@/services/authApi';
import { useAppDispatch } from '@/hooks/hook';
import { showToast, ToastVariant } from '@/slice/toastSlice';
import PasswordField from '@/components/molecules/PasswordField';
const validationSchema = Yup.object().shape({
    emailAddress: Yup.string()
        .email('Must be a valid email')
        .max(255)
        .required('Email is required'),
    displayName: Yup.string()
        .required('Display Name is required')
        .max(50, 'Display Name must be less than 50 characters'),
    password: Yup.string()
        .required('Password is required')
        .test(
            'no-leading-trailing-whitespace',
            'Password cannot start or end with spaces',
            (value) => value === value?.trim()
        )
        .max(16, 'Password must be less than 10 characters'),
    confirmPassword: Yup.string()
        .oneOf([Yup.ref('password')], 'Passwords must match')
        .required('Confirm Password is required'),
})

export default function RegisterPage() {
    const router = useRouter();
    const [registerUser, { isLoading }] = useRegisterUserMutation();
    const dispatch = useAppDispatch();
    const initialValues = {
        emailAddress: "",
        displayName: "",
        password: "",
        confirmPassword: "",
    }
    const { handleSubmit, handleBlur, handleChange, errors, dirty, values, touched } = useFormik(
        {
            initialValues,
            validationSchema,
            onSubmit: async (values) => {
                try {
                    const response = await registerUser({
                        email: values.emailAddress,
                        username: values.displayName,
                        password: values.password,
                        password_confirmation: values.confirmPassword,
                    }).unwrap();

                    console.log("response", response)
                    dispatch(
                        showToast({
                            message: "User Registerd Successfully",
                            variant: ToastVariant.SUCCESS,
                            autoTime: true,
                        }),
                    );
                    router.replace(PATH.AUTH.LOGIN.ROOT)
                }
                catch (e) {
                    dispatch(
                        showToast({
                            message: "Unable to register user. Try again later",
                            variant: ToastVariant.ERROR,
                            autoTime: true,
                        }),
                    );
                }
            }
        }
    )
    return (
        <>
            <AuthMessageBlock
                title="Welcome Back. Ready to rock today?"
                features={["Fun & Fair Gameplay", "Exciting Prizes", "Accessible Anytime, Anywhere", "Trusted & Secure"]}
            />
            <Box className="auth__form__wrapper lg:w-[50%] p-8">
                <div className="section__title mb-4 lg:mb-6">
                    <h1 className='text-[24px] leading-[120%] font-bold lg:text-[48px]'>Setup an account</h1>
                </div>

                <form action="" onSubmit={handleSubmit}>
                    <div className="grid md:grid-cols-2 gap-x-3 gap-y-5">
                        <div className="col-span-2">
                            <div className="input_field">
                                <InputLabel htmlFor="emailAddress">Email Address*</InputLabel>
                                <OutlinedInput
                                    name='emailAddress'
                                    id='emailAddress'
                                    placeholder='example@example.com'
                                    value={values.emailAddress}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    error={Boolean(touched.emailAddress && errors.emailAddress)}
                                />
                                {
                                    touched.emailAddress && errors.emailAddress ?
                                        <span className="error ">{errors.emailAddress}</span> : null
                                }
                            </div>
                        </div>
                        <div className="col-span-2">
                            <div className="input_field">
                                <InputLabel htmlFor="displayName">Display Name*</InputLabel>
                                <OutlinedInput
                                    name='displayName'
                                    id='displayName'
                                    placeholder='John doe'
                                    value={values.displayName}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    error={Boolean(touched.displayName && errors.displayName)}
                                />
                                {
                                    touched.displayName && errors.displayName ?
                                        <span className="error ">{errors.displayName}</span> : null
                                }
                            </div>
                        </div>
                        <div className="col-span-1">
                            <div className="input_field">
                                <PasswordField
                                    name="password"
                                    label="Password*"
                                    placeholder="XXXXXXX"
                                    value={values.password}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    error={touched.password ? errors.password : undefined}
                                />
                            </div>
                        </div>
                        <div className="col-span-1">
                            <div className="input_field">
                                <PasswordField
                                    name="confirmPassword"
                                    label="Confirm Password*"
                                    placeholder="XXXXXXX"
                                    value={values.confirmPassword}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    error={touched.confirmPassword ? errors.confirmPassword : undefined}
                                />
                            </div>
                        </div>
                    </div>
                    <div className="action__group text-center flex flex-col gap-4 mt-8">
                        <button className='ss-btn bg-primary-grad' disabled={!dirty}>{isLoading ? "Signing Up" : "Sign up"}</button>
                        <p className='text-[12px] leading-[120%] font-bold lg:text-[16px]'>Already Have an account?</p>
                        <Link href={PATH.AUTH.LOGIN.ROOT} className='ss-btn bg-secondary-grad'>Login</Link>
                    </div>
                </form>

            </Box>
        </>
    )
}
