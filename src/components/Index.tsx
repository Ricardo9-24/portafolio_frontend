import React, { useState } from 'react'
import { Github, Mail, Linkedin, MessageCircleMore } from 'lucide-react';
import trajectories from '../data/trajectories.json';
import FormSendMail from './modals/FormSendMail';
import success from '../data/listSuccess.json';
import { useNavigate } from 'react-router-dom';
// import ButtonTheme from './ButtonTheme';
import UseDarkMode from './theme/UseDarkMode';
import avatar from '../img/avatar.jpeg'
import { motion } from 'framer-motion'
import Menu from './menu/Menu';
import '../styles/App.css'

const Index: React.FC = () => {
    const [sendMail, setSendMail] = useState(false)
    // const theme = useDarkMode((state) => state.theme) //Uso de zustand
    const navigate = useNavigate();
    return (
        <>
            {/* <div className={`app ${theme}`}> Uso de zustand*/}
            <div className="">
                {/* NAVBAR */}
                {/* <nav className="navbar fixed-top border-bottom theme-dark"> */}
                <nav className="navbar fixed-top navbar-expand-md border-bottom theme-dark">

                    <div className="container">
                        <button
                            className="navbar-toggler"
                            type="button"
                            data-bs-toggle="collapse"
                            data-bs-target="#mainMenu"
                        >
                            <span className="navbar-toggler-icon"></span>
                        </button>
                        <div className="collapse navbar-collapse justify-content-end" id="mainMenu">
                            <ul className="navbar-nav gap-md-4 gap-3">
                                {["sobremi", "logros", "trayectoria", "contacto"].map((item) => (
                                    <li className="nav-item" key={item}>
                                        <a
                                            href={`#${item.replace(" ", "").toLowerCase()}`}
                                            className="nav-link text-blue position-relative"
                                            style={{ padding: 15, height: '50px' }}
                                        >
                                            {item}
                                        </a>
                                    </li>
                                ))}
                            </ul>
                            <ul className="nav gap-4">
                                <li className='nav-item' style={{ padding: 15, height: '50px' }}>
                                    <Menu></Menu>
                                </li>
                            </ul>
                        </div>
                        <div >
                            <UseDarkMode></UseDarkMode>
                            {/* <ButtonTheme></ButtonTheme> Uso con zustand */}
                        </div>
                    </div>
                </nav>

                <main className="container pt-5 mt-5">
                    {/* SOBRE MI */}
                    <section id="sobremi" className="my-5 py-5">
                        <div className='row g-4'>
                            <div className='col-md-9'>
                                <motion.h1
                                    initial={{ opacity: 1, y: 80 }}
                                    animate={{ opacity: 5, y: 0 }}
                                    className="display-5 display-md-4 fw-bold mb-4"
                                >
                                    Hola, soy Ricardo
                                </motion.h1>
                                <p className="fs-4 text-secondary col-md-12">
                                    Desarrollador FullStack desde hace mas de 5 años, centrándose en desarrollo web. En mi trayectoria he
                                    tenido la oportunidad de liderar proyecto en Red Efectiva, lo
                                    que me ha permitido consolidar mis habilidades en costruir paginas accesibles y aprender constantemente resolviendo
                                    problemas reales, actualmente me encentro adenrandome en React Js, teniendo un nivel Jr a la fecha actual 2026.
                                </p>
                                <h5><a href='' onClick={() => navigate("/proyecto")}>Proyecto</a></h5>
                            </div>
                            <div className='col-md-3 float-right'>
                                <img className='py-5 image-circular float-right' src={avatar} alt="avatar" />
                            </div>
                        </div>
                    </section>

                    {/* LOGROS */}
                    <section id="logros" className="my-3 py-5">
                        <h2 className="fw-semibold mb-4">Logros</h2>
                        <div className="row g-3">
                            {success.map((item, index) => (
                                <div className="col-md-4" key={index}>
                                    <div className="card h-100 text-center shadow-sm">
                                        <div className="card-body align-items-center justify-content-center">
                                            <h5 className='fw-semibold'>{item.title}</h5>
                                            <p className="mt-2 mb-0">{item.text}</p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>

                    {/* TRAYECTORIA */}
                    <section id="trayectoria" className="my-5 py-5">
                        <h2 className="fw-semibold mb-5">Trayectoria</h2>
                        <div className="position-relative">
                            {/* Línea central */}
                            <div
                                className="position-absolute top-0 start-50 translate-middle-x bg-secondary"
                                style={{ width: "2px", height: "100%" }}
                            />

                            {trajectories.map((item, index) => (
                                <div className="row mb-5 align-items-center" key={index}>
                                    {index % 2 === 0 ? (
                                        <>
                                            <div className="col-md-5 text-end">
                                                <div className="card shadow-sm">
                                                    <div className="card-body">
                                                        <h5 className="fw-semibold">{item.place}</h5>
                                                        <small className="text-primary">{item.date}</small>
                                                        <h6 className='fw-semibold'>{item.work}</h6>
                                                        <p className="mt-2 mb-0">
                                                            {item.jobs}
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-md-2 d-flex justify-content-center">
                                                <span className="rounded-circle border-trayectory" style={{ width: 14, height: 14, position: 'absolute' }} />
                                            </div>
                                            <div className="col-md-5" />
                                        </>
                                    ) : (
                                        <>
                                            <div className="col-md-5" />
                                            <div className="col-md-2 d-flex justify-content-center">
                                                <span className="rounded-circle border-trayectory" style={{ width: 14, height: 14, position: 'absolute' }} />
                                            </div>
                                            <div className="col-md-5">
                                                <div className="card shadow-sm">
                                                    <div className="card-body">
                                                        <h5 className="fw-semibold">{item.place}</h5>
                                                        <small className="text-primary">{item.date}</small>
                                                        <h6 className='fw-semibold'>{item.work}</h6>
                                                        <p className="mt-2 mb-0">
                                                            {item.jobs}
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                        </>
                                    )}
                                </div>
                            ))}
                        </div>
                    </section>

                    {/* CONTACTO */}
                    <section id="contacto" className="my-5 py-5">
                        <h2 className="fw-semibold mb-4">Contacto</h2>
                        <div className="row g-4">
                            <div className="col-md-6">
                                <div className="card shadow-sm h-100">
                                    <div className="card-body text-center">
                                        <MessageCircleMore size={32} className="mb-3" />
                                        <h5 className="fw-semibold">WhatsApp</h5>
                                        <p className="text-secondary">Escríbeme directamente</p>
                                        <a href="https://wa.me/8131937464?text=Hola! desde tu portafolio" className="btn btn-dark">
                                            Enviar mensaje
                                        </a>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-6">
                                <div className="card shadow-sm h-100">
                                    <div className="card-body text-center">
                                        <Mail size={32} className="mb-3" />
                                        <h5 className="fw-semibold">Email</h5>
                                        <p className="text-secondary">Contáctame por correo</p>
                                        {/* <a href="mailto:ricardohernandezb924@gmail.com" onClick={() => setSendMail(!sendMail)} className="btn btn-outline-dark"> */}
                                        <a onClick={() => setSendMail(!sendMail)} className="btn btn-dark">
                                            Enviar correo
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                </main>

                {/* FOOTER */}
                <footer className="border-top py-4 text-center">
                    <div className="d-flex justify-content-center gap-4 mb-3">
                        <a href="https://github.com/Ricardo9-24" className="text-dark"><Github size={35} /></a>
                        <a href="https://www.linkedin.com/in/ricardo-hernandez-863901211" className="text-dark"><Linkedin size={35} /></a>
                        <a onClick={() => setSendMail(!sendMail)} className="text-dark"><Mail size={35} /></a>
                    </div>
                    <p className="text-secondary small mb-0">© 2026 Ricardo</p>
                </footer>
            </div>

            {/*#########   Send Mail  #########*/}
            {sendMail && (
                <FormSendMail
                    onCancel={() => setSendMail(false)}
                ></FormSendMail>
            )}
        </>


    )
}

export default Index
