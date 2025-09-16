"use client";

import { InputLabel } from "@mui/material";
import React from "react";

interface Option {
    value: string;
    label: string;
}

interface SelectFieldProps {
    name: string;
    label?: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
    onBlur?: (e: React.FocusEvent<HTMLSelectElement>) => void;
    required?: boolean;
    options: Option[];
    error?: boolean;
    touched?: boolean;
}

export default function SelectField({
    name,
    label,
    value,
    onChange,
    onBlur,
    required,
    options,
    error,
    touched,
}: SelectFieldProps) {
    return (
        <div className="input__field">
            <InputLabel className="block text-sm font-semibold mb-2">
                {label} {required && <span className="text-red-500">*</span>}
            </InputLabel>

            <select
                name={name}
                value={value}
                onChange={onChange}
                onBlur={onBlur}
                className="w-full border text-[14px] border-gray-300 rounded-lg px-3 py-[10px] focus:border-primary outline-0"
            >
                <option value="">Select the Type of Game</option>
                {options.map((option) => (
                    <option key={option.value} value={option.value}>
                        {option.label}
                    </option>
                ))}
            </select>

            {touched && error && (
                <span className="text-red-500 text-xs mt-1">{error}</span>
            )}
        </div>
    );
}
