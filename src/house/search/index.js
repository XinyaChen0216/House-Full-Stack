import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import * as formik from "formik";
import * as yup from "yup";
import HouseItem from "../houses/houseItem";
import {
  findHousesThunk,
  findPublicHousesBySearchThunk,
} from "../services/houses-thunks";

const Search = () => {
  const { houses, publicHousesBySearch, loading } = useSelector(
    (state) => state.houses
  );
  const [dbHouses, setDBHouses] = useState();
  const dispatch = useDispatch();
  const { Formik } = formik;
  const schema = yup.object().shape({
    city: yup.string().required(),
    state: yup.string().required(),
    zipcode: yup.string().optional(),
  });
  useEffect(() => {
    if (houses.length === 0) dispatch(findHousesThunk());
    // dispatch(findPublicHousesThunk());
  }, []);
  return (
    <><div>
      <h1>Search</h1>
    </div>
      <Formik
        validationSchema={schema}
        initialValues={{
          city: "",
          state: "WA",
          zipcode: "",
        }}
        onSubmit={(values, { setSubmitting }) => {
          setSubmitting(true);
          let filteredHouses = [];
          houses.map((house) => {
            if (
              house.city.toLowerCase() === values.city.toLowerCase() &&
              house.state.toLowerCase() === values.state.toLowerCase()
            ) {
              if (values.zipcode) {
                if (values.zipcode === house.zipcode)
                  filteredHouses.push(house);
              } else {
                filteredHouses.push(house);
              }
            }
          });
          setDBHouses(filteredHouses);
          dispatch(
            findPublicHousesBySearchThunk({
              city: values.city.trim(),
              state: values.state.trim(),
              zipcode: values.zipcode.trim(),
            })
          );
          setSubmitting(false);
        }}
      >
        {({ handleSubmit, handleChange, values, errors, isSubmitting }) => (
          <Form noValidate onSubmit={handleSubmit}>
            <Row className="mb-3">
              <Form.Group
                className="p-1"
                as={Col}
                md="4"
                controlId="validationFormik01"
              >
                <Form.Label>City*</Form.Label>
                <Form.Control
                  type="text"
                  name="city"
                  value={values.city}
                  onChange={handleChange}
                  isInvalid={!!errors.city}
                  placeholder="required"
                />
                <Form.Control.Feedback type="invalid" tooltip>
                  {errors.city}
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group
                className="p-1"
                as={Col}
                md="3"
                controlId="validationFormik01"
              >
                <Form.Label>State</Form.Label>
                <Form.Control
                  type="text"
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
                className="p-1"
                as={Col}
                md="3"
                controlId="validationFormik01"
              >
                <Form.Label>Zip Code</Form.Label>
                <Form.Control
                  type="text"
                  name="zipcode"
                  value={values.zipcode}
                  onChange={handleChange}
                  isInvalid={!!errors.zipcode}
                  placeholder="optional"
                />
                <Form.Control.Feedback type="invalid" tooltip>
                  {errors.zipcode}
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group
                className="p-1 align-self-end"
                as={Col}
                md="2"
                controlId="validationFormik02"
              >
                <Button type="submit" disabled={isSubmitting}>
                  Search
                </Button>
              </Form.Group>
            </Row>
          </Form>
        )}
      </Formik>
      {!loading && (
        <ul className="list-group d-flex flex-row flex-wrap justify-content-start">
          {dbHouses &&
            [...dbHouses, ...publicHousesBySearch].map((house) => (
              <HouseItem house={house} />
            ))}
        </ul>
      )}
    </>
  );
};
export default Search;
