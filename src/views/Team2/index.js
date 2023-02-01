import React, { useEffect } from 'react';
import { Row, Col } from 'react-bootstrap';
import { useDispatch, useSelector } from "react-redux";
import Fade from 'react-reveal/Fade';
import Team2Member from './Team2Member'
import { actionTeamList } from "../../redux/actions/team";
import { useTranslation } from "react-i18next";

const Team2 = () => {

    const dispatch = useDispatch();

    const teams = useSelector(state => state.team.teamData);
    const { t } = useTranslation();


    useEffect(() => {
        dispatch(actionTeamList());
    }, []);



    return (
        <div style={{backgroundColor:"#fff"}}>
            <Fade>
                <div className="img-box img-box-team">
                    <Fade bottom delay={200}>
                        <div style={{ margin: "10% 12% 5% 12%" }}>
                            <div className="col-md-6">
                                <div className="d-highlight d-font-black d-text-72">
                                    {t("Team2.Meet Our Team")}
                                </div>
                                <div className="text-white d-font-book d-text-18">
                                    {t("Team2.desc-1")}
                                </div>
                            </div>
                        </div>
                    </Fade>
                </div>
            </Fade>
            <div style={{ padding: "8% 18%" }}>
                <Row>
                    {
                        teams.map((team, key) =>
                            <Col md="4">
                                <Team2Member
                                    img={`${process.env.REACT_APP_API_ENDPOINT}/public/${team.avatar}`}
                                    name={team.name}
                                    job={team.job}
                                    delay={400}
                                />
                            </Col>
                        )
                    }
                </Row>
            </div>
        </div>
    )
}

export default Team2;
