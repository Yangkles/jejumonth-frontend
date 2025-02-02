import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import WishListButton from './WishListButton';
import { useNavigate } from 'react-router';

const DetailSmallCard = ({ title, city, street, description, category, contentid }) => {
  const [color, setColor] = useState('');
  const [categoryName, setCategoryName] = useState('');
  const navigate = useNavigate();

  const categoryMap = {
    c1: { color: 'bg-[#2481EC]', name: '관광지' },
    c2: { color: 'bg-[#FBBA06]', name: '쇼핑' },
    c3: { color: 'bg-[#25B801]', name: '숙박' },
    c4: { color: 'bg-[#F64F4F]', name: '음식' },
    c5: { color: 'bg-[#6458D4]', name: '축제행사' },
    c6: { color: 'bg-[#24C7EC]', name: '테마여행' }, // 중복 처리
  };

  useEffect(() => {
    const { color, name } = categoryMap[category] || { color: '', name: '' };
    setColor(color);
    setCategoryName(name);
  }, [category]);

  const handleLinkClick = e => {
    e.preventDefault();
    navigate(`/detail/${contentid.contentsid}`);
  };

  // const handleLinkClick = e => {
  //   e.preventDefault();
  // };
  return (
    <>
      <table className="w-full ">
        <colgroup>
          <col style={{ width: '5%' }}></col>
          <col style={{ width: '20%' }}></col>
          <col style={{ width: '15%' }}></col>
          <col style={{ width: '55%' }}></col>
          <col style={{ width: '5%' }}></col>
        </colgroup>
        <tr
          onClick={handleLinkClick}
          className="border-b  border-solid border-[#EEEEEE] cursor-pointer"
        >
          <td className="py-14 px-8">
            <div
              className={`rounded-6 flex justify-center items-center  w-48 h-22 text-12 text-white line-clamp-1 ${color}`}
            >
              {categoryName}
            </div>
          </td>
          <td className="text-16 font-medium  px-8 line-clamp-1">{title}</td>
          <td className="text-14 text-gray-7 py-14 px-8">{`${city} > ${street}`}</td>
          <td className=" px-8 line-clamp-1">{description}</td>
          <td className="py-14 px-8">
            {' '}
            <WishListButton placeInfo={contentid} />
          </td>
        </tr>
      </table>
    </>
  );
};

export default DetailSmallCard;

DetailSmallCard.propTypes = {
  title: PropTypes.string.isRequired,
  city: PropTypes.string.isRequired,
  street: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  img: PropTypes.string.isRequired,
  category: PropTypes.string.isRequired,
  contentid: PropTypes.string.isRequired,
};
