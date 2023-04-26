import React, { useState, useEffect } from 'react';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import SnackbarContent from '@mui/material/SnackbarContent';
import CircularProgress from '@mui/material/CircularProgress';
import { styled } from '@mui/system';
import axios from 'axios';
import Avatar from '../../components/Avatar';
import { getMessages } from '../../redux/features/myFeatureSlice';
const { useDispatch, useSelector } = require('react-redux');
const { REACT_APP_API_URL } = process.env;

const RightAlignSnackbar = styled(SnackbarContent)(({ theme }) => ({
  alignSelf: 'flex-end',
  backgroundColor: "aliceblue",
  color: "black",
  width: "70%",
  marginBottom: "10px",
  marginRight: "10px",
  padding: "15px",
}));

const LeftAlignSnackbar = styled(SnackbarContent)(({ theme }) => ({
  alignSelf: 'flex-start',
  width: "70%",
  marginBottom: "10px",
  marginLeft: "10px",
  padding: "16px",
}));

const action = (
  <Button color="secondary" size="small">
    lorem ipsum dolorem
  </Button>
);

export default function LongTextSnackbar() {
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const messages = useSelector(state => state.myFeature.messages);

  const fetchData = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(`${REACT_APP_API_URL}`, {
        params: {
          user: 'admin',
          password: 'admin',
        },
      });

      dispatch(getMessages(data));

      setTimeout(() => {
        dispatch(getMessages(data));
        setLoading(false);
      }, 500);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <Stack spacing={2} sx={{ maxWidth: '100%', width: '100%', display: 'flex', flexDirection: 'column' }}>
         {  loading ? (
              <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh'}}>
                <CircularProgress />
              </div>
            ) : (
              messages?.map((item) => (
                  item.sender == "customer" ? (
                      <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', marginBottom: '10px' }}>
                          <Avatar color={"orange"} letter={"A"}/>
                          <LeftAlignSnackbar
                              message={item.message}
                          />
                      </div>
                  ) : (
                      <div style={{ display: 'flex', flexDirection: 'row-reverse', alignItems: 'center', marginBottom: '10px' }}>
                          <Avatar letter={"B"}/>
                          <RightAlignSnackbar
                              message={item.message}
                          />
                      </div>
                  )
              ))
            )
        }
    </Stack>
  );
}
