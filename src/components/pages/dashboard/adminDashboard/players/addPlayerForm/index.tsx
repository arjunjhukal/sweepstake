"use client"

import InputFile from '@/components/atom/InputFile'
import PasswordField from '@/components/molecules/PasswordField'
import { useAppDispatch } from '@/hooks/hook'
import { useCreatePlayerMutation } from '@/services/playerApi'
import { showToast, ToastVariant } from '@/slice/toastSlice'
import { initialPlayerValues } from '@/types/player'
import { Button, Input, InputLabel } from '@mui/material'
import { useFormik } from 'formik'
import { useRouter } from 'next/navigation'
import React from 'react'
import * as Yup from "yup";

export const PlayerValidationSchema = Yup.object().shape({
    email: Yup.string()
        .email("Invalid email address")
        .required("Email is required"),
    first_name: Yup.string().required("First name is required"),
    last_name: Yup.string().required("Last name is required"),
    wallet_address: Yup.string().nullable(),
    address: Yup.string().nullable(),
    city: Yup.string().nullable(),
    phone: Yup.string()
        .matches(/^\+?\d{7,15}$/, "Invalid phone number")
        .nullable(),
    password: Yup.string()
        .min(6, "Password must be at least 6 characters")
        .required("Password is required"),
    password_confirmation: Yup.string()
        .oneOf([Yup.ref("password")], "Passwords must match")
        .required("Password confirmation is required"),
    // profile_image: Yup.mixed().required("Profile is required"),
});
export default function AddPlayerForm({ id }: { id?: string | number }) {

    const dispatch = useAppDispatch();
    const router = useRouter();

    const [createPlayer, { isLoading }] = useCreatePlayerMutation();

    const formik = useFormik({
        initialValues: initialPlayerValues,
        validationSchema: PlayerValidationSchema,
        // enableReinitialize,
        onSubmit: async (values) => {
            if (id) {
                try {
                    console.log("Editing Player")
                }
                catch (e: any) {
                    dispatch(
                        showToast({
                            message: e.error,
                            variant: ToastVariant.ERROR
                        })
                    )
                }
            }
            else {
                try {
                    const formData = new FormData();

                    // Required fields
                    formData.append("email", values.email);
                    formData.append("first_name", values.first_name);
                    formData.append("last_name", values.last_name);
                    formData.append("password", values.password);
                    formData.append("password_confirmation", values.password_confirmation);


                    if (values.wallet_address) formData.append("wallet_address", values.wallet_address);
                    if (values.address) formData.append("address", values.address);
                    if (values.city) formData.append("city", values.city);
                    if (values.phone) formData.append("phone", values.phone);

                    if (values.profile_image) {

                        if (Array.isArray(values.profile_image)) {
                            values.profile_image.forEach((file) => formData.append("profile_image", file));
                        } else {
                            formData.append("profile_image", values.profile_image);
                        }
                    }

                    const response = await createPlayer(formData).unwrap();

                    dispatch(
                        showToast({
                            message: response.data.message,
                            variant: ToastVariant.SUCCESS
                        })
                    );

                    router.push("/players");
                }
                catch (e: any) {
                    console.log(e);
                    dispatch(
                        showToast({
                            message: e.error,
                            variant: ToastVariant.ERROR
                        })
                    )
                }
            }
        }
    })
    return (
        <form onSubmit={formik.handleSubmit}>
            <div className="form__field__wrapper border-solid border-[1px] border-gray rounded-[16px] mb-6 ">
                <div className="form__title py-6 px-10 border-b-solid border-b-[1px] border-gray">
                    <h2 className="text-[20px] leading-[140%] font-bold">Player Details</h2>
                </div>
                <div className="form__fields p-6 lg:p-10 flex flex-col gap-4 lg:gap-6 lg:grid grid-cols-2">
                    <div className="input__field">
                        <InputLabel htmlFor="email">Email<span className="text-red-500">*</span></InputLabel>
                        <Input
                            fullWidth
                            id="email"
                            name="email"
                            type="email"
                            placeholder="Enter email address"
                            value={formik.values.email}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                        />
                        <span className="error">
                            {formik.touched.email && formik.errors.email ? formik.errors.email : ""}
                        </span>
                    </div>

                    <div className="input__field">
                        <InputLabel htmlFor="first_name">First Name<span className="text-red-500">*</span></InputLabel>
                        <Input
                            fullWidth
                            id="first_name"
                            name="first_name"
                            placeholder="Enter first name"
                            value={formik.values.first_name}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                        />
                        <span className="error">
                            {formik.touched.first_name && formik.errors.first_name ? formik.errors.first_name : ""}
                        </span>
                    </div>

                    <div className="input__field">
                        <InputLabel htmlFor="last_name">Last Name<span className="text-red-500">*</span></InputLabel>
                        <Input
                            fullWidth
                            id="last_name"
                            name="last_name"
                            placeholder="Enter last name"
                            value={formik.values.last_name}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                        />
                        <span className="error">
                            {formik.touched.last_name && formik.errors.last_name ? formik.errors.last_name : ""}
                        </span>
                    </div>

                    <div className="input__field">
                        <InputLabel htmlFor="wallet_address">Wallet Address</InputLabel>
                        <Input
                            fullWidth
                            id="wallet_address"
                            name="wallet_address"
                            placeholder="Enter wallet address"
                            value={formik.values.wallet_address}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                        />
                        <span className="error">
                            {formik.touched.wallet_address && formik.errors.wallet_address ? formik.errors.wallet_address : ""}
                        </span>
                    </div>

                    <div className="input__field">
                        <InputLabel htmlFor="address">Address</InputLabel>
                        <Input
                            fullWidth
                            id="address"
                            name="address"
                            placeholder="Enter address"
                            value={formik.values.address}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                        />
                        <span className="error">
                            {formik.touched.address && formik.errors.address ? formik.errors.address : ""}
                        </span>
                    </div>

                    <div className="input__field">
                        <InputLabel htmlFor="city">City</InputLabel>
                        <Input
                            fullWidth
                            id="city"
                            name="city"
                            placeholder="Enter city"
                            value={formik.values.city}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                        />
                        <span className="error">
                            {formik.touched.city && formik.errors.city ? formik.errors.city : ""}
                        </span>
                    </div>

                    <div className="input__field">
                        <InputLabel htmlFor="phone">Phone</InputLabel>
                        <Input
                            fullWidth
                            id="phone"
                            name="phone"
                            placeholder="Enter phone number"
                            value={formik.values.phone}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                        />
                        <span className="error">
                            {formik.touched.phone && formik.errors.phone ? formik.errors.phone : ""}
                        </span>
                    </div>

                    <div className="input__field">
                        <PasswordField
                            name="password"
                            label="Password*"
                            placeholder="Enter password"
                            value={formik.values.password}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={formik.touched.password ? formik.errors.password : undefined}
                        />
                    </div>

                    <div className="input__field">
                        <PasswordField
                            name="password_confirmation"
                            label="Confirm Password*"
                            placeholder="Confirm password"
                            value={formik.values.password_confirmation}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={formik.touched.password_confirmation ? formik.errors.password_confirmation : undefined}
                        />
                    </div>

                    <div className="input__field">
                        <InputFile
                            name="profile_image"
                            label="Profile Image"
                            value={formik.values.profile_image || null}
                            onChange={(file: File | File[] | null) => formik.setFieldValue("profile_image", file)}
                            onBlur={() => formik.setFieldTouched("profile_image", true)}
                        />
                        <span className="error">
                            {formik.touched.profile_image && formik.errors.profile_image ? formik.errors.profile_image : ""}
                        </span>
                    </div>

                </div>
            </div>
            <div className="text-end mt-8 lg:mt-12 max-w-fit ml-auto">
                <Button type="submit" variant="contained" color="primary" sx={{ color: "#fff" }} disabled={!formik.dirty || formik.isSubmitting}>
                    Confirm {id ? "Player Update" : "Player Addition"}
                </Button>
            </div>
        </form>
    )
}
