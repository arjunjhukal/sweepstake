import { Button } from "@mui/material";
import SelectField from "../atom/SelectField";

interface TableHeaderProps {
    search: string;
    setSearch: (value: string) => void;
    filterMethod: string;
    setFilterMethod: (value: string) => void;
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
                <input
                    type="search"
                    placeholder="Search keywords..."
                    name="search"
                    id="search"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="rounded-[8px] border-solid border-[1px] border-gray pl-7 outline-none focus:outline-primary-light text-[14px] focus:border-primary"
                />
            </div>
            <div className="header-right flex justify-end items-center gap-2">
                <SelectField
                    name="search"
                    value={filterMethod}
                    onChange={(e) => setFilterMethod(e.target.value)}
                    options={[
                        { value: "all", name: "All Method" },
                        { value: "crypto", name: "Crypto" },
                        { value: "paypal", name: "USD/Paypal" },
                    ]}
                />
                <Button onClick={onDownloadCSV}>Download CSV</Button>
            </div>
        </div>
    );
}
