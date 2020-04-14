// 管理各类请求接口
import Network from './network'

export const getBanner = () => Network.get('/api/banner?type=2')
export const getPersonalized = () => Network.get('/api/personalized?limit=6')
export const getNewestAlbum = () => Network.get('/api/album/newest')
export const getNewSong = () => Network.get('/api/personalized/newsong')
export const getPlayList = (data) => Network.get('/api/playlist/detail', data)
export const getAlbum = (data) => Network.get('/api/album', data)
export const getSongDetail = (data) => Network.get('/api/song/detail', data)
export const getSongLyric = (data) => Network.get('/api/lyric', data)
export const getSongURL = (data) => Network.get('/api/song/url', data)
export const getSearchList = (data) => Network.get('/api/search?type=1', data)
export const getSearchHot = () => Network.get('/api/search/hot')
