
import { Button, IconButton, InputAdornment, OutlinedInput, useMediaQuery } from "@mui/material";
import SelectField from "../atom/SelectField";
import { DocumentDownload, SearchNormal } from "@wandersonalwes/iconsax-react";
import React from "react";

interface FilterOption {
    value: string;
    label: string;
}

interface TableHeaderProps {
    search: string;
    setSearch?: (value: string) => void;

    // Single filter support
    filterMethod?: string;
    setFilterMethod?: (value: string) => void;

    // Multiple filters support
    filters?: { value: string; setValue: (value: string) => void; options: FilterOption[], placeholder?: string }[];
    filterOptions?: FilterOption[];
    onDownloadCSV?: () => void;
    downloading?: boolean;
    debounceDelay?: number;
}

export default function TableHeader({
    search,
    setSearch,
    filterMethod,
    setFilterMethod,
    filters,
    onDownloadCSV,
    filterOptions,
    downloading,
    debounceDelay = 500,
}: TableHeaderProps) {
    const downMD = useMediaQuery((theme: any) => theme.breakpoints.down('md'));

    const [localSearch, setLocalSearch] = React.useState(search);

    React.useEffect(() => {
        const handler = setTimeout(() => {
            if (setSearch && localSearch !== search) {
                setSearch(localSearch);
            }
        }, debounceDelay);

        return () => {
            clearTimeout(handler);
        };
    }, [localSearch, debounceDelay]);

    React.useEffect(() => {
        setLocalSearch(search);
    }, [search]);

    return (
        <div className="table__header p-4 mb-4 flex flex-wrap justify-between items-center gap-4">
            {/* Search Field */}
            <div className="inpute__field relative">
                <OutlinedInput
                    placeholder="Search keywords..."
                    name="search"
                    id="search"
                    value={search}
                    onChange={(e) => setSearch && setSearch(e.target.value)}
                    startAdornment={
                        <InputAdornment position="start">
                            <IconButton edge="start">
                                <SearchNormal size={20} />
                            </IconButton>
                        </InputAdornment>
                    }
                />
            </div>


            {/* Filters */}
            <div className="header-right flex flex-wrap justify-end items-center gap-2">
                {/* Multi-filter mode */}
                {filters?.map((f, idx) => (
                    <SelectField
                        key={idx}
                        name={`filter-${idx}`}
                        value={f.value}
                        onChange={(e) => f.setValue && f.setValue(e.target.value)}
                        options={f.options.map(opt => ({ value: opt.value, name: opt.label }))}
                        placeholder={f.placeholder && f.placeholder}
                    />
                ))}

                {/* Legacy single filter mode */}
                {filterOptions && filterMethod !== undefined && setFilterMethod && (
                    <SelectField
                        name="filter"
                        value={filterMethod}
                        onChange={(e) => setFilterMethod(e.target.value)}
                        options={filterOptions.map(opt => ({ value: opt.value, name: opt.label }))}
                    />
                )}

                {/* Download Button */}
                {onDownloadCSV && <Button
                    startIcon={!downMD && <DocumentDownload size={16} />}
                    onClick={onDownloadCSV}
                    sx={{
                        borderRadius: "8px",
                        border: "1px solid var(--Gray, #E0E0E3)",
                        padding: "8px 16px",
                        color: "#0E0E11",
                        maxWidth: "fit-content",
                    }}
                >
                    {downMD ? <DocumentDownload size={16} /> : downloading ? "Downloading..." : "Download CSV"}
                </Button>}
            </div>
        </div>
    );
}
