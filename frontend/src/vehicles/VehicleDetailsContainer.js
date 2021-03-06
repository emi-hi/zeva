/*
 * Container component
 * All data handling & manipulation should be handled here.
 */
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import ROUTES_VEHICLES from '../app/routes/Vehicles';
import CustomPropTypes from '../app/utilities/props';
import VehicleDetailsPage from './components/VehicleDetailsPage';


const VehicleDetailsContainer = (props) => {
  const [vehicle, setVehicle] = useState({});
  const [loading, setLoading] = useState(true);
  const { id } = useParams();

  const { keycloak } = props;

  const stateChange = (newState) => {
    setLoading(true);
    axios.patch(`vehicles/${id}/state_change`, { validationStatus: newState }).then(() => {
      axios.get(`vehicles/${id}`).then((response) => {
        setVehicle(response.data);
        setLoading(false);
      });
    });
  };

  const refreshList = () => {
    setLoading(true);

    axios.get(ROUTES_VEHICLES.DETAILS.replace(/:id/gi, id)).then((response) => {
      setVehicle(response.data);
      setLoading(false);
    });
  };

  useEffect(() => {
    refreshList();
  }, [keycloak.authenticated]);

  return (
    <VehicleDetailsPage
      loading={loading}
      details={vehicle}
      requestStateChange={stateChange}
    />
  );
};

VehicleDetailsContainer.propTypes = {
  keycloak: CustomPropTypes.keycloak.isRequired,
};

export default VehicleDetailsContainer;
