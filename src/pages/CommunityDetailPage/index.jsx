import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { fetchChannels } from '../../apis/channelApi';
import leftArray from '../../../public/icons/left-array.svg';
import ChannelTabs from '../CommunityPage/components/ChannelList';
import CommentList from './components/CommentList';
import CommentForm from './components/CommentForm';
import likesIcon from '../../../public/icons/likes.svg';
import commentIcon from '../../../public/icons/comment.svg';

const CommunityDetailPage = ({ posts }) => {
  // 디버깅
  console.log('커뮤니티 디테일에서 받는 posts', posts);

  const { postId } = useParams();
  const { state } = useLocation();
  const navigate = useNavigate();
  const [post, setPost] = useState(state?.post || null);
  const [channels, setChannels] = useState([]);
  const [channel, setChannel] = useState(null);
  const [activeTab, setActiveTab] = useState('베스트');
  const [comments, setComments] = useState([]);

  useEffect(() => {
    if (!post) {
      const foundPost = posts.find(p => p._id === postId);
      if (foundPost) {
        setPost(foundPost);
        setComments(foundPost.comments || []);
      } else {
        console.error('게시물 데이터를 찾을 수 없습니다.');
      }
    } else {
      setComments(post.comments || []);
    }
  }, [post, postId, posts]);

  useEffect(() => {
    const loadChannels = async () => {
      try {
        const channelData = await fetchChannels();
        setChannels(channelData);

        if (post && post.channel?._id) {
          const foundChannel = channelData.find(c => c._id === post.channel._id);
          setChannel(foundChannel);
          setActiveTab(foundChannel?.name || '베스트');
        }
      } catch (error) {
        console.error('채널 정보를 불러오는 데 실패했습니다:', error);
      }
    };

    loadChannels();
  }, [post]);

  const calculateTimeAgo = date => {
    const now = new Date();
    const postTime = new Date(date);
    const diff = Math.floor((now - postTime) / (1000 * 60));
    if (diff < 60) return `${diff}분 전`;
    const hours = Math.floor(diff / 60);
    if (hours < 24) return `${hours}시간 전`;
    const days = Math.floor(hours / 24);
    return `${days}일 전`;
  };

  const handleCommentCreated = newComment => {
    setComments(prevComments => [...prevComments, newComment]);
  };

  if (!post) {
    return (
      <div className="container mx-auto px-10 py-10">
        <p className="text-red-500">게시물 데이터를 찾을 수 없습니다.</p>
        <button
          onClick={() => navigate('/community')}
          className="text-gray-500 hover:text-orange-500"
        >
          ← 목록으로 돌아가기
        </button>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-10 py-10">
      <div className="flex items-center pb-10 mb-10">
        <button
          className="text-gray-500 hover:text-orange-500 text-lg mr-4"
          onClick={() => navigate('/community')}
        >
          <img src={leftArray} alt="뒤로 가기" />
        </button>
        <h2 className="text-2xl font-bold text-gray-800">커뮤니티</h2>
      </div>

      <ChannelTabs
        channels={channels}
        activeTab={activeTab}
        setActiveTab={tab => {
          setActiveTab(tab);
          navigate(`/community?tab=${tab}`);
        }}
      />

      <div className="bg-white p-1 ">
        <div className="flex items-center justify-between mb-30 mt-35">
          <div className="text-lg font-bold text-gray-800 bg-gray-200 rounded-7 px-45 py-5 ">
            <h3 className="text-lg font-bold text-gray-800 ">
              {channel?.name || '알 수 없는 채널'}
            </h3>
          </div>
        </div>

        <div className="flex items-center mb-30 ml-12">
          <div className="w-40 h-40 rounded-full overflow-hidden flex-shrink-0">
            <img
              src={post.author?.profileImage || '/default-avatar.png'}
              alt="작성자 프로필"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="ml-10">
            <h3 className="text-lg font-bold">{post.author?.fullName || '익명 사용자'}</h3>
            <p className="text-sm text-gray-500">{post.author?.email || '이메일 없음'}</p>
            <p className="text-sm text-gray-400">{calculateTimeAgo(post.createdAt)} 작성</p>
          </div>
        </div>

        <p className="text-md mb-13">{post.title}</p>

        {post.image && (
          <div className="mb-20 mt-30">
            <img src={post.image} alt={post.title} className="w-801 h-475" />
          </div>
        )}

        <div className="flex items-center space-x-30 text-sm text-gray-500 mt-60">
          {/* 좋아요 버튼은 더미로만 표시 */}
          <div className="flex items-center space-x-2 cursor-pointer">
            <img src={likesIcon} alt="좋아요" className="w-25 h-23 opacity-50" />
            <span>{post.likes?.length || 0}</span>
          </div>

          <div className="flex items-center space-x-2">
            <img src={commentIcon} alt="댓글" className="w-25 h-23" />
            <span>{comments.length}</span>
          </div>
        </div>

        <CommentList comments={comments} />
      </div>

      <div className="mt-8">
        <CommentForm postId={post._id} onCommentCreated={handleCommentCreated} />
      </div>
    </div>
  );
};

export default CommunityDetailPage;
