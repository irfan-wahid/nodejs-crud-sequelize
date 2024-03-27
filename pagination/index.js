"use strict"

module.exports.parse = (page, size) => {
    const limit = size ? +size : 10; // Default limit is 10 if size is not provided
    const offset = page ? (page - 1) * limit : 0; // Calculate the offset considering the page number
    return { limit, offset };
};

module.exports.data = (data, page, limit) => {
    const { count: total_items, rows: items } = data
    const current_page = page ? +page : 0
    const total_pages = Math.ceil(total_items / limit)
    return { total_items, items, total_pages, current_page }
}
