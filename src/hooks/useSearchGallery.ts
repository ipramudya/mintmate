import { useAtom } from "jotai";
import { atomWithReset, useResetAtom } from "jotai/utils";

const search = atomWithReset("");

export function useSearchGallery() {
    const [searchValue, setSearchValue] = useAtom(search);
    const reset = useResetAtom(search);

    return {
        search: searchValue,
        setSearch: setSearchValue,
        reset
    };
}
