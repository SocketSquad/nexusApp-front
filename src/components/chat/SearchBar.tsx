import IconSearch from "../Icon/IconSearch";

interface SearchBarProps {
    searchUser: string;
    setSearchUser: (value: string) => void;
}

const SearchBar = ({ searchUser, setSearchUser }: SearchBarProps) => {
    return (
        <div className="relative">
            <input type="text" className="form-input peer ltr:pr-9 rtl:pl-9" placeholder="Searching..." value={searchUser} onChange={(e) => setSearchUser(e.target.value)} />
            <div className="absolute ltr:right-2 rtl:left-2 top-1/2 -translate-y-1/2 peer-focus:text-primary">
                <IconSearch />
            </div>
        </div>
    )
};

export default SearchBar;
