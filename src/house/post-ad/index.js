import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Modal, Button, Form } from "react-bootstrap";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import * as formik from "formik";
import * as yup from "yup";
import { uploadImagesThunk } from "../services/houses-thunks";
import { createAdThunk } from "../services/ad-thunks";
import { useSelector } from "react-redux";
import { findAllUserThunk } from "../services/auth-thunks";

const PostAd = () => {
  const { ads } = useSelector((state) => state.ads);
  const { currentUser, users } = useSelector((state) => state.user);
  const allAgents = users.filter((user) => user.role === "agent");
  const dispatch = useDispatch();
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const { Formik } = formik;

  const schema = yup.object().shape({
    agent: yup.string().required(),
    images: yup.mixed().required(),
    overview: yup.string().required(),
  });

  useEffect(() => {
    dispatch(findAllUserThunk());
  }, []);
  return (
    <>
      <Button variant="primary" className="mt-2 mb-2" onClick={handleShow}>
        Post New Advertisement
      </Button>

      <Modal
        show={show}
        onHide={handleClose}
        size="lg"
        scrollable="true"
        backdrop="static"
      >
        <Modal.Header closeButton>
          <Modal.Title>Post New Advertisement</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Formik
            validationSchema={schema}
            initialValues={{}}
            onSubmit={(values, { setSubmitting }) => {
              let formData = new FormData();
              formData.append("images", values.images[0]);
              values.images = values.images[0].name;
              let curragent = allAgents.find(
                (agent) => agent._id === values.agent
              );
              values.username = curragent.username;
              dispatch(uploadImagesThunk(formData));
              dispatch(createAdThunk(values));
              setSubmitting(false);
              handleClose();
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
                    md="12"
                    controlId="validationFormikUsername2"
                  >
                    <Form.Label>Agent</Form.Label>
                    <Form.Select
                      name="agent"
                      value={values.agent}
                      onChange={handleChange}
                      isInvalid={!!errors.agent}
                    >
                      <option>Select Agent: </option>
                      {allAgents.map((agent) => (
                        <option value={agent._id}>{agent.username}</option>
                      ))}
                    </Form.Select>
                    <Form.Control.Feedback type="invalid" tooltip>
                      {errors.agent}
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
                  <Form.Label>Profile Image</Form.Label>
                  <Form.Control
                    type="file"
                    required
                    name="images"
                    onChange={(event) => {
                      setFieldValue("images", event.currentTarget.files);
                    }}
                    isInvalid={!!errors.images}
                  />
                  <Form.Control.Feedback type="invalid" tooltip>
                    {errors.images}
                  </Form.Control.Feedback>
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
export default PostAd;
