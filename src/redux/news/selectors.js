
export const selectNews = (state) => state.news.news;


export const selectNewsResults = (state) => state.news.news.results;


export const selectNewsTotalPages = (state) => state.news.news.totalPages;


export const selectNewsLoading = (state) => state.news.isLoading;

export const selectNewsError = (state) => state.news.error;
