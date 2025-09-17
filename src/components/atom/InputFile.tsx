"use client";

import { InputLabel, Tooltip } from "@mui/material";
import { CloseCircle } from "@wandersonalwes/iconsax-react";
import React from "react";

interface InputFileProps {
    name: string;
    label: string;
    value: File | File[] | null;
    onChange: (file: File | File[] | null) => void;
    onBlur?: () => void;
    required?: boolean;
    accept?: string;
    error?: string | boolean;
    touched?: boolean;
    multiple?: boolean;
    serverFile?: string | string[] | null
}

export default function InputFile({
    name,
    label,
    value,
    onChange,
    onBlur,
    required,
    accept,
    error,
    touched,
    multiple = false,
    serverFile
}: InputFileProps) {
    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;
        if (!files) return;
        if (multiple) {
            onChange(Array.from(files));
        } else {
            onChange(files[0]);
        }
    };

    const handleRemoveFile = (fileToRemove: File) => {
        if (!Array.isArray(value)) return;
        const updatedFiles = value.filter((f) => f !== fileToRemove);
        onChange(updatedFiles.length > 0 ? updatedFiles : null);
    };


    return (
        <div className="input__field">
            <InputLabel className="block text-sm font-semibold mb-2">
                {label} {required && <span className="text-red-500">*</span>}
            </InputLabel>

            <label className="flex items-center justify-start border border-gray-300 gap-2 rounded-lg cursor-pointer hover:border-primary transition py-2 px-3">
                <span className="bg-[#D8D8DD] text-title px-2 py-[2px] text-sm ">
                    Choose File
                </span>
                <span className="truncate text-gray-500">
                    {Array.isArray(value)
                        ? value.map((f) => f.name).join(", ") || "No file chosen"
                        : value?.name || "No file chosen"}
                </span>
                <input
                    type="file"
                    name={name}
                    accept={accept}
                    hidden
                    multiple={multiple}
                    onChange={handleFileChange}
                    onBlur={onBlur}
                />
            </label>
            {Array.isArray(value) && value.length > 0 && (
                <div className="flex gap-3 flex-wrap mt-2">
                    {value.map((f) => (
                        <div
                            key={f.name}
                            className="flex items-center gap-2 rounded-[20px] py-[2px] px-3 bg-primary-light text-white"
                        >
                            <Tooltip title={f.name}>
                                <span className="text-[12px]">
                                    {f?.name.length > 5
                                        ? f.name.slice(0, 5) + "..."
                                        : f.name}
                                </span>
                            </Tooltip>
                            <CloseCircle
                                size={14}
                                className="cursor-pointer hover:text-red-500"
                                onClick={() => handleRemoveFile(f)}
                            />
                        </div>
                    ))}
                </div>
            )}
            {
                Array.isArray(serverFile) && serverFile.length > 0 ? (
                    serverFile.map((f) => (
                        <div
                            key={f}
                            className="flex items-center gap-2 rounded-[20px] py-[2px] px-3 bg-primary-light text-white"
                        >
                            <Tooltip title={f}>
                                <span className="text-[12px]">
                                    {f.length > 5
                                        ? f.slice(0, 5) + "..."
                                        : f}
                                </span>
                            </Tooltip>
                            {/* <CloseCircle
                                size={14}
                                className="cursor-pointer hover:text-red-500"
                                onClick={() => handleRemoveFile(f)}
                            /> */}
                        </div>
                    ))
                ) : (<span className="text-[12px]">
                    {serverFile && serverFile?.length > 5
                        ? serverFile?.slice(0, 5) + "..."
                        : serverFile}
                </span>)
            }

            {touched && error && (
                <span className="text-red-500 text-xs mt-1">{error}</span>
            )}
        </div>
    );
}
