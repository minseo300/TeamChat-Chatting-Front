import { Button } from 'react-bootstrap';
import Fade from "react-reveal/Fade"; // Import reasct-reveal(Fade)
import { useNavigate } from 'react-router-dom';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import styled from "styled-components";
import category from '../../promo_category.png';
import mobile from '../../promo_mobile.png';
import multi from '../../promo_multi.png';
import main from '../../promo_main.png';
import preview from '../../promo_preview.png';
import share from '../../promo_share.png';
import { KAKAO_AUTH_URL } from '../../OAuth';
import { userState } from '../../atom';


const IntroBlock = styled.div`
  margin: 0px 0px 300px 0px;
  text-align : center;  
  
  h1 {
	margin: 10px;
	text-align : center;
    font-weight: 330;
    font-size: 45px;
  }  

  h2 {
    margin: 10px;
	margin-top: 200px;
	text-align : center;
    font-weight: 300;
    font-size: 50px;
  }

  h3 {
	text-align : center;
    font-weight: 200;
    font-size: 25px;
  }

  h6 {
	text-align : center;
    font-weight: 200;
    font-size: 70px;
  }

  img {
	// display: block;
	margin-left: 10%;
	margin-right: 10%;
	// margin-bottom: 80px;
	height: 80%;
	width: 80%;

  }

  @media (max-width: 768px) {
	margin: 0px 0px 100px 0px;
  
	main {
		margin-left: 20px;
		margin-right: 20px;		
		text-align : center;
		font-weight: 400;
		font-size: 60px;
	  }
	 
	sub-main {
		margin-left: 10px;
		margin-right: 10px;
		text-align : center;
		font-weight: 370;
		font-size: 30px;
	  }
	  
	h1 {
	  margin: 10;
	  margin-right: 20px;
	  margin-left: 20px;
	  text-align : center;
	  font-weight: 330;
	  font-size: 30px;
	}  
  
	h2 {
	  margin-top: 150px;
	  margin-right: 20px;
	  margin-left: 20px;
	  text-align : center;
	  font-weight: 300;
	  font-size: 25px;
	}
  
	h3 {
	  text-align : center;
	  margin-right: 20px;
	  margin-left: 20px;
	  font-weight: 200;
	  font-size: 15px;
	}
  
	h6 {
		text-align : center;
		font-weight: 200;
		font-size: 35px;
	}


	img {
	  height: 90%;
	  width: 90%;
	  margin-left: 5%;
	  margin-right: 5%;
	}

  }
`
function AboutProduct() {

	let navigate = useNavigate();
	// ?????? ????????????

	const users = useRecoilValue(userState);
	const userHandler = useSetRecoilState(userState);

	const handleLogin = () => {
		window.location.href = KAKAO_AUTH_URL;
	};

	return (
		<div className="body" style={{ marginTop: '30px' }}>
			<div>
				<Fade big>
					<IntroBlock>
					{/* <h2>??????????????? ????????? ?????? ????????????</h2>
						<h6><strong>?????????</strong>??? ??????????????? ????</h6>
						<br/> */}
						<img src={main} style={{width:'85%'}} />

						<br/>
						<div style={{ textAlign: 'center' }}>
							<btn><Button variant='secondary' style={{marginTop:"30px"}}
								size="lg" onClick={users.login ? () => navigate("/create") : handleLogin}>
								????????? / ????????????
							</Button></btn>
						</div>
						
					</IntroBlock>

				</Fade>

				<Fade bottom cascade>
					<IntroBlock>
						<h1>
							????????? <strong>???????????? <br />
								???????????? <br />
								?????? ?????? ??????</strong>?????? ??? ??????!
						</h1>
						<br />
						<h3>
							??????????????? ????????? ??????????????????.<br />
							?????? ????????? <strong>QR ????????? URL ??????</strong>??? ?????? <br />
							????????? ????????? ??? ????????????. <br />
						</h3>
						<br/>
						<img src={share} style={{width:'60%'}}/>
					</IntroBlock>


					<IntroBlock>
						<h1>
							<strong>????????? ????????? ????????? ??????</strong>
						</h1>
						<br />
						<h3>
							?????? ????????? ???????????? ?????? ????????? ???????????? ????????? <br />
							<strong>????????? ?????? ????????????</strong>??? ???????????????.<br/>
							??????????????? ?????? ??????????????? ????????? ???????????? ???????????????. <br />
						</h3>
						<br></br>
						<img src={category} />
					</IntroBlock>

					<IntroBlock>
						<h1>
							<strong>?????? ????????????</strong>
						</h1>
						<br />
						<h3>
							???????????? ???????????? ????????? ??????????????????? <br />
							?????? ????????? ???????????? ?????? ????????? ???????????? ????????? <br />
							???????????? <strong>??????????????? ??????</strong>??? ??? ????????????.
						</h3>
						<br/>
						<img src={preview} style={{width:'60%'}} />
					</IntroBlock>


					{/* <IntroBlock>
						<h1>
							<strong>?????????</strong>
						</h1>
						<br />
						<h3>
							???????????? ???????????? ????????? ??????????????????? <br />
							?????? ????????? ???????????? ?????? ????????? ???????????? ????????? <br />
							???????????? ??????????????? ????????? ??? ????????????.
						</h3>
						<br></br>
						<img src={mobile} />
					</IntroBlock>
 */}


					<IntroBlock>
						<h1>
							<strong>????????? ?????? ??????</strong>
						</h1>
						<br />
						<h3>
							<strong>PC, ?????????, ?????????</strong> <br />
							???????????? ?????? ????????? ?????? ???????????? ???????????????. <br />
							????????? ????????? ???????????? ?????? ???????????? ??????????????????.
						</h3>
						<br></br>
						<img src={multi} />
					</IntroBlock>

					<IntroBlock>
						<h1>
							<strong>????????? ?????? ?????????</strong>
						</h1>
						<br />
						<h3>
							?????? ?????????????????? ?????????????????? ??????????????????? <br />
							???????????? <strong>???????????? ????????? ??????????????????.</strong> <br />
							????????? ???????????? ????????? ??? ?????? ???????????? ???????????????.
						</h3>
					</IntroBlock>

					<IntroBlock>
						<h1>
							<strong>?????? ?????? ?????? ??????</strong>
						</h1>
						<br />
						<h3>
							?????? ????????? ???????????? ??????????????? <br></br>?????? ????????? ??????????????????? <br /><br/>
							???????????? ????????? ?????? ????????? <strong><br></br>???????????? ???????????? ??????</strong>?????????. <br /><br/>
							?????? ???????????? ????????? ????????? ???????????? ???????????????. <br />
							<strong>???????????? ?????? ??? ?????????</strong> ?????? ????????? ???????????????.
						</h3>
					</IntroBlock>
				</Fade>

				<IntroBlock>
					<Fade bottom>
						<h1>
							<strong>AI ?????? ?????????</strong>
						</h1>
						<br />
						<h3>
							????????? ??????????????? <strong>?????????</strong>??? ???????????? <br />
							??????????????? <strong>?????????</strong>??? <strong>?????????</strong>??? ???????????????. <br /><br/>
							?????? ?????? ??? ???????????? ????????? ????????????, <br />
							???????????? ??? ?????? ????????? ??? ????????? ???????????????. <br />
						</h3>
						<br />
						{/* <br />
					<Fade left>
						<img src="promotion1.png" align="left" />
					</Fade>

					<br />
					<Fade right>
						<img src="promotion2.png" align="right" />
					</Fade> */}
					</Fade>
				</IntroBlock>
			</div >
		</div >
	)
}

export { AboutProduct };
