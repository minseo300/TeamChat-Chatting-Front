// @mui
import { Container, Stack, TextField, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
// hooks
import React, { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import useResponsive from '../../hooks/useResponsive';
// components

import { Button, Modal } from 'react-bootstrap';
import { useRecoilValue } from 'recoil';
import { KAKAO_AUTH_URL } from '../../OAuth';
import { userState } from '../../atom';
import "./MyPage.css";
import Sidebar  from './Sidebar';
import { Outlet } from "react-router-dom";
// @mui

// ----------------------------------------------------------------------

const StyledRoot = styled('div')(({ theme }) => ({
    [theme.breakpoints.up('md')]: {
        display: 'flex',
    },
}));

const StyledSection = styled('div')(({ theme }) => ({
    width: '100%',
    maxWidth: 480,
    marginLeft: 'auto',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    textAlign: 'center',
    boxShadow: theme.customShadows,
    backgroundColor: theme.palette.background.default,
}));

const StyledContent = styled('div')(({ theme }) => ({
    maxWidth: 480,
    margin: 'auto',
    // minHeight: '85vh',
    display: 'flex',
    justifyContent: 'center',
    textAlign: 'center',
    flexDirection: 'column',
    padding: theme.spacing(5, 0),
}));

// ----------------------------------------------------------------------
function MyPage() {

    const [show, setShow] = useState(false);
    const users = useRecoilValue(userState);

    let navigate = useNavigate();

    const mdUp = useResponsive('up', 'md');

    useEffect(() => {
        if (!users.login) {
            window.location.href = KAKAO_AUTH_URL;
        }

    }, [])

    return (
        <>

            <StyledRoot>
                {/* <img src={logo}
                    sx={{
                        position: 'fixed',
                        top: { xs: 16, sm: 24, md: 40 },
                        left: { xs: 16, sm: 24, md: 40 },
                    }}
                /> */}
                <div style={{
        padding: '50px 0px 0px 370px'
    }}>
        <Sidebar />
        <Outlet />
    </div>;
                {mdUp && (
                    <StyledSection>
                        {/* <Typography variant="h3" sx={{ px: 5, mt: 10, mb: 5 }}>
                            {users.name}???
                        </Typography> */}
                        <div className="box" style={{ background: "#BDBDBD" }}>
                            {/* <img className="profile" src='https://d2u3dcdbebyaiu.cloudfront.net/uploads/atch_img/944/eabb97e854d5e5927a69d311701cc211_res.jpeg' /> */}
                            <img className="profile" src={users.profileImg} />
                        </div>
                    </StyledSection>
                )}

                <Container maxWidth="sm">
                    <StyledContent>
                        <Typography variant="h4" gutterBottom style={{ marginTop: 30 }}>
                            ???????????????. <strong>{users.name}</strong>???
                        </Typography>
                        <Typography variant="h6" gutterBottom>
                            ????????? ?????? ?????? ????????? ????
                        </Typography>

                        <hr style={{ marginBottom: 50 }}></hr>

                        <Stack spacing={3}>
                            <TextField label="?????????" defaultValue={users.email} inputProps={{ readOnly: true }} />
                            <TextField label="??????" defaultValue={users.gender} inputProps={{ readOnly: true }} />
                            <TextField label="?????????" defaultValue={users.age} inputProps={{ readOnly: true }} />
                        </Stack>

                        {/* <Stack direction="row" alignItems="center" sx={{ my: 2 }}>
                            <Typography variant="h6">?????? ??????</Typography>
                            <Checkbox name="push" />
                        </Stack> */}

                        <Button variant='secondary' className="logoutBtn" onClick={() => { setShow(true); navigate('/kakaologout')}}>
                            ????????????
                        </Button>
                    </StyledContent>
                </Container>
            </StyledRoot>

            {/* <Modal show={show} onHide={() => { setShow(false) }}  >
                <Modal.Header closeButton>
                    <Modal.Title>Logout</Modal.Title>
                </Modal.Header>
                <Modal.Body style={{ textAlign: "center" }}>
                    <h3>???????????? ??????????????????? ????<br /></h3>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => { setShow(false); navigate('/kakaologout') }}>??????</Button>
                    <Button variant="light" onClick={() => { setShow(false) }}>??????</Button>
                </Modal.Footer>
            </Modal> */}
        </>
    );
}

export { MyPage };

