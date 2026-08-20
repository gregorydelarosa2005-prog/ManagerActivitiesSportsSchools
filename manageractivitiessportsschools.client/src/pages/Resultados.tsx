import { useEffect, useState } from "react";

interface Resultado {
    id: number;
    equipoLocal: string;
    equipoVisitante: string;
    carrerasLocal: number;
    carrerasVisitante: number;
    fecha: string;
    lugar: string;
}

function Resultados() {
    const [resultados, setResultados] = useState<Resultado[]>([]);
    const [mostrarFormulario, setMostrarFormulario] = useState(false);
    const [editando, setEditando] = useState<number | null>(null);

    const [equipoLocal, setEquipoLocal] = useState("");
    const [equipoVisitante, setEquipoVisitante] = useState("");
    const [carrerasLocal, setCarrerasLocal] = useState(0);
    const [carrerasVisitante, setCarrerasVisitante] = useState(0);
    const [fecha, setFecha] = useState("");
    const [lugar, setLugar] = useState("");

    const cargarResultados = async () => {
        try {
            const response = await fetch(
                "http://localhost:5216/api/Resultados"
            );

            if (!response.ok) {
                throw new Error("No se pudieron cargar los resultados");
            }

            const data = await response.json();
            setResultados(data);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        cargarResultados();
    }, []);

    const limpiarFormulario = () => {
        setEquipoLocal("");
        setEquipoVisitante("");
        setCarrerasLocal(0);
        setCarrerasVisitante(0);
        setFecha("");
        setLugar("");
        setEditando(null);
    };

    const guardarResultado = async () => {
        if (
            !equipoLocal ||
            !equipoVisitante ||
            !fecha ||
            !lugar
        ) {
            alert("Completa todos los campos.");
            return;
        }

        try {
            const resultado = {
                id: editando ?? 0,
                equipoLocal,
                equipoVisitante,
                carrerasLocal,
                carrerasVisitante,
                fecha,
                lugar,
            };

            const url =
                editando === null
                    ? "http://localhost:5216/api/Resultados"
                    : `http://localhost:5216/api/Resultados/${editando}`;

            const response = await fetch(url, {
                method: editando === null ? "POST" : "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(resultado),
            });

            if (!response.ok) {
                throw new Error("No se pudo guardar el resultado");
            }

            limpiarFormulario();
            setMostrarFormulario(false);
            await cargarResultados();

        } catch (error) {
            console.error(error);
            alert("No se pudo guardar el resultado.");
        }
    };

    const editarResultado = (resultado: Resultado) => {
        setEditando(resultado.id);

        setEquipoLocal(resultado.equipoLocal);
        setEquipoVisitante(resultado.equipoVisitante);
        setCarrerasLocal(resultado.carrerasLocal);
        setCarrerasVisitante(resultado.carrerasVisitante);

        const fechaLocal = new Date(resultado.fecha);

        const fechaFormateada =
            fechaLocal.toISOString().slice(0, 16);

        setFecha(fechaFormateada);
        setLugar(resultado.lugar);

        setMostrarFormulario(true);
    };

    const eliminarResultado = async (id: number) => {
        const confirmar = window.confirm(
            "¿Estás seguro de que deseas eliminar este resultado?"
        );

        if (!confirmar) {
            return;
        }

        try {
            const response = await fetch(
                `http://localhost:5216/api/Resultados/${id}`,
                {
                    method: "DELETE",
                }
            );

            if (!response.ok) {
                throw new Error("No se pudo eliminar el resultado");
            }

            await cargarResultados();

        } catch (error) {
            console.error(error);
            alert("No se pudo eliminar el resultado.");
        }
    };

    return (
        <div className="page">

            <div className="page-header">
                <div>
                    <h1>Resultados</h1>

                    <p>
                        Consulta y registra los resultados deportivos.
                    </p>
                </div>

                <button
                    className="primary-button"
                    onClick={() => {
                        limpiarFormulario();
                        setMostrarFormulario(true);
                    }}
                >
                    + Nuevo resultado
                </button>
            </div>

            {mostrarFormulario && (
                <div className="form-card">

                    <div className="section-header">
                        <div>
                            <h2>
                                {editando === null
                                    ? "Registrar resultado"
                                    : "Editar resultado"}
                            </h2>

                            <p>
                                Ingresa los datos del encuentro deportivo.
                            </p>
                        </div>
                    </div>

                    <div className="form-group">
                        <label>Equipo local</label>

                        <input
                            type="text"
                            value={equipoLocal}
                            onChange={(e) =>
                                setEquipoLocal(e.target.value)
                            }
                            placeholder="Ej. Tigres"
                        />
                    </div>

                    <div className="form-group">
                        <label>Equipo visitante</label>

                        <input
                            type="text"
                            value={equipoVisitante}
                            onChange={(e) =>
                                setEquipoVisitante(e.target.value)
                            }
                            placeholder="Ej. Leones"
                        />
                    </div>

                    <div className="form-group">
                        <label>Carreras del equipo local</label>

                        <input
                            type="number"
                            min="0"
                            value={carrerasLocal}
                            onChange={(e) =>
                                setCarrerasLocal(
                                    Number(e.target.value)
                                )
                            }
                        />
                    </div>

                    <div className="form-group">
                        <label>Carreras del equipo visitante</label>

                        <input
                            type="number"
                            min="0"
                            value={carrerasVisitante}
                            onChange={(e) =>
                                setCarrerasVisitante(
                                    Number(e.target.value)
                                )
                            }
                        />
                    </div>

                    <div className="form-group">
                        <label>Fecha</label>

                        <input
                            type="datetime-local"
                            value={fecha}
                            onChange={(e) =>
                                setFecha(e.target.value)
                            }
                        />
                    </div>

                    <div className="form-group">
                        <label>Lugar</label>

                        <input
                            type="text"
                            value={lugar}
                            onChange={(e) =>
                                setLugar(e.target.value)
                            }
                            placeholder="Ej. Cancha ITLA"
                        />
                    </div>

                    <div className="form-actions">

                        <button
                            className="secondary-button"
                            onClick={() => {
                                limpiarFormulario();
                                setMostrarFormulario(false);
                            }}
                        >
                            Cancelar
                        </button>

                        <button
                            className="primary-button"
                            onClick={guardarResultado}
                        >
                            {editando === null
                                ? "Guardar resultado"
                                : "Actualizar resultado"}
                        </button>

                    </div>

                </div>
            )}

            <div className="content-section">

                <div className="section-header">

                    <div>
                        <h2>Resultados registrados</h2>

                        <p>
                            Historial de encuentros deportivos registrados.
                        </p>
                    </div>

                </div>

                {resultados.length === 0 ? (

                    <div className="empty-state">

                        <div>⚾</div>

                        <h3>
                            No hay resultados registrados
                        </h3>

                        <p>
                            Cuando registres un encuentro,
                            aparecerá aquí.
                        </p>

                    </div>

                ) : (

                    <div className="activity-list">

                        {resultados.map((resultado) => (

                            <div
                                className="activity-card"
                                key={resultado.id}
                            >

                                <div className="activity-icon">
                                    ⚾
                                </div>

                                <div className="activity-info">

                                    <h3>
                                        {resultado.equipoLocal}

                                        {" "}

                                        <strong>
                                            {resultado.carrerasLocal}
                                        </strong>

                                        {" - "}

                                        <strong>
                                            {resultado.carrerasVisitante}
                                        </strong>

                                        {" "}

                                        {resultado.equipoVisitante}
                                    </h3>

                                    <p>
                                        📅{" "}
                                        {new Date(
                                            resultado.fecha
                                        ).toLocaleString()}
                                    </p>

                                    <p>
                                        📍 {resultado.lugar}
                                    </p>

                                    <div className="activity-actions">

                                        <button
                                            className="secondary-button"
                                            onClick={() =>
                                                editarResultado(
                                                    resultado
                                                )
                                            }
                                        >
                                            ✏️ Editar
                                        </button>

                                        <button
                                            className="secondary-button"
                                            onClick={() =>
                                                eliminarResultado(
                                                    resultado.id
                                                )
                                            }
                                        >
                                            🗑️ Eliminar
                                        </button>

                                    </div>

                                </div>

                            </div>

                        ))}

                    </div>

                )}

            </div>

        </div>
    );
}

export default Resultados;