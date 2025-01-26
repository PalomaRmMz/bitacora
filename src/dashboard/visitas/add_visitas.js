import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
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
  const [colonias, setColonias] = useState([]);
  const [municipios, setMunicipios] = useState([]);
  const [estados, setEstados] = useState([]);
  const [codigosPostales, setCodigosPostales] = useState([]);
  const [secciones, setSecciones] = useState([]);

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

  return (
    <div className="card">
      <div className="card-header">
        <h3>
          <FontAwesomeIcon icon={faFileCirclePlus} /> Agregar visita
        </h3>
      </div>

      <div className="card-body">
        <div className="row">
          <div className="col-md-4 mb-3">
            <label htmlFor="nombre" className="form-label fw-bolder fs-7">
              Nombre
            </label>
            <input type="text" id="nombre" className="form-control" />
          </div>
          <div className="col-md-4 mb-3">
            <label
              htmlFor="apellidoPaterno"
              className="form-label fw-bolder fs-7"
            >
              Apellido Paterno
            </label>
            <input type="text" id="apellidoPaterno" className="form-control" />
          </div>
          <div className="col-md-4 mb-3">
            <label
              htmlFor="apellidoMaterno"
              className="form-label fw-bolder fs-7"
            >
              Apellido Materno
            </label>
            <input type="text" id="apellidoMaterno" className="form-control" />
          </div>
          <div className="col-md-12 mb-3">
            <label htmlFor="calle" className="form-label fw-bolder fs-7">
              Calle
            </label>
            <input type="text" id="calle" className="form-control" />
          </div>
          <div className="col-md-2 mb-3">
            <label
              htmlFor="numeroExterior"
              className="form-label fw-bolder fs-7"
            >
              Número Exterior
            </label>
            <input type="text" id="numeroExterior" className="form-control" />
          </div>
          <div className="col-md-2 mb-3">
            <label
              htmlFor="numeroInterior"
              className="form-label fw-bolder fs-7"
            >
              Número Interior
            </label>
            <input type="text" id="numeroInterior" className="form-control" />
          </div>
          <div className="col-md-4 mb-3">
            <label htmlFor="colonia" className="form-label fw-bolder fs-7">
              Colonia
            </label>
            <select className="form-select" id="colonia">
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
            <label htmlFor="municipio" className="form-label fw-bolder fs-7">
              Municipio
            </label>
            <select className="form-select" id="municipio">
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
            <label htmlFor="estado" className="form-label fw-bolder fs-7">
              Estado
            </label>
            <select className="form-select" id="estado">
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
            <label htmlFor="seccion" className="form-label fw-bolder fs-7">
              Sección electoral
            </label>
            <select className="form-select" id="seccion">
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
            <label htmlFor="codigoPostal" className="form-label fw-bolder fs-7">
              Codigo postal
            </label>
            <select className="form-select" id="codigoPostal">
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
            <label htmlFor="cumpleanos" className="form-label fw-bolder fs-7">
              Cumpleaños
            </label>
            <input type="date" id="cumpleanos" className="form-control" />
          </div>
        </div>

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
  );
};

export default AddVisitas;
