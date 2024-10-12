import { CgClose } from "react-icons/cg";

import PropTypes from "prop-types";

const DisplayImage = ({ imgUrl, onClose }) => {
  return (
    <div className="fixed bottom-0 top-0 right-0 left-0 flex justify-center items-center">
      <div className="bg-blue-300 shadow-lg rounded max-w-5xl mx-auto p-2">
        <div
          onClick={onClose}
          className="w-fit text-2xl hover:text-red-500 cursor-pointer"
        >
          <CgClose />
        </div>
        <div className="flex justify-center p-4 mx-w-[80vh] max-h-[80vh]">
          <img src={imgUrl} alt="img" className="w-full h-full" />
        </div>
      </div>
    </div>
  );
};

DisplayImage.propTypes = {
  imgUrl: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default DisplayImage;
