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
    onRemoveServerFile?: (fileUrl?: string) => void;
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
    serverFile,
    onRemoveServerFile
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
                    {/* {Array.isArray(value)
                        ? value.map((f) => f.name).join(", ") || "No file chosen"
                        : value?.name || "No file chosen"} */}
                    {
                        Array.isArray(value) && value.length || value ? "Update File" : "No file chosen"
                    }
                </span>
                <input
                    type="file"
                    name={name}
                    accept={accept}
                    hidden
                    multiple={multiple}
                    onChange={(e) => {
                        handleFileChange(e)
                        e.target.value = '';
                    }}
                    onBlur={onBlur}
                />
            </label>
            <div className="flex gap-3 flex-wrap mt-2">
                {value && (
                    <>
                        {Array.isArray(value) ? (
                            value.map((f) => (
                                <div
                                    key={f.name}
                                    className="relative w-[80px] h-[80px] rounded-lg overflow-hidden border border-gray-200"
                                >
                                    {f instanceof File && (
                                        <img
                                            src={URL.createObjectURL(f)}
                                            alt={f.name}
                                            className="w-full h-full object-cover"
                                        />
                                    )}
                                    <CloseCircle
                                        size={16}
                                        className="absolute top-1 right-1 cursor-pointer text-white hover:text-red-500"
                                        onClick={() => handleRemoveFile(f)}
                                    />
                                </div>
                            ))
                        ) : (
                            value instanceof File && (
                                <div
                                    key={value.name}
                                    className="relative w-[80px] h-[80px] rounded-lg overflow-hidden border border-gray-200"
                                >
                                    <img
                                        src={URL.createObjectURL(value)}
                                        alt={value.name}
                                        className="w-full h-full object-cover"
                                    />
                                    <CloseCircle
                                        size={16}
                                        className="absolute top-1 right-1 cursor-pointer text-white hover:text-red-500"
                                        onClick={() => onChange(null)}
                                    />
                                </div>
                            )
                        )}
                    </>
                )}
                {serverFile && (
                    <>
                        {Array.isArray(serverFile) ? (
                            serverFile.map((f) => (
                                <div
                                    key={f}
                                    className="relative w-[80px] h-[80px] rounded-lg overflow-hidden border border-gray-200"
                                >
                                    <img
                                        src={f}
                                        alt={f}
                                        className="w-full h-full object-cover"
                                    />

                                    <CloseCircle
                                        size={16}
                                        className="absolute top-1 right-1 cursor-pointer text-white hover:text-red-500"
                                        onClick={() => onRemoveServerFile && onRemoveServerFile(f)}
                                    />
                                </div>
                            ))
                        ) : (
                            <div
                                key={serverFile}
                                className="relative w-[80px] h-[80px] rounded-lg overflow-hidden border border-gray-200"
                            >
                                <img
                                    src={serverFile}
                                    alt={serverFile}
                                    className="w-full h-full object-cover"
                                />
                                <CloseCircle
                                    size={16}
                                    className="absolute top-1 right-1 cursor-pointer text-white hover:text-red-500"
                                    onClick={() => onRemoveServerFile && onRemoveServerFile(serverFile)}
                                />
                            </div>
                        )}
                    </>
                )}
            </div>


            {/* {
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
                            
                        </div>
                    ))
                ) : (<span className="text-[12px]">
                    {serverFile && serverFile?.length > 5
                        ? serverFile?.slice(0, 5) + "..."
                        : serverFile}
                </span>)
            } */}

            {touched && error && (
                <span className="text-red-500 text-xs mt-1">{error}</span>
            )}
        </div>
    );
}
