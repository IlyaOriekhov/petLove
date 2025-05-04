export const selectNotices = (state) => state.notices.notices;

export const selectNoticesResults = (state) => state.notices.notices.results;

export const selectTotalPages = (state) => state.notices.notices.totalPages;

export const selectCurrentNotice = (state) => state.notices.currentNotice;

export const selectCategories = (state) => state.notices.categories;

export const selectGenders = (state) => state.notices.genders;

export const selectTypes = (state) => state.notices.species;

export const selectLocations = (state) => state.notices.locations;

export const selectNoticesLoading = (state) => state.notices.isLoading;

export const selectNoticesError = (state) => state.notices.error;
