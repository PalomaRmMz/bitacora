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
import { generateID } from "../../utilities/generateID";
import { agregarVisita } from "../../services/visitasAdd";

const AddVisitas = () => {
  const [listas, setListas] = useState({
    colonias: [],
    municipios: [],
    estados: [],
    codigosPostales: [],
    secciones: [],
  });

  const [frmVisitante, setFrmVisitante] = useState({
    showVisitanteNuevo: false,
    showVisitanteExistente: false,
  });

  const [visitanteData, setVisitanteData] = useState({
    id_visitante: generateID("DV"),
    nombre: "",
    a_paterno: "",
    a_materno: "",
    fecha_cumpleanos: "",
    calle: "",
    numero_interior: "",
    numero_exterior: "",
    id_colonia: "",
    id_municipio: "",
    id_estado: "",
    id_cp: "",
    id_seccion_electoral: "",
    correo: "",
    numero_celular: "",
  });

  const [visitaData, setVisitaData] = useState({
    id_registro_visita: generateID("RV"),
    id_recepcionista: "RU00001",
    fecha_visita: "",
    hora_visita: "",
    id_visitante: "",
    asunto: "",
    observaciones: "",
  });

  useEffect(() => {
    const cargarDatosIniciales = async () => {
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
        setListas({
          colonias: coloniasData || [],
          municipios: municipiosData || [],
          estados: estadosData || [],
          codigosPostales: codigosPostalesData || [],
          secciones: seccionesData || [],
        });
      } catch (error) {
        console.error("Error al cargar los datos:", error);
      }
    };

    cargarDatosIniciales();
  }, []);

  useEffect(() => {
    const now = new Date();
    const dia = String(now.getDate()).padStart(2, "0");
    const mes = String(now.getMonth() + 1).padStart(2, "0");
    const anio = now.getFullYear();
    const fechaFormateada = `${anio}-${mes}-${dia}`;
    const hora = now.toTimeString().split(" ")[0].slice(0, 5);

    setVisitaData((prev) => ({
      ...prev,
      fecha_visita: fechaFormateada,
      hora_visita: hora,
    }));
  }, []);

  const guardarVisita = async () => {
    const data = {
      ...visitanteData,
      ...visitaData,
      id_visitante: visitanteData.id_visitante,
    };

    console.log("Datos que se enviarían:", JSON.stringify(data, null, 2));

    try {
      const respuesta = await agregarVisita(visitanteData, visitaData);
      console.log("Visita agregada exitosamente", respuesta);
    } catch (error) {
      console.error("Error al agregar la visita", error);
    }
  };
  return (
    <>
      <div className="card">
        <div className="card-header">
          <h3>
            <FontAwesomeIcon icon={faFileCirclePlus} /> Agregar visita
          </h3>
        </div>
        <div className="card-body">
          <div className="input-group mb-3">
            <span className="input-group-text">id_rg_usuarios</span>
            <input
              type="text"
              className="form-control"
              value={visitaData.id_recepcionista}
              onChange={(e) =>
                setVisitaData((prev) => ({
                  ...prev,
                  id_recepcionista: e.target.value,
                }))
              }
              readOnly
            />
          </div>
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
                value={visitaData.fecha_visita}
                onChange={(e) =>
                  setVisitaData((prev) => ({
                    ...prev,
                    fecha_visita: e.target.value,
                  }))
                }
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
                value={visitaData.hora_visita}
                onChange={(e) =>
                  setVisitaData((prev) => ({
                    ...prev,
                    hora_visita: e.target.value,
                  }))
                }
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
                  setFrmVisitante((prev) => ({
                    ...prev,
                    showVisitanteNuevo: true,
                    showVisitanteExistente: false,
                  }));
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
                  setFrmVisitante((prev) => ({
                    ...prev,
                    showVisitanteNuevo: false,
                    showVisitanteExistente: true,
                  }));
                }}
              >
                <FontAwesomeIcon icon={faUserCheck} /> Visitante Existente
              </button>
            </div>
          </div>
        </div>
      </div>

      {frmVisitante.showVisitanteNuevo && (
        <div className="card mt-4">
          <div className="card-header">
            <h3>
              <FontAwesomeIcon icon={faUserPlus} /> Visitante Nuevo
            </h3>
          </div>
          <div className="card-body">
            <div className="input-group mb-3">
              <span className="input-group-text">id_visitante</span>
              <input
                type="text"
                className="form-control"
                id="id_visitante"
                value={visitanteData.id_visitante}
                onChange={(e) =>
                  setVisitanteData((prev) => ({
                    ...prev,
                    id_visitante: e.target.value,
                  }))
                }
                readOnly
              />
            </div>
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
                  value={visitanteData.nombre}
                  onChange={(e) =>
                    setVisitanteData({
                      ...visitanteData,
                      nombre: e.target.value,
                    })
                  }
                />
              </div>
              <div className="col-md-4 mb-3">
                <label
                  htmlFor="ap_visit_new"
                  className="form-label fw-bolder fs-7"
                >
                  Apellido paterno
                </label>
                <input
                  type="text"
                  id="ap_visit_new"
                  className="form-control"
                  value={visitanteData.a_paterno}
                  onChange={(e) =>
                    setVisitanteData({
                      ...visitanteData,
                      a_paterno: e.target.value,
                    })
                  }
                />
              </div>
              <div className="col-md-4 mb-3">
                <label
                  htmlFor="am_visit_new"
                  className="form-label fw-bolder fs-7"
                >
                  Apellido materno
                </label>
                <input
                  type="text"
                  id="am_visit_new"
                  className="form-control"
                  value={visitanteData.a_materno}
                  onChange={(e) =>
                    setVisitanteData({
                      ...visitanteData,
                      a_materno: e.target.value,
                    })
                  }
                />
              </div>
              <div className="col-md-8 mb-3">
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
                  value={visitanteData.calle}
                  onChange={(e) =>
                    setVisitanteData({
                      ...visitanteData,
                      calle: e.target.value,
                    })
                  }
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
                  value={visitanteData.numero_exterior}
                  onChange={(e) =>
                    setVisitanteData({
                      ...visitanteData,
                      numero_exterior: e.target.value,
                    })
                  }
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
                  value={visitanteData.numero_interior}
                  onChange={(e) =>
                    setVisitanteData({
                      ...visitanteData,
                      numero_interior: e.target.value,
                    })
                  }
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
                  value={visitanteData.id_colonia}
                  onChange={(e) =>
                    setVisitanteData((prev) => ({
                      ...prev,
                      id_colonia: e.target.value,
                    }))
                  }
                >
                  <option disabled value="">
                    Seleccione una colonia
                  </option>
                  {listas.colonias.map((colonia) => (
                    <option key={colonia.id_colonia} value={colonia.id_colonia}>
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
                  value={visitanteData.id_municipio}
                  onChange={(e) =>
                    setVisitanteData((prev) => ({
                      ...prev,
                      id_municipio: e.target.value,
                    }))
                  }
                >
                  <option disabled value="">
                    Seleccione un municipio
                  </option>
                  {listas.municipios.map((municipio) => (
                    <option
                      key={municipio.id_municipio}
                      value={municipio.id_municipio}
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
                  value={visitanteData.id_estado}
                  onChange={(e) =>
                    setVisitanteData((prev) => ({
                      ...prev,
                      id_estado: e.target.value,
                    }))
                  }
                >
                  <option disabled value="">
                    Seleccione un estado
                  </option>
                  {listas.estados.map((estado) => (
                    <option key={estado.id_estado} value={estado.id_estado}>
                      {estado.nombre_estado}
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
                  value={visitanteData.id_cp}
                  onChange={(e) =>
                    setVisitanteData((prev) => ({
                      ...prev,
                      id_cp: e.target.value,
                    }))
                  }
                >
                  <option disabled value="">
                    Seleccione un codigo postal
                  </option>
                  {listas.codigosPostales.map((codigoPostal) => (
                    <option key={codigoPostal.id_cp} value={codigoPostal.id_cp}>
                      {codigoPostal.codigo_postal}
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
                  value={visitanteData.id_seccion_electoral}
                  onChange={(e) =>
                    setVisitanteData((prev) => ({
                      ...prev,
                      id_seccion_electoral: e.target.value,
                    }))
                  }
                >
                  <option disabled value="">
                    Seleccione una seccion
                  </option>
                  {listas.secciones.map((seccion) => (
                    <option
                      key={seccion.id_seccion_electoral}
                      value={seccion.id_seccion_electoral}
                    >
                      {seccion.nombre_seccion}
                    </option>
                  ))}
                </select>
              </div>
              <div className="col-md-3 mb-3">
                <label
                  htmlFor="celular_visit_new"
                  className="form-label fw-bolder fs-7"
                >
                  Celular
                </label>
                <input
                  type="phone"
                  id="celular_visit_new"
                  className="form-control"
                  value={visitanteData.numero_celular}
                  onChange={(e) =>
                    setVisitanteData({
                      ...visitanteData,
                      numero_celular: e.target.value,
                    })
                  }
                />
              </div>
              <div className="col-md-3 mb-3">
                <label
                  htmlFor="correo_visit_new"
                  className="form-label fw-bolder fs-7"
                >
                  Correo
                </label>
                <input
                  type="mail"
                  id="correo_visit_new"
                  className="form-control"
                  value={visitanteData.correo}
                  onChange={(e) =>
                    setVisitanteData({
                      ...visitanteData,
                      correo: e.target.value,
                    })
                  }
                />
              </div>
              <div className="col-md-2 mb-3">
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
                  value={visitanteData.fecha_cumpleanos}
                  onChange={(e) =>
                    setVisitanteData({
                      ...visitanteData,
                      fecha_cumpleanos: e.target.value,
                    })
                  }
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
                  value={visitaData.asunto}
                  onChange={(e) =>
                    setVisitaData({ ...visitaData, asunto: e.target.value })
                  }
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
                  value={visitaData.observaciones}
                  onChange={(e) =>
                    setVisitaData({
                      ...visitaData,
                      observaciones: e.target.value,
                    })
                  }
                />
              </div>
            </div>
          </div>
        </div>
      )}

      {frmVisitante.showVisitanteExistente && (
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
              <div className="col-md-10 mb-3">
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
              <button
                type="button"
                className="btn btn-success"
                onClick={guardarVisita}
              >
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
