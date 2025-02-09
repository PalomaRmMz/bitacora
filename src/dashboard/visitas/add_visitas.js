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

  const [visitaData, setVisitaData] = useState({
    id_registro_visita: generateID("RV"),
    id_visitante: "",
    id_recepcionista: "RU00001",
    fecha_visita: fecha_visita,
    hora_visita: hora_visita,
    asunto: "",
    observaciones: "",
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
    const data = {
      ...visitaData,
      id_visitante: filteredVisitas[0]?.id_visitante || "",
      asunto: asunto,
      observaciones: observaciones,
    };
    console.log("Datos que se enviarían:", JSON.stringify(data, null, 2));
    // try {
    //   const respuesta = await agregarVisita(data);
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
              value={visitaData.id_recepcionista}
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
                id_registro_visita={visitaData.id_registro_visita}
              />
              <FechaHoraActual fecha={fecha_visita} hora={hora_visita} />
              <div className="row">
                <div className="col-md-12 mb-3">
                  <label htmlFor="asunto" className="form-label fw-bolder fs-7">
                    Asunto
                  </label>
                  <textarea
                    id="asunto"
                    className="form-control"
                    rows="2"
                    value={asunto}
                    onChange={(e) => setAsunto(e.target.value)}
                  />
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
                    value={observaciones}
                    onChange={(e) => setObservaciones(e.target.value)}
                  />
                </div>
              </div>
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
              id_registro_visita={visitaData.id_registro_visita}
            />
            <FechaHoraActual fecha={fecha_visita} hora={hora_visita} />
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
