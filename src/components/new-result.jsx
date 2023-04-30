import { Card, Col, Row, Table } from "antd";
import axios from "../api/axios";
import { useEffect, useState } from "react";
import Header from "./new-result-header";

const TableView = ({
    locomotivs,
    togglePage,
    getData,
    relChar,
    relSwitch,
    visible,
    setVisible,
    distance,
    breakingTime,
}) => {
    const [data, setData] = useState()
    const [params, setParams] = useState({articulated_road: true})
    const columns = [
        {
            title: "T/R",
            dataIndex: "id",
            key: "id",
            align: "center",
            render: (_, index) => data?.resistances?.indexOf(index) + 1
        },
        {
            title: "capacity",
            dataIndex: "capacity",
            key: "capacity",
            align: "center",

        }, {
            title: "group_1_resistance",
            dataIndex: "group_1_resistance",
            key: "group_1_resistance",
            align: "center",

        }, {
            title: "group_2_resistance",
            dataIndex: "group_2_resistance",
            key: "group_2_resistance",
            align: "center",

        }, {
            title: "group_3_resistance",
            dataIndex: "group_3_resistance",
            key: "group_3_resistance",
            align: "center",

        }, {
            title: "group_4_resistance",
            dataIndex: "group_4_resistance",
            key: "group_4_resistance",
            align: "center",

        }, {
            title: "group_5_resistance",
            dataIndex: "group_5_resistance",
            key: "group_5_resistance",
            align: "center",

        }, {
            title: "group_6_resistance",
            dataIndex: "group_6_resistance",
            key: "group_6_resistance",
            align: "center",

        }, {
            title: "total_resistance",
            dataIndex: "total_resistance",
            key: "total_resistance",
            align: "center",

        },

    ];
    const columns2 = [
        {
            title: "T/R",
            dataIndex: "id",
            key: "id",
            align: "center",
            render: (_, values, index) => index + 1
        },
        {
            title: "count",
            dataIndex: "count",
            key: "count",
            align: "center",

        },
        {
            title: "percentage",
            dataIndex: "percentage",
            key: "percentage",
            align: "center",

        },
        {
            title: "total_weight",
            dataIndex: "total_weight",
            key: "total_weight",
            align: "center",

        },
        {
            title: "total_arrows",
            dataIndex: "total_arrows",
            key: "total_arrows",
            align: "center",

        },
        {
            title: "bullet_weight",
            dataIndex: "bullet_weight",
            key: "bullet_weight",
            align: "center",

        },
    ];
    const getResult = () => {
        console.log(params)
        axios("/calculation-resistance/", {params})
            .then((res) => {
                setData(res.data);
            })
            .catch((error) => {
                console.log(error);
            });
    };
    useEffect(() => {
        getResult()
    }, [params])

    const List = Object.keys(data?.vagons_group_data || {}).map(key =>
        data?.vagons_group_data[key]
    )
    return (
        <>
            <div className="mb-5">
                <Header
                    togglePage={togglePage}
                    locomotivs={locomotivs}
                    getData={getData}
                    relSwitch={relSwitch}
                    relChar={relChar}
                    visible={visible}
                    setVisible={setVisible}
                    distance={distance}
                    breakingTime={breakingTime}
                    setParams={setParams}

                />
            </div>
            <Card title="Vagonlarning har guruhiga to'g'ri keluvchi soni, tarkibdagi ulushi, og'irligi, o'qlar soni va o'qqa tushadigan og'irligini hisoblash">
                <Table
                    columns={columns2}
                    dataSource={List || []}
                    sticky
                    size="middle"
                    scroll={{ x: "100%", y: 500 }}
                />
            </Card>
            <Card title="O'rtacha og'irlikdagi solishtirma qarshilikni hisoblash">
                <Table
                    columns={columns}
                    dataSource={data?.resistances || []}
                    sticky
                    size="middle"
                    scroll={{ x: "calc(1440px + 50%)", y: 500 }}
                />
            </Card>
        </>
    );
};

export default TableView;
