"use client";
import InputFile from "@/components/atom/InputFile";
import SelectField from "@/components/atom/SelectField";
import ReactQuillEditor from "@/components/molecules/ReactQuill";
import { useAppDispatch } from "@/hooks/hook";
import { useAddGameMutation } from "@/services/gameApi";
import { showToast, ToastVariant } from "@/slice/toastSlice";
import { gameInitialValues, GameProps } from "@/types/game";
import { Button, InputLabel, Input } from "@mui/material";
import { useFormik } from "formik";
import { useRouter } from "next/navigation";
import * as Yup from "yup";

interface AddGameFormProps {
    id?: string | number
}

const validationSchema = Yup.object({
    name: Yup.string().required("Name is required"),
    category: Yup.string().required("Category is required"),
    description: Yup.string().required("Description is required"),
    thumbnail: Yup.mixed().required("Thumbnail is required"),
    api: Yup.string().required("API is required"),
    provider: Yup.string().required("Provider is required"),
});

export default function AddGameForm({ id }: AddGameFormProps) {
    const dispatch = useAppDispatch();
    const router = useRouter();

    const [addGame, { isLoading: addingGame }] = useAddGameMutation();

    const formik = useFormik<GameProps>({
        initialValues: gameInitialValues,
        validationSchema,
        onSubmit: async (values) => {
            if (id) {
                console.log("Editing")
            }
            else {
                try {
                    console.log(values);
                    const formData = new FormData();

                    formData.append("name", values.name);
                    formData.append("category", values.category || "");
                    formData.append("description", values.description);
                    formData.append("api", values.api);
                    formData.append("provider", values.provider);
                    if (values.profit) formData.append("profit", values.profit);

                    // Thumbnail (single file)
                    if (values.thumbnail instanceof File) {
                        formData.append("thumbnail", values.thumbnail);
                    }

                    // Screenshots as indexed array
                    if (values.screenshots && Array.isArray(values.screenshots)) {
                        values.screenshots.forEach((file, index) => {
                            formData.append(`screenshots[${index}]`, file);
                        });
                    }

                    // Subgames as indexed array
                    if (values.subgames && Array.isArray(values.subgames)) {
                        values.subgames.forEach((file, index) => {
                            formData.append(`subgames[${index}]`, file);
                        });
                    }

                    const response = await addGame(formData).unwrap();
                    dispatch(
                        showToast({
                            message: response.message,
                            variant: ToastVariant.SUCCESS
                        })
                    )
                }
                catch (e: any) {
                    console.log(e);
                    dispatch(
                        showToast({
                            message: e.message,
                            variant: ToastVariant.ERROR
                        })
                    )
                }
            }
        },
    });

    return (
        <form onSubmit={formik.handleSubmit}>
            <div className="form__field__wrapper border-solid border-[1px] border-gray rounded-[16px] mb-6">
                <div className="form__title py-6 px-10 border-b-solid border-b-[1px] border-gray">
                    <h2 className="text-[20px] leading-[140%] font-bold">Overview of the Game</h2>
                </div>

                <div className="form__fields p-6 lg:p-10 flex flex-col gap-4 lg:gap-6 ">
                    {/* Name */}
                    <div className="input__field">
                        <InputLabel htmlFor="name">Name of the Game<span className="text-red-500">*</span></InputLabel>
                        <Input
                            fullWidth
                            id="name"
                            name="name"
                            placeholder="Enter the name of the game"
                            value={formik.values.name}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                        />
                        <span className="error">
                            {formik.touched.name && formik.errors.name ? formik.errors.name : ""}
                        </span>
                    </div>

                    {/* Thumbnail */}
                    <div className="input__field">
                        <InputFile
                            name="thumbnail"
                            label="Thumbnail of the Game"
                            value={formik.values.thumbnail || null}
                            onChange={(file: File | File[] | null) => formik.setFieldValue("thumbnail", file)}
                            onBlur={() => formik.setFieldTouched("thumbnail", true)}
                        />
                        <span className="error">
                            {formik.touched.thumbnail && formik.errors.thumbnail ? formik.errors.thumbnail : ""}
                        </span>
                    </div>

                    {/* Category */}
                    <div className="input__field">
                        <SelectField
                            name="category"
                            label="Game Category"
                            value={formik.values.category || ""}
                            onChange={(e) => formik.setFieldValue("category", e.target.value)}
                            onBlur={() => formik.setFieldTouched("category", true)}
                            required
                            options={[
                                { value: "action", label: "Action" },
                                { value: "adventure", label: "Adventure" },
                                { value: "puzzle", label: "Puzzle" },
                            ]}
                        />
                        <span className="error">
                            {formik.touched.category && formik.errors.category ? formik.errors.category : ""}
                        </span>
                    </div>

                    {/* Description */}
                    <div className="input__field">
                        <InputLabel>Game Description<span className="text-red-500">*</span></InputLabel>
                        <ReactQuillEditor
                            value={formik.values.description}
                            onChange={(val: string) => formik.setFieldValue("description", val)}
                        />
                        <span className="error">
                            {formik.touched.description && formik.errors.description ? formik.errors.description : ""}
                        </span>
                    </div>

                    {/* Screenshots */}
                    <div className="input__field">
                        <InputFile
                            name="screenshots"
                            label="Screenshots of the game"
                            multiple={true}
                            value={formik.values.screenshots || []}
                            onChange={(files: File | File[] | null) => {
                                if (Array.isArray(files)) {
                                    formik.setFieldValue("screenshots", files);
                                } else if (files === null) {
                                    formik.setFieldValue("screenshots", []);
                                } else {
                                    // Single file converted to array
                                    formik.setFieldValue("screenshots", [files]);
                                }
                            }
                            }
                            onBlur={() => formik.setFieldTouched("screenshots", true)}
                        />
                    </div>

                    {/* Subgames */}
                    <div className="input__field">
                        <InputFile
                            name="subgames"
                            label="Display Images of Sub Games"
                            multiple={true}
                            value={formik.values.subgames || []}
                            onChange={(files: File | File[] | null) => {
                                if (Array.isArray(files)) {
                                    formik.setFieldValue("subgames", files);
                                } else if (files === null) {
                                    formik.setFieldValue("subgames", []);
                                } else {
                                    formik.setFieldValue("subgames", [files]);
                                }
                            }
                            }
                            onBlur={() => formik.setFieldTouched("subgames", true)}
                        />
                    </div>
                </div>
            </div>

            {/* Game Configuration */}
            <div className="form__field__wrapper border-solid border-[1px] border-gray rounded-[16px]">
                <div className="form__title py-6 px-10 border-b-solid border-b-[1px] border-gray">
                    <h2 className="text-[20px] leading-[140%] font-bold">Game Configuration</h2>
                </div>

                <div className="form__fields p-6 lg:p-10 flex flex-col gap-4 lg:gap-6 lg:grid grid-cols-3">
                    {/* API */}
                    <div className="input__field">
                        <InputLabel>API<span className="text-red-500">*</span></InputLabel>
                        <Input
                            fullWidth
                            id="api"
                            name="api"
                            placeholder="Enter the API"
                            value={formik.values.api}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                        />
                        <span className="error">
                            {formik.touched.api && formik.errors.api ? formik.errors.api : ""}
                        </span>
                    </div>

                    {/* Provider */}
                    <div className="input__field">
                        <SelectField
                            name="provider"
                            label="Provider"
                            value={formik.values.provider || ""}
                            onChange={(e) => formik.setFieldValue("provider", e.target.value)}
                            onBlur={() => formik.setFieldTouched("provider", true)}
                            required={true}
                            options={[
                                { value: "provider1", label: "Provider 1" },
                                { value: "provider2", label: "Provider 2" },
                                { value: "provider3", label: "Provider 3" },
                            ]}
                        />
                        <span className="error">
                            {formik.touched.provider && formik.errors.provider ? formik.errors.provider : ""}
                        </span>
                    </div>

                    {/* Extra Thumbnail */}
                    <div className="input__field">
                        <InputLabel htmlFor="profit">Profit % for Superadmin (you)<span className="text-red-500">*</span></InputLabel>
                        <Input
                            fullWidth
                            id="profit"
                            name="profit"
                            placeholder="Enter the profit percentage"
                            value={formik.values.profit}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                        />
                        <span className="error">
                            {formik.touched.profit && formik.errors.profit ? formik.errors.profit : ""}
                        </span>
                    </div>
                </div>
            </div>

            {/* Submit */}
            <div className="text-end mt-8 lg:mt-12 max-w-fit ml-auto">
                <Button type="submit" variant="contained" color="primary" disabled={!formik.dirty || formik.isSubmitting}>
                    Confirm {id ? "Update" : "Addition"}
                </Button>
            </div>
        </form>
    );
}
