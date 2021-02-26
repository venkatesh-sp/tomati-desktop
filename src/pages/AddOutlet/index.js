import React, { useEffect, useState } from "react";
// redux
import { connect } from "react-redux";
import { addOutlet } from "_actions/outlet";
import { getLocationRegister } from "_actions/auth";

// react router
import { withRouter, Link } from "react-router-dom";
// local components
import OutletDetails from "./components/OutletDetails";
import CreateMenu from "./components/CreateMenu";
// react bootstrap
import { Card, Form, Button } from "react-bootstrap";
// lodash
import _ from "lodash";

import CustomModal from "components/CustomModal";

const Index = (props) => {
  const [tempMenu, setMenu] = useState(null);
  const [values, setValues] = useState({
    name: "",
    cover_image: null,
    logo_img: null,
    menu: null,
    plan: 1,
    location_id: null,
    phone_number: null,
    latitude: null,
    longitude: null,
    description: null,
    address: null,
    step: 1,
  });
  const { step } = values;

  useEffect(() => {
    props.dispatch(getLocationRegister());
  }, []);

  const fileToBase64 = async (file) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (e) => reject(e);
    });

  const handleChange = (name) => (event) => {
    const value = event.target.value;
    setValues((values) => ({ ...values, [name]: value }));
  };

  const handleFile = (name) => (event) => {
    const value = event.target.files;
    setValues((values) => ({ ...values, [name]: value }));
  };

  const handleStep = (e) => {
    e.preventDefault();
    setValues((values) => ({ ...values, step: values.step + 1 }));
  };

  const handleStepPrev = (values) => {
    setValues((values) => ({ ...values, step: values.step - 1 }));
  };

  console.log(values);

  const handleCreateOutlet = async (e) => {
    e.preventDefault();
    const {
      name,
      cover_image,
      logo_img,
      menu,
      plan,
      location_id,
      phone_number,
      latitude,
      longitude,
      description,
      address,
    } = values;

    const url = await fileToBase64(cover_image[0]);
    const url2 = await fileToBase64(logo_img[0]);

    props.dispatch(
      addOutlet({
        name,
        phone_number,
        address,
        location_id,
        description,
        cover_image: { name: cover_image[0].name, data: url },
        logo_img: { name: logo_img[0].name, data: url2 },
        menu,
      })
    );
  };

  const HeaderText = {
    fontSize: "24px",
    fontFamily: "Poppins",
    fontWeight: "600",
  };
  const [modalShow, setModalShow] = React.useState(false);

  return (
    <div className="container-fluid">
      <div className="container">
        {/* <Button variant="primary" onClick={() => setModalShow(true)}>
          Launch vertically centered modal
        </Button>
        <CustomModal show={modalShow} onHide={() => setModalShow(false)} /> */}
        <div className="row justify-content-center">
          <div className="col-md-8">
            <Card className="p-5 rounded">
              {step === 1 ? (
                <>
                  <div
                    style={HeaderText}
                    className="text-start form-legend mb-3"
                  >
                    Outlet Details
                  </div>
                  <Form
                    id="register-form"
                    onSubmit={handleStep}
                    autoComplete="off"
                  >
                    <OutletDetails
                      values={values}
                      setValues={setValues}
                      handleChange={handleChange}
                      handleFile={handleFile}
                      handleStep={handleStep}
                    />
                  </Form>
                </>
              ) : step === 2 ? (
                <>
                  <div
                    style={HeaderText}
                    className="text-start form-legend pb-5"
                  >
                    Create Menu
                  </div>
                  <Form
                    id="email-form"
                    onSubmit={handleCreateOutlet}
                    autoComplete="off"
                  >
                    <CreateMenu
                      values={values}
                      handleChange={handleChange}
                      setValues={setValues}
                      handleStep={handleStep}
                      handleCreateOutlet={handleCreateOutlet}
                      handleStepPrev={handleStepPrev}
                      props={props}
                    />
                  </Form>
                </>
              ) : null}
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

function mapStateToProps(state) {
  return { outlet: state.outlet, auth: state.auth };
}

export default withRouter(connect(mapStateToProps)(Index));
