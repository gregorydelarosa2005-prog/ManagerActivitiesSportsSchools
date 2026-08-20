import { useEffect, useState } from 'react'

interface Actividad {
    id: number
    nombre: string
    fecha: string
    lugar: string
    descripcion: string
}

function Actividades() {
    const [actividades, setActividades] = useState<Actividad[]>([])
    const [cargando, setCargando] = useState(true)
    const [mostrarFormulario, setMostrarFormulario] = useState(false)
    const [editandoId, setEditandoId] = useState<number | null>(null)

    const [nombre, setNombre] = useState('')
    const [fecha, setFecha] = useState('')
    const [lugar, setLugar] = useState('')
    const [descripcion, setDescripcion] = useState('')

    useEffect(() => {
        cargarActividades()
    }, [])

    const cargarActividades = async () => {
        try {
            const respuesta = await fetch(
                'http://localhost:5216/api/Actividades'
            )

            if (!respuesta.ok) {
                throw new Error('Error al obtener las actividades')
            }

            const datos = await respuesta.json()
            setActividades(datos)
        } catch (error) {
            console.error(error)
        } finally {
            setCargando(false)
        }
    }

    const limpiarFormulario = () => {
        setNombre('')
        setFecha('')
        setLugar('')
        setDescripcion('')
        setEditandoId(null)
        setMostrarFormulario(false)
    }

    const guardarActividad = async (e: React.FormEvent) => {
        e.preventDefault()

        try {
            const esEdicion = editandoId !== null

            const url = esEdicion
                ? `http://localhost:5216/api/Actividades/${editandoId}`
                : 'http://localhost:5216/api/Actividades'

            const respuesta = await fetch(url, {
                method: esEdicion ? 'PUT' : 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    id: esEdicion ? editandoId : 0,
                    nombre,
                    fecha,
                    lugar,
                    descripcion
                })
            })

            if (!respuesta.ok) {
                throw new Error('Error al guardar la actividad')
            }

            limpiarFormulario()
            await cargarActividades()

        } catch (error) {
            console.error(error)
            alert('No se pudo guardar la actividad')
        }
    }

    const editarActividad = (actividad: Actividad) => {
        setEditandoId(actividad.id)
        setNombre(actividad.nombre)
        setFecha(actividad.fecha.slice(0, 16))
        setLugar(actividad.lugar)
        setDescripcion(actividad.descripcion)
        setMostrarFormulario(true)
    }

    const eliminarActividad = async (id: number) => {
        const confirmar = window.confirm(
            '¿Seguro que deseas eliminar esta actividad?'
        )

        if (!confirmar) {
            return
        }

        try {
            const respuesta = await fetch(
                `http://localhost:5216/api/Actividades/${id}`,
                {
                    method: 'DELETE'
                }
            )

            if (!respuesta.ok) {
                throw new Error('Error al eliminar la actividad')
            }

            await cargarActividades()

        } catch (error) {
            console.error(error)
            alert('No se pudo eliminar la actividad')
        }
    }

    return (
        <div className="page">

            <div className="page-header">

                <div>
                    <h1>Actividades</h1>
                    <p>
                        Gestiona las actividades deportivas escolares
                    </p>
                </div>

                <button
                    className="primary-button"
                    onClick={() => {
                        limpiarFormulario()
                        setMostrarFormulario(true)
                    }}
                >
                    + Nueva actividad
                </button>

            </div>

            {mostrarFormulario && (

                <div className="form-card">

                    <div className="section-header">
                        <div>
                            <h2>
                                {editandoId
                                    ? 'Editar actividad'
                                    : 'Nueva actividad'}
                            </h2>

                            <p>
                                {editandoId
                                    ? 'Modifica los datos de la actividad'
                                    : 'Registra una nueva actividad deportiva'}
                            </p>
                        </div>
                    </div>

                    <form onSubmit={guardarActividad}>

                        <div className="form-group">
                            <label>Nombre</label>

                            <input
                                type="text"
                                value={nombre}
                                onChange={(e) =>
                                    setNombre(e.target.value)
                                }
                                required
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
                                required
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
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label>Descripción</label>

                            <textarea
                                value={descripcion}
                                onChange={(e) =>
                                    setDescripcion(e.target.value)
                                }
                                required
                            />
                        </div>

                        <div className="form-actions">

                            <button
                                type="button"
                                className="secondary-button"
                                onClick={limpiarFormulario}
                            >
                                Cancelar
                            </button>

                            <button
                                type="submit"
                                className="primary-button"
                            >
                                {editandoId
                                    ? 'Guardar cambios'
                                    : 'Guardar actividad'}
                            </button>

                        </div>

                    </form>

                </div>
            )}

            {cargando ? (

                <p>Cargando actividades...</p>

            ) : actividades.length === 0 ? (

                <div className="empty-state">
                    <div>🏅</div>

                    <h3>No hay actividades registradas</h3>

                    <p>
                        Cuando registres una actividad aparecerá aquí.
                    </p>
                </div>

            ) : (

                <div className="activity-list">

                    {actividades.map((actividad) => (

                        <div
                            className="activity-card"
                            key={actividad.id}
                        >

                            <div className="activity-icon">
                                🏅
                            </div>

                            <div className="activity-info">

                                <h3>{actividad.nombre}</h3>

                                <p>
                                    📅{' '}
                                    {new Date(
                                        actividad.fecha
                                    ).toLocaleDateString()}
                                </p>

                                <p>
                                    📍 {actividad.lugar}
                                </p>

                                <p>
                                    {actividad.descripcion}
                                </p>

                                <div className="activity-actions">

                                    <button
                                        className="secondary-button"
                                        onClick={() =>
                                            editarActividad(actividad)
                                        }
                                    >
                                        ✏️ Editar
                                    </button>

                                    <button
                                        className="secondary-button"
                                        onClick={() =>
                                            eliminarActividad(
                                                actividad.id
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
    )
}

export default Actividades