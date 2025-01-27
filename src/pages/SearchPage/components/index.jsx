import PropTypes from 'prop-types';

const DetailCard = ({ title, city, street, description, img }) => {
  return (
    <div className="p-20 border-solid border border-[#E9E9E9] rounded-8  shadow-lg flex mb-13">
      <div className="flex-1 content-center">
        <div className="flex justify-between">
          <div>
            <span className=" text-24 mr-22 font-medium inline-block max-w-312  leading-7">
              {title}
            </span>
            <span className="text-gray-7 text-14">{`${city}  >  ${street}`}</span>
          </div>
          {
            <button>
              <img src="/icons/scrap-icon.svg" className="w-21 h-19" alt="스크랩 아이콘" />
            </button>
          }
        </div>
        <p className="text-[#333333] mt-35 leading-[140%] text-14 font-normal line-clamp-2">
          {description}
        </p>
      </div>
      <img src={img} alt="상세사진" className="rounded-10 w-344 h-171 ml-40" />
      <button onClick={e => e}></button>
    </div>
  );
};

export default DetailCard;

DetailCard.propTypes = {
  title: PropTypes.string.isRequired,
  city: PropTypes.string.isRequired,
  street: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  img: PropTypes.string.isRequired,
};
