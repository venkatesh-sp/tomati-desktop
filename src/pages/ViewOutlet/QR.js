import React from "react";
import { getImgFromUrl, generatePDF } from "utils/helper";
import CsvDownload from "react-json-to-csv";

const QR = ({ outlet }) => {
  return (
    <div className="card bg-white border p-5 mt-2">
      <div className="d-flex align-items-top">
        <div className="mr-5 image-div">
          <img
            alt="menu-qr"
            className="border"
            src={outlet?.menu_link}
            height="204px"
            width="204px"
            id="menu-qr"
          />
          <div
            className="cr-p a-link overlay"
            onClick={() =>
              getImgFromUrl(outlet, function (img, name, formattedName) {
                generatePDF(img, name, formattedName);
              })
            }
          >
            Download QR Code
          </div>
        </div>
        <div className="mr-auto">
          <h4 className="text-dark">{outlet?.name}</h4>
          <p className="text-dark font-weight-light w-56">
            {outlet?.description}
          </p>
          <CsvDownload
            className=" btn btn-danger mr-3 mt-1 rounded-pill"
            data={outlet.menu}
            filename={`${outlet.name}.csv`}
          >
            Download Menu
          </CsvDownload>
          <button className="btn btn-outline-dark mt-1 px-4 rounded-pill ">
            Order Menu tags
          </button>
        </div>
      </div>
    </div>
  );
};

export default QR;
