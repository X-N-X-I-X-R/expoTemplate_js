// services/api.js


export  const SERVERBASE = 'http://127.0.0.1:8000/'

// base autentication endpoint
export const loginBase =  SERVERBASE + 'login/'
export const loginRefresh = SERVERBASE + 'login/refresh'
export const logoutBase = SERVERBASE + 'logout'
export const registerBase = SERVERBASE + 'api/register_user/'
export const password_reset = SERVERBASE + 'password_reset/'
export const password_reset_done = SERVERBASE + 'password_reset/done/'
export const password_reset_confirm = SERVERBASE + 'reset/<uidb64>/<token>/'
export const password_reset_complete = SERVERBASE + 'reset/done/'
export const activate = SERVERBASE + 'activate/<uidb64>/<token>/'

// base api endpoint for the app 
export const apiPaths = SERVERBASE + 'api/'
export const profilEndPoint = apiPaths + 'profiles/'
export const userprofileEndPoint = apiPaths + 'userprofile/'
export const postsEndPoint = apiPaths + 'posts/'
export const followsEndPoint = apiPaths + 'follows/'
export const notificationsEndPoint = apiPaths + 'notifications/'
export const activitylogsEndPoint = apiPaths + 'activitylogs/'
export const messagesEndPoint = apiPaths + 'messages/'
export const meetingsEndPoint = apiPaths + 'meetings/'
export const imagesEndPoint = apiPaths + 'images/'
export const albumsEndPoint = apiPaths + 'albums/'
export const chatroomsEndPoint = apiPaths + 'chatrooms/'
export const private_messagesEndPoint = apiPaths + 'private_messages/'

// base api endpoint for the posts
export const postsLikesEndPoint = postsEndPoint + 'likes/'
export const postsCommentsEndPoint = postsEndPoint + 'comments/'

