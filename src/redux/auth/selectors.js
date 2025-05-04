export const selectIsLoggedIn = (state) => state.auth.isLoggedIn;

export const selectUser = (state) => state.auth.user;

export const selectIsRefreshing = (state) => state.auth.isRefreshing;

export const selectUserPets = (state) => state.auth.pets;

export const selectFavoritesNotices = (state) => state.auth.noticesFavorites;

export const selectViewedNotices = (state) => state.auth.noticesViewed;

export const selectIsLoading = (state) => state.auth.isLoading;

export const selectError = (state) => state.auth.error;
