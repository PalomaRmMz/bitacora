import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUserPlus,
  faUserCheck,
  faFileCirclePlus,
  faXmark,
  faFloppyDisk,
} from "@fortawesome/free-solid-svg-icons";
import {
  getColonias,
  getMunicipios,
  getEstados,
  getSecciones,
  getCP,
} from "../../services/catalogos";

const AddVisitas = () => {
  const [fechaActual, setFechaActual] = useState("");
  const [horaActual, setHoraActual] = useState("");
  const [colonias, setColonias] = useState([]);
  const [municipios, setMunicipios] = useState([]);
  const [estados, setEstados] = useState([]);
  const [codigosPostales, setCodigosPostales] = useState([]);
  const [secciones, setSecciones] = useState([]);
  const [showVisitanteNuevo, setShowVisitanteNuevo] = useState(false);
  const [showVisitanteExistente, setShowVisitanteExistente] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [
          coloniasData,
          municipiosData,
          estadosData,
          codigosPostalesData,
          seccionesData,
        ] = await Promise.all([
          getColonias(),
          getMunicipios(),
          getEstados(),
          getCP(),
          getSecciones(),
        ]);
        setColonias(coloniasData || []);
        setMunicipios(municipiosData || []);
        setEstados(estadosData || []);
        setCodigosPostales(codigosPostalesData || []);
        setSecciones(seccionesData || []);
      } catch (error) {
        console.error("Error al cargar los datos:", error);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    const now = new Date();
    const dia = String(now.getDate()).padStart(2, "0");
    const mes = String(now.getMonth() + 1).padStart(2, "0");
    const anio = now.getFullYear();
    const fechaFormateada = `${anio}-${mes}-${dia}`;
    const hora = now.toTimeString().split(" ")[0].slice(0, 5);

    setFechaActual(fechaFormateada);
    setHoraActual(hora);
  }, []);

  return (
    <>
      <div className="card">
        <div className="card-header">
          <h3>
            <FontAwesomeIcon icon={faFileCirclePlus} /> Agregar visita
          </h3>
        </div>
        <div className="card-body">
          <div className="row">
            <div className="col-md-2 mb-3">
              <label
                htmlFor="fecha_visita"
                className="form-label fw-bolder fs-7"
              >
                Fecha de visita
              </label>
              <input
                type="date"
                className="form-control"
                id="fecha_visita"
                value={fechaActual}
                readOnly
              />
            </div>
            <div className="col-md-2 mb-3">
              <label
                htmlFor="hora_visita"
                className="form-label fw-bolder fs-7"
              >
                Hora de visita
              </label>
              <input
                type="time"
                className="form-control"
                id="hora_visita"
                value={horaActual}
                readOnly
              />
            </div>
          </div>

          <div className="d-flex justify-content-around align-items-center">
            <div className="mt-4 mb-4">
              <button
                type="button"
                className="btn btn-info"
                onClick={() => {
                  setShowVisitanteNuevo(true);
                  setShowVisitanteExistente(false);
                }}
              >
                <FontAwesomeIcon icon={faUserPlus} /> Visitante Nuevo
              </button>
            </div>
            <div className="mt-4 mb-4">
              <button
                type="button"
                className="btn btn-warning"
                onClick={() => {
                  setShowVisitanteNuevo(false);
                  setShowVisitanteExistente(true);
                }}
              >
                <FontAwesomeIcon icon={faUserCheck} /> Visitante Existente
              </button>
            </div>
          </div>
        </div>
      </div>

      {showVisitanteNuevo && (
        <div className="card mt-4">
          <div className="card-header">
            <h3>
              <FontAwesomeIcon icon={faUserPlus} /> Visitante Nuevo
            </h3>
          </div>
          <div className="card-body">
            <div className="row">
              <div className="col-md-4 mb-3">
                <label
                  htmlFor="nombre_visit_new"
                  className="form-label fw-bolder fs-7"
                >
                  Nombre
                </label>
                <input
                  type="text"
                  id="nombre_visit_new"
                  className="form-control"
                />
              </div>
              <div className="col-md-4 mb-3">
                <label
                  htmlFor="ap_visit_new"
                  className="form-label fw-bolder fs-7"
                >
                  Apellido paterno
                </label>
                <input type="text" id="ap_visit_new" className="form-control" />
              </div>
              <div className="col-md-4 mb-3">
                <label
                  htmlFor="am_visit_new"
                  className="form-label fw-bolder fs-7"
                >
                  Apellido materno
                </label>
                <input type="text" id="am_visit_new" className="form-control" />
              </div>
              <div className="col-md-12 mb-3">
                <label
                  htmlFor="calle_visit_new"
                  className="form-label fw-bolder fs-7"
                >
                  Calle
                </label>
                <input
                  type="text"
                  id="calle_visit_new"
                  className="form-control"
                />
              </div>
              <div className="col-md-2 mb-3">
                <label
                  htmlFor="num_ext_visit_new"
                  className="form-label fw-bolder fs-7"
                >
                  Número exterior
                </label>
                <input
                  type="text"
                  id="num_ext_visit_new"
                  className="form-control"
                />
              </div>
              <div className="col-md-2 mb-3">
                <label
                  htmlFor="num_int_visit_new"
                  className="form-label fw-bolder fs-7"
                >
                  Número interior
                </label>
                <input
                  type="text"
                  id="num_int_visit_new"
                  className="form-control"
                />
              </div>
              <div className="col-md-4 mb-3">
                <label
                  htmlFor="colonia_visit_new"
                  className="form-label fw-bolder fs-7"
                >
                  Colonia
                </label>
                <select
                  className="form-select"
                  id="colonia_visit_new"
                  defaultValue=""
                >
                  <option disabled value="">
                    Seleccione una colonia
                  </option>
                  {colonias.map((colonia) => (
                    <option
                      key={colonia.id_colonia}
                      value={colonia.nombre_colonias}
                    >
                      {colonia.nombre_colonias}
                    </option>
                  ))}
                </select>
              </div>
              <div className="col-md-4 mb-3">
                <label
                  htmlFor="municipio_visit_new"
                  className="form-label fw-bolder fs-7"
                >
                  Municipio
                </label>
                <select
                  className="form-select"
                  id="municipio_visit_new"
                  defaultValue=""
                >
                  <option disabled value="">
                    Seleccione un municipio
                  </option>
                  {municipios.map((municipio) => (
                    <option
                      key={municipio.id_municipio}
                      value={municipio.nombre_municipios}
                    >
                      {municipio.nombre_municipios}
                    </option>
                  ))}
                </select>
              </div>
              <div className="col-md-4 mb-3">
                <label
                  htmlFor="estado_visit_new"
                  className="form-label fw-bolder fs-7"
                >
                  Estado
                </label>
                <select
                  className="form-select"
                  id="estado_visit_new"
                  defaultValue=""
                >
                  <option disabled value="">
                    Seleccione un estado
                  </option>
                  {estados.map((estado) => (
                    <option key={estado.id_estado} value={estado.nombre_estado}>
                      {estado.nombre_estado}
                    </option>
                  ))}
                </select>
              </div>
              <div className="col-md-2 mb-3">
                <label
                  htmlFor="seccion_visit_new"
                  className="form-label fw-bolder fs-7"
                >
                  Sección electoral
                </label>
                <select
                  className="form-select"
                  id="seccion_visit_new"
                  defaultValue=""
                >
                  <option disabled value="">
                    Seleccione una seccion
                  </option>
                  {secciones.map((seccion) => (
                    <option
                      key={seccion.id_seccion_electoral}
                      value={seccion.nombre_seccion}
                    >
                      {seccion.nombre_seccion}
                    </option>
                  ))}
                </select>
              </div>
              <div className="col-md-2 mb-3">
                <label
                  htmlFor="cp_visit_new"
                  className="form-label fw-bolder fs-7"
                >
                  Codigo postal
                </label>
                <select
                  className="form-select"
                  id="cp_visit_new"
                  defaultValue=""
                >
                  <option disabled value="">
                    Seleccione un codigo postal
                  </option>
                  {codigosPostales.map((codigoPostal) => (
                    <option
                      key={codigoPostal.id_cp}
                      value={codigoPostal.codigo_postal}
                    >
                      {codigoPostal.codigo_postal}
                    </option>
                  ))}
                </select>
              </div>
              <div className="col-md-3 mb-3">
                <label
                  htmlFor="cumpleanos_visit_new"
                  className="form-label fw-bolder fs-7"
                >
                  Cumpleaños
                </label>
                <input
                  type="date"
                  id="cumpleanos_visit_new"
                  className="form-control"
                />
              </div>
              <div className="col-md-12 mb-3">
                <label
                  htmlFor="asunto_visit_new"
                  className="form-label fw-bolder fs-7"
                >
                  Asunto
                </label>
                <textarea
                  id="asunto_visit_new"
                  className="form-control"
                  rows="2"
                />
              </div>
              <div className="col-md-12 mb-3">
                <label
                  htmlFor="observaciones_visit_new"
                  className="form-label fw-bolder fs-7"
                >
                  Observaciones
                </label>
                <textarea
                  id="observaciones_visit_new"
                  className="form-control"
                  rows="4"
                />
              </div>
            </div>
          </div>
        </div>
      )}

      {showVisitanteExistente && (
        <div className="card mt-4">
          <div className="card-header">
            <h3>
              <FontAwesomeIcon icon={faUserCheck} /> Visitante Existente
            </h3>
          </div>
          <div className="card-body">
            <div className="row">
              <div className="col-md-4 mb-3">
                <label
                  htmlFor="nombre_visit_exist"
                  className="form-label fw-bolder fs-7"
                >
                  Nombre
                </label>
                <input
                  type="text"
                  id="nombre_visit_exist"
                  className="form-control"
                />
              </div>
              <div className="col-md-4 mb-3">
                <label
                  htmlFor="ap_visit_exist"
                  className="form-label fw-bolder fs-7"
                >
                  Apellido paterno
                </label>
                <input
                  type="text"
                  id="ap_visit_exist"
                  className="form-control"
                />
              </div>
              <div className="col-md-4 mb-3">
                <label
                  htmlFor="am_visit_exist"
                  className="form-label fw-bolder fs-7"
                >
                  Apellido materno
                </label>
                <input
                  type="text"
                  id="am_visit_exist"
                  className="form-control"
                />
              </div>
              <div className="col-md-12 mb-3">
                <label
                  htmlFor="calle_visit_exist"
                  className="form-label fw-bolder fs-7"
                >
                  Calle
                </label>
                <input
                  type="text"
                  id="calle_visit_exist"
                  className="form-control"
                  readOnly
                />
              </div>
              <div className="col-md-2 mb-3">
                <label
                  htmlFor="num_ext_visit_exist"
                  className="form-label fw-bolder fs-7"
                >
                  Número exterior
                </label>
                <input
                  type="text"
                  id="num_ext_visit_exist"
                  className="form-control"
                  readOnly
                />
              </div>
              <div className="col-md-2 mb-3">
                <label
                  htmlFor="num_int_visit_exist"
                  className="form-label fw-bolder fs-7"
                >
                  Número interior
                </label>
                <input
                  type="text"
                  id="num_int_visit_exist"
                  className="form-control"
                  readOnly
                />
              </div>
              <div className="col-md-4 mb-3">
                <label
                  htmlFor="colonia_visit_exist"
                  className="form-label fw-bolder fs-7"
                >
                  Colonia
                </label>
                <input
                  type="text"
                  id="colonia_visit_exist"
                  className="form-control"
                  readOnly
                />
              </div>
              <div className="col-md-4 mb-3">
                <label
                  htmlFor="municipio_visit_exist"
                  className="form-label fw-bolder fs-7"
                >
                  Municipio
                </label>
                <input
                  type="text"
                  id="municipio_visit_exist"
                  className="form-control"
                  readOnly
                />
              </div>
              <div className="col-md-4 mb-3">
                <label
                  htmlFor="estado_visit_exist"
                  className="form-label fw-bolder fs-7"
                >
                  Estado
                </label>
                <input
                  type="text"
                  id="estado_visit_exist"
                  className="form-control"
                  readOnly
                />
              </div>
              <div className="col-md-2 mb-3">
                <label
                  htmlFor="seccion_visit_exist"
                  className="form-label fw-bolder fs-7"
                >
                  Sección electoral
                </label>
                <input
                  type="text"
                  id="seccion_visit_exist"
                  className="form-control"
                  readOnly
                />
              </div>
              <div className="col-md-2 mb-3">
                <label
                  htmlFor="cp_visit_exist"
                  className="form-label fw-bolder fs-7"
                >
                  Codigo postal
                </label>
                <input
                  type="text"
                  id="cp_visit_exist"
                  className="form-control"
                  readOnly
                />
              </div>
              <div className="col-md-3 mb-3">
                <label
                  htmlFor="cumpleanos_visit_exist"
                  className="form-label fw-bolder fs-7"
                >
                  Cumpleaños
                </label>
                <input
                  type="date"
                  id="cumpleanos_visit_exist"
                  className="form-control"
                  readOnly
                />
              </div>
              <div className="col-md-12 mb-3">
                <label htmlFor="asunto" className="form-label fw-bolder fs-7">
                  Asunto
                </label>
                <textarea id="asunto" className="form-control" rows="2" />
              </div>
              <div className="col-md-12 mb-3">
                <label
                  htmlFor="observaciones"
                  className="form-label fw-bolder fs-7"
                >
                  Observaciones
                </label>
                <textarea
                  id="observaciones"
                  className="form-control"
                  rows="4"
                />
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="card mt-4">
        <div className="card-body">
          <div className="d-flex justify-content-around align-items-center">
            <div className="mt-4 mb-2">
              <button type="button" className="btn btn-success">
                <FontAwesomeIcon icon={faFloppyDisk} /> Guardar
              </button>
            </div>
            <div className="mt-4 mb-2">
              <button type="button" className="btn btn-danger">
                <FontAwesomeIcon icon={faXmark} /> Cancelar
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddVisitas;
