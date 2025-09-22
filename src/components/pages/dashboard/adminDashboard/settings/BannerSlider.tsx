import InputFile from '@/components/atom/InputFile'
import { Button, InputLabel, OutlinedInput } from '@mui/material'
import { useFormik } from 'formik';
import React from 'react'
import * as Yup from "yup";
export default function BannerSlider() {

    const formik = useFormik({
        initialValues: {
            favicon: null as File | null,
            logo: null as File | null,
            websiteTitle: "",
            banner: "",
            subBanner: "",
            gameProvider: "",
        },
        validationSchema: Yup.object({
            favicon: Yup.mixed().required("Favicon is required"),
            logo: Yup.mixed().required("Logo is required"),
            websiteTitle: Yup.string().required("Website title is required"),
            banner: Yup.string().required("Banner is required"),
            gameProvider: Yup.string().required("Game provider is required"),
        }),
        onSubmit: (values) => {
        },
    });
    return (
        <div className="form__field__wrapper border-solid border-[1px] border-gray rounded-[16px] mb-6">
            <div className="form__title py-6 px-10 border-b-solid border-b-[1px] border-gray">
                <h2 className="text-[20px] leading-[140%] font-bold">Banner Slider</h2>
            </div>

            <div className="form__fields p-6 lg:p-10 grid gap-4 lg:gap-6 md:grid-cols-2">
                {/* Name */}
                <div className="input__field col-span-1 md:col-span-2">
                    <InputLabel htmlFor="name">Banner Title<span className="text-red-500">*</span></InputLabel>
                    <OutlinedInput
                        fullWidth
                        id="name"
                        name="name"
                        placeholder="Enter the name of the game"
                        value={formik.values.websiteTitle}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                    />
                    <span className="error">
                        {formik.touched.websiteTitle && formik.errors.websiteTitle ? formik.errors.websiteTitle : ""}
                    </span>
                </div>
                {/* Name */}
                <div className="input__field col-span-1 md:col-span-2">
                    <InputLabel htmlFor="name">Banner Description<span className="text-red-500">*</span></InputLabel>
                    <OutlinedInput
                        fullWidth
                        id="name"
                        name="name"
                        placeholder="Enter the name of the game"
                        value={formik.values.websiteTitle}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                    />
                    <span className="error">
                        {formik.touched.websiteTitle && formik.errors.websiteTitle ? formik.errors.websiteTitle : ""}
                    </span>
                </div>
                {/* Name */}
                <div className="input__field col-span-1 md:col-span-2">
                    <InputLabel htmlFor="name">Banner CTA Link<span className="text-red-500">*</span></InputLabel>
                    <OutlinedInput
                        fullWidth
                        id="name"
                        name="name"
                        placeholder="Enter the name of the game"
                        value={formik.values.websiteTitle}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                    />
                    <span className="error">
                        {formik.touched.websiteTitle && formik.errors.websiteTitle ? formik.errors.websiteTitle : ""}
                    </span>
                </div>

                {/* Favicon */}
                <div className="input__field col-span-1 md:col-span-2">
                    <InputFile
                        name="favicon"
                        label="Website Image"
                        value={formik.values.favicon || null}
                        onChange={(file: File | File[] | null) => formik.setFieldValue("favicon", file)}
                        onBlur={() => formik.setFieldTouched("favicon", true)}
                    // serverFile={serverFiles.favicon}
                    // onRemoveServerFile={() => handleServerFileRemoval("favicon")}
                    />
                    <span className="error">
                        {formik.touched.favicon && formik.errors.favicon ? formik.errors.favicon : ""}
                    </span>
                </div>

            </div>

            <div className="text-right px-10 mb-6 lg:mb-10 flex gap-2 justify-end">
                <Button variant="contained" color="secondary">Add More Banner</Button>
                <Button variant="contained" color="primary">Save Banner Setting</Button>
            </div>
        </div >
    )
}
