import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material"
import { Button, DatePicker, Modal, Spin, TimePicker } from "antd"
import axios from "axios"
import moment from "moment"
import React, { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import {
  getFlightsAvailables,
  getReviews,
  getTickets,
} from "../../features/orders"
import { IoSettingsSharp } from "react-icons/io5"
import { GrPowerReset } from "react-icons/gr"
import Filters from "../filters/Filters"
import "./Products.css"
import { filtered } from "../../features/tasks"
import FilterProduct from "../filterProduct/FilterProduct"
import { motion } from "framer-motion"

const Products = () => {
  const dispatch = useDispatch()
  const flights = useSelector(state => state.tasks.flightsAv)
  const flightsFiltered = useSelector(state => state.tasks.flightsFiltered)
  const flightsAv = useSelector(state => state.tasks.flightsAv)
  const paginadoState = useSelector(state => state.tasks.paginado)
  const loading = useSelector(state => state.tasks.isLoading)

  const [modal, setModal] = useState(false)
  const [place, setPlace] = useState({})
  const [order, setOrder] = useState()
  const [sumador, setSumador] = useState(4)
  const [inputPaginado, setInputPaginado] = useState("")

  const [exist, setExist] = useState(true)
  const [right, setRight] = useState(false)
  const [left, setLeft] = useState(false)

  //const flights = flight.sort((a, b) => parseInt(a.date) - parseInt(b.date))
  useEffect(() => {
    dispatch(getTickets())
    dispatch(getFlightsAvailables())
    dispatch(getReviews())
  }, [])

  const abrirModal = e => {
    setModal(true)
    setPlace(e)
  }
  const cerrarModal = e => {
    setModal(false)
  }

  const accion = () => {
    cerrarModal()
  }

  const layout = {
    labelCol: {
      span: 5,
    },

    wrapperCol: {
      span: 16,
    },
  }

  const handleChange = e => {
    setOrder({ ...order, [e.target.name]: e.target.value })
  }
  const handleChange2 = e => {
    if (!e) {
      return
    }
    const response = moment(e).format("DD-MM-YYYY")
    setOrder({ ...order, date: response })
  }
  const handleChange3 = (a, b) => {
    setOrder({ ...order, departs: b })
  }
  let isNull = flights
  flightsFiltered ? (isNull = flightsFiltered) : (isNull = flightsAv)

  let inicio = sumador - 4 //19-29

  let disablePrev = false
  if (inicio > 3) {
    disablePrev = true
  }
  let disableNext = true
  if (sumador >= isNull.length) {
    disableNext = false
  }

  const paginado = e => {
    if (e.target.value === "suma") {
      setExist(false)
      setLeft(false)
      setTimeout(() => {
        setRight(true)
        setExist(true)
        setSumador(sumador + 4)
      })
    } else if (e.target.value === "resta") {
      setExist(false)
      setRight(false)
      setTimeout(() => {
        setLeft(true)
        setExist(true)
        setSumador(sumador - 4)
      })
    }
    setInputPaginado("")
  }

  let inputChange = e => {
    if (
      !/^([0-9])*$/.test(e.target.value) ||
      e.target.value < 1 ||
      e.target.value > Math.ceil(isNull.length / 4)
    ) {
      return setInputPaginado("")
    }

    setInputPaginado(e.target.value)
    setSumador(e.target.value * 4)
  }

  if (!flights.length) {
    return (
      <div className="spinToWin">
        <Spin className="spin" tip="Loading..."></Spin>
      </div>
    )
  }

  return (
    <div className="Table2 ">
      <h2 className="centrar title">Planned Trips</h2>
      <div className="paginado">
        <FilterProduct flightsComponent={flightsAv} dispatched={filtered} />
        <button
          className="botoncuatro"
          onClick={paginado}
          value="resta"
          disabled={!disablePrev}
        >
          <div className="icono1">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              class="bi bi-arrow-left-short"
              viewBox="0 0 16 16"
            >
              <path
                fill-rule="evenodd"
                d="M12 8a.5.5 0 0 1-.5.5H5.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L5.707 7.5H11.5a.5.5 0 0 1 .5.5z"
              />
            </svg>
          </div>
          <span>Prev</span>
        </button>
        <div className="padreinputpaginado">
          <input
            onChange={inputChange}
            value={inputPaginado}
            type="text"
            className="inputpaginado"
            placeholder={Math.ceil(sumador / 4)}
          />
          &nbsp; of &nbsp;{Math.ceil(isNull.length / 4)}
        </div>
        <button
          className="botoncinco"
          onClick={paginado}
          value="suma"
          disabled={!disableNext}
        >
          <div className="icono">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              class="bi bi-arrow-right-short"
              viewBox="0 0 16 16"
            >
              <path
                fill-rule="evenodd"
                d="M4 8a.5.5 0 0 1 .5-.5h5.793L8.146 5.354a.5.5 0 1 1 .708-.708l3 3a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708-.708L10.293 8.5H4.5A.5.5 0 0 1 4 8z"
              />
            </svg>
          </div>
          <span>Next</span>
        </button>
      </div>
      <div className="tableProduct">
        {exist && (
          <motion.div
            initial={left || right ? "" : { y: 500, opacity: 0 }}
            animate={left || right ? "" : { y: 0, opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <motion.div
              initial={right && { x: 500, opacity: 0 }}
              animate={right && { x: 0, opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <motion.div
                initial={left && { x: -500, opacity: 0 }}
                animate={left && { x: 0, opacity: 1 }}
                transition={{ duration: 0.5 }}
              >
                <TableContainer
                  style={{ boxShadow: "0px 13px 20px 0px #80808029" }}
                >
                  <Table sx={{ maxWidth: 350 }} aria-label="simple table">
                    <TableHead>
                      <TableRow>
                        <TableCell>Departure</TableCell>
                        <TableCell>Arrival</TableCell>
                        <TableCell>Departures Aiport</TableCell>
                        <TableCell>Arrival Airport</TableCell>
                        <TableCell>Departure Date</TableCell>
                        <TableCell>Arrival Date</TableCell>
                        <TableCell>Departure Time</TableCell>
                        <TableCell>Arrival Time</TableCell>
                        <TableCell>Seating</TableCell>
                        <TableCell>Duration</TableCell>
                        <TableCell>Number</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {isNull.slice(inicio, sumador).map((e, i) => (
                        <TableRow
                          key={i}
                          sx={{
                            "&:last-child td, &:last-child th": { border: 0 },
                          }}
                        >
                          <TableCell>{e.departure.city}</TableCell>
                          <TableCell>{e.arrival.city}</TableCell>
                          <TableCell>{e.departure.airport}</TableCell>
                          <TableCell>{e.arrival.airport}</TableCell>
                          <TableCell>{e.departure.date}</TableCell>
                          <TableCell>{e.arrival.date}</TableCell>
                          <TableCell>{e.departure.time}</TableCell>
                          <TableCell>{e.arrival.time}</TableCell>
                          <TableCell>{e.totalSeats}</TableCell>

                          <TableCell>{e.duration}</TableCell>
                          <TableCell>{e.number}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </div>
    </div>
  )
}

export default Products
