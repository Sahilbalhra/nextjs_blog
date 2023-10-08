// 👇️ ts-nocheck disables type checking for the entire file
// @ts-nocheck

"use client"
import React, { useEffect, useState } from 'react'
import styles from './page.module.css'
import useSWR from 'swr'

const Dashboard = () => {
  // const [data, setData] = useState([])
  // const [err, setErr] = useState(false)
  // const [isLoading, setIsLoading] = useState(false)

  // useEffect(() => {
  //   const getData = async () => {
  //     setIsLoading(true)
  //     const res = await fetch("https://jsonplaceholder.typicode.com/posts", {
  //       cache: "no-store"
  //     })

  //     if (!res.ok) {
  //       // throw new Error("Failed to fetch data")
  //       setErr(true)
  //     }

  //     setData(await res.json())
  //     setIsLoading(false)

  //     // return res.json()
  //   }
  //   getData()
  // }, [])

  // console.log("data", data)

  const fetcher = (...args: any) => fetch(...args).then(res => res.json())

  const { data, error, isLoading } = useSWR("https://jsonplaceholder.typicode.com/posts", fetcher)

  if (error) return <div>failed to load</div>
  if (isLoading) return <div>loading...</div>

  console.log("data",data)

  return (
    <div>page</div>
  )
}

export default Dashboard