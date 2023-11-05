import { useCallback } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Button } from "react-bootstrap";

const Foryou = () => {
    const onProfileClick = useCallback(() => {
        // Please sync "iPhone 14 Plus - 5" to the project
    }, []);

    return (
        <div className="relative bg-white w-full h-[926px] overflow-hidden text-left text-xl text-darkslategray font-nunito-sans">
            <h2 className="m-0 absolute top-[190px] left-[18px] text-inherit tracking-[-0.41px] leading-[22px] font-extrabold font-inherit inline-block w-24 h-[21px]">
                Trending
            </h2>
            <div className="absolute top-[598px] left-[18px] tracking-[-0.41px] leading-[22px] font-extrabold inline-block w-24 h-[21px]">
                Recents
            </div>
            <div className="absolute top-[338.5px] left-[-0.5px] box-border w-[429px] h-px border-t-[1px] border-solid border-silver" />
            <div className="absolute top-[465.5px] left-[-0.5px] box-border w-[429px] h-px border-t-[1px] border-solid border-silver" />
            <div className="absolute top-[588.5px] left-[-0.5px] box-border w-[429px] h-px border-t-[1px] border-solid border-silver" />
            <section
                className="absolute top-[43px] left-[8px] w-[428px] h-[139px] overflow-hidden text-left text-xl text-darkslategray font-nunito-sans"
                id="Navbar"
            >
                <img
                    className="absolute top-[127px] left-[0px] w-[428px] h-1"
                    alt=""
                    src="/group.svg"
                />
                <div className="absolute top-[71px] left-[0px] bg-white w-28 h-[45px]" />
                <h2 className="m-0 absolute top-[93px] left-[90px] text-inherit tracking-[-0.41px] leading-[22px] font-bold font-inherit inline-block w-[79px] h-[21px]">
                    For you
                </h2>
                <h2
                    className="m-0 absolute top-[96px] left-[254px] text-inherit tracking-[-0.41px] leading-[22px] font-normal font-inherit inline-block w-[79px] h-[21px] cursor-pointer"
                    onClick={onProfileClick}
                >
                    Profile
                </h2>
                <img
                    className="absolute top-[0px] left-[119px] w-[190px] h-[67px] object-cover"
                    alt=""
                    src="/tmusic-logo-2@2x.png"
                />
            </section>
            <section className="absolute top-[233px] left-[21px] w-[378px] h-[91px] overflow-hidden text-left text-xs text-black font-nunito-sans">
                <img
                    className="absolute top-[0px] left-[292px] w-[86px] h-[85px] object-cover"
                    alt=""
                    src="/image-39@2x.png"
                />
                <Button
                    className="w-[25px] absolute top-[66px] left-[191px]"
                    variant="primary"
                />
                <img
                    className="absolute top-[5px] left-[0px] rounded-[50%] w-12 h-12 object-cover"
                    alt=""
                    src="/ellipse-5@2x.png"
                />
                <div className="absolute top-[0px] left-[60px] text-base tracking-[-0.41px] leading-[22px] inline-block w-20 h-[23px]">
                    sonam.xxi
                </div>
                <b className="absolute top-[23px] left-[60px] text-base tracking-[-0.41px] leading-[22px] inline-block w-[108px] h-[23px]">
                    Revvin’ My Cj7
                </b>
                <div className="absolute top-[41px] left-[60px] tracking-[-0.41px] leading-[22px] text-darkslategray inline-block w-[83px] h-[21px]">
                    Summer salt
                </div>
                <Button
                    className="w-[17px] absolute top-[70px] left-[57px]"
                    variant="outline-primary"
                />
                <div className="absolute top-[71px] left-[80px] font-inter inline-block w-[26px] h-3">
                    195
                </div>
                <div className="absolute top-[71px] left-[152px] font-inter inline-block w-5 h-3">
                    25
                </div>
                <Button
                    className="w-[21px] absolute top-[69px] left-[125px]"
                    variant="outline-primary"
                />
            </section>
            <div className="absolute top-[356px] left-[21px] w-[379px] h-[91px] overflow-hidden text-xs text-black">
                <div className="absolute top-[0px] left-[61px] text-base tracking-[-0.41px] leading-[22px] inline-block w-20 h-[23px]">
                    leroy
                </div>
                <b className="absolute top-[23px] left-[61px] text-base tracking-[-0.41px] leading-[22px] inline-block w-[108px] h-[23px]">
                    Alaska
                </b>
                <img
                    className="absolute top-[5px] left-[0px] rounded-[50%] w-12 h-12 object-cover"
                    alt=""
                    src="/ellipse-2@2x.png"
                />
                <img
                    className="absolute top-[0px] left-[292px] w-[87px] h-[87px] object-cover"
                    alt=""
                    src="/image-4@2x.png"
                />
                <img
                    className="absolute top-[70px] left-[57px] w-[17px] h-[17px] object-cover"
                    alt=""
                    src="/image-44@2x.png"
                />
                <div className="absolute top-[71px] left-[80px] font-inter inline-block w-[26px] h-3">
                    255
                </div>
                <div className="absolute top-[71px] left-[152px] font-inter inline-block w-5 h-3">
                    39
                </div>
                <img
                    className="absolute top-[69px] left-[125px] w-[21px] h-[21px] object-cover"
                    alt=""
                    src="/image-45@2x.png"
                />
                <img
                    className="absolute top-[66px] left-[191px] w-[25px] h-[25px] object-cover"
                    alt=""
                    src="/image-46@2x.png"
                />
                <div className="absolute top-[41px] left-[60px] tracking-[-0.41px] leading-[22px] text-darkslategray inline-block w-[83px] h-[21px]">
                    Maggie Rogers
                </div>
            </div>
            <div className="absolute top-[483px] left-[20px] w-[381px] h-[92px] overflow-hidden text-xs text-black">
                <img
                    className="absolute top-[5px] left-[0px] rounded-[50%] w-12 h-12 object-cover"
                    alt=""
                    src="/ellipse-21@2x.png"
                />
                <img
                    className="absolute top-[0px] left-[292px] w-[89px] h-[89px] object-cover"
                    alt=""
                    src="/image-7@2x.png"
                />
                <img
                    className="absolute top-[66px] left-[191px] w-[25px] h-[25px] object-cover"
                    alt=""
                    src="/image-46@2x.png"
                />
                <b className="absolute top-[23px] left-[62px] text-base tracking-[-0.41px] leading-[22px] inline-block w-[108px] h-[23px]">
                    Oblivion
                </b>
                <div className="absolute top-[42px] left-[61px] tracking-[-0.41px] leading-[22px] text-darkslategray inline-block w-[83px] h-[21px]">
                    Grimes
                </div>
                <img
                    className="absolute top-[70px] left-[57px] w-[17px] h-[17px] object-cover"
                    alt=""
                    src="/image-44@2x.png"
                />
                <div className="absolute top-[71px] left-[80px] font-inter inline-block w-[26px] h-3">
                    420
                </div>
                <div className="absolute top-[71px] left-[152px] font-inter inline-block w-5 h-3">
                    69
                </div>
                <img
                    className="absolute top-[69px] left-[125px] w-[21px] h-[21px] object-cover"
                    alt=""
                    src="/image-45@2x.png"
                />
                <div className="absolute top-[0px] left-[62px] text-base tracking-[-0.41px] leading-[22px] inline-block w-20 h-[23px]">
                    Jenkins
                </div>
            </div>
            <div className="absolute top-[856px] left-[0px] bg-gainsboro w-[428px] h-[70px] overflow-hidden">
                <img
                    className="absolute top-[22px] left-[42px] w-[22px] h-[22px] object-cover"
                    alt=""
                    src="/image-51@2x.png"
                />
                <img
                    className="absolute top-[22px] left-[364px] rounded-[50%] w-[22px] h-[22px] object-cover"
                    alt=""
                    src="/ellipse-6@2x.png"
                />
                <img
                    className="absolute top-[24px] left-[288px] w-[22px] h-[22px] object-cover"
                    alt=""
                    src="/image-52@2x.png"
                />
                <div className="absolute top-[24px] left-[203px] w-[22px] h-[22px]">
                    <img
                        className="absolute top-[0px] left-[0px] w-[22px] h-[22px] object-cover"
                        alt=""
                        src="/image-53@2x.png"
                    />
                    <img
                        className="absolute top-[0px] left-[0px] w-[22px] h-[22px] object-cover"
                        alt=""
                        src="/image-54@2x.png"
                    />
                </div>
            </div>
        </div>
    );
};

export default Foryou;
