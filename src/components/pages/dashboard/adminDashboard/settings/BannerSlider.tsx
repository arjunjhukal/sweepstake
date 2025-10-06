"use client";

import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Button, InputLabel, OutlinedInput, IconButton } from "@mui/material";
import InputFile from "@/components/atom/InputFile";
import { CloseCircle } from "@wandersonalwes/iconsax-react";
import { useAppDispatch } from "@/hooks/hook";
import { showToast, ToastVariant } from "@/slice/toastSlice";

export default function BannerSlider() {
    const dispatch = useAppDispatch();

    const formik = useFormik({
        initialValues: {
            banners: [
                {
                    title: "",
                    description: "",
                    cta_link: "",
                    image: null as File | null,
                },
            ],
        },
        validationSchema: Yup.object({
            banners: Yup.array().of(
                Yup.object({
                    title: Yup.string().required("Banner title is required"),
                    description: Yup.string().required("Banner description is required"),
                    cta_link: Yup.string().required("CTA link is required"),
                    image: Yup.mixed().required("Banner image is required"),
                })
            ),
        }),
        onSubmit: (values) => {
            try {
                dispatch(
                    showToast({
                        message: "Banner created successfully",
                        variant: ToastVariant.ERROR
                    })
                )
            }
            catch (e: any) {
                console.log(e);
                dispatch(
                    showToast({
                        message: e.message || "Something went wrong",
                        variant: ToastVariant.ERROR
                    })
                )
            }
        },
    });

    const handleAddBanner = () => {
        formik.setFieldValue("banners", [
            ...formik.values.banners,
            {
                title: "",
                description: "",
                cta_link: "",
                image: null,
            },
        ]);
    };

    const handleRemoveBanner = (index: number) => {
        const updated = [...formik.values.banners];
        updated.splice(index, 1);
        formik.setFieldValue("banners", updated);
    };

    return (
        <form
            onSubmit={formik.handleSubmit}
            className="form__field__wrapper border-solid border-[1px] border-gray rounded-[16px] mb-6"
        >
            <div className="form__title py-6 px-10 border-b-solid border-b-[1px] border-gray">
                <h2 className="text-[20px] leading-[140%] font-bold">Banner Slider</h2>
            </div>

            <div className="form__fields p-6 lg:p-10 space-y-6">
                {formik.values.banners.map((banner, index) => (
                    <div
                        key={index}
                        className="grid gap-4 lg:gap-6 md:grid-cols-2 lg:grid-cols-3 items-start relative border border-gray rounded-lg p-4"
                    >
                        {formik.values.banners.length > 1 && (
                            <IconButton
                                onClick={() => handleRemoveBanner(index)}
                                className="!absolute !top-2 !right-2 !text-red-500 !justify-end !z-[9] max-w-fit"
                            >
                                <CloseCircle size={18} />
                            </IconButton>
                        )}

                        {/* Banner Title */}
                        <div className="input__field">
                            <InputLabel>
                                Banner Title<span className="text-red-500">*</span>
                            </InputLabel>
                            <OutlinedInput
                                fullWidth
                                name={`banners[${index}].title`}
                                placeholder="Enter Banner Title"
                                value={banner.title}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                            />
                            <span className="error">
                                {formik.touched.banners?.[index]?.title &&
                                    (formik.errors.banners?.[index] as any)?.title
                                    ? (formik.errors.banners?.[index] as any).title
                                    : ""}
                            </span>
                        </div>

                        {/* Banner Description */}
                        <div className="input__field">
                            <InputLabel>
                                Banner Description<span className="text-red-500">*</span>
                            </InputLabel>
                            <OutlinedInput
                                fullWidth
                                name={`banners[${index}].description`}
                                placeholder="Enter Banner Description"
                                value={banner.description}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                            />
                            <span className="error">
                                {formik.touched.banners?.[index]?.description &&
                                    (formik.errors.banners?.[index] as any)?.description
                                    ? (formik.errors.banners?.[index] as any).description
                                    : ""}
                            </span>
                        </div>

                        {/* Banner CTA Link */}
                        <div className="input__field">
                            <InputLabel>
                                Banner CTA Link<span className="text-red-500">*</span>
                            </InputLabel>
                            <OutlinedInput
                                fullWidth
                                name={`banners[${index}].cta_link`}
                                placeholder="Enter CTA Link"
                                value={banner.cta_link}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                            />
                            <span className="error">
                                {formik.touched.banners?.[index]?.cta_link &&
                                    (formik.errors.banners?.[index] as any)?.cta_link
                                    ? (formik.errors.banners?.[index] as any).cta_link
                                    : ""}
                            </span>
                        </div>

                        {/* Banner Image */}
                        <div className="input__field col-span-1 md:col-span-2 lg:col-span-3">
                            <InputFile
                                name={`banners[${index}].image`}
                                label="Banner Image"
                                value={banner.image || null}
                                onChange={(file: File | File[] | null) =>
                                    formik.setFieldValue(`banners[${index}].image`, file)
                                }
                                onBlur={() =>
                                    formik.setFieldTouched(`banners[${index}].image`, true)
                                }
                            />
                            <span className="error">
                                {formik.touched.banners?.[index]?.image &&
                                    (formik.errors.banners?.[index] as any)?.image
                                    ? (formik.errors.banners?.[index] as any).image
                                    : ""}
                            </span>
                        </div>
                    </div>
                ))}

                <Button
                    variant="text"
                    color="primary"
                    onClick={handleAddBanner}
                    className="!p-0"
                >
                    + Add More Banner
                </Button>
            </div>

            <div className="text-right px-10 mb-6 lg:mb-10 flex gap-2 justify-end">
                <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    disabled={formik.isSubmitting}
                >
                    Save Banner Setting
                </Button>
            </div>
        </form>
    );
}
