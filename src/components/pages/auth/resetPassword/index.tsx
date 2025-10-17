"use client";

import React, { useEffect, useState } from 'react'
import AuthMessageBlock from '../authMessageBlock'
import { Box, InputLabel, OutlinedInput } from '@mui/material'
import PasswordField from '@/components/molecules/PasswordField'
import { ArrowLeft } from '@wandersonalwes/iconsax-react'
import Link from 'next/link'
import { PATH } from '@/routes/PATH'
import * as Yup from 'yup';
import { useFormik } from 'formik';
import { useAppDispatch } from '@/hooks/hook'
import { showToast, ToastVariant } from '@/slice/toastSlice';
import { useResetPasswordMutation } from '@/services/authApi';
import { useRouter, useSearchParams } from 'next/navigation';

const validationSchema = Yup.object().shape({
    emailAddress: Yup.string()
        .email('Must be a valid email')
        .max(255)
        .required('Email is required'),

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

export default function ResetPasswordPage() {
    const router = useRouter();
    const dispatch = useAppDispatch();
    const initialValues = {
        emailAddress: "",
        password: "",
        confirmPassword: "",
    }
    const [resetPassword, { isLoading }] = useResetPasswordMutation();



    const { handleSubmit, handleBlur, handleChange, errors, dirty, values, touched } = useFormik(
        {
            initialValues,
            validationSchema,
            onSubmit: async (values) => {
                try {
                    const response = await resetPassword({
                        email: values.emailAddress,
                        password: values.password,
                        password_confirmation: values.confirmPassword,
                    }).unwrap();

                    dispatch(
                        showToast({
                            message: response?.message || "New password is updated",
                            variant: ToastVariant.SUCCESS,
                            autoTime: true,
                        }),
                    );
                    router.replace(PATH.AUTH.LOGIN.ROOT);
                }
                catch (e: any) {
                    console.log("Error", e);
                    dispatch(
                        showToast({
                            message: e?.data?.message || "Unable to reset password. Try again later",
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
                title="Forgot your password? Let’s get you back in!"
                features={[
                    "Secure Account Recovery",
                    "Quick & Easy Process",
                    "No Worries, We've Got You Covered",
                    "24/7 Support Availability"
                ]}
            />
            <Box className="auth__form__wrapper lg:w-[50%] p-8">
                <div className="section__title mb-4 lg:mb-6">
                    <Link href={PATH.DASHBOARD.ROOT} className='text-[12px] leading-[120%] font-bold lg:text-[16px] hover:text-primary flex gap-2 items-center'><ArrowLeft />Back to Dashboard</Link>
                    <h1 className="text-[24px] leading-[120%] font-bold lg:text-[48px]">Forgot Password</h1>
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
                        <div className="col-span-2">
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
                        <button className='ss-btn bg-primary-grad' disabled={!dirty}>{isLoading ? "Changing Password" : "Reset Password"}</button>

                        <Link href={PATH.DASHBOARD.ROOT} className='ss-btn bg-secondary-grad'>Login</Link>
                    </div>
                </form>

            </Box>
        </>
    )
}
