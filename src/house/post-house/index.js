import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Modal, Button, Form } from "react-bootstrap";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import * as formik from "formik";
import * as yup from "yup";
import { createHouseThunk, uploadImagesThunk } from "../services/houses-thunks";
import { useSelector } from "react-redux";

const PostHouse = () => {
  const { houses, publicHouses } = useSelector((state) => state.houses);
  const th = [...houses, ...publicHouses];
  const addressDB = th.map(
    (house) =>
      `${house.address.trim().split(" ").join("").toLowerCase()}${house.city
        .trim()
        .split(" ")
        .join("")
        .toLowerCase()}${house.state.trim().split(" ").join("").toLowerCase()}`
  );
  const { currentUser } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const { Formik } = formik;

  const schema = yup.object().shape({
    address: yup.string().required(),
    price: yup.number().required().positive(),
    type: yup.string().required(),
    city: yup.string().required(),
    state: yup.string().required(),
    zipcode: yup.string().required(),
    bedrooms: yup.number().required().positive().integer(),
    bathrooms: yup.number().required().positive(),
    size: yup.number().required().positive(),
    year: yup.number().required().positive().integer(),
    overview: yup.string().required(),
    images: yup.mixed().required(),
    terms: yup.bool().required().oneOf([true], "terms must be accepted"),
  });

  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        Post New House
      </Button>

      <Modal
        show={show}
        onHide={handleClose}
        size="lg"
        scrollable="true"
        backdrop="static"
      >
        <Modal.Header closeButton>
          <Modal.Title>Post New House</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Formik
            validationSchema={schema}
            initialValues={{
              type: "single family",
              terms: false,
            }}
            onSubmit={(values, { setSubmitting }) => {
              setTimeout(() => {
                if (
                  addressDB.includes(
                    `${values.address
                      .trim()
                      .split(" ")
                      .join("")
                      .toLowerCase()}${values.city
                        .trim()
                        .split(" ")
                        .join("")
                        .toLowerCase()}${values.state
                          .trim()
                          .split(" ")
                          .join("")
                          .toLowerCase()}`
                  )
                ) {
                  setSubmitting(false);
                  alert("This house was already posted. Please post another house.");
                } else {
                  let formData = new FormData();
                  let images = [];
                  for (const image of values.images) {
                    formData.append("images", image);
                    images.push(image.name);
                  }
                  values.images = images;
                  values = {
                    ...values,
                    agent: currentUser._id,
                    date_posted: new Date(),
                  };
                  dispatch(uploadImagesThunk(formData));
                  dispatch(createHouseThunk(values));
                  setSubmitting(false);
                  handleClose();
                }
              }, 400);
            }}
          >
            {({
              handleSubmit,
              handleChange,
              values,
              errors,
              isSubmitting,
              setFieldValue,
            }) => (
              <Form noValidate onSubmit={handleSubmit}>
                <Row className="mb-3">
                  <Form.Group
                    as={Col}
                    md="6"
                    controlId="validationFormik103"
                    className="position-relative"
                  >
                    <Form.Label>Address</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Address"
                      name="address"
                      value={values.address}
                      onChange={handleChange}
                      isInvalid={!!errors.address}
                    />

                    <Form.Control.Feedback type="invalid" tooltip>
                      {errors.address}
                    </Form.Control.Feedback>
                  </Form.Group>
                  <Form.Group
                    as={Col}
                    md="3"
                    controlId="validationFormik103"
                    className="position-relative"
                  >
                    <Form.Label>Price $</Form.Label>
                    <Form.Control
                      type="number"
                      placeholder="Price $"
                      name="price"
                      value={values.price}
                      onChange={handleChange}
                      isInvalid={!!errors.price}
                    />

                    <Form.Control.Feedback type="invalid" tooltip>
                      {errors.price}
                    </Form.Control.Feedback>
                  </Form.Group>
                  <Form.Group
                    as={Col}
                    md="3"
                    controlId="validationFormikUsername2"
                  >
                    <Form.Label>Type</Form.Label>
                    <Form.Select
                      name="type"
                      value={values.type}
                      onChange={handleChange}
                    >
                      <option value={"single familty"}>single family</option>
                      <option value={"townhouse"}>townhouse</option>
                      <option value={"condo"}>condo</option>
                    </Form.Select>
                  </Form.Group>
                </Row>
                <Row className="mb-3">
                  <Form.Group
                    as={Col}
                    md="4"
                    controlId="validationFormik103"
                    className="position-relative"
                  >
                    <Form.Label>City</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="City"
                      name="city"
                      value={values.city}
                      onChange={handleChange}
                      isInvalid={!!errors.city}
                    />

                    <Form.Control.Feedback type="invalid" tooltip>
                      {errors.city}
                    </Form.Control.Feedback>
                  </Form.Group>
                  <Form.Group
                    as={Col}
                    md="4"
                    controlId="validationFormik104"
                    className="position-relative"
                  >
                    <Form.Label>State</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="State"
                      name="state"
                      value={values.state}
                      onChange={handleChange}
                      isInvalid={!!errors.state}
                    />
                    <Form.Control.Feedback type="invalid" tooltip>
                      {errors.state}
                    </Form.Control.Feedback>
                  </Form.Group>
                  <Form.Group
                    as={Col}
                    md="4"
                    controlId="validationFormik105"
                    className="position-relative"
                  >
                    <Form.Label>Zip Code</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Zip Code"
                      name="zipcode"
                      value={values.zipcode}
                      onChange={handleChange}
                      isInvalid={!!errors.zipcode}
                    />

                    <Form.Control.Feedback type="invalid" tooltip>
                      {errors.zipcode}
                    </Form.Control.Feedback>
                  </Form.Group>
                </Row>
                <Row className="mb-3">
                  <Form.Group
                    as={Col}
                    md="3"
                    controlId="validationFormik103"
                    className="position-relative"
                  >
                    <Form.Label>Bedrooms</Form.Label>
                    <Form.Control
                      type="number"
                      name="bedrooms"
                      value={values.bedrooms}
                      onChange={handleChange}
                      isInvalid={!!errors.bedrooms}
                    />

                    <Form.Control.Feedback type="invalid" tooltip>
                      {errors.bedrooms}
                    </Form.Control.Feedback>
                  </Form.Group>
                  <Form.Group
                    as={Col}
                    md="3"
                    controlId="validationFormik104"
                    className="position-relative"
                  >
                    <Form.Label>Bathrooms</Form.Label>
                    <Form.Control
                      type="number"
                      name="bathrooms"
                      value={values.bathrooms}
                      onChange={handleChange}
                      isInvalid={!!errors.bathrooms}
                    />
                    <Form.Control.Feedback type="invalid" tooltip>
                      {errors.bathrooms}
                    </Form.Control.Feedback>
                  </Form.Group>
                  <Form.Group
                    as={Col}
                    md="3"
                    controlId="validationFormik104"
                    className="position-relative"
                  >
                    <Form.Label>Size</Form.Label>
                    <Form.Control
                      type="number"
                      name="size"
                      value={values.size}
                      onChange={handleChange}
                      isInvalid={!!errors.size}
                    />
                    <Form.Control.Feedback type="invalid" tooltip>
                      {errors.size}
                    </Form.Control.Feedback>
                  </Form.Group>
                  <Form.Group
                    as={Col}
                    md="3"
                    controlId="validationFormik104"
                    className="position-relative"
                  >
                    <Form.Label>Year</Form.Label>
                    <Form.Control
                      type="number"
                      placeholder="Built Year"
                      name="year"
                      value={values.year}
                      onChange={handleChange}
                      isInvalid={!!errors.year}
                    />
                    <Form.Control.Feedback type="invalid" tooltip>
                      {errors.year}
                    </Form.Control.Feedback>
                  </Form.Group>
                </Row>
                <Row className="mb-3">
                  <Form.Group
                    as={Col}
                    md="12"
                    controlId="validationFormik103"
                    className="position-relative"
                  >
                    <Form.Label>Overview</Form.Label>
                    <Form.Control
                      type="textarea"
                      name="overview"
                      value={values.overview}
                      onChange={handleChange}
                      isInvalid={!!errors.overview}
                    />

                    <Form.Control.Feedback type="invalid" tooltip>
                      {errors.overview}
                    </Form.Control.Feedback>
                  </Form.Group>
                </Row>
                <Form.Group className="position-relative mb-3">
                  <Form.Label>Images (Support Multiple Images)</Form.Label>
                  <Form.Control
                    type="file"
                    required
                    name="images"
                    multiple
                    onChange={(event) => {
                      setFieldValue("images", event.currentTarget.files);
                    }}
                    isInvalid={!!errors.images}
                  />
                  <Form.Control.Feedback type="invalid" tooltip>
                    {errors.images}
                  </Form.Control.Feedback>
                </Form.Group>
                <Form.Group className="position-relative mb-3">
                  <Form.Check
                    required
                    name="terms"
                    label="Agree to terms and conditions"
                    onChange={handleChange}
                    isInvalid={!!errors.terms}
                    feedback={errors.terms}
                    feedbackType="invalid"
                    id="validationFormik106"
                    feedbackTooltip
                  />
                </Form.Group>
                <div className="d-flex justify-content-between">
                  <Button variant="secondary" onClick={handleClose}>
                    Cancel
                  </Button>
                  <Button
                    variant="primary"
                    type="submit"
                    disabled={isSubmitting}
                  >
                    Submit Post
                  </Button>
                </div>
              </Form>
            )}
          </Formik>
        </Modal.Body>
      </Modal>
    </>
  );
};
export default PostHouse;
