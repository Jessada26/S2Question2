import React, { useState, useEffect } from "react";
import { Table,Input } from "antd";
import axios from 'axios';
const Home =()=> {
   const [restApi, setRestApi] = useState([]);
    useEffect(()=> {
        axios.get("https://api.publicapis.org/categories").then((res)=>{
            setRestApi(res.data);
        }).catch((err)=>{
            setRestApi([]);
            console.log("Err fetching", err)
        })
    },[]);
    const columns = [
    {
          title: "Categories",
          render: text => <a>{text}</a>
    }
    ];
    const data = restApi;
    const [filterInput, setFilterInput] = React.useState('')
    const filterData = () => {
      if(filterInput === '') {
                return data
      }
      if(isNaN(filterInput)) {
        return data.filter((item) => item.includes(filterInput))
      }
        return data.filter(( item ) => item === +filterInput)
    }

    return <div>
        <Input 
        placeholder="input search text"
        allowClear
        size="large"
        onChange={(value)=>setFilterInput(value.target.value)}
      />
      <br/>
         <br/>   <br/>
      <Table  columns={columns} dataSource={filterData()} /></div>
}

export default Home;