// @mui
import { Container, Stack, TextField, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
// hooks
import React, { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import useResponsive from '../../hooks/useResponsive';
import Carousel from 'react-bootstrap/Carousel'
// components
import { Button, Modal } from 'react-bootstrap';
import { useRecoilValue } from 'recoil';
import { KAKAO_AUTH_URL } from '../../OAuth';
import { userState } from '../../atom';
import "./Portfolio.css";
import { sizeWidth } from '@mui/system';
import { upload } from '@testing-library/user-event/dist/upload';
// @mui
import { FileUploader } from "react-drag-drop-files";
// ----------------------------------------------------------------------
import Sidebar  from './Sidebar';
import { Outlet } from "react-router-dom";
const StyledRoot = styled('div')(({ theme }) => ({
    [theme.breakpoints.up('md')]: {
        display: 'flex',
    },
}));
const fileTypes = ["PDF", "PPTX"];

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
function Portfolio() {

    const [show, setShow] = useState(false);
    const users = useRecoilValue(userState);

    let navigate = useNavigate();

    const mdUp = useResponsive('up', 'md');
    let history = useNavigate(); 
    const [imgBase64, setImgBase64] = useState([]); // 파일 base64
    const [imgFile, setImgFile] = useState(null);	//파일	
    const [tag, setTag] = useState([]);
    const [comment,setComment] = useState();
    var images = []
    var filename = "";
    
  
    const [file, setFile] = useState(null);
    const handleChange = (file) => {
      setFile(file);
      console.log(file)
    };

  
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
    </div>
                {mdUp && (
                    <StyledSection>
                        {/* <Typography variant="h3" sx={{ px: 5, mt: 10, mb: 5 }}>
                            {users.name}님
                        </Typography> */}
                        <div className="box" style={{ background: "#BDBDBD" }}>
                            {/* <img className="profile" src='https://d2u3dcdbebyaiu.cloudfront.net/uploads/atch_img/944/eabb97e854d5e5927a69d311701cc211_res.jpeg' /> */}
                            <img className="profile" src={users.profileImg} />
                        </div>
                    </StyledSection>
                )}

                <Container maxWidth="sm">
                    <StyledContent>
                        <Typography variant="h4" gutterBottom style={{ marginTop: 30}}>
                            안녕하세요. <strong>{users.name}</strong>님
                        </Typography>
                        <Typography variant="h6" gutterBottom>
                            포트폴리오 작성란 🤗
                        </Typography>

                        <hr style={{ marginBottom: 50 }}></hr>

                        <Stack spacing={3}>
                            <TextField label="이메일" defaultValue={users.email} inputProps={{ }} />
                            <TextField label="성별" defaultValue={users.gender} inputProps={{ }} />
                            <TextField label="연령대" defaultValue={users.age} inputProps={{ }} />
                            <TextField label="학교" defaultValue={""} inputProps={{ }} />
                            <TextField label="기술 스택" defaultValue={""} inputProps={{ }} />
                        </Stack>

                        {/* <Stack direction="row" alignItems="center" sx={{ my: 2 }}>
                            <Typography variant="h6">알림 수신</Typography>
                            <Checkbox name="push" />
                        </Stack> */}
                    <Typography variant="h6" gutterBottom style={{ marginTop: 50}}>
                            포트폴리오 파일 첨부
                        </Typography>
                    <FileUploader handleChange={handleChange} name="file" types={fileTypes} />
                    </StyledContent>
                </Container>
            </StyledRoot>
            
         
        

           
        </>
    );
}

export { Portfolio };

