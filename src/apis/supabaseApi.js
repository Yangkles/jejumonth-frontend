import { createClient } from '@supabase/supabase-js';
import { formatDate } from '../utils/dateFormat';

const supabaseUrl = 'https://pyoennlhqeomsqgypozz.supabase.co';
const supabaseKey = import.meta.env.VITE_SUPABASE_SERVICE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);


export async function postTripApi(userId, dateInfo) {
  const startDate = formatDate(dateInfo[0].startDate);
  const endDate = formatDate(dateInfo[0].endDate);
  console.log('Supabase Key:', supabaseKey); // Supabase 키 확인
  console.log('Fetching liked places for user:', userId); // 요청 정보 확인

  const { data, error } = await supabase
    .from('Trips')
    .insert({
      user_id: userId,
      start_date: startDate,
      end_date: endDate,
    })
    .select();
  return data ? data : error;
}

export async function getTripApi(userId, tripId) {
  const { data, error } = await supabase
    .from('Trips')
    .select()
    .eq('trip_id', tripId)
    .eq('user_id', userId);
  return data ? data : error;
}

export async function getAllTripsApi(userId) {
  const { data, error } = await supabase
    .from('Trips')
    .select()
    .eq('user_id', userId);
  return data ? data : error;
}

export async function postPlanApi(planData) {
  const { data, error } = await supabase
    .from('Plans')
    .insert({
      ...planData,
      // trip_id: tripId,
      // date: date,
      // time: placeInfo.time,
      // place_name: placeInfo.name,
      // description: placeInfo.description,
      // category: placeInfo.category,
      // road_address: placeInfo.address,
      // lat: placeInfo.latitude,
      // lng: placeInfo.longitude,
    })
    .select();
  console.log('post plan api, res data', data);
  if (error) {
    console.log(error);
  }
  return data ? data : error;
}

export async function getPlanApi(userId, tripId) {
  const { data, error } = await supabase.from('Plans').select();
  return data ? data : error;
}

// 찜하기한 장소 저장용 API 4개
export async function getAllUserLikedPlacesApi(userId) {
  const { data, error } = await supabase
  .from('UserLikedPlaces')
  .select()
  .eq('user_id', userId);
  return data ? data : error;
}

export async function getUserLikedPlaceApi(userId, contentId) {
  const { data, error } = await supabase
    .from('UserLikedPlaces')
    .select()
    .eq('user_id', userId)
    .eq('content_id', contentId);
  return data ? data : error;
}

export async function postUserLikedPlaceApi(userId, placeInfo) {
  console.log('Adding liked place for user:', userId, 'Place Info:', placeInfo); // 요청 데이터 출력
  const { data, error } = await supabase
    .from('UserLikedPlaces')
    .insert({
      user_id: userId,
      content_id: placeInfo.contentsid,
      title: placeInfo.title,
      category: placeInfo.contentscd.label,
      address: placeInfo.roadaddress,
      img_full_url: placeInfo.repPhoto.photoid.imgpath,
      img_thumbnail_url: placeInfo.repPhoto.photoid.thumbnailpath,
    })
    .select();
  if (error) {
    console.error('Error adding liked place:', error); // 에러 출력
  } else {
    console.log('Liked place added successfully:', data); // 응답 데이터 출력
  }
  return data ? data : error;
}

export async function deleteUserLikedPlaceApi(userId, contentId) {
  const { data, error } = await supabase
    .from('UserLikedPlaces')
    .delete()
    .eq('user_id', userId)
    .eq('content_id', contentId)
    .select();
  return data ? data : error;
}

// 아래 부터 커뮤니티 관련 API
export async function getAllUserCommentsApi(userId) {
  const { data, error } = await supabase.from('UserComments').select().eq('user_id', userId);
  return data ? data : error;
}

export async function postUserCommentApi(userId, commentId, articleId) {
  const { data, error } = await supabase
    .from('UserComments')
    .insert({
      user_id: userId,
      comment_id: commentId,
      article_id: articleId,
    })
    .select();
  return data ? data : error;
}

export async function deleteUserCommentApi(userId, commentId) {
  const { data, error } = await supabase
    .from('UserComments')
    .delete()
    .eq('user_id', userId)
    .eq('comment_id', commentId)
    .select();
  return data ? data : error;
}

export async function getUserLikedArticlesApi(userId) {
  const { data, error } = await supabase.from('UserLikedArticles').select().eq('user_id', userId);
  return data ? data : error;
}

export async function postUserLikedArticlesApi(userId, articleId) {
  const { data, error } = await supabase
    .from('UserLikedArticles')
    .insert({
      user_id: userId,
      article_id: articleId,
    })
    .select();
  return data ? data : error;
}

export async function deleteUserLikedArticlesApi(userId, articleId) {
  const { data, error } = await supabase
    .from('UserLikedArticles')
    .delete()
    .eq('user_id', userId)
    .eq('article_id', articleId)
    .select();
  return data ? data : error;
}

export async function getAllUserArticlesApi(userId) {
  const { data, error } = await supabase.from('UserArticles').select().eq('user_id', userId);
  return data ? data : error;
}

export async function postUserArticleApi(userId, articleId) {
  const { data, error } = await supabase
    .from('UserArticles')
    .insert({
      user_id: userId,
      article_id: articleId,
    })
    .select();
  return data ? data : error;
}

export async function deleteUserArticleApi(userId, articleId) {
  const { data, error } = await supabase
    .from('UserArticles')
    .delete()
    .eq('user_id', userId)
    .eq('article_id', articleId)
    .select();
  return data ? data : error;
}
