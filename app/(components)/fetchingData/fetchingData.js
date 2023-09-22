'use client'
import React from "react";
import { useState} from "react";
import axios from "axios";
import Image from "next/image";

export default function FetchingData() {
    const [data, setData] = useState([]);
    const [selectedUser, setSelectedUser] = useState(null);
    const [followersData, setFollowersData] = useState([]);
    const [isHidden, setIsHidden] = useState(true);
  
  
    
  
    const fetchFollowers = async (username) => {
      const response=await axios.get(`https://api.github.com/users/${username}/followers`)
        setFollowersData(response.data)
        console.log(response.data)
        
        setSelectedUser({ login: username});
    };
  
    const fetchdata = async () => {
      var response = await axios.get('https://api.github.com/users/naveed-rana/followers');
      setData(response.data);
      console.log(response.data)
      setIsHidden(false);
    };
  
    const fetchFollowing = async () => {
      var response2 = await axios.get('https://api.github.com/users/naveed-rana/following');
      setData(response2.data);
      setIsHidden(false);
    };
  
    return (
      <>
        <div className="flex justify-center items-center my-10">
          <Image src={'/imgs/naveed.jpg'} width={150} height={150} className="rounded-full" />
          <div className="px-5">
            <h1 className="text-3xl font-bold text-slate-100">Naveed Rana</h1>
            <h2 className="font-semibold text-xl text-slate-100">Github Account</h2>
            <button className="bg-red-500 text-white rounded-md px-3  py-1" onClick={fetchdata}>Get Followers</button>
            <button className="my-2 md:mx-2 bg-green-500 text-white sm:mx-2 rounded-md px-3 py-1" onClick={fetchFollowing}>Get Following</button>
          </div>
        </div>
        <div className="flex items-center justify-center">
          <div className="overflow-x-auto">
            <table className="table max-w-full space-y-6 border-separate ">
              <thead>
                <tr className={`bg-gray-700 text-slate-100 py-2 my-2 rounded-3xl ${isHidden ? 'hidden' : ''}`}>
                  <th className="text-center p-3  ">Number</th>
                  <th className="text-center p-3  ">Name</th>
                  <th className="text-center p-3  ">Buttons</th>
                </tr>
              </thead>
              <tbody>
                {data.map((items, i) => (
                 <>
                    <tr className="bg-gray-700 text-slate-100">
                      <td className="text-center p-3 "><span className="flex"><span className="pt-1">{i + 1}</span><img src={items.avatar_url} className="rounded-full ml-2 md:ml-5" width={40} alt="" /></span></td>
                      <td className="text-center p-3 ">{items.login}</td>
                      <td className="text-center p-3 ">
                        <button
                          onClick={() => fetchFollowers(items.login)}
                          className="bg-yellow-400 px-3 py-1 rounded-lg hover:bg-yellow-600 text-slate-100 w-36"
                        >
                          Get Followers
                        </button>
                      </td>
                    </tr>
                    {selectedUser?.login === items.login && (
                      <tr>
                        <td colSpan="3">
                          {followersData.length > 0 ? (
                            <table className="table mx-auto max-w-full space-y-6 border-separate table-auto border-black dark:border-white dark:text-white">
                              <thead>
                                <tr className="bg-gray-500 text-slate-100 py-2 my-2 rounded-2xl">
                                  <th className="tbl p-3 ">Number</th>
                                  <th className="tbl p-3 ">Name</th>
                                 
                                </tr>
                              </thead>
                              <tbody>
                                {followersData.map((follower, i) => (
                                  <tr key={i} className="bg-gray-500 text-slate-100 rounded-2xl">
                                    <td className="tbl md:pl-10 p-3 "><span className="flex"><span className="pt-1">{i + 1}</span><img src={follower.avatar_url} className="rounded-full ml-2 md:ml-5" width={40} alt="" /></span></td>
                                    <td className="tbl pl-20 p-3 ">{follower.login}</td>
                                    
                                  </tr>
                                ))}
                              </tbody>
                            </table>
                          ) : (
                            <p className="text-slate-100 text-center">No followers for {items.login}</p>
                          )}
                        </td>
                      </tr>
                    )}
                  </>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        <style>
          {`
            .tbl{
              border-radius:20px;
              border-radius: 0 .625rem .625rem 0;
            }
          `}
        </style>
      </>
    );
}
