"use client";

import { InputLabel } from "@mui/material";
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

            {touched && error && (
                <span className="text-red-500 text-xs mt-1">{error}</span>
            )}
        </div>
    );
}
