import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getPlaceByExplanationApi } from '../../apis/visitJejuApi';
import Detail from './components/Detail';

const DetailPage = () => {
  const { contentsid } = useParams();
  const navigate = useNavigate();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // API 호출
  useEffect(() => {
    const fetchData = async () => {
      try {
        if (!contentsid) {
          navigate('/search'); // cid가 없으면 즉시 리다이렉트
          return;
        }
        const result = await getPlaceByExplanationApi(contentsid);
        if (!result) {
          navigate('/search');
          return;
        }
        setData(result);
      } catch (error) {
        console.error('api 호출 중 오류 :', error);
        setError(error.message);
        navigate('/search'); // 에러 시 리다이렉트
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [contentsid]);

  if (loading) return <div className="mt-20 h-1233"></div>;

  if (error) return <div className="text-center mt-20">에러 발생: {error}</div>;

  if (!data) return <div className="text-center mt-20">데이터가 없습니다.</div>;

  // console.log('DetailPage loaded');

  return (
    <div>
      <Detail data={data} />
    </div>
  );
};

export default DetailPage;
