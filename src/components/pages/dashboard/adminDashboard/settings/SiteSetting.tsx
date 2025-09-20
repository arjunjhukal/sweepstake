"use client";

import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { InputLabel, OutlinedInput, Button } from "@mui/material";
import InputFile from "@/components/atom/InputFile";
import SelectField from "@/components/atom/SelectField";

export default function SiteSetting() {
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
            console.log(values);
        },
    });

    return (
        <form onSubmit={formik.handleSubmit}>
            <div className="form__field__wrapper border-solid border-[1px] border-gray rounded-[16px] mb-6">
                <div className="form__title py-6 px-10 border-b-solid border-b-[1px] border-gray">
                    <h2 className="text-[20px] leading-[140%] font-bold">Site Settings</h2>
                </div>

                <div className="form__fields p-6 lg:p-10 grid gap-4 lg:gap-6 md:grid-cols-2">
                    {/* Name */}
                    <div className="input__field col-span-1 md:col-span-2">
                        <InputLabel htmlFor="name">Website Title<span className="text-red-500">*</span></InputLabel>
                        <OutlinedInput
                            label="Website Title"
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
                            label="Website Favicon"
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

                    {/* Logo */}
                    <div className="input__field col-span-1 md:col-span-2">
                        <InputFile
                            name="logo"
                            label="Logo"
                            value={formik.values.logo || null}
                            onChange={(file: File | File[] | null) => formik.setFieldValue("logo", file)}
                            onBlur={() => formik.setFieldTouched("logo", true)}
                        // serverFile={serverFiles.thumbnail}
                        // onRemoveServerFile={() => handleServerFileRemoval("thumbnail")}
                        />
                        <span className="error">
                            {formik.touched.logo && formik.errors.logo ? formik.errors.logo : ""}
                        </span>
                    </div>

                    {/* Banner */}
                    <div className="input__field col-span-1 ">
                        <SelectField
                            name="banner"
                            label="Game banner"
                            value={formik.values.banner || ""}
                            onChange={(e) => formik.setFieldValue("banner", e.target.value)}
                            onBlur={() => formik.setFieldTouched("banner", true)}
                            required
                            options={[
                                { value: "action", name: "Action" },
                                { value: "adventure", name: "Adventure" },
                                { value: "puzzle", name: "Puzzle" },
                            ]}
                        />
                        <span className="error">
                            {formik.touched.banner && formik.errors.banner ? formik.errors.banner : ""}
                        </span>
                    </div>

                    {/* Sub Banners */}
                    <div className="input__field col-span-1">
                        <SelectField
                            name="subBanner"
                            label="Sub Banners"
                            value={formik.values.subBanner || ""}
                            onChange={(e) => formik.setFieldValue("subBanner", e.target.value)}
                            onBlur={() => formik.setFieldTouched("subBanner", true)}
                            required
                            options={[
                                { value: "action", name: "Action" },
                                { value: "adventure", name: "Adventure" },
                                { value: "puzzle", name: "Puzzle" },
                            ]}
                        />
                        <span className="error">
                            {formik.touched.subBanner && formik.errors.subBanner ? formik.errors.subBanner : ""}
                        </span>
                    </div>
                </div>
            </div>
            <div className="form__field__wrapper border-solid border-[1px] border-gray rounded-[16px] mb-6">
                <div className="form__title py-6 px-10 border-b-solid border-b-[1px] border-gray">
                    <h2 className="text-[20px] leading-[140%] font-bold">Unique Selling Points</h2>
                </div>

                <div className="form__fields p-6 lg:p-10 grid gap-4 lg:gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {/* Name */}
                    <div className="input__field col-span-1 ">
                        <InputLabel htmlFor="name">USP Title<span className="text-red-500">*</span></InputLabel>
                        <OutlinedInput
                            fullWidth
                            id="name"
                            name="name"
                            placeholder="Enter the title for USP"
                            value={formik.values.websiteTitle}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                        />
                        <span className="error">
                            {formik.touched.websiteTitle && formik.errors.websiteTitle ? formik.errors.websiteTitle : ""}
                        </span>
                    </div>

                    <div className="input__field col-span-1 ">
                        <InputLabel htmlFor="name">USP Description<span className="text-red-500">*</span></InputLabel>
                        <OutlinedInput
                            fullWidth
                            id="name"
                            name="name"
                            placeholder="Enter the title for USP"
                            value={formik.values.websiteTitle}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                        />
                        <span className="error">
                            {formik.touched.websiteTitle && formik.errors.websiteTitle ? formik.errors.websiteTitle : ""}
                        </span>
                    </div>

                    <div className="input__field col-span-1 ">
                        <InputFile
                            name="favicon"
                            label="USP Icon"
                            value={formik.values.favicon || null}
                            onChange={(file: File | File[] | null) => formik.setFieldValue("favicon", file)}
                            onBlur={() => formik.setFieldTouched("favicon", true)}
                            required
                        // serverFile={serverFiles.favicon}
                        // onRemoveServerFile={() => handleServerFileRemoval("favicon")}
                        />
                        <span className="error">
                            {formik.touched.favicon && formik.errors.favicon ? formik.errors.favicon : ""}
                        </span>
                    </div>


                </div>
            </div>
            <div className="text-right">
                <Button variant="contained" color="primary">Save Setting</Button>
            </div>
        </form>
    );
}
