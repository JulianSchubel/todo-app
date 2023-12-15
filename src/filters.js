const filters = {
    "searchText": "",
    "hideCompleted": false
};

const getFilters = () => filters;

const setFilters = (updates) => {
    if(typeof updates.hideCompleted === 'boolean') {
        filters.hideCompleted = updates.hideCompleted;
    }

    if(typeof updates.searchText === 'string') {
        filters.searchText = updates.searchText;
    }
}

export {
    getFilters,
    setFilters
}
