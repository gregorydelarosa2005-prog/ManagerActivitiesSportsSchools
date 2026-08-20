import { useEffect, useState } from 'react'
import api from '../services/api'

interface Equipo {
    id: number
    nombre: string
    categoria: string
}

function Equipos() {

    const [equipos, setEquipos] = useState<Equipo[]>([])
    const [cargando, setCargando] = useState(true)

    const [mostrarFormulario, setMostrarFormulario] = useState(false)
    const [editando, setEditando] = useState<number | null>(null)

    const [nombre, setNombre] = useState('')
    const [categoria, setCategoria] = useState('')

    const [guardando, setGuardando] = useState(false)

    useEffect(() => {
        cargarEquipos()
    }, [])

    const cargarEquipos = async () => {
        try {
            setCargando(true)

            const response = await api.get('/Equipos')

            setEquipos(response.data)

        } catch (error) {

            console.error('Error al cargar los equipos:', error)

        } finally {

            setCargando(false)

        }
    }

    const limpiarFormulario = () => {

        setNombre('')
        setCategoria('')
        setEditando(null)
        setMostrarFormulario(false)

    }

    const guardarEquipo = async () => {

        if (!nombre.trim() || !categoria.trim()) {

            alert('Debes completar todos los campos.')

            return
        }

        try {

            setGuardando(true)

            if (editando === null) {

                await api.post('/Equipos', {
                    nombre: nombre.trim(),
                    categoria: categoria.trim()
                })

                alert('Equipo registrado correctamente.')

            } else {

                await api.put(`/Equipos/${editando}`, {
                    id: editando,
                    nombre: nombre.trim(),
                    categoria: categoria.trim()
                })

                alert('Equipo actualizado correctamente.')
            }

            limpiarFormulario()

            await cargarEquipos()

        } catch (error) {

            console.error('Error al guardar el equipo:', error)

            alert('No se pudo guardar el equipo.')

        } finally {

            setGuardando(false)

        }
    }

    const editarEquipo = (equipo: Equipo) => {

        setEditando(equipo.id)

        setNombre(equipo.nombre)

        setCategoria(equipo.categoria)

        setMostrarFormulario(true)
    }

    const eliminarEquipo = async (id: number) => {

        const confirmar = window.confirm(
            '¿Estás seguro de que deseas eliminar este equipo?'
        )

        if (!confirmar) {
            return
        }

        try {

            await api.delete(`/Equipos/${id}`)

            alert('Equipo eliminado correctamente.')

            await cargarEquipos()

        } catch (error) {

            console.error('Error al eliminar el equipo:', error)

            alert(
                'No se pudo eliminar el equipo. Puede que tenga jugadores asociados.'
            )
        }
    }

    return (

        <div>

            {/* ENCABEZADO */}

            <div className="topbar">

                <div>

                    <h1>Equipos</h1>

                    <p>
                        Gestión de equipos deportivos escolares
                    </p>

                </div>

                <button
                    className="primary-button"
                    onClick={() => {
                        limpiarFormulario()
                        setMostrarFormulario(true)
                    }}
                >
                    + Nuevo equipo
                </button>

            </div>


            {/* FORMULARIO */}

            {mostrarFormulario && (

                <section className="form-card">

                    <div className="section-header">

                        <div>

                            <h2>
                                {editando === null
                                    ? 'Registrar equipo'
                                    : 'Editar equipo'}
                            </h2>

                            <p>
                                {editando === null
                                    ? 'Completa la información para registrar un nuevo equipo.'
                                    : 'Modifica la información del equipo.'}
                            </p>

                        </div>

                    </div>


                    {/* NOMBRE */}

                    <div className="form-group">

                        <label>
                            Nombre del equipo
                        </label>

                        <input
                            type="text"
                            value={nombre}
                            onChange={(e) =>
                                setNombre(e.target.value)
                            }
                            placeholder="Ej. Los Tigres"
                        />

                    </div>


                    {/* CATEGORÍA */}

                    <div className="form-group">

                        <label>
                            Categoría
                        </label>

                        <input
                            type="text"
                            value={categoria}
                            onChange={(e) =>
                                setCategoria(e.target.value)
                            }
                            placeholder="Ej. Sub-17"
                        />

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
                            onClick={guardarEquipo}
                            disabled={guardando}
                        >
                            {guardando
                                ? 'Guardando...'
                                : editando === null
                                    ? 'Guardar equipo'
                                    : 'Actualizar equipo'}
                        </button>

                    </div>

                </section>

            )}


            {/* LISTA DE EQUIPOS */}

            <section className="content-section">

                <div className="section-header">

                    <div>

                        <h2>
                            Equipos registrados
                        </h2>

                        <p>
                            Equipos almacenados actualmente en el sistema.
                        </p>

                    </div>

                    <span className="record-count">
                        {equipos.length} equipo
                        {equipos.length !== 1 ? 's' : ''}
                    </span>

                </div>


                {/* CARGANDO */}

                {cargando ? (

                    <div className="empty-state">

                        <div>⏳</div>

                        <h3>
                            Cargando equipos...
                        </h3>

                        <p>
                            Estamos obteniendo los equipos registrados.
                        </p>

                    </div>

                ) : equipos.length === 0 ? (

                    /* SIN EQUIPOS */

                    <div className="empty-state">

                        <div>⚾</div>

                        <h3>
                            No hay equipos registrados
                        </h3>

                        <p>
                            Cuando registres un equipo aparecerá aquí.
                        </p>

                        <button
                            className="primary-button"
                            onClick={() => {
                                limpiarFormulario()
                                setMostrarFormulario(true)
                            }}
                        >
                            + Registrar primer equipo
                        </button>

                    </div>

                ) : (

                    /* EQUIPOS */

                    <div className="teams-list">

                        {equipos.map((equipo) => (

                            <div
                                className="team-item"
                                key={equipo.id}
                            >

                                <div className="team-info">

                                    <div className="team-icon">
                                        ⚾
                                    </div>

                                    <div>

                                        <strong>
                                            {equipo.nombre}
                                        </strong>

                                        <p>
                                            Categoría: {equipo.categoria}
                                        </p>

                                    </div>

                                </div>


                                <div className="team-actions">

                                    <button
                                        className="secondary-button"
                                        onClick={() =>
                                            editarEquipo(equipo)
                                        }
                                    >
                                        ✏️ Editar
                                    </button>

                                    <button
                                        className="secondary-button"
                                        onClick={() =>
                                            eliminarEquipo(equipo.id)
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

export default Equipos