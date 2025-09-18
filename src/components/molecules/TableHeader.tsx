import { Button, IconButton, InputAdornment, OutlinedInput } from "@mui/material";
import SelectField from "../atom/SelectField";
import { DocumentDownload, SearchNormal } from "@wandersonalwes/iconsax-react";

interface TableHeaderProps {
    search: string;
    setSearch: (value: string) => void;
    filterMethod?: string;
    setFilterMethod?: (value: string) => void;
    onDownloadCSV: () => void;
}

export default function TableHeader({
    search,
    setSearch,
    filterMethod,
    setFilterMethod,
    onDownloadCSV,
}: TableHeaderProps) {
    return (
        <div className="table__header p-4 mb-4 flex justify-between">
            <div className="inpute__field relative">
                <OutlinedInput
                    placeholder="Search keywords..."
                    name="search"
                    id="search"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    startAdornment={
                        <InputAdornment position="start">
                            <IconButton edge="start">
                                <SearchNormal size={32} />
                            </IconButton>
                        </InputAdornment>
                    }
                />
            </div>
            {filterMethod ? <div className="header-right flex justify-end items-center gap-2">
                <SelectField
                    name="search"
                    value={filterMethod}
                    onChange={(e) => setFilterMethod && setFilterMethod(e.target.value)}
                    options={[
                        { value: "all", name: "All Method" },
                        { value: "crypto", name: "Crypto" },
                        { value: "paypal", name: "USD/Paypal" },
                    ]}
                />
            </div> : ""}
            <Button
                startIcon={
                    <DocumentDownload size={16} />
                }
                onClick={onDownloadCSV} sx={{
                    borderRadius: "8px",
                    border: "1px solid var(--Gray, #E0E0E3)",
                    padding: "8px 16px",
                    color: "#0E0E11"
                }}>Download CSV</Button>
        </div>
    );
}
