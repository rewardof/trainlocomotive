import {Button, Tag, Radio} from "antd";
import React, {useState} from "react";
import {
    LeftOutlined,
    DownloadOutlined,
    PlusOutlined,
} from "@ant-design/icons";


import CustomDrawer from "./Drawer";
import ResultForm from "./ResultForm";
import DistanceForm from "./DistanceForm";
import axios from "../api/axios";

const Header = ({
                    togglePage,
                    locomotivs,
                    getData,
                    relChar,
                    relSwitch,
                    visible,
                    setVisible,
                    distance,
                    breakingTime,
                    setParams

                }) => {
    const showDrawer = (type) => {
        setVisible(true);
        setChildType(type);
    };

    const onClose = () => {
        setVisible(false);
    };
    const [download, setDownload] = useState(false);
    const [childType, setChildType] = useState(null);
    const [findDistance, setFindDistance] = useState(null);

    const handleDownload = () => {
        setDownload(true);
        axios({
            url: "/export-resistance-data/",
            method: "GET",
            responseType: "blob", // important
        }).then((response) => {
            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement("a");
            link.href = url;
            link.setAttribute("download", "natijalar.xls"); //or any other extension
            document.body.appendChild(link);
            link.click();
            setDownload(false);
        });
    };

    return (
        <div>
            <CustomDrawer
                title={childType === "result" ? "Natijani olish" : "Masofani aniqlash"}
                onClose={onClose}
                visible={visible}
            >
                {childType === "result" && (
                    <ResultForm
                        getData={getData}
                        locomotivs={locomotivs}
                        relChar={relChar}
                        relSwitch={relSwitch}
                    />
                )}
                {childType === "distance" && (
                    <DistanceForm
                        setFindDistance={setFindDistance}
                        setVisible={setVisible}
                    />
                )}
            </CustomDrawer>
            <div className="header-box">
                <div>
                    <Radio.Group name="radiogroup" defaultValue={true} onChange={(e)=> setParams({articulated_road: e.target.value})}>
                        <Radio value={true}>Bo'g'imli yo'l uchun</Radio>
                        <Radio value={false}>Bo'g'imsiz yo'l uchun</Radio>
                    </Radio.Group>
                </div>
                <div className="btn-box">
                    <Button
                        type="primary"
                        icon={<DownloadOutlined/>}
                        onClick={handleDownload}
                        loading={download}
                    >
                        Yuklab Olish
                    </Button>
                    <Button
                        type="primary"
                        icon={<LeftOutlined/>}
                        onClick={() => togglePage(false)}
                    >
                        Qaytish
                    </Button>
                </div>
            </div>
        </div>
    );
};
export default Header;
