import React, { useEffect, useState } from "react"
import { toast, ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import axios from "axios"

const Notifications = () => {
  const [data, setData] = useState([])

  //Notification Permission
  useEffect(() => {
    const askForNotificationPermission = async () => {
      if (!("Notification" in window)) {
        console.log("This browser does not support desktop notification")
        return
      }

      if (Notification.permission === "granted") {
        console.log("Notification permission already granted")
        return
      }

      if (Notification.permission !== "denied") {
        const permission = await Notification.requestPermission()
        if (permission === "granted") {
          console.log("Notification permission granted")
        }
      }
    }
    askForNotificationPermission()
  }, [])

  useEffect(() => {
    fetchData()
    // console.log(data)
  }, [])

  const fetchData = () => {
    axios
      .get("http://127.0.0.1:5000/api/alarm")
      .then((response) => {
        setData(response.data)
        // console.log(response.data) // Log the data to the console
      })
      .catch((error) => {
        console.error(error)
      })
  }

  useEffect(() => {
    const currentTime = new Date()
    // notify()
    data.map((item) => {
      const alarmTime = new Date(item.alarmTime)
      const timeRemaining = alarmTime - currentTime

      // timeRemaining <= 60000 &&
      if (timeRemaining > 0) {
        notify(timeRemaining - 1000)
        console.log("timeRemaining", timeRemaining - 1000)
        // console.log("notification created")
      }

      console.log("--------------")

      // console.log("timeRemaining", timeRemaining)
      // console.log("currentTime", currentTime)
      // console.log("alarmTime", alarmTime)
    })
  }, [data])

  const notify = (delayTime) => {
    if (Notification.permission === "granted") {
      toast.info("It's time to wake up!", {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 50000, // time (in milliseconds)
        delay: delayTime,
        onClick: handleNotificationClick,
      })
    }
  }

  const handleNotificationClick = () => {
    const tokyoTime = new Date().toLocaleTimeString("en-US", {
      timeZone: "Asia/Tokyo",
    }) // Current time in Tokyo
    const usTime = new Date().toLocaleTimeString("en-US", {
      timeZone: "America/New_York",
    }) // Current time in US (New York)
    const finlandTime = new Date().toLocaleTimeString("en-US", {
      timeZone: "Europe/Helsinki",
    }) // Current time in Finland (Helsinki)

    toast(
      `Tokyo Time: ${tokyoTime}\nUS Time (New York): ${usTime}\nFinland Time (Helsinki): ${finlandTime}`
    )
  }

  return (
    <div>
      <ToastContainer />
    </div>
  )
}

export default Notifications
