import React, { useState } from "react"
import "./sidebar.css"
import { GiAirplaneDeparture } from "react-icons/gi"
import { TbUsers } from "react-icons/tb"
import { BsCardChecklist } from "react-icons/bs"
import { IoAirplaneOutline } from "react-icons/io5"
import { RiAdminLine } from "react-icons/ri"
import { MdOutlineSell } from "react-icons/md"
import { ImUserTie } from "react-icons/im"
import { motion } from "framer-motion"
import { UilBars } from "@iconscout/react-unicons"
import logo from "../imgs/logo.png"
import logoNegro from "../imgs/logoNegro.png"
import logoMini from "../imgs/logoMini.png"

const Sidebar = ({ selected, setSelected }) => {
  const [expanded, setExpaned] = useState(true)

  const sidebarVariants = {
    true: {
      left: "0",
    },
    false: {
      left: "-60%",
    },
  }

  return (
    <>
      <motion.div
        className="bars"
        //style={expanded ? { left: "60%" } : { left: "5%" }}
        initial={expanded ? { x: -200 } : { x: 0 }}
        animate={expanded ? { x: 0 } : { x: -200 }}
        transition={{ duration: 0.3 }}
        onClick={() => setExpaned(!expanded)}
      >
        <UilBars />
      </motion.div>
      <motion.div
        className="sidebar"
        variants={sidebarVariants}
        animate={window.innerWidth <= 768 ? `${expanded}` : ""}
      >
        <article className="logo" onClick={() => setSelected(0)}>
          {/* <GiAirplaneDeparture className="logo2" /> */}
          <div className="logo2">
            {window.innerWidth <= 768 ? (
              <img src={logoNegro} alt="logo" />
            ) : (
              <img src={logo} alt="logo" />
            )}
          </div>
          <div className="logoMini">
            <img src={logoMini} alt="mini" />
            {/* <span className="logo3">Fly MeT</span> */}
          </div>
        </article>
        <article className="menu">
          <div
            className={selected === 1 ? "menuItem active" : "menuItem"}
            onClick={() => setSelected(1)}
          >
            <ImUserTie />
            <span>Admins</span>
          </div>

          <div
            className={selected === 2 ? "menuItem active" : "menuItem"}
            onClick={() => setSelected(2)}
          >
            <TbUsers />
            <span>Customers</span>
          </div>

          <div
            className={selected === 3 ? "menuItem active" : "menuItem"}
            onClick={() => setSelected(3)}
          >
            <RiAdminLine />
            <span>Banned</span>
          </div>

          <div
            className={selected === 4 ? "menuItem active" : "menuItem"}
            onClick={() => setSelected(4)}
          >
            <IoAirplaneOutline />
            <span>Flights</span>
          </div>

          <div
            className={selected === 5 ? "menuItem active" : "menuItem"}
            onClick={() => setSelected(5)}
          >
            <MdOutlineSell />
            <span>Products</span>
          </div>

          <div
            className={selected === 6 ? "menuItem active" : "menuItem"}
            onClick={() => setSelected(6)}
          >
            <BsCardChecklist />
            <span>Featured</span>
          </div>
        </article>
      </motion.div>
    </>
  )
}

export default Sidebar
