import React, { useState } from "react";
import type { EmailJSResponseStatus } from "@emailjs/browser";
import withReactContent from "sweetalert2-react-content";
import type { Email } from "../../types/Email";
import emailjs from "@emailjs/browser";
import Swal from "sweetalert2";
import { useRef } from "react";

declare global {
    interface Window {
        emailjs: typeof emailjs;
    }
}

type Props = {
    onCancel: () => void;
}

const FormSendMail = ({ onCancel }: Props) => {
    const [data, setData] = useState<Email>({
        name: '', email: '', subject: '', message: ''
    });
    const form = useRef<HTMLFormElement>(null);
    const MySwal = withReactContent(Swal);
    const EMAIL_TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
    const EMAIL_SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID;
    const EMAIL_PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setData({ ...data, [name]: value })
    }

    const sendMail = (e: React.FormEvent) => {
        e.preventDefault()
        const isValid = Object.values(data).every((value) => value != null && value != '');
        if (isValid && form.current) {
            emailjs
                .sendForm(EMAIL_SERVICE_ID, EMAIL_TEMPLATE_ID, form.current, {
                    publicKey: EMAIL_PUBLIC_KEY,
                })
                .then(() => {
                    MySwal.fire({
                        icon: "success",
                        title: "¡Operación exitosa!",
                        text: "Mensaje enviado con exito",
                        draggable: true,
                        theme: "dark"
                    })
                    onCancel()
                }, (error: EmailJSResponseStatus) => {
                    console.log(error)
                    MySwal.fire({
                        icon: "warning",
                        title: "¡Lo sentimos!",
                        text: "Ocurrio un error inesperado, vuelve a intentar mas tarde!",
                        theme: 'dark',
                        draggable: true
                    })
                });
        } else {
            MySwal.fire({
                icon: 'warning',
                title: '¡Lo sentimos!',
                text: 'Completa todos los campos',
                draggable: true,
                theme: 'dark'
            })
        }
    }
    return (
        <>
            <div className="modal">
                <div className="modal-content">
                    <h2 className="text-center">Enviar un mensaje ahora</h2>
                    <form className="my-3" ref={form} onSubmit={sendMail}>
                        <div className="mb-3">
                            <label className="form-label">Nombre *</label>
                            <input className="form-control" name="name" onChange={handleChange} />
                            {/* <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div> */}
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Email *</label>
                            <input className="form-control" name="email" onChange={handleChange} />
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Asunto *</label>
                            <input className="form-control" name="subject" onChange={handleChange} />

                        </div>
                        <div className="mb-3">
                            <label className="form-label">Mensaje *</label>
                            <textarea className="form-control" name="message" onChange={handleChange} rows={4}></textarea>
                        </div>

                        <div className="row mb-3">
                            <div className="col-md-6">
                                <button className="btn btn-outline-dark" onClick={onCancel}>Cancelar</button>
                            </div>
                            <div className="col-md-6 ">
                                <button type="submit" className="btn btn-dark btnSendMail">Enviar</button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}

export default FormSendMail;