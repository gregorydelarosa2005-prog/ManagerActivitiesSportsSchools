import './App.css'
import Equipos from './pages/Equipos'
import Jugadores from './pages/Jugadores'
import Actividades from './pages/Actividades'
import Resultados from './pages/Resultados'
import { useEffect, useState } from 'react'
import api from './services/api'

function App() {

    const [pagina, setPagina] = useState('inicio')

    const [equipos, setEquipos] = useState(0)
    const [jugadores, setJugadores] = useState(0)
    const [actividades, setActividades] = useState(0)
    const [resultados, setResultados] = useState(0)

    const cargarEstadisticas = async () => {

        try {

            const [
                equiposResponse,
                jugadoresResponse,
                actividadesResponse,
                resultadosResponse
            ] = await Promise.all([
                api.get('/Equipos'),
                api.get('/Jugadores'),
                api.get('/Actividades'),
                api.get('/Resultados')
            ])

            setEquipos(equiposResponse.data.length)
            setJugadores(jugadoresResponse.data.length)
            setActividades(actividadesResponse.data.length)
            setResultados(resultadosResponse.data.length)

        } catch (error) {

            console.error(
                'Error al cargar las estadísticas:',
                error
            )

        }
    }

    useEffect(() => {
        cargarEstadisticas()
    }, [pagina])


    return (
        <div className="app">

            {/* MENÚ LATERAL */}

            <aside className="sidebar">

                <div className="logo">

                    <div className="logo-icon">
                        🏆
                    </div>

                    <div>

                        <h2>
                            Manager
                        </h2>

                        <span>
                            Sports Schools
                        </span>

                    </div>

                </div>


                <nav>

                    <button
                        className={`menu-item ${pagina === 'inicio'
                                ? 'active'
                                : ''
                            }`}
                        onClick={() =>
                            setPagina('inicio')
                        }
                    >
                        🏠
                        <span>
                            Inicio
                        </span>
                    </button>


                    <button
                        className={`menu-item ${pagina === 'equipos'
                                ? 'active'
                                : ''
                            }`}
                        onClick={() =>
                            setPagina('equipos')
                        }
                    >
                        ⚽
                        <span>
                            Equipos
                        </span>
                    </button>


                    <button
                        className={`menu-item ${pagina === 'jugadores'
                                ? 'active'
                                : ''
                            }`}
                        onClick={() =>
                            setPagina('jugadores')
                        }
                    >
                        👤
                        <span>
                            Jugadores
                        </span>
                    </button>


                    <button
                        className={`menu-item ${pagina === 'actividades'
                                ? 'active'
                                : ''
                            }`}
                        onClick={() =>
                            setPagina('actividades')
                        }
                    >
                        🏅
                        <span>
                            Actividades
                        </span>
                    </button>


                    <button
                        className={`menu-item ${pagina === 'resultados'
                                ? 'active'
                                : ''
                            }`}
                        onClick={() =>
                            setPagina('resultados')
                        }
                    >
                        📊
                        <span>
                            Resultados
                        </span>
                    </button>

                </nav>


                <div className="sidebar-bottom">

                    <button className="menu-item">

                        ⚙️

                        <span>
                            Configuración
                        </span>

                    </button>

                </div>

            </aside>


            {/* CONTENIDO PRINCIPAL */}

            <main className="main-content">


                {/* ========================= */}
                {/* INICIO */}
                {/* ========================= */}

                {pagina === 'inicio' && (

                    <>

                        <header className="topbar">

                            <div>

                                <h1>
                                    Dashboard
                                </h1>

                                <p>
                                    Manager Activities Sports Schools
                                </p>

                            </div>


                            <div className="user">

                                <div className="user-avatar">
                                    A
                                </div>

                                <div>

                                    <strong>
                                        Administrador
                                    </strong>

                                    <small>
                                        Gestor deportivo
                                    </small>

                                </div>

                            </div>

                        </header>


                        {/* ========================= */}
                        {/* ESTADÍSTICAS */}
                        {/* ========================= */}

                        <section className="stats">


                            {/* EQUIPOS */}

                            <div className="stat-card">

                                <div className="stat-icon">
                                    ⚽
                                </div>

                                <div>

                                    <span>
                                        Equipos registrados
                                    </span>

                                    <strong>
                                        {equipos}
                                    </strong>

                                </div>

                            </div>


                            {/* JUGADORES */}

                            <div className="stat-card">

                                <div className="stat-icon">
                                    👤
                                </div>

                                <div>

                                    <span>
                                        Jugadores registrados
                                    </span>

                                    <strong>
                                        {jugadores}
                                    </strong>

                                </div>

                            </div>


                            {/* ACTIVIDADES */}

                            <div className="stat-card">

                                <div className="stat-icon">
                                    🏅
                                </div>

                                <div>

                                    <span>
                                        Actividades registradas
                                    </span>

                                    <strong>
                                        {actividades}
                                    </strong>

                                </div>

                            </div>


                            {/* RESULTADOS */}

                            <div className="stat-card">

                                <div className="stat-icon">
                                    🏆
                                </div>

                                <div>

                                    <span>
                                        Resultados registrados
                                    </span>

                                    <strong>
                                        {resultados}
                                    </strong>

                                </div>

                            </div>


                        </section>


                        {/* ========================= */}
                        {/* BIENVENIDA */}
                        {/* ========================= */}

                        <section className="welcome-card">

                            <div>

                                <span className="welcome-label">
                                    SISTEMA DE GESTIÓN DEPORTIVA
                                </span>


                                <h2>

                                    Bienvenido a Manager Activities

                                    <br />

                                    Sports Schools

                                </h2>


                                <p>

                                    Administra equipos, jugadores y
                                    actividades deportivas escolares
                                    desde un solo lugar.

                                </p>


                                <button
                                    className="primary-button"
                                    onClick={() =>
                                        setPagina('equipos')
                                    }
                                >
                                    Comenzar
                                </button>

                            </div>


                            <div className="welcome-icon">
                                🏆
                            </div>

                        </section>


                        {/* ========================= */}
                        {/* RESUMEN */}
                        {/* ========================= */}

                        <section className="content-section">

                            <div className="section-header">

                                <div>

                                    <h2>
                                        Resumen del sistema
                                    </h2>

                                    <p>
                                        Datos registrados actualmente
                                    </p>

                                </div>

                            </div>


                            <div className="dashboard-summary">

                                <div className="summary-item">

                                    <span>
                                        ⚽
                                    </span>

                                    <div>

                                        <strong>
                                            {equipos}
                                        </strong>

                                        <p>
                                            Equipos registrados
                                        </p>

                                    </div>

                                </div>


                                <div className="summary-item">

                                    <span>
                                        👤
                                    </span>

                                    <div>

                                        <strong>
                                            {jugadores}
                                        </strong>

                                        <p>
                                            Jugadores registrados
                                        </p>

                                    </div>

                                </div>


                                <div className="summary-item">

                                    <span>
                                        🏅
                                    </span>

                                    <div>

                                        <strong>
                                            {actividades}
                                        </strong>

                                        <p>
                                            Actividades registradas
                                        </p>

                                    </div>

                                </div>


                                <div className="summary-item">

                                    <span>
                                        🏆
                                    </span>

                                    <div>

                                        <strong>
                                            {resultados}
                                        </strong>

                                        <p>
                                            Resultados registrados
                                        </p>

                                    </div>

                                </div>

                            </div>

                        </section>

                    </>

                )}


                {/* ========================= */}
                {/* EQUIPOS */}
                {/* ========================= */}

                {pagina === 'equipos' && (
                    <Equipos />
                )}


                {/* ========================= */}
                {/* JUGADORES */}
                {/* ========================= */}

                {pagina === 'jugadores' && (
                    <Jugadores />
                )}


                {/* ========================= */}
                {/* ACTIVIDADES */}
                {/* ========================= */}

                {pagina === 'actividades' && (
                    <Actividades />
                )}


                {/* ========================= */}
                {/* RESULTADOS */}
                {/* ========================= */}

                {pagina === 'resultados' && (
                    <Resultados />
                )}

            </main>

        </div>
    )
}

export default App