// import { Button, IconButton, InputAdornment, OutlinedInput, useMediaQuery } from "@mui/material";
// import SelectField from "../atom/SelectField";
// import { DocumentDownload, SearchNormal } from "@wandersonalwes/iconsax-react";

// interface TableHeaderProps {
//     search: string;
//     setSearch?: (value: string) => void;
//     filterMethod?: string;
//     setFilterMethod?: (value: string) => void;
//     onDownloadCSV: () => void;
// }

// export default function TableHeader({
//     search,
//     setSearch,
//     filterMethod,
//     setFilterMethod,
//     onDownloadCSV,
// }: TableHeaderProps) {
//     const downMD = useMediaQuery((theme) => theme.breakpoints.down('md'));
//     return (
//         <div className="table__header p-4 mb-4 flex justify-between">
//             <div className="inpute__field relative">
//                 <OutlinedInput
//                     placeholder="Search keywords..."
//                     name="search"
//                     id="search"
//                     value={search}
//                     onChange={(e) => setSearch && setSearch(e.target.value)}
//                     startAdornment={
//                         <InputAdornment position="start">
//                             <IconButton edge="start">
//                                 <SearchNormal size={20} />
//                             </IconButton>
//                         </InputAdornment>
//                     }
//                 />
//             </div>
//             {filterMethod ? <div className="header-right flex justify-end items-center gap-2">
//                 <SelectField
//                     name="search"
//                     value={filterMethod}
//                     onChange={(e) => setFilterMethod && setFilterMethod(e.target.value)}
//                     options={[
//                         { value: "all", name: "All Method" },
//                         { value: "crypto", name: "Crypto" },
//                         { value: "paypal", name: "USD/Paypal" },
//                     ]}
//                 />
//             </div> : ""}
//             <Button
//                 startIcon={
//                     !downMD && <DocumentDownload size={16} />
//                 }
//                 onClick={onDownloadCSV} sx={{
//                     borderRadius: "8px",
//                     border: "1px solid var(--Gray, #E0E0E3)",
//                     padding: "8px 16px",
//                     color: "#0E0E11",
//                     maxWidth: "fit-content",
//                 }}>{downMD ? <DocumentDownload size={16} /> : "Download CSV"}</Button>
//         </div>
//     );
// }

import { Button, IconButton, InputAdornment, OutlinedInput, useMediaQuery } from "@mui/material";
import SelectField from "../atom/SelectField";
import { DocumentDownload, SearchNormal } from "@wandersonalwes/iconsax-react";

interface FilterOption {
    value: string;
    label: string;
}

interface TableHeaderProps {
    search: string;
    setSearch?: (value: string) => void;
    filterMethod?: string;
    setFilterMethod?: (value: string) => void;
    filterOptions?: FilterOption[];
    onDownloadCSV: () => void;
}

export default function TableHeader({
    search,
    setSearch,
    filterMethod,
    setFilterMethod,
    filterOptions,
    onDownloadCSV,
}: TableHeaderProps) {
    const downMD = useMediaQuery((theme: any) => theme.breakpoints.down('md'));

    return (
        <div className="table__header p-4 mb-4 flex justify-between items-center gap-4">
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

            <div className="header-right flex justify-end items-center gap-2">
                {filterMethod && filterOptions && (
                    <SelectField
                        name="filter"
                        value={filterMethod}
                        onChange={(e) => setFilterMethod && setFilterMethod(e.target.value)}
                        options={filterOptions.map(option => ({
                            value: option.value,
                            name: option.label
                        }))}
                    />
                )}

                {onDownloadCSV ? <Button
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
                    {downMD ? <DocumentDownload size={16} /> : "Download CSV"}
                </Button> : ""}
            </div>
        </div>
    );
}