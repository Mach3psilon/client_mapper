import React, { useState, useEffect, useRef } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import {
  Container,
  TextField,
  Typography,
  Grid,
  Card,
  CardContent,
  CardHeader,
  Box,
} from '@mui/material';
import axios from 'axios';
import { useFilteredProperties } from '../hooks/useFilteredProperties';

const NOMINATIM_API_URL = 'https://nominatim.openstreetmap.org/search';

function PropertyList() {
  const [searchCriteria, setSearchCriteria] = useState({
    full_address: '',
    class_description: '',
    estimated_market_value: '',
    building_use: '',
    building_square_feet: ''
  });

  const { data: properties = [], isLoading, isError } = useFilteredProperties(searchCriteria);
  const [coordinates, setCoordinates] = useState([]);
  const [mapCenter, setMapCenter] = useState([41.881832, -87.623177]); // Default to Chicago
  const fetchedProperties = useRef(new Set());

  useEffect(() => {
    const fetchCoordinates = async (id, address) => {
      try {
        const response = await axios.get(NOMINATIM_API_URL, {
          params: {
            q: address,
            format: 'json',
            addressdetails: 1,
            limit: 1
          }
        });

        if (response.data.length > 0) {
          const { lat, lon } = response.data[0];

          setCoordinates(prevState => ([
            ...prevState,
            { id, lat: parseFloat(lat), lon: parseFloat(lon) }
          ]));
        } else {
          console.warn(`No coordinates found for ${address}`);
        }
      } catch (error) {
        console.error('Error fetching coordinates:', error);
      }
    };

    if (properties && properties.enodo_entities) {
      properties.enodo_entities.forEach(property => {
        if (!fetchedProperties.current.has(property.id)) {
          fetchedProperties.current.add(property.id);
          fetchCoordinates(property.id, property.full_address);
        }
      });
    }
  }, [properties]);

  useEffect(() => {
    if (coordinates.length > 0) {
      const totalLat = coordinates.reduce((sum, coord) => sum + coord.lat, 0);
      const totalLon = coordinates.reduce((sum, coord) => sum + coord.lon, 0);
      setMapCenter([totalLat / coordinates.length, totalLon / coordinates.length]);
    }
  }, [coordinates]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setSearchCriteria(prevState => ({ ...prevState, [name]: value }));
  };

  const renderMarkers = () => {
    if (!properties.enodo_entities) {
      return null;
    }

    return coordinates.map(coord => {
      const property = properties.enodo_entities.find(prop => prop.id === coord.id);
      if (property) {
        return (
          <Marker key={coord.id} position={[coord.lat, coord.lon]}>
            <Popup>
              {property.full_address} (ID: {coord.id})
            </Popup>
          </Marker>
        );
      }
      return null;
    });
  };

  // Custom component to update the map center dynamically
  const DynamicMapCenter = ({ center }) => {
    const map = useMap();
    useEffect(() => {
      map.setView(center);
    }, [center]);
    return null;
  };

  return (
    <Container sx={{ bgcolor: 'white', mt: 8, borderRadius: 2, p: 4 }}>
      <Box display="flex" flexDirection="column" alignItems="center">
        <Typography variant="h4" component="h2" gutterBottom>
          Search Properties
        </Typography>
        <form onSubmit={(e) => e.preventDefault()} style={{ width: '100%' }}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6} md={4}>
              <TextField
                label="Full Address"
                variant="outlined"
                fullWidth
                name="full_address"
                value={searchCriteria.full_address}
                onChange={handleInputChange}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <TextField
                label="Class"
                variant="outlined"
                fullWidth
                name="class_description"
                value={searchCriteria.class_description}
                onChange={handleInputChange}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <TextField
                label="Estimated Market Value"
                variant="outlined"
                fullWidth
                name="estimated_market_value"
                value={searchCriteria.estimated_market_value}
                onChange={handleInputChange}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <TextField
                label="Building Use"
                variant="outlined"
                fullWidth
                name="building_use"
                value={searchCriteria.building_use}
                onChange={handleInputChange}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <TextField
                label="Building Square Feet"
                variant="outlined"
                fullWidth
                name="building_square_feet"
                value={searchCriteria.building_square_feet}
                onChange={handleInputChange}
              />
            </Grid>
          </Grid>
        </form>
      </Box>

      <Box mt={4}>
        <Grid container spacing={2}>
          {properties && properties.enodo_entities && properties.enodo_entities.map(property => (
            <Grid item xs={12} sm={6} md={4} key={property.id}>
              <Card>
                <CardHeader title={property.full_address} />
                <CardContent>
                  <Typography variant="body2"><strong>Class Description:</strong> {property.class_description}</Typography>
                  <Typography variant="body2"><strong>Estimated Market Value:</strong> {property.estimated_market_value}</Typography>
                  <Typography variant="body2"><strong>Building Use:</strong> {property.building_use}</Typography>
                  <Typography variant="body2"><strong>Building Square Feet:</strong> {property.building_square_feet}</Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>

      <Box mt={4}>
        <MapContainer style={{ height: "500px", width: "100%" }} center={mapCenter} zoom={13}>
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
          {renderMarkers()}
          <DynamicMapCenter center={mapCenter} />
        </MapContainer>
      </Box>
    </Container>
  );
}

export default PropertyList;
