import React, { useEffect, useState, useMemo } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSearch,
  faFilterCircleXmark,
  faFileCirclePlus,
  faFloppyDisk,
  faXmark,
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
import { getFilteredVisitas } from "../../services/visitasFilter";
import FechaHora from "../../utilities/fechaHora";
import FechaHoraActual from "../../utilities/fechaHoraActual";
import InputIdRegistroVisita from "../../utilities/inputIdRegistroVisita";
import TextAreaAsuntoObservaciones from "../../utilities/textAreaAsuntoObservaciones";

const AddVisitas = () => {
  const [listas, setListas] = useState({
    colonias: [],
    municipios: [],
    estados: [],
    codigosPostales: [],
    secciones: [],
  });

  const [filteredVisitas, setFilteredVisitas] = useState([]);
  const [visitanteStatus, setVisitanteStatus] = useState("none");
  const [filters, setFilters] = useState({
    nombre_visitante: "",
    ap_visitante: "",
    am_visitante: "",
  });

  const fecha_visita = useMemo(
    () => new Date().toISOString().split("T")[0],
    []
  );
  const hora_visita = useMemo(() => new Date().toTimeString().slice(0, 5), []);

  const [visitanteExistenteData, setVisitanteExistenteData] = useState({
    id_registro_visita: generateID("RV"),
    id_recepcionista: "RU00001",
    fecha_visita,
    hora_visita,
    id_visitante: "",
    asunto: "",
    observaciones: "",
  });

  const [visitanteNuevoData, setVisitanteNuevoData] = useState({
    id_visitante: generateID("DV"),
    nombre: "Pedro",
    a_paterno: "Picapiedra",
    a_materno: "Dinosaurio",
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

  const [asunto, setAsunto] = useState("");
  const [observaciones, setObservaciones] = useState("");

  const buscarVisitante = async () => {
    try {
      const response = await getFilteredVisitas(filters);
      setFilteredVisitas(response || []);
      setVisitanteStatus(response?.length > 0 ? "existente" : "nuevo");
    } catch (error) {
      console.error("Error al buscar el visitante", error);
    }
  };

  const guardarVisita = async () => {
    let visitanteData = {};
    let visitaData = null;

    if (visitanteStatus === "nuevo") {
      const idVisitante = visitanteNuevoData.id_visitante;
      visitanteData = { ...visitanteNuevoData };
      visitaData = {
        ...visitanteExistenteData,
        id_visitante: idVisitante,
        asunto,
        observaciones,
      };
    } else if (visitanteStatus === "existente") {
      const idVisitante = filteredVisitas[0]?.id_visitante;
      if (!idVisitante) {
        console.error(
          "Error: id_visitante no encontrado en visitante existente."
        );
        return;
      }
      visitaData = {
        ...visitanteExistenteData,
        id_visitante: idVisitante,
        asunto,
        observaciones,
      };
    }

    console.log(
      "Datos que se enviarán:",
      JSON.stringify({ visitanteData, visitaData }, null, 2)
    );

    // try {
    //   const respuesta = await agregarVisita(visitanteData, visitaData);
    //   console.log("Visita agregada exitosamente", respuesta);
    // } catch (error) {
    //   console.error("Error al agregar la visita", error);
    // }
  };

  useEffect(() => {
    (async () => {
      try {
        const data = await Promise.all([
          getColonias(),
          getMunicipios(),
          getEstados(),
          getCP(),
          getSecciones(),
        ]);

        setListas({
          colonias: data[0],
          municipios: data[1],
          estados: data[2],
          codigosPostales: data[3],
          secciones: data[4],
        });
      } catch (error) {
        console.error("Error al cargar los datos:", error);
      }
    })();
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
          <div className="input-group mb-3">
            <span className="input-group-text">id_recepcionista</span>
            <input
              type="text"
              className="form-control"
              value={visitanteExistenteData.id_recepcionista}
              readOnly
            />
          </div>

          <div className="row">
            <div className="col-md-4 mb-3">
              <label
                htmlFor="nombre_visit_search"
                className="form-label fw-bolder fs-7"
              >
                Nombre
              </label>
              <input
                type="text"
                id="nombre_visit_search"
                className="form-control"
                value={filters.nombre_visitante}
                onChange={(e) =>
                  setFilters({ ...filters, nombre_visitante: e.target.value })
                }
              />
            </div>
            <div className="col-md-4 mb-3">
              <label
                htmlFor="ap_visit_search"
                className="form-label fw-bolder fs-7"
              >
                Apellido paterno
              </label>
              <input
                type="text"
                id="ap_visit_search"
                className="form-control"
                value={filters.ap_visitante}
                onChange={(e) =>
                  setFilters({
                    ...filters,
                    ap_visitante: e.target.value,
                  })
                }
              />
            </div>
            <div className="col-md-4 mb-3">
              <label
                htmlFor="am_visit_search"
                className="form-label fw-bolder fs-7"
              >
                Apellido materno
              </label>
              <input
                type="text"
                id="am_visit_search"
                className="form-control"
                value={filters.am_visitante}
                onChange={(e) =>
                  setFilters({
                    ...filters,
                    am_visitante: e.target.value,
                  })
                }
              />
            </div>
          </div>

          <div className="d-flex justify-content-around align-items-center">
            <button
              type="button"
              className="btn btn-info"
              onClick={buscarVisitante}
            >
              <FontAwesomeIcon icon={faSearch} /> Buscar visitante
            </button>
            <button
              type="button"
              className="btn btn-danger"
              onClick={() => {
                setFilters({
                  nombre_visitante: "",
                  ap_visitante: "",
                  am_visitante: "",
                });
                setVisitanteStatus("none");
              }}
            >
              <FontAwesomeIcon icon={faFilterCircleXmark} /> Limpiar
            </button>
          </div>
        </div>
      </div>

      {visitanteStatus === "existente" && (
        <>
          <div className="card mt-4">
            <div className="card-header">
              <h5 className="fw-bolder">Registro de visitas</h5>
            </div>
            <div className="card-body">
              {filteredVisitas.length > 0 && (
                <>
                  <div className="input-group mb-3">
                    <span className="input-group-text">id_visitante</span>
                    <input
                      type="text"
                      className="form-control"
                      value={filteredVisitas[0].id_visitante || ""}
                      readOnly
                    />
                  </div>
                  <span className="fw-bolder">Visitante: </span>
                  {`${filteredVisitas[0].nombre_visitante} ${filteredVisitas[0].ap_visitante} ${filteredVisitas[0].am_visitante}`}
                  <br />
                  <br />
                </>
              )}
              <table className="table table-bordered">
                <thead>
                  <tr>
                    <th>Fecha</th>
                    <th>Hora</th>
                    <th>Asunto</th>
                    <th>Observaciones</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredVisitas.map((visita) => (
                    <tr key={visita.id_registro_visita}>
                      <td>
                        <FechaHora valor={visita.fecha_visita} tipo="fecha" />
                      </td>
                      <td>
                        <FechaHora valor={visita.hora_visita} tipo="hora" />
                      </td>
                      <td>{visita.asunto}</td>
                      <td>{visita.observaciones}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="card mt-4">
            <div className="card-header">
              <h5 className="fw-bolder">Agregar visitas</h5>
            </div>
            <div className="card-body">
              <InputIdRegistroVisita
                id_registro_visita={visitanteExistenteData.id_registro_visita}
              />
              <FechaHoraActual fecha={fecha_visita} hora={hora_visita} />
              <TextAreaAsuntoObservaciones
                asunto={asunto}
                setAsunto={setAsunto}
                observaciones={observaciones}
                setObservaciones={setObservaciones}
              />
            </div>
          </div>
        </>
      )}

      {visitanteStatus === "nuevo" && (
        <div className="card mt-4">
          <div className="card-header">
            <h5 className="fw-bolder">Registro de visitas</h5>
          </div>
          <div className="card-body">
            <InputIdRegistroVisita
              id_registro_visita={visitanteExistenteData.id_registro_visita}
            />
            <div className="input-group mb-3">
              <span className="input-group-text">id_visitante</span>
              <input
                type="text"
                className="form-control"
                value={visitanteNuevoData.id_visitante}
                readOnly
              />
            </div>
            <FechaHoraActual fecha={fecha_visita} hora={hora_visita} />
            <div className="row">
              {/*  */}
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
                  value={visitanteNuevoData.calle}
                  onChange={(e) =>
                    setVisitanteNuevoData({
                      ...visitanteNuevoData,
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
                  value={visitanteNuevoData.numero_exterior}
                  onChange={(e) =>
                    setVisitanteNuevoData({
                      ...visitanteNuevoData,
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
                  value={visitanteNuevoData.numero_interior}
                  onChange={(e) =>
                    setVisitanteNuevoData({
                      ...visitanteNuevoData,
                      numero_interior: e.target.value,
                    })
                  }
                />
              </div>
              {/*  */}
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
                  value={visitanteNuevoData.id_colonia}
                  onChange={(e) =>
                    setVisitanteNuevoData((prev) => ({
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
              {/*  */}
              <div className="col-md-4 mb-3">
                <label
                  htmlFor="municipio_visit_exist"
                  className="form-label fw-bolder fs-7"
                >
                  Municipio
                </label>
                <select
                  className="form-select"
                  id="municipio_visit_exist"
                  value={visitanteNuevoData.id_municipio}
                  onChange={(e) =>
                    setVisitanteNuevoData((prev) => ({
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
                  htmlFor="estado_visit_exist"
                  className="form-label fw-bolder fs-7"
                >
                  Estado
                </label>
                <select
                  className="form-select"
                  id="estado_visit_exist"
                  value={visitanteNuevoData.id_estado}
                  onChange={(e) =>
                    setVisitanteNuevoData((prev) => ({
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
                  value={visitanteNuevoData.id_cp}
                  onChange={(e) =>
                    setVisitanteNuevoData((prev) => ({
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
                  value={visitanteNuevoData.id_seccion_electoral}
                  onChange={(e) =>
                    setVisitanteNuevoData((prev) => ({
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
                  value={visitanteNuevoData.numero_celular}
                  onChange={(e) =>
                    setVisitanteNuevoData({
                      ...visitanteNuevoData,
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
                  value={visitanteNuevoData.correo}
                  onChange={(e) =>
                    setVisitanteNuevoData({
                      ...visitanteNuevoData,
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
                  value={visitanteNuevoData.fecha_cumpleanos}
                  onChange={(e) =>
                    setVisitanteNuevoData({
                      ...visitanteNuevoData,
                      fecha_cumpleanos: e.target.value,
                    })
                  }
                />
              </div>
              {/*  */}
              <TextAreaAsuntoObservaciones
                asunto={asunto}
                setAsunto={setAsunto}
                observaciones={observaciones}
                setObservaciones={setObservaciones}
              />
            </div>
          </div>
        </div>
      )}

      {(visitanteStatus === "existente" || visitanteStatus === "nuevo") && (
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
                <button
                  type="button"
                  className="btn btn-danger"
                  onClick={() => {
                    setFilters({
                      nombre_visitante: "",
                      ap_visitante: "",
                      am_visitante: "",
                    });
                    setVisitanteStatus("none");
                  }}
                >
                  <FontAwesomeIcon icon={faXmark} /> Cancelar
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default AddVisitas;
