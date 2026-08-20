import { useEffect, useState } from 'react'
import api from '../services/api'

interface Jugador {
    id: number
    nombre: string
    edad: number
    equipoId: number
}

interface Equipo {
    id: number
    nombre: string
    categoria: string
}

function Jugadores() {

    const [jugadores, setJugadores] = useState<Jugador[]>([])
    const [equipos, setEquipos] = useState<Equipo[]>([])

    const [cargando, setCargando] = useState(true)
    const [mostrarFormulario, setMostrarFormulario] = useState(false)
    const [editando, setEditando] = useState<number | null>(null)

    const [nombre, setNombre] = useState('')
    const [edad, setEdad] = useState('')
    const [equipoId, setEquipoId] = useState('')

    const [guardando, setGuardando] = useState(false)

    useEffect(() => {
        cargarDatos()
    }, [])

    const cargarDatos = async () => {

        try {

            setCargando(true)

            const [jugadoresResponse, equiposResponse] =
                await Promise.all([
                    api.get('/Jugadores'),
                    api.get('/Equipos')
                ])

            setJugadores(jugadoresResponse.data)
            setEquipos(equiposResponse.data)

        } catch (error) {

            console.error('Error al cargar los datos:', error)

        } finally {

            setCargando(false)

        }
    }

    const limpiarFormulario = () => {

        setNombre('')
        setEdad('')
        setEquipoId('')
        setEditando(null)
        setMostrarFormulario(false)

    }

    const guardarJugador = async () => {

        if (!nombre.trim() || !edad || !equipoId) {

            alert('Debes completar todos los campos.')

            return
        }

        if (Number(edad) <= 0) {

            alert('La edad debe ser mayor que 0.')

            return
        }

        try {

            setGuardando(true)

            const datos = {
                id: editando ?? 0,
                nombre: nombre.trim(),
                edad: Number(edad),
                equipoId: Number(equipoId)
            }

            if (editando === null) {

                await api.post('/Jugadores', datos)

                alert('Jugador registrado correctamente.')

            } else {

                await api.put(`/Jugadores/${editando}`, datos)

                alert('Jugador actualizado correctamente.')

            }

            limpiarFormulario()

            await cargarDatos()

        } catch (error) {

            console.error('Error al guardar el jugador:', error)

            alert('No se pudo guardar el jugador.')

        } finally {

            setGuardando(false)

        }
    }

    const editarJugador = (jugador: Jugador) => {

        setEditando(jugador.id)

        setNombre(jugador.nombre)
        setEdad(String(jugador.edad))
        setEquipoId(String(jugador.equipoId))

        setMostrarFormulario(true)

    }

    const eliminarJugador = async (id: number) => {

        const confirmar = window.confirm(
            '¿Estás seguro de que deseas eliminar este jugador?'
        )

        if (!confirmar) {
            return
        }

        try {

            await api.delete(`/Jugadores/${id}`)

            alert('Jugador eliminado correctamente.')

            await cargarDatos()

        } catch (error) {

            console.error('Error al eliminar el jugador:', error)

            alert('No se pudo eliminar el jugador.')

        }
    }

    const obtenerNombreEquipo = (id: number) => {

        const equipo = equipos.find(e => e.id === id)

        return equipo
            ? equipo.nombre
            : 'Equipo no encontrado'
    }

    return (

        <div>

            {/* ENCABEZADO */}

            <div className="topbar">

                <div>

                    <h1>Jugadores</h1>

                    <p>
                        Gestión de jugadores deportivos escolares
                    </p>

                </div>

                <button
                    className="primary-button"
                    onClick={() => {
                        limpiarFormulario()
                        setMostrarFormulario(true)
                    }}
                >
                    + Nuevo jugador
                </button>

            </div>


            {/* FORMULARIO */}

            {mostrarFormulario && (

                <section className="form-card">

                    <div className="section-header">

                        <div>

                            <h2>
                                {editando === null
                                    ? 'Registrar jugador'
                                    : 'Editar jugador'}
                            </h2>

                            <p>
                                {editando === null
                                    ? 'Completa la información para registrar un nuevo jugador.'
                                    : 'Modifica la información del jugador.'}
                            </p>

                        </div>

                    </div>


                    {/* NOMBRE */}

                    <div className="form-group">

                        <label>
                            Nombre del jugador
                        </label>

                        <input
                            type="text"
                            value={nombre}
                            onChange={(e) =>
                                setNombre(e.target.value)
                            }
                            placeholder="Ej. Juan Pérez"
                        />

                    </div>


                    {/* EDAD */}

                    <div className="form-group">

                        <label>
                            Edad
                        </label>

                        <input
                            type="number"
                            min="1"
                            value={edad}
                            onChange={(e) =>
                                setEdad(e.target.value)
                            }
                            placeholder="Ej. 16"
                        />

                    </div>


                    {/* EQUIPO */}

                    <div className="form-group">

                        <label>
                            Equipo
                        </label>

                        <select
                            value={equipoId}
                            onChange={(e) =>
                                setEquipoId(e.target.value)
                            }
                        >

                            <option value="">
                                Selecciona un equipo
                            </option>

                            {equipos.map((equipo) => (

                                <option
                                    key={equipo.id}
                                    value={equipo.id}
                                >
                                    {equipo.nombre} - {equipo.categoria}
                                </option>

                            ))}

                        </select>

                    </div>


                    {/* BOTONES */}

                    <div className="form-actions">

                        <button
                            className="secondary-button"
                            onClick={limpiarFormulario}
                            disabled={guardando}
                        >
                            Cancelar
                        </button>

                        <button
                            className="primary-button"
                            onClick={guardarJugador}
                            disabled={guardando}
                        >
                            {guardando
                                ? 'Guardando...'
                                : editando === null
                                    ? 'Guardar jugador'
                                    : 'Actualizar jugador'}
                        </button>

                    </div>

                </section>

            )}


            {/* LISTA DE JUGADORES */}

            <section className="content-section">

                <div className="section-header">

                    <div>

                        <h2>
                            Jugadores registrados
                        </h2>

                        <p>
                            Jugadores almacenados actualmente en el sistema.
                        </p>

                    </div>

                    <span className="record-count">
                        {jugadores.length} jugador
                        {jugadores.length !== 1 ? 'es' : ''}
                    </span>

                </div>


                {/* CARGANDO */}

                {cargando ? (

                    <div className="empty-state">

                        <div>⏳</div>

                        <h3>
                            Cargando jugadores...
                        </h3>

                        <p>
                            Estamos obteniendo los jugadores registrados.
                        </p>

                    </div>

                ) : jugadores.length === 0 ? (

                    /* SIN JUGADORES */

                    <div className="empty-state">

                        <div>👤</div>

                        <h3>
                            No hay jugadores registrados
                        </h3>

                        <p>
                            Cuando registres un jugador aparecerá aquí.
                        </p>

                        <button
                            className="primary-button"
                            onClick={() => {
                                limpiarFormulario()
                                setMostrarFormulario(true)
                            }}
                        >
                            + Registrar primer jugador
                        </button>

                    </div>

                ) : (

                    /* JUGADORES */

                    <div className="teams-list">

                        {jugadores.map((jugador) => (

                            <div
                                className="team-item"
                                key={jugador.id}
                            >

                                <div className="team-info">

                                    <div className="team-icon">
                                        👤
                                    </div>

                                    <div>

                                        <strong>
                                            {jugador.nombre}
                                        </strong>

                                        <p>
                                            Edad: {jugador.edad}
                                        </p>

                                        <p>
                                            Equipo: {obtenerNombreEquipo(
                                                jugador.equipoId
                                            )}
                                        </p>

                                    </div>

                                </div>


                                <div className="team-actions">

                                    <button
                                        className="secondary-button"
                                        onClick={() =>
                                            editarJugador(jugador)
                                        }
                                    >
                                        ✏️ Editar
                                    </button>

                                    <button
                                        className="secondary-button"
                                        onClick={() =>
                                            eliminarJugador(jugador.id)
                                        }
                                    >
                                        🗑️ Eliminar
                                    </button>

                                </div>

                            </div>

                        ))}

                    </div>

                )}

            </section>

        </div>
    )
}

export default Jugadores