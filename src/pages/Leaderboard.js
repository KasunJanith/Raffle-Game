import { Table } from "antd";
import { useEffect, useState } from "react";
import { getLeaderboard } from "../api/api";

export default function Leaderboard(){

  const [data,setData] = useState([]);

  useEffect(()=>{

    getLeaderboard().then(res=>{
      setData(res.data);
    });

  },[]);

  const columns = [
    {title:"Name",dataIndex:"name"},
    {title:"Score",dataIndex:"score"}
  ];

  return (
    <Table columns={columns} dataSource={data}/>
  );

}