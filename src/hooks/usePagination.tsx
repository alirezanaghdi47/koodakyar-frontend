import {useState} from "react";

const usePagination = ({limit}) => {

    const [offset, setOffset] = useState(1);

    const _onPaginate = (value) => setOffset(value);

    return {
        limit,
        offset,
        onPaginate: _onPaginate
    }

}

export default usePagination;