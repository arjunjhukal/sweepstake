"use client";

import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import {
    Button,
    InputLabel,
    OutlinedInput,
    FormHelperText,
    IconButton,
} from "@mui/material";
import ReactQuillEditor from "@/components/molecules/ReactQuill";
import { pageInitialData } from "@/types/page"; // should match your type
import { CloseCircle } from "@wandersonalwes/iconsax-react";
import { useCreatePageMutation } from "@/services/pageApi";
import { showToast, ToastVariant } from "@/slice/toastSlice";
import { useAppDispatch } from "@/hooks/hook";
import { useRouter } from "next/navigation";

export default function AddPageForm() {
    const [createPage, { isLoading: creatingPage }
    ] = useCreatePageMutation();
    const dispatch = useAppDispatch();
    const route = useRouter();
    const formik = useFormik({
        initialValues: pageInitialData,
        enableReinitialize: true,
        validationSchema: Yup.object({
            name: Yup.string().required("Page title is required"),
            slug: Yup.string().required("Slug is required"),
            description: Yup.string().required("Description is required"),
            content: Yup.array().of(
                Yup.object({
                    heading: Yup.string().required("Heading is required"),
                    description: Yup.string().required("Description cannot be empty"),
                })
            ),
        }),
        onSubmit: async (values) => {
            const formData = new FormData();

            formData.append("name", values.name);
            formData.append("slug", values.slug);
            formData.append("description", values.description);

            // Add dynamic content fields
            values.content.forEach((item, index) => {
                formData.append(`content[${index}][heading]`, item.heading);
                formData.append(`content[${index}][description]`, item.description);
            });
            try {
                const response = await createPage(formData).unwrap();

                dispatch(
                    showToast({
                        message: response.message || "Page created successfully",
                        variant: ToastVariant.SUCCESS
                    })
                )
            } catch (e: any) {
                // console.error("Error submitting form:", e);
                dispatch(
                    showToast({
                        message: e.message || "Something went wrong",
                        variant: ToastVariant.ERROR
                    })
                )
            }
        },
    });

    const handleAddPageContent = () => {
        formik.setFieldValue("content", [
            ...formik.values.content,
            { heading: "", description: "" },
        ]);
    };

    const handleRemovePageContent = (index: number) => {
        const updated = [...formik.values.content];
        updated.splice(index, 1);
        formik.setFieldValue("content", updated);
    };

    return (
        <form onSubmit={formik.handleSubmit} className="space-y-6">
            {/* Title */}
            <div className="input__field">
                <InputLabel>
                    Page Title <span className="text-red-500">*</span>
                </InputLabel>
                <OutlinedInput
                    fullWidth
                    placeholder="Page Title"
                    name="name"
                    value={formik.values.name}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={formik.touched.name && Boolean(formik.errors.name)}
                />
                {formik.touched.name && formik.errors.name && (
                    <FormHelperText error>{formik.errors.name}</FormHelperText>
                )}
            </div>

            {/* Slug */}
            <div className="input__field">
                <InputLabel>
                    Slug <span className="text-red-500">*</span>
                </InputLabel>
                <OutlinedInput
                    fullWidth
                    placeholder="Page Slug"
                    name="slug"
                    value={formik.values.slug}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={formik.touched.slug && Boolean(formik.errors.slug)}
                />
                {formik.touched.slug && formik.errors.slug && (
                    <FormHelperText error>{formik.errors.slug}</FormHelperText>
                )}
            </div>



            {/* Dynamic Content */}
            <InputLabel className="mb-2">Page Content</InputLabel>
            <div className="space-y-6">
                {formik.values.content.map((item, i) => (
                    <div
                        key={i}
                        className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-start border border-gray-200 p-4 rounded-lg relative"
                    >
                        {/* Heading */}
                        <div className="lg:col-span-4">
                            <OutlinedInput
                                fullWidth
                                placeholder="Heading"
                                name={`content[${i}].heading`}
                                value={item.heading}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                error={
                                    !!(
                                        formik.touched.content?.[i]?.heading &&
                                        (formik.errors.content?.[i] as any)?.heading
                                    )
                                }
                            />
                            {formik.touched.content?.[i]?.heading &&
                                (formik.errors.content?.[i] as any)?.heading && (
                                    <FormHelperText error>
                                        {(formik.errors.content?.[i] as any)?.heading}
                                    </FormHelperText>
                                )}
                        </div>

                        {/* Description */}
                        <div className="lg:col-span-8">
                            <ReactQuillEditor
                                value={item.description}
                                onChange={(val: string) =>
                                    formik.setFieldValue(`content[${i}].description`, val)
                                }
                            />
                            {formik.touched.content?.[i]?.description &&
                                (formik.errors.content?.[i] as any)?.description && (
                                    <FormHelperText error>
                                        {(formik.errors.content?.[i] as any)?.description}
                                    </FormHelperText>
                                )}
                        </div>

                        {/* Remove Button */}
                        {formik.values.content.length > 1 && <div className="absolute right-0 top-0">
                            <IconButton
                                color="error"
                                onClick={() => handleRemovePageContent(i)}
                            >
                                <CloseCircle />
                            </IconButton>
                        </div>}
                    </div>
                ))}
            </div>


            {/* Buttons */}
            <div className="flex gap-3">
                <Button
                    variant="contained"
                    color="primary"
                    type="button"
                    onClick={handleAddPageContent}
                >
                    Add More Content
                </Button>
                <Button type="submit" variant="contained" color="secondary">
                    Save Page Content
                </Button>
            </div>
        </form>
    );
}
